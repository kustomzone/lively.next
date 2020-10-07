System.register(["./__root_module__-255c8c26.js","kld-intersections"],function(Da){var Ab,Tb,kc,ec,he;return{setters:[function(gd){Ab=gd._;Tb=gd.bm;kc=gd.a5;ec=gd.a6;he=gd.aq},function(){}],execute:function(){function gd(md,db){db=void 0===db?{}:db;var Fb=db.l2lClient;if(!Fb)throw Error("lively.shell client side runCommand needs opts.l2lClient!");Ud.ClientCommand.installLively2LivelyServices(Fb);Fb=new Ud.ClientCommand(Fb);Fb.spawn(Object.assign({command:md},Ud.obj.dissoc(db,["l2lClient"])));
return Fb}function Zd(md){return Ud.dirCache[md.trackerId]?Ud.dirCache[md.trackerId]:Promise.resolve().then(function(){var db,Fb,tc;return $jscomp.asyncExecutePromiseGeneratorProgram(function(nc){if(1==nc.nextAddress)return nc.yield(md.sendToAndWait(md.trackerId,"lively.shell.info",{}),2);db=nc.yieldResult;Fb=db.data;tc=Fb.defaultDirectory;return nc.return(Ud.dirCache[md.trackerId]=tc)})})}function kd(md){var db,Fb,tc;return $jscomp.asyncExecutePromiseGeneratorProgram(function(nc){if(1==nc.nextAddress)return nc.yield(md.sendToAndWait(md.trackerId,
"lively.shell.env",{}),2);db=nc.yieldResult;Fb=db.data;tc=Fb.env;return nc.return(tc)})}function Sc(md,db){db=(db=void 0===db?{}:db)||{};var Fb=Ud.runCommand('cat "'+md+'"',db);return Fb.whenDone().then(function(){if(Fb.exitCode)throw Error("Read "+md+" failed: "+Fb.stderr);return Fb.output})}function yd(md,db,Fb){!Fb&&db&&db.content&&(Fb=db,db=Fb.content);var tc=Ud.runCommand('tee "'+md+'"',Object.assign({stdin:db||""},Fb));return tc.whenDone().then(function(){if(tc.exitCode)throw Error("Write "+
md+" failed: "+tc.stderr);return tc})}Da({defaultDirectory:Zd,env:kd,readFile:Sc,runCommand:gd,writeFile:yd});var Od=lively.FreezerRuntime.recorderFor("lively.shell/command-interface.js");Od.promise=Ab;Od.events=Tb;var fe=function(){this._stderr=this._stdout="";this.exitCode=void 0;this.commandString="";this.process=null;this._whenDone=Od.promise.deferred();this._whenStarted=Od.promise.deferred();this.startTime=0;this.lastSignal=null;Od.events.makeEmitter(this)};fe.findCommand=function(md){return this.commands.find(function(db){return db.pid===
md})};fe.prototype.isRunning=function(){return this.process&&void 0===this.exitCode};fe.prototype.isDone=function(){return void 0!=this.exitCode};fe.prototype.whenStarted=function(){return this._whenStarted.promise};fe.prototype.whenDone=function(){return this._whenDone.promise};fe.prototype.spawn=function(md){throw Error("not yet implemented");};fe.prototype.kill=function(md){this.lastSignal=void 0===md?"KILL":md};fe.prototype.toString=function(){return this.constructor.name+"("+this.commandString+
", "+this.status+")"};$jscomp.global.Object.defineProperties(fe.prototype,{isShellCommand:{configurable:!0,enumerable:!0,get:function(){return!0}},status:{configurable:!0,enumerable:!0,get:function(){return this.process?void 0===this.exitCode?"running, pid "+this.pid:"exited "+this.exitCode+", pid "+this.pid:"not started"}},pid:{configurable:!0,enumerable:!0,get:function(){return this.process?this.process.pid:null}},output:{configurable:!0,enumerable:!0,get:function(){return this.stdout+(this.stderr?
"\n"+this.stderr:"")}},stdout:{configurable:!0,enumerable:!0,get:function(){return this._stdout}},stderr:{configurable:!0,enumerable:!0,get:function(){return this._stderr}}});$jscomp.global.Object.defineProperties(fe,{commands:{configurable:!0,enumerable:!0,get:function(){return this._commands||(this._commands=[])}}});Od.CommandInterface=fe;Od.default=fe;var Ud=lively.FreezerRuntime.recorderFor("lively.shell/client-command.js");Ud.runCommand=gd;Ud.defaultDirectory=Zd;Ud.env=kd;Ud.readFile=Sc;Ud.writeFile=
yd;Ud.CommandInterface=fe;Ud.promise=Ab;Ud.arr=kc;Ud.obj=ec;Ud.signal=he;Ud.debug=!1;Ud.runCommand=gd;Ud.runCommand=gd;Ud.dirCache={};Ud.defaultDirectory=Zd;Ud.defaultDirectory=Zd;Ud.env=kd;Ud.env=kd;Ud.readFile=Sc;Ud.readFile=Sc;Ud.writeFile=yd;Ud.writeFile=yd;fe=function(md){var db=Ud.CommandInterface.call(this)||this;db.debug=Ud.debug;db.l2lClient=md;return db};$jscomp.inherits(fe,Ud.CommandInterface);fe.installLively2LivelyServices=function(md){Object.keys(Ud.L2LServices).forEach(function(db){return md.addService(db,
function(Fb,tc,nc){return $jscomp.asyncExecutePromiseGeneratorProgram(function(td){return td.return(Ud.L2LServices[db](Fb,tc,nc))})})})};fe.prototype.envForCommand=function(md){var db=this.l2lClient,Fb=db.id,tc=db.origin,nc=db.path;db=db.namespace;var td=md||{};md=td.env;td=td.owner;md=md||{};td&&(md.LIVELY_COMMAND_OWNER=td);return Object.assign({ASKPASS_SESSIONID:Fb,L2L_EDITOR_SESSIONID:Fb,L2L_SESSIONTRACKER_SERVER:tc,L2L_SESSIONTRACKER_PATH:nc,L2L_SESSIONTRACKER_NS:db},md)};fe.prototype.spawn=function(md){md=
void 0===md?{command:null,env:{},cwd:null,stdin:null}:md;var db=this,Fb,tc,nc,td,ke,zc,Ec,Pb,Qb,Tc,ld;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Rb){if(1==Rb.nextAddress)return Fb=db,tc=Fb.l2lClient,nc=md,td=nc.command,ke=nc.env,zc=nc.cwd,Ec=nc.stdin,db.startTime=new Date,ke=db.envForCommand(md),db.debug&&console.log(db+" spawning "+td),db.debug&&db.whenStarted().then(function(){return console.log(db+" started")}),db.debug&&db.whenDone().then(function(){return console.log(db+" exited")}),
Ud.arr.pushIfNotIncluded(db.constructor.commands,db),db.commandString=Array.isArray(td)?td.join(""):td,Rb.yield(tc.sendToAndWait(tc.trackerId,"lively.shell.spawn",{command:td,env:ke,cwd:zc,stdin:Ec},{ackTimeout:3E4}),2);Pb=Rb.yieldResult;Qb=Pb.data;Tc=Qb.error;ld=Qb.pid;if(Tc)throw Ud.debug&&console.error("["+db+"] error at start: "+Tc),db.process={error:Tc},db.exitCode=1,Ud.signal(db,"error",Tc),Error(Tc);db.process={pid:ld};Ud.debug&&console.log("["+db+"] got pid "+ld);Ud.signal(db,"pid",ld);db._whenStarted.resolve();
return Rb.return(db)})};fe.prototype.writeToStdin=function(md){var db=this,Fb,tc,nc;return $jscomp.asyncExecutePromiseGeneratorProgram(function(td){if(!db.isRunning())return td.return();Fb=db;tc=Fb.l2lClient;nc=Fb.pid;return td.yield(tc.sendToAndWait(tc.trackerId,"lively.shell.writeToStdin",{pid:nc,stdin:String(md)}),0)})};fe.prototype.kill=function(md){md=void 0===md?"KILL":md;var db=this,Fb,tc,nc,td,ke,zc,Ec;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Pb){if(1==Pb.nextAddress){if(!db.isRunning())return Pb.return();
Ud.debug&&console.log(db+" signaling "+md);db.lastSignal=md;Fb=db;tc=Fb.pid;nc=Fb.l2lClient;return Pb.yield(nc.sendToAndWait(nc.trackerId,"lively.shell.kill",{pid:tc}),2)}td=Pb.yieldResult;ke=td.data;zc=ke.status;Ec=ke.error;Ud.debug&&console.log(db+" kill send: "+(Ec||zc));if(Ec)throw Error(Ec);return Pb.return(db.whenDone())})};fe.prototype.onOutput=function(md){var db=md.stdout;md=md.stderr;db&&(this._stdout+=db,Ud.signal(this,"stdout",db),this.emit("stdout",db));md&&(this._stderr+=md,Ud.signal(this,
"stderr",md),this.emit("stderr",md))};fe.prototype.onClose=function(md){Ud.arr.remove(this.constructor.commands,this);this.exitCode=md;this.emit("close",md);Ud.signal(this,"close",md);this._whenDone.resolve(this)};fe.prototype.onError=function(md){Ud.arr.remove(this.constructor.commands,this);this._stderr+=md.stack;this.exitCode=1;this.emit("error",md.stack);Ud.signal(this,"error",md.stack);this._whenDone.reject(md)};Da("default",fe);Ud.ClientCommand=fe;Ud.L2LServices={"lively.shell.onOutput":function(md,
db,Fb,tc){md=db.data;var nc=md.pid,td=md.stdout,ke=md.stderr,zc;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Ec){switch(Ec.nextAddress){case 1:return Ud.debug&&console.log("[lively.shell] client received lively.shell.onOutput for command "+nc),Ec.setCatchFinallyBlocks(2),Ec.yield(Ud.promise.waitFor(1E3,function(){return Ud.ClientCommand.findCommand(nc)}),4);case 4:zc=Ec.yieldResult;Ec.leaveTryBlock(3);break;case 2:return Ec.enterCatchBlock(),console.warn("[lively.shell] received output for command "+
nc+" but it isn't registered!'"),Ec.return();case 3:zc.onOutput({stdout:td,stderr:ke}),Ec.jumpToEnd()}})},"lively.shell.onExit":function(md,db,Fb,tc){md=db.data;var nc=md.pid,td=md.code,ke=md.error,zc;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Ec){switch(Ec.nextAddress){case 1:return Ud.debug&&console.log("[lively.shell] client received lively.shell.onExit for command "+nc),Ec.setCatchFinallyBlocks(2),Ec.yield(Ud.promise.waitFor(1E3,function(){return Ud.ClientCommand.findCommand(nc)}),
4);case 4:zc=Ec.yieldResult;Ec.leaveTryBlock(3);break;case 2:return Ec.enterCatchBlock(),console.warn("[lively.shell] received exit message for command "+nc+" but it isn't registered!'"),Ec.return();case 3:if(ke)"string"===typeof ke&&(ke=Error(ke)),zc.onError(ke);else zc.onClose(td);Ec.jumpToEnd()}})}};Ud.default=fe}}});