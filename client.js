/*global Map*/
import { promise, string } from "lively.lang";
import { resource } from "lively.resources";
import ioClient from "socket.io-client";
import L2LConnection from "./interface.js";

export default class L2LClient extends L2LConnection {

  static clientKey(origin, path, namespace) {
    origin = origin.replace(/\/$/, "");
    path = path.replace(/^\//, "");
    namespace = namespace.replace(/^\//, "");
    return `${origin}-${path}-${namespace}`
  }

  static ensure(options = {url: null, namespace: null}) {
    // url specifies hostname + port + io path
    // namespace is io namespace

    var {url, namespace, autoOpen} = options;

    if (!url) throw new Error("L2LClient needs server url!")

    if (!this._clients) this._clients = new Map();

    var res = resource(url),
        origin = res.root().url.replace(/\/+$/, ""),
        path = res.path(),
        namespace = namespace ? namespace : "",
        key = this.clientKey(origin, path, namespace),
        client = this._clients.get(key);
    if (client) return client;

    client = new this(origin, path, namespace);
    if (autoOpen || autoOpen === undefined) { client.open(); client.register(); }

    this._clients.set(key, client);
    return client;
  }

  constructor(origin, path, namespace) {
    super();
    this.origin = origin;
    this.path = path;
    this.namespace = namespace.replace(/^\/?/, "/");
    this.trackerId = null;
    this._socketioClient = null;
  }

  get socket() { return this._socketioClient; }

  get socketId() { return this.socket ? `${this.namespace}#${this.socket.id}` : null; }

  isOnline() {
    return this.socket && this.socket.connected;
  }

  isRegistered() { return !!this.trackerId; }

  async open() {
    if (this.isOnline()) return this;

    await this.close();

    var url = resource(this.origin).join(this.namespace).url,
        opts = {path: this.path, transports: ['websocket'], upgrade: false},
        socket = this._socketioClient = ioClient(url, opts);


    if (this.debug) console.log(`[${this}] connecting`);

    socket.on("error",            (err) =>    this.debug && console.log(`[${this}] errored: ${err}`))
    socket.on("close",            (reason) => this.debug && console.log(`[${this}] closed: ${reason}`))
    socket.on("connect",          () =>       this.debug && console.log(`[${this}] connected`))
    socket.on("disconnect",       () =>       this.debug && console.log(`[${this}] disconnected`))
    socket.on("reconnect",        () =>       this.debug && console.log(`[${this}] reconnected`))
    socket.on("reconnecting",     () =>       this.debug && console.log(`[${this}] reconnecting`))
    socket.on("reconnect_failed", () =>       this.debug && console.log(`[${this}] could not reconnect`))
    socket.on("reconnect_error",  (err) =>    this.debug && console.log(`[${this}] reconnect error ${err}`))

    this.installEventToMessageTranslator(socket);

    return new Promise((resolve, reject) => {
      socket.once("error", reject);
      socket.once("connect", resolve);
    }).then(() => this);
  }

  async close() {
    if (this.isRegistered()) await this.unregister();
    if (!this.isOnline() && !this.socket) return;
    var socket = this.socket;
    this._socketioClient = null;
    socket.close();
    if (!socket.connected) return;
    return Promise.race([
      promise.delay(500).then(() => socket.removeAllListeners("disconnect")),
      new Promise(resolve => socket.once("disconnect", resolve))
    ]);
  }

  remove() {
    if (this.constructor._clients) {
      var {origin, path, namespace} = this,
          key = this.constructor.clientKey(origin, path, namespace);
      this.constructor._clients.delete(key);
    }
    return this.close();
  }

  async register() {
    if (this.isRegistered()) return;

    this.debug && console.log(`[${this}] register`)

    try {
      var prevTrackerId = this.trackerId || "tracker";
      var {data: {trackerId}} = await this.sendToAndWait("tracker", "register", {});
      this.trackerId = trackerId;
      this.renameTarget(prevTrackerId, trackerId);
    } catch (e) {
      this.unregister();
      throw new Error(`Error in register request of ${this}: ${e}`);
    }
  }

  async unregister() {
    if (!this.isRegistered()) return;
    this.debug && console.log(`[${this}] unregister`);
    var trackerId = this.trackerId;
    try { await this.sendToAndWait(this.trackerId, "unregister", {}); } catch (e) {}
    this.renameTarget(trackerId, "tracker");
    this.trackerId = null;
  }

  whenRegistered(timeout) {
    return promise.waitFor(timeout, () => this.isRegistered())
            .catch(err =>
              Promise.reject(/timeout/i.test(String(err)) ?
                new Error(`Timeout in ${this}.whenRegistered`) : err))
  }

  send(msg, ackFn) {
    [msg, ackFn] = this.prepareSend(msg, ackFn);
    this.whenOnline().then(() => {
      var socket = this.socket,
          {action, target} = msg;
      if (!socket) throw new Error(`Trying to send message ${action} to ${target} but cannot find a connection to it!`);
      typeof ackFn === "function" ?
        socket.emit(action, msg, ackFn) :
        socket.emit(action, msg);
    });
  }

  toString() {
    var {origin, path, namespace, id} = this,
        state = !this.isOnline() ? "disconnected" :
          !this.isRegistered() ? "unregistered" : "registered",
        shortId = (id || "").slice(0,5);
    return `L2LClient(${shortId} ${origin}${path} - ${namespace} ${state})`;
  }

}