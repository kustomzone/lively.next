/*global System*/
import { resource, createFiles } from 'lively.resources';
import { requiredModulesOfSnapshot, removeUnreachableObjects, serialize } from "lively.serializer2";
import { serializeMorph, findRequiredPackagesOfSnapshot, 
        loadPackagesAndModulesOfSnapshot, deserializeMorph } from "lively.morphic/serialization.js";
import { arr, obj } from "lively.lang";
import { module } from "lively.modules/index.js";
import Bundle from "./bundle.js";
import FreezerPackage from "./package.js";
import { loadPart, SnapshotEditor, loadObjectFromPartsbinFolder } from "lively.morphic/partsbin.js";
import { runEval } from "lively.vm";
import { callService, ProgressMonitor } from "lively.ide/service-worker.js";
import { LoadingIndicator } from "lively.components";
import { allPlugins, LeakDetectorPlugin, plugins } from "lively.serializer2/plugins.js";
import { config, MorphicDB } from "lively.morphic";
import { SnapshotInspector } from "lively.serializer2/debugging.js";
import { parse, BaseVisitor } from "lively.ast";
import { AllNodesVisitor } from "lively.ast/lib/visitors.js";
import { moduleOfId, isReference } from "lively.serializer2/snapshot-navigation.js";
import { classNameOfId } from "lively.serializer2/snapshot-navigation.js";
import { referencesOfId } from "lively.serializer2/snapshot-navigation.js";
import { asyncAwaitTranspilation } from "./module.js";

export async function interactivelyFreezePart(part, opts) {
  var li = LoadingIndicator.open("Freezing target...", {center: $world.visibleBounds().center()}),
      leakDetector = new LeakDetectorPlugin(),
      snap = serialize(part, {plugins: [...allPlugins, leakDetector]}); // do not serialize ad hoc, fetch from db
  if (opts.checkForLeaks && leakDetector.memoryLeaks) {
    // We discovered that the follwing objects are solely referenced via attribute connections
    // and nowhere else in the part. In most cases this is a strong indication for unintended
    // references to morphs, which leads to an unnessecary bloat of the serialized part.
    // Would you like to remove these connections alongside the referenced morphs?
    var connectsToDisconnect;
    li.remove();
    while (leakDetector.memoryLeaks && !(connectsToDisconnect && connectsToDisconnect.length == 0)) {
      connectsToDisconnect = (await $world.editListPrompt(
       ["Possible Memory Leaks Detected:",  {fontWeight: 'bold'}," Disconnect objects? "], 
        leakDetector.memoryLeaks.map(leak => ({
          string: leak.conn.toString(), value: leak, isListItem: true
        })))).selections;
      arr.invoke(connectsToDisconnect.map(c => c.conn), 'disconnect');
      snap = serialize(part, {plugins: [...allPlugins, leakDetector = new LeakDetectorPlugin()]}); 
    }
    li.openInWorld();
  }
  let progressMonitor = new ProgressMonitor({
       handlers: [(stepName, progress) => {
         li.label = stepName;
         li.progress = progress;
       }]
      }),
      args = {
        snapshot: JSON.stringify(snap),
        progress: progressMonitor
      },
      {file, warnings} = config.ide.workerEnabled ? 
                  await callService('freezeSnapshot', args) : 
                  await freezeSnapshot(args, opts);
  if (warnings.absoluteURLDetected) {
    // We discovered that the following morphs reference resources via an absolute path.
    // This can be problematic when the frozen part will be deployed on a different host
    // where the resource URL may look different. We advise you to replace these references by
    // relative paths. Also keep in mind that these files are not part of the generated bundle.
  }
  if (warnings.resolvedLoads) {
      // The part you are trying to freeze contains code that dynamically loads
      // other parts at runtime. Do you want these to be included into the frozen bundle as well?
      // Note: Including the remaining parts state will increase the total bundle size by X MB.
      // [list for selective inclustion/exclusion of referenced parts]
  }
  if (warnings.unresolvedLoads) {
    // The part you are trying to freeze contains dynamic loads of other objects at runtime, which
    // can not be resolved by static analysis.
    // [show source code locations of questionable loads]
    // Be advised that this code will likely fail in the frozen version of your part if the refernced parts
    // are not included into the bundle. If you know beforehand which parts are going to be loaded,
    // you can add them to the list here to incorporate them into the frozen part bundle.
  }
  li.remove();
  return file;
}

export async function freezeSnapshot({snapshot, progress}, opts) {
  // remove the metadata props
  const snap = JSON.parse(snapshot);
  const deletedIds = [];
  obj.values(snap.snapshot).forEach(m => delete m.props.metadata);
  // remove objects that are part of the lively.ide or lively.halo package (dev tools)
  for (let id in snap.snapshot) {
     delete snap.snapshot[id].props.metadata;
     delete snap.snapshot[id]._cachedLineCharBounds;
     let module = moduleOfId(snap.snapshot, id);
     if (!module.package) continue;
     if (['lively.ide', 'PartsBinBrowser', 'lively.halo'].includes(module.package.name)) {
       // fixme: we also need to kill of packages which themselves require one of the "taboo" packages
       delete snap.snapshot[id];
       deletedIds.push(id);
       continue;
     }
     // transform sources for attribute connections
     if (classNameOfId(snap.snapshot, id) === 'AttributeConnection') {
        let props = snap.snapshot[id].props;
        if (props.converterString) {
           props.converterString.value = asyncAwaitTranspilation(props.converterString.value); 
        }
        if (props.updaterString) {
           props.updaterString.value = asyncAwaitTranspilation(props.updaterString.value);
        }
     }    
  }

  console.log("Deleted objects:", deletedIds);
  // remove all windows that are emptied due to the clearance process
  for (let id in snap.snapshot) {
     let className = classNameOfId(snap.snapshot, id);
     if ( arr.intersect(referencesOfId(snap.snapshot, id), deletedIds).length > 0) {
         if (className === 'Window') {
           delete snap.snapshot[id];
           continue;
         }
         for (let { key, value: v } of Object.values(snap.snapshot[id].props)) {
           if (isReference(v) && deletedIds.includes(v.id)) {
             delete snap.snapshot[id].props[key];
           }
           if (arr.isArray(v)) { 
             // also remove references that are stuck inside array values
             snap.snapshot[id].props[key].value = v.filter(v => !(isReference(v) && deletedIds.includes(v.id)));
           }
         }   
     }
  }
  removeUnreachableObjects([snap.id], snap.snapshot);
  SnapshotInspector.forSnapshot(snap).openSummary();
  let res = await (await FreezerPart.fromSnapshot(snap, opts)).standalone({
      progress, includeRuntime: opts.includeRuntime
  });
  return res;
}

export class FreezerPart {

  static async fromSnapshot(snap, opts) {
    return await new this().freezeSnapshot(snap, opts);
  }

  static async fromMorph(morph) {
    return this.fromSnapshot(serializeMorph(morph));
  }

  static async fromPath(path) {
    return this.fromMorph(deserializeMorph(await resource(path).read()))
  }

  static async fromPart(nameOrCommit, options = {}) {
    return this.fromMorph(await loadPart(nameOrCommit, options));
  }

  get runtimeGlobal() {
    return 'lively.FreezerRuntime';
  }

  async getRequiredModulesFromSnapshot(snap, name, includeDynamicParts=false) {
    var imports = requiredModulesOfSnapshot(snap), // do this after the replacement of calls
        dynamicPartImports = [];

    let { packages: additionalImports } = await findRequiredPackagesOfSnapshot(snap);
    Object.keys(additionalImports['local://lively-object-modules/'] || {}).forEach(packageName => {
      let filename = `${packageName}/index.js`;
      if (!imports.includes(filename)) {
        imports.push(filename);
      }
    });
    
    for (let m of imports) {
       const partModuleSource = (await lively.modules.module(m).source()),
             parsedModuleSource = parse(partModuleSource),
             dynamicPartLoads = [];
       let callSite;
       AllNodesVisitor.run(parsedModuleSource, (node, path) => {
         if (node.type == 'CallExpression' && node.callee.name == 'loadObjectFromPartsbinFolder') {
            dynamicPartLoads.push(node.arguments[0].value);
         }
       }); 
         // try to resolve them
       for (let partName of dynamicPartLoads) {
         let dynamicPart = await MorphicDB.default.fetchSnapshot('part', partName);
         if (dynamicPart) {             
           this.dynamicParts[partName] = dynamicPart;
           if (includeDynamicParts) {
             // load the packages of the part, if they are not loaded
             await loadPackagesAndModulesOfSnapshot(dynamicPart);
             dynamicPartImports.push(...(await this.getRequiredModulesFromSnapshot(dynamicPart, partName)));
           } else {
             let resolved;
             if (resolved = this.warnings.resolvedLoads) {
               resolved.add(partName);
             } else {
               this.warnings.resolvedLoads = new Set([partName]);
             }
           }
         }
       }
    }
    return arr.uniq([...imports, ...dynamicPartImports])
  }

  async computePackageMapForSnapshotAndImports(snap, imports, name) {
    let corePackages = ['lively.lang', 'lively.modules', 'lively.components', 'bowser',
                        'lively.serializer2', 'lively.ast', 'lively.vm', 'lively.storage',
                        'lively.resources', 'lively.bindings', 'lively.notifications', 
                        'lively.graphics', 'lively.classes', 'lively.source-transform', 'lively.morphic'],
        globalpackages = {"lively.lang": "lively.lang",
                         "lively.modules": "lively.modules",
                         "lively.ast": 'lively.ast',
                         "lively.vm": "lively.vm",
                         "lively.serializer2": "lively.serializer2",
                         "lively.graphics": "lively.graphics",
                         "lively.resources": "lively.resources",
                         "lively.notifications": "lively.notifications",
                         "lively.bindings": "lively.bindings",
                         "lively.classes": "lively.classes",
                         "lively.storage": 'lively.storage',
                         "lively.source-transform": "lively.sourceTransform",
                         "lively.morphic": "lively.morphic",
                         "bowser": "bowser"},
        localDir = resource("local://frozen-parts/"), // is this really nessecary ..?
        // the problem is, that deserialization bypasses the module bounds and accesses the recorder.
        // we need to check at compile time, for which module the deserialization assumes a properly initialized
        // recorder, or we will have some unexpected crashes at runtime, when the freezer runtime will
        // attempt to replace some of the submodules by the standalone package.
        root = arr.uniq(imports.map(path => `import "${path}"`)).join('\n')
                    + `\nimport { World, MorphicEnv } from "lively.morphic";
                       import { deserialize } from 'lively.serializer2';
                       import { resource } from 'lively.resources';
                       import { promise } from 'lively.lang';
                       import {pt} from "lively.graphics";
                       if (!MorphicEnv.default().world) {
                          let world = window.$world = window.$$world = new World({
                            name: "world", extent: pt(window.innerWidth, window.innerHeight)
                          });
                          MorphicEnv.default().setWorldRenderedOn(world, document.body, window.prerenderNode);
                       }
                       export async function renderFrozenPart() {
                          window.$world.dontRecordChangesWhile(() => {
                            let obj = deserialize(window.lively.partData["${name}"], {
                               reinitializeIds: function(id) { return id }
                            });
                            if (obj.isWorld) {
                              MorphicEnv.default().setWorldRenderedOn(obj, document.body, window.prerenderNode);
                            } else {
                              window.onresize = () => obj.execCommand('resize on client');
                              obj.execCommand('resize on client');
                              obj.openInWorld();
                            }
                          });
                       }`;

    await createFiles(localDir, {
      [name]: {
        "package.json": `{"name": "${name}", "version": "${snap.requiredVersion}"}`,
        "index.js": root
      }
    });

    let packages = {
      [name]: {path: localDir.join(name + "/").url} // custom root package
    };

    var modPath, pkg;
    
    for (modPath of [...imports, ...corePackages]) {
      pkg = module(modPath).package();
      if (pkg) packages[pkg.name] = {path: pkg.url, standaloneGlobal: globalpackages[pkg.name] || false };
    }

    return await FreezerPackage.buildPackageMap(packages)
  }

  async freezeSnapshot(snap, {includeDynamicParts = false} = {}) {
    this.warnings = {};
    this.dynamicParts = {};
    let frozenPartPackageName = "frozen-" + snap.snapshot[snap.id]["lively.serializer-class-info"].className,
        imports = await this.getRequiredModulesFromSnapshot(snap, frozenPartPackageName, includeDynamicParts),
        packageMap = await this.computePackageMapForSnapshotAndImports(snap, imports, frozenPartPackageName);
    this.entryModule = frozenPartPackageName;
    this.bundle = new Bundle(packageMap);
    this.partData = {
      [frozenPartPackageName]: {...snap, packages: {}}
    };
    return this;
  }

  async standalone(opts = {}) {
    let runtime = '',
        body = await this.bundle.standalone({
      livelyTranspilation: false,
      clearExcludedModules: true,
      isExecutable: true,
      entryModule: this.entryModule + '/index.js',
      ...opts
    });

    // body = body.replace(/__lvVarRecorder\.loadObjectFromPartsbinFolder\(\S*\)/g, (load) => {
    //   return 'lively.FreezerRuntime' + load.replace('__lvVarRecorder', '');
    // });

    if (opts.includeRuntime) {
      runtime = await resource(System.baseURL + 'lively.freezer/runtime-deps.js').read();
    }

    return {
     dynamicParts: this.dynamicParts,
     warnings: this.warnings,
     file: runtime +
           `\nlively.partData = ${ JSON.stringify(this.partData) };\n\n` +
           body + 
           `${this.runtimeGlobal}.get(${this.runtimeGlobal}.decanonicalize("${this.entryModule + '/index.js'}")).exports.renderFrozenPart();`
    }
  }
}