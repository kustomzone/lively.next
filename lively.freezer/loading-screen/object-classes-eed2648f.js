System.register(["./__root_module__-c4d7431e.js","kld-intersections"],function(ta){var nb,Bb,Vb,Qb,Dd,Ic,ud,Nc,Jc,Xc,id,Fd,nd,Yc,Ta;return{setters:[function(sb){nb=sb.s;Bb=sb.P;Vb=sb.a5;Qb=sb.p;Dd=sb.bE;Ic=sb.B;ud=sb.bF;Nc=sb.r;Jc=sb.aR;Xc=sb.bG;id=sb.bH;Fd=sb.bI;nd=sb.bJ;Yc=sb.bK;Ta=sb.n},function(){}],execute:function(){function sb(hc,kc,xb,yb){yb=void 0===yb?{}:yb;yb=yb.package||ac.ObjectPackage.lookupPackageForObject(hc,yb);if(!yb)throw Error("Object is not part of an object package: "+hc);
return yb.addScript(hc,kc,xb)}function dc(hc,kc){kc=ac.normalizeOptions(kc).System;hc=(hc=hc[Symbol.for("lively-module-meta")])?hc.package.name:null;return(kc=(hc?ac.lookupPackage(kc,hc):{}).pkg)?!!ac.ObjectPackage.forSystemPackage(kc):!1}ta({addScript:sb,isObjectClass:dc});var ac=lively.FreezerRuntime.recorderFor("lively.classes/object-classes.js");ac.normalizeOptions=function(hc){hc=Object.assign({baseURL:ac.defaultBaseURL,System:System},hc);hc.baseURL=hc.baseURL.replace(/\/$/,"");return hc};ac.addScript=
sb;ac.isObjectClass=dc;ac.string=nb;ac.Path=Bb;ac.arr=Vb;ac.parse=Qb;ac.isValidIdentifier=Dd;ac.stringify=Ic;ac.parseFunction=ud;ac.resource=Nc;ac.runEval=Jc;ac.scripting=Xc;ac.ExportLookup=id;var Vc=ac.scripting;ac.ensurePackage=Vc.ensurePackage;ac.registerPackage=Vc.registerPackage;ac.importPackage=Vc.importPackage;ac.lookupPackage=Vc.lookupPackage;ac.module=Vc.module;ac.ImportInjector=Vc.ImportInjector;ac.RuntimeSourceDescriptor=Fd;ac.toJsIdentifier=nd;ac.adoptObject=Yc;ac.classToFunctionTransform=
Ta;ac.objectPackageSym=Symbol.for("lively-object-package-data");ac.defaultBaseURL="local://lively-object-modules";ac.globalClasses=Object.keys(System.global).map(function(hc){hc=System.global[hc];return"function"===typeof hc&&hc.name&&hc}).filter(Boolean);ac.addScript=sb;ac.addScript=sb;ac.isObjectClass=dc;ac.isObjectClass=dc;ac._packageStore=ac._packageStore||{};Vc=function(hc,kc){this._id=hc;this.options=ac.normalizeOptions(kc)};Vc.lookupPackageForObject=function(hc,kc){return this.lookupPackageForClass(hc.constructor,
kc)};Vc.lookupPackageForClass=function(hc,kc){kc=ac.normalizeOptions(kc).System;hc=(hc=hc[Symbol.for("lively-module-meta")])?hc.package.name:null;return(kc=(hc?ac.lookupPackage(kc,hc):{}).pkg)?ac.ObjectPackage.forSystemPackage(kc):null};Vc.forSystemPackage=function(hc){return this.packageStore[hc.name]};Vc.withId=function(hc,kc){return this.packageStore[hc]||(this.packageStore[hc]=new this(hc,kc))};Vc.prototype.resource=function(hc){hc=void 0===hc?"":hc;return ac.resource(this.packageURL).join(hc)};
Vc.prototype.load=function(){return ac.importPackage(this.System,this.packageURL)};Vc.prototype.ensureExistance=function(){var hc=this,kc,xb,yb,wc,Kc,zb,ab,Kb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(nc){switch(nc.nextAddress){case 1:return kc=hc.resource("/"),nc.yield(kc.exists(),2);case 2:if(nc.yieldResult)return nc.return();xb=[{resource:kc}];yb=[{resource:hc.resource("package.json"),content:JSON.stringify(hc.config,null,2)}];return nc.yield(Promise.all(xb.map(function(da){return da.resource.mkdir()})),
3);case 3:return nc.yield(Promise.all(yb.map(function(da){var qa;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Va){switch(Va.nextAddress){case 1:return Va.yield(da.resource.exists(),2);case 2:if(!(qa=!Va.yieldResult)){Va.jumpTo(3);break}return Va.yield(da.resource.write(da.content),4);case 4:qa=Va.yieldResult;case 3:return Va.return(qa)}})})),4);case 4:return nc.yield(hc.objectModule.ensureExistance(),5);case 5:return wc=hc,Kc=wc.System,zb=wc.packageURL,ab=wc.config,nc.yield(ac.ensurePackage(Kc,
zb),6);case 6:return Kb=nc.yieldResult,Kb.registerWithConfig(ab),console.log(hc.packageURL+" REGISTERED"),nc.return(hc)}})};Vc.prototype.ensureObjectClass=function(hc){var kc=this;return $jscomp.asyncExecutePromiseGeneratorProgram(function(xb){return 1==xb.nextAddress?xb.yield(kc.ensureExistance(),2):xb.return(kc.objectModule.ensureObjectClass(hc))})};Vc.prototype.adoptObject=function(hc){var kc=this,xb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(yb){if(1==yb.nextAddress)return kc.objectClass===
hc.constructor?yb.return():yb.yield(kc.ensureObjectClass(hc.constructor),2);xb=yb.yieldResult;ac.adoptObject(hc,xb);yb.jumpToEnd()})};Vc.prototype.addScript=function(hc,kc,xb){return this.objectModule.addScript(hc,kc,xb)};Vc.prototype.remove=function(){this.systemPackage.remove();delete ac.ObjectPackage.packageStore[this.id];return this.resource().remove()};Vc.prototype.renameObjectClass=function(hc,kc){kc=void 0===kc?[]:kc;var xb=this,yb,wc,Kc,zb,ab,Kb,nc,da,qa,Va,cb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(kb){if(1==
kb.nextAddress){yb=xb;wc=yb.objectClass;Kc=yb.System;if(!wc||wc.className===hc)return kb.return(wc);if(!ac.isValidIdentifier(hc))throw Error(hc+" is not a valid name for a class");ab=zb=ac.RuntimeSourceDescriptor.for(wc,Kc);Kb=ab.source;nc=ab.ast;da=nc.id;qa=da.start;Va=da.end;return kb.yield(zb.changeSource(Kb.slice(0,qa)+hc+Kb.slice(Va)),2)}cb=xb.objectClass;kc.forEach(function(Ma){Ma.constructor=cb;Ma.__proto__=cb.prototype});return kb.return(cb)})};Vc.prototype.fork=function(hc,kc){var xb=this,
yb,wc,Kc,zb,ab,Kb,nc,da,qa,Va,cb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(kb){switch(kb.nextAddress){case 1:return yb=xb,wc=yb.System,Kc=yb.baseURL,zb=yb.objectClass,kc=Object.assign({System:wc,baseURL:Kc},kc),ab=ac.RuntimeSourceDescriptor.for(zb),Kb=ab._renamedSource(hc),nc=Kb.moduleSource,da=ac.ObjectPackage.withId(hc,kc),kb.yield(da.ensureExistance(),2);case 2:return qa=da,Va=qa.objectModule,cb=Va.systemModule,kb.yield(cb.load({format:"esm"}),3);case 3:return kb.yield(cb.changeSource(nc),
4);case 4:return kb.return(da)}})};$jscomp.global.Object.defineProperties(Vc.prototype,{id:{configurable:!0,enumerable:!0,get:function(){return this._id}},name:{configurable:!0,enumerable:!0,get:function(){return this.id}},System:{configurable:!0,enumerable:!0,get:function(){return this.options.System}},baseURL:{configurable:!0,enumerable:!0,get:function(){return this.options.baseURL}},packageURL:{configurable:!0,enumerable:!0,get:function(){return this.baseURL+("/"+this.id)}},config:{configurable:!0,
enumerable:!0,get:function(){return{name:this.name,version:"0.1.0",lively:{isObjectPackage:!0}}}},systemPackage:{configurable:!0,enumerable:!0,get:function(){return ac.lookupPackage(this.System,this.packageURL,!0).pkg}},objectModule:{configurable:!0,enumerable:!0,get:function(){return this._objectModule||(this._objectModule=new ac.ObjectModule("index.js",this))}},objectClass:{configurable:!0,enumerable:!0,get:function(){return this.objectModule.objectClass}}});$jscomp.global.Object.defineProperties(Vc,
{packageStore:{configurable:!0,enumerable:!0,get:function(){return this._packageStore||(this._packageStore=ac._packageStore)}}});ta("default",Vc);ac.ObjectPackage=Vc;var Hd=function(hc,kc){if(!hc)throw Error("ObjectModule needs package!");if(!kc)throw Error("ObjectModule needs package!");this._moduleName=hc;this._objectPackage=kc};Hd.prototype.read=function(){return this.resource.read()};Hd.prototype.write=function(hc){return this.resource.write(hc)};Hd.prototype.ensureExistance=function(){var hc=
this,kc,xb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(yb){switch(yb.nextAddress){case 1:return kc=hc.resource,yb.yield(kc.exists(),2);case 2:if(yb.yieldResult){yb.jumpTo(3);break}return yb.yield(kc.write("'format esm';\n"),4);case 4:xb={},hc.System.config({meta:(xb[hc.url]={format:"esm"},xb)});case 3:return yb.return(hc)}})};Hd.prototype.ensureObjectClass=function(hc){var kc=this,xb=this.objectClass;return xb&&xb.prototype.__proto__===hc.prototype?xb:Promise.resolve(this.ensureObjectClassSource(hc)).then(function(yb){var wc=
yb.source,Kc=yb.moduleId,zb=yb.className,ab=yb.bindings,Kb=kc.System;yb=ac.module(Kb,Kc);if(ab)for(var nc in ab)yb.define(nc,ab[nc]);wc=ac.runEval(wc,{classTransform:ac.classToFunctionTransform,sync:!0,targetModule:Kc,System:Kb});if(wc.isError)throw wc.value;wc=yb.recorder[zb];if(!wc)throw Error("Failed to define class "+zb+" in "+Kc);return wc})};Hd.prototype.ensureObjectClassSource=function(hc){return this.createDefaultClassDeclaration(hc)};Hd.prototype.createDefaultClassDeclaration=function(hc){hc=
void 0===hc?Object:hc;var kc=this,xb,yb,wc,Kc,zb,ab,Kb,nc,da,qa,Va,cb,kb,Ma,Oa,lb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Wb){switch(Wb.nextAddress){case 1:xb=kc;yb=xb.System;wc=xb.systemModule;Kc=xb.objectPackage;zb=ac.string.capitalize(ac.toJsIdentifier(Kc.id));ab=hc.className;Kb=!ab;nc=ac.globalClasses.includes(hc);da="";qa=null;if(Kb){ab="__anonymous_superclass__";Va={};qa=(Va[ab]=hc,Va);Wb.jumpTo(2);break}if(nc){Wb.jumpTo(2);break}return Wb.yield(ac.ExportLookup.findExportOfValue(hc,
yb),4);case 4:(cb=Wb.yieldResult)?(kb=ac.ImportInjector.run(yb,wc.id,wc.package(),"",cb),Ma=kb.standaloneImport,da+=Ma+"\n\n"):(Oa={},qa=(Oa[ab]=hc,Oa));case 2:return zb===ab&&(zb="Object"+zb),lb="Object"===ab?"class "+zb+" {}\n":"class "+zb+" extends "+ab+" {}\n",da+="export default "+lb+"\n",Wb.yield(wc.changeSource(da),5);case 5:return Wb.yield(wc.load(),6);case 6:return Wb.return({source:da,className:zb,moduleId:kc.url,bindings:qa})}})};Hd.prototype.addScript=function(hc,kc,xb){var yb=this,wc,
Kc,zb,ab,Kb,nc,da,qa,Va,cb,kb,Ma,Oa,lb,Wb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Nb){switch(Nb.nextAddress){case 1:if(hc.constructor===yb.objectClass){wc=hc.constructor;Nb.jumpTo(2);break}return Nb.yield(yb.ensureObjectClass(hc.constructor),3);case 3:wc=Nb.yieldResult;case 2:Kc=wc;zb="function"===typeof kc?String(kc):kc;ab=ac.parseFunction(zb);Kb=ac.RuntimeSourceDescriptor.for(Kc,yb.System);xb||(xb=ac.Path("id.name").get(ab));if(!xb)throw Error("No name, cannot add "+ac.string.truncate(zb,
30).replace(/\n/g,"")+"!");nc=ac.toJsIdentifier(xb);console.assert("FunctionExpression"===ab.type||"ArrowFunctionExpression"===ab.type,"not a function expression but: "+ab.type);da=ab.params.map(function(rc){return zb.slice(rc.start,rc.end)});qa="BlockStatement"===ab.body.type?zb.slice(ab.body.start,ab.body.end):"{ return "+zb.slice(ab.body.start,ab.body.end)+" }";Va=nc+"("+da.join(",")+") "+qa;"ArrowFunctionExpression"===ab.type&&(ab.type="FunctionExpression");cb=Kb.source;kb=Kb.ast;if(!kb)throw Error("cannot find class decl of "+
Kb.module.id);(Ma=kb.body.body.find(function(rc){return rc.key.name===nc&&!rc.static}))?cb=cb.slice(0,Ma.start)+Va+cb.slice(Ma.end):(Oa=cb.lastIndexOf("}"),lb=cb.slice(0,Oa),Wb=cb.slice(Oa),/\n\s*$/m.test(lb)||(lb+="\n"),Va=ac.string.changeIndent(Va,"  ",1),/^[ ]*\n/m.test(Wb)||(Wb="\n"+Wb),cb=lb+Va+Wb);return Nb.yield(Kb.changeSource(cb),4);case 4:return Nb.return({script:Kc.prototype[nc],klass:Kc,module:Kb.module.id,methodName:nc})}})};$jscomp.global.Object.defineProperties(Hd.prototype,{objectPackage:{configurable:!0,
enumerable:!0,get:function(){return this._objectPackage}},objectClass:{configurable:!0,enumerable:!0,get:function(){var hc=this.systemModule;return hc.isLoaded()?hc.System.get(hc.id).default:null}},moduleName:{configurable:!0,enumerable:!0,get:function(){return this._moduleName}},systemModule:{configurable:!0,enumerable:!0,get:function(){return ac.module(this.System,this.url)}},System:{configurable:!0,enumerable:!0,get:function(){return this.objectPackage.System}},resource:{configurable:!0,enumerable:!0,
get:function(){return this.objectPackage.resource(this.moduleName)}},url:{configurable:!0,enumerable:!0,get:function(){return this.resource.url}}});ac.ObjectModule=Hd;ac.default=Vc}}});