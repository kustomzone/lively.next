import { fun, arr, obj, string } from 'lively.lang';
import { pt, Color, Rectangle } from "lively.graphics";
import { config, Text, show } from '../index.js';
import { FilterableList, List } from "lively.morphic/components/list.js";
import Window from "lively.morphic/components/window.js";
import { LabeledCheckBox } from "lively.morphic/components/widgets.js";
import LoadingIndicator from "lively.morphic/components/loading-indicator.js";
import Browser from "./js/browser/index.js";
import { connect } from 'lively.bindings';


export async function doSearch(
  livelySystem, searchTerm,
  excludedModules = [/systemjs-plugin-babel/],
  excludedPackages = [],
  includeUnloaded = true
) {
  if (searchTerm.length <= 2) { return []; }

  var searchResult = await livelySystem.searchInAllPackages(
                        searchTerm, {excludedModules, excludedPackages, includeUnloaded});

  var [errors, found] = arr.partition(searchResult, ({isError}) => isError)

  if (errors.length) {
    show(`Errors in search results:\n${arr.pluck(errors, "value").join("\n")}`);
  }

  return found.reduce((result, ea) => {
    var nameAndLine = `${ea.packageName}/${ea.pathInPackage}:${ea.line}`;
    result.maxModuleNameLength = Math.max(result.maxModuleNameLength, nameAndLine.length);
    result.items.push({
      isListItem: true,
      value: ea,
      get string() {
        return nameAndLine
             + string.pad(ea.lineString, result.maxModuleNameLength - nameAndLine.length, true);
      }
    });
    return result;
  }, {items: [], maxModuleNameLength: 0}).items;

}


export class CodeSearcher extends FilterableList {

  static inWindow(props = {title: "code search", targetBrowser: null, backend: null}) {
    var searcher = new this(props),
        win = new Window({
          ...obj.dissoc(props, ["targetBrowser", "backend"]),
          extent: searcher.extent.addXY(0, 25),
          targetMorph: searcher
        });
    connect(win, 'windowActivated', searcher, 'onWindowActivated');
    return win;
  }

  static get properties() {
    return {

      fill:       {defaultValue: Color.white},
      extent:     {defaultValue: pt(800,500)},
      fontFamily: {defaultValue: "Inconsolata, monospace"},
      fontSize:   {defaultValue: 14},
      historyId:  {defaultValue: "lively.morphic-code searcher"},

      submorphs: {
        initialize() {
          this.submorphs = [
            Text.makeInputLine({
              name: "input",
              padding: Rectangle.inset(10, 10),
              borderBottom: {width: 1, color: Color.gray}
            }),
            new List({
              name: "list",
              items: [],
              clipMode: "auto",
              borderTop: {width: 1, color: Color.gray}
            })
          ]
        }
      },

      browser: {
        set(browser) {
          this.setProperty("browser", browser ? browser.id : null);
        },
        get() {
          var w = this.world(), id = this.getProperty("browser");
          return !w || !id ? null : w.getMorphWithId(id);
        }
      },

      backend: {
        after: ["browser"], derived: true,
        defaultValue: "local",
        get() {
          var browser = this.browser;
          return browser ? browser.backend : this.getProperty("backend");
        },

        set(backend) {
          var browser = this.browser;
          if (browser) browser.backend = backend;
          else this.setProperty("backend", backend);
        }

      },

      searchInUnloadedModulesCheckbox: {
        after: ["submorphs"], dderived: true,
        get() {
          return this.getSubmorphNamed("searchInUnloadedModulesCheckbox") ||
            this.addMorph(new LabeledCheckBox({
                  checked: false,
                  name: "searchInUnloadedModulesCheckbox",
                  label: "search in unloaded modules"}))
        }
      },

      currentSearchTerm: {defaultValue: ""},
      currentFilters: {defaultValue: ""},

    }
  }

  constructor(props = {}) {
    if (props.targetBrowser) props.browser = props.targetBrowser;
    super(props);
    connect(this, "accepted", this, "openBrowserForSelection");
    connect(this.searchInUnloadedModulesCheckbox, "checked", this, "searchAgain");
  }

  relayout() {
    super.relayout();
    var input = this.getSubmorphNamed("input"),
        cb = this.getSubmorphNamed("searchInUnloadedModulesCheckbox");
    cb && (cb.rightCenter = input.rightCenter);
  }

  async getLivelySystem() {
    var backend = this.backend,
        remote = backend && backend !== "local" ? backend : null,
        systemInterface = await System.import("lively-system-interface");
    return remote ?
      systemInterface.serverInterfaceFor(remote) :
      systemInterface.localInterface; // FIXME
  }

  ensureIndicator(label) {
    if (!this.progressIndicator) {
      this.progressIndicator = this.addMorph(LoadingIndicator.open());
      this.progressIndicator.center = this.center;
    }
    this.progressIndicator.label = label;
  }

  removeIndicator() {
    if (this.progressIndicator) this.progressIndicator.remove();
    this.progressIndicator = null;
  }

  updateFilter() {
    var searchInput = this.get('input').textString;
    if (searchInput.length <= 2) return;

    this.ensureIndicator("input...");

    fun.debounceNamed(this.id + "updateFilterDebounced", 1200, async (needle) => {
      this.removeIndicator();
      try { await this.searchAndUpdate(needle); }
      catch(err) { this.world().logError(err); }
    })(searchInput);
  }

  searchAgain() {
    var needle = this.currentSearchTerm;
    if (needle <= 2) return;
    this.getSubmorphNamed("list").items = [];
    this.currentSearchTerm = "";
    this.searchAndUpdate(needle);
  }

  async searchAndUpdate(searchInput) {
    this.get("input").acceptInput(); // for history
    var filterTokens = searchInput.split(/\s+/).filter(ea => !!ea);

    var win = this.getWindow();
    if (win && win.targetMorph === this)
      win.title = `${win.title.split("-")[0].trim()} - ${filterTokens.join(" + ")}`;

    var searchTerm = filterTokens.shift(),
        newSearch = searchTerm != this.currentSearchTerm;
    if (newSearch) {
      this.currentSearchTerm = searchTerm;
      var includeUnloaded = this.getSubmorphNamed("searchInUnloadedModulesCheckbox").checked;
      this.ensureIndicator("searching...")
      this.items = await doSearch(
        await this.getLivelySystem(),
        searchTerm,
        undefined, /*excluded modules*/
        config.ide.js.ignoredPackages,
        includeUnloaded);
      this.removeIndicator();
      this.progressIndicator = null;
    }

    filterTokens = filterTokens.map(ea => ea.toLowerCase());
    if (newSearch || this.currentFilters !== filterTokens.join("+")) {
      this.currentFilters = filterTokens.join("+");
      var filteredItems = this.items.filter(item =>
        filterTokens.every(token => item.string.toLowerCase().includes(token)))
      this.get('list').items = filteredItems;
    }
  }

  async openBrowserForSelection() {
    if (!this.selection) return;
    var {browser, selection: {column, line, packageName, pathInPackage}} = this,
        browserOrProps = browser,
        browseSpec = {
          packageName, moduleName: pathInPackage,
          textPosition: {column, row: line-1}
        },
        browser = await Browser.browse(
          browseSpec, browserOrProps,
          browser? browser.backend : this.backend);
    browser.associatedSearchPanel = this;
    return browser.activate();
  }

  onWindowActivated() {
    this.get("input").selectAll();
  }

  get commands() {
    return super.commands.concat([
      {
        name: "toggle search in unloaded modules",
        exec: () => { this.get("searchInUnloadedModulesCheckbox").trigger(); return true; }
      }
    ]);
  }

  get keybindings() {
    return [
      {keys: "Alt-L", command: "toggle search in unloaded modules"}
    ].concat(super.keybindings);
  }

}
