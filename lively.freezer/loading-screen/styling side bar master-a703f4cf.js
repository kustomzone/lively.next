System.register("./__root_module__-c4d7431e.js kld-intersections ./index-ad3a1066.js ./index-6f8f5c35.js ./index-f069e892.js ./color-picker-f735ea68.js ./index-49569153.js".split(" "),function(){var ta,nb,Bb,Vb,Qb,Dd,Ic,ud,Nc,Jc,Xc,id,Fd,nd,Yc,Ta,sb,dc,ac,Vc,Hd,hc;return{setters:[function(kc){ta=kc.ah;nb=kc.az;Bb=kc.am;Vb=kc.an;Qb=kc.au;Dd=kc.a2;Ic=kc.C;ud=kc.as;Nc=kc.ap;Jc=kc.bo;Xc=kc.ar;id=kc.a6;Fd=kc.s;nd=kc.bT;Yc=kc.at;Ta=kc.aq;sb=kc.r;dc=kc.a5;ac=kc.P;Vc=kc.bV;Hd=kc.bW},function(){},function(){},
function(){},function(){},function(kc){hc=kc.S},function(){}],execute:function(){var kc=lively.FreezerRuntime.recorderFor("StylingSideBar/index.js");kc.Morph=ta;kc.touchInputDevice=nb;kc.morph=Bb;kc.Icon=Vb;kc.easings=Qb;kc.pt=Dd;kc.Color=Ic;kc.fun=ud;kc.connect=Nc;kc.TreeData=Jc;var xb=function(ab){var Kb=lively.FreezerRuntime.recorderFor("StylingSideBar/index.js"),nc=Kb.hasOwnProperty("SettingsTree")&&"function"===typeof Kb.SettingsTree?Kb.SettingsTree:Kb.SettingsTree=function(da){da&&da[Symbol.for("lively-instance-restorer")]||
this[Symbol.for("lively-instance-initialize")].apply(this,arguments)};return Xc(nc,ab,[{key:"display",value:function(da){return da.panel?[da.panel,{}]:da.name}},{key:"collapse",value:function(da,qa){da.isCollapsed=qa}},{key:"isCollapsed",value:function(da){return da.isCollapsed}},{key:"isLeaf",value:function(da){return!da.children}},{key:"getChildren",value:function(da){return da.children}}],[{key:"className",get:function(){return"SettingsTree"}},{key:"default",value:function(){return new this({isCollapsed:!1,
children:[{isCollapsed:!0,name:[" ",{}].concat($jscomp.arrayFromIterable(kc.Icon.textAttribute("font")),[" Rich Text",{fontWeight:"bold"}]),children:[{panel:kc.morph({})}]},{isCollapsed:!1,name:[" ",{}].concat($jscomp.arrayFromIterable(kc.Icon.textAttribute("image")),[" Shape",{fontWeight:"bold"}]),children:[{panel:kc.morph({})}]},{isCollapsed:!1,name:[" ",{}].concat($jscomp.arrayFromIterable(kc.Icon.textAttribute("border-style")),[" Border",{paddingLeft:"2px",fontWeight:"bold"}]),children:[{panel:kc.morph({})}]},
{isCollapsed:!1,name:[" ",{}].concat($jscomp.arrayFromIterable(kc.Icon.textAttribute("grip-vertical")),[" Layout",{paddingLeft:"4px",fontWeight:"bold"}]),children:[{panel:kc.morph({})}]}]})}},{key:"border",value:function(){return new this({isCollapsed:!1,children:[{isCollapsed:!0,name:[" Type    ",{},kc.morph({height:20}),{}],children:[{panel:kc.morph({})}]},{isCollapsed:!1,name:[" Color   ",{},kc.morph({height:20}),{}],children:[{panel:kc.morph({})}]},{isCollapsed:!1,name:[" Width  ",{},kc.morph({height:20}),
{}],children:[{panel:kc.morph({})}]},{isCollapsed:!1,name:[" Radius ",{},kc.morph({height:20}),{}],children:[{panel:kc.morph({})}]}]})}}],Kb,{pathInPackage:function(){return"index.js"},unsubscribeFromToplevelDefinitionChanges:function(){return function(){}},subscribeToToplevelDefinitionChanges:function(){return function(){}},package:function(){return{name:"StylingSideBar",version:"0.1.1-56"}}},{start:284,end:2453})}(kc.TreeData);kc.SettingsTree=xb;kc.SettingsTree=xb;kc.SettingsTree=xb;xb=function(ab){var Kb=
lively.FreezerRuntime.recorderFor("StylingSideBar/index.js"),nc=Kb.hasOwnProperty("StylingSideBar")&&"function"===typeof Kb.StylingSideBar?Kb.StylingSideBar:Kb.StylingSideBar=function(da){da&&da[Symbol.for("lively-instance-restorer")]||this[Symbol.for("lively-instance-initialize")].apply(this,arguments)};return Xc(nc,ab,[{key:"onWorldResize",value:function(da){da=void 0===da?!0:da;if(this.respondsToVisibleWindow){var qa=$world.visibleBounds(),Va=navigator.standalone&&kc.touchInputDevice?25:0,cb=this.getSubmorphNamed("horizontal resizer");
this.height=qa.height-Va;this.top=Va+qa.top();cb.height=this.height;cb.left=0;cb.top=0;da&&(this.visible?this.topRight=qa.topRight():this.topLeft=qa.topRight())}}},{key:"toggle",value:function(da){var qa=this,Va,cb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(kb){switch(kb.nextAddress){case 1:Va=$world.visibleBounds();cb=navigator.standalone&&kc.touchInputDevice?25:0;qa.height=Va.height-cb;qa.top=cb+Va.top();if(da)return $world.addMorph(qa,$world.get("lively top bar")),qa.left=Va.width,
qa.visible=!0,kb.yield(qa.whenRendered(),5);qa.detachFromWorld($world);return kb.yield(qa.animate({opacity:0,left:Va.width,duration:300}),4);case 4:qa.visible=!1;qa.remove();kb.jumpTo(0);break;case 5:return qa.onWorldResize(!1),kb.yield(qa.animate({opacity:1,easing:kc.easings.outCirc,right:Va.width,duration:300}),6);case 6:qa.attachToWorld($world),kb.jumpToEnd()}})}},{key:"cleanupAnchors",value:function(){for(var da=this.withAllSubmorphsSelect(function(kb){return kb.anchors&&kb.anchors.filter(function(Ma){return!Ma.id}).length}),
qa={},Va=$jscomp.makeIterator(da),cb=Va.next();!cb.done;qa={$jscomp$loop$prop$m$2289:qa.$jscomp$loop$prop$m$2289},cb=Va.next())qa.$jscomp$loop$prop$m$2289=cb.value,qa.$jscomp$loop$prop$m$2289.anchors.forEach(function(kb){return function(Ma){return!Ma.id&&kb.$jscomp$loop$prop$m$2289.removeAnchor(Ma)}}(qa));return da.length}},{key:"attachToWorld",value:function(da){kc.connect(da,"showHaloFor",this,"focusMorph",{garbageCollect:!0})}},{key:"detachFromWorld",value:function(da){var qa=this;da.attributeConnections.forEach(function(Va){Va.targetObj===
qa&&Va.disconnect()})}},{key:"focusMorph",value:function(da){da.isMorph&&da.ownerChain().includes(this)||((da.isLabel||da.isText||da.isButton)&&this.richTextControl.focusOn(da,!1),Object.values(this.controls).forEach(function(qa){return qa&&qa.focusOn(da)}))}},{key:"onHierarchyChange",value:function(){Object.values(this.controls).forEach(function(da){return da&&da.update()})}}],[{key:"className",get:function(){return"StylingSideBar"}},{key:"properties",get:function(){return{controls:{},richTextControl:{},
isHaloItem:{get:function(){return!0}}}}}],Kb,{pathInPackage:function(){return"index.js"},unsubscribeFromToplevelDefinitionChanges:function(){return function(){}},subscribeToToplevelDefinitionChanges:function(){return function(){}},package:function(){return{name:"StylingSideBar",version:"0.1.1-56"}}},{start:2470,end:5120})}(kc.Morph);xb=kc.StylingSideBar;kc.default=xb;var yb=lively.FreezerRuntime.recorderFor("ShapeFormatStyler/index.js");yb.Morph=ta;yb.obj=id;yb.string=Fd;yb.connect=Nc;yb.noUpdate=
nd;yb.once=Yc;xb=function(ab){var Kb=lively.FreezerRuntime.recorderFor("ShapeFormatStyler/index.js"),nc=Kb.hasOwnProperty("ShapeFormatStyler")&&"function"===typeof Kb.ShapeFormatStyler?Kb.ShapeFormatStyler:Kb.ShapeFormatStyler=function(da){da&&da[Symbol.for("lively-instance-restorer")]||this[Symbol.for("lively-instance-initialize")].apply(this,arguments)};return Xc(nc,ab,[{key:Symbol.for("lively-instance-initialize"),value:function(da){Xc._get(Object.getPrototypeOf(nc.prototype),Symbol.for("lively-instance-initialize"),
this).call(this,da);0<this.submorphs.length&&this.setupConnections()}},{key:"setupConnections",value:function(){for(var da=this.ui,qa={},Va=$jscomp.makeIterator(Object.entries(this.uiSpec)),cb=Va.next();!cb.done;qa={$jscomp$loop$prop$control$2291:qa.$jscomp$loop$prop$control$2291,$jscomp$loop$prop$prop$2292:qa.$jscomp$loop$prop$prop$2292},cb=Va.next()){var kb=$jscomp.makeIterator(cb.value);cb=kb.next().value;kb=$jscomp.makeIterator(kb.next().value);kb.next();var Ma=kb.next().value;qa.$jscomp$loop$prop$prop$2292=
kb.next().value;qa.$jscomp$loop$prop$control$2291=da[cb];yb.connect(qa.$jscomp$loop$prop$control$2291,Ma,this,"updateTarget",{updater:function(Oa){return function(lb,Wb){Oa.$jscomp$loop$prop$control$2291._updating=!0;lb(Oa.$jscomp$loop$prop$prop$2292,Wb);Oa.$jscomp$loop$prop$control$2291._updating=!1}}(qa),varMapping:{prop:qa.$jscomp$loop$prop$prop$2292,control:qa.$jscomp$loop$prop$control$2291}})}}},{key:"update",value:function(){var da=this,qa=this.target,Va=qa.clipMode,cb=qa.fill,kb=qa.dropShadow,
Ma=qa.opacity,Oa=qa.height,lb=qa.width;qa=this.ui;var Wb=qa.clipModeSelector,Nb=qa.fillPicker,rc=qa.opacityField,xc=qa.shadowPicker,I=qa.heightField,T=qa.widthField;yb.noUpdate(function(){da.updateControl(xc,"shadowValue",kb);da.updateControl(Wb,"selection",Va);da.updateControl(Nb,"colorValue",cb);da.updateControl(rc,"number",Ma);da.updateControl(I,"number",Oa);da.updateControl(T,"number",lb)})}},{key:"updateTarget",value:function(da,qa){this.target[da]=qa;this.update()}},{key:"updateControl",value:function(da,
qa,Va){da._updating||yb.obj.equals(da[qa],Va)||(da[qa]=Va)}},{key:"updateMultiValue",value:function(da,qa,Va){var cb=this.ui,kb=cb[this.join(da)],Ma=kb.get("multi value indicator"),Oa=yb.obj.values(qa).some(function(lb){return!yb.obj.isFunction(lb)&&!yb.obj.equals(lb,qa.valueOf())});Ma.left=0;kb.visible=kb.isLayoutable=!Oa;if(Oa&&Ma.visible!=Oa)yb.once(Ma,"onMouseDown",kb,Va,{converter:function(){return qa.valueOf()},varMapping:{value:qa}});Ma.visible=Ma.isLayoutable=Oa;Ma.left=Oa?200:0;this.updateControl(kb,
Va,qa.valueOf());kb=$jscomp.makeIterator(["top","left","bottom","right"]);for(Ma=kb.next();!Ma.done;Ma=kb.next())Ma=Ma.value,Oa=cb[this.join(da,Ma)],this.updateControl(Oa,Va,qa[Ma])}},{key:"lower",value:function(da){return da.charAt(0).toLowerCase()+da.slice(1)}},{key:"join",value:function(da,qa){return this.lower(yb.string.camelCaseString(da+(qa?" "+qa:"")))}},{key:"unwrap",value:function(da,qa,Va){var cb={};cb=(cb[this.lower(yb.string.camelCaseString(da))]=[da,qa,Va],cb);for(var kb=$jscomp.makeIterator(["top",
"left","bottom","right"]),Ma=kb.next();!Ma.done;Ma=kb.next()){Ma=Ma.value;var Oa=da+" "+Ma;cb[this.lower(yb.string.camelCaseString(Oa))]=[Oa,qa,this.join(Va,Ma)]}return cb}},{key:"focusOn",value:function(da){var qa=this,Va;return $jscomp.asyncExecutePromiseGeneratorProgram(function(cb){if(1==cb.nextAddress)return!da||qa.isAncestorOf(da)||qa.target===da||yb.obj.isArray(da)||(qa.target=da),Va=qa.visible,qa.visible=!0,cb.yield(qa.whenRendered(),2);if(3!=cb.nextAddress)return qa.update(),cb.yield(qa.whenRendered(),
3);qa.getSubmorphsByStyleClassName("NumberWidget").map(function(kb){return kb.relayout()});qa.visible=Va;cb.jumpToEnd()})}},{key:"onHoverIn",value:function(da){this.watchForTarget=!1}},{key:"onHoverOut",value:function(da){this.watchForTarget=!0}}],[{key:"className",get:function(){return"ShapeFormatStyler"}},{key:"properties",get:function(){return{uiSpec:{get:function(){return this._uiSpec||(this._uiSpec={clipModeSelector:["clip mode selector","selection","clipMode"],fillPicker:["fill picker","colorValue",
"fill"],shadowPicker:["shadow picker","shadowValue","dropShadow"],opacityField:["opacity field","number","opacity"],heightField:["height field","number","height"],widthField:["width field","number","width"]})}},ui:{readOnly:!0,get:function(){var da=this,qa=this.uiSpec;return this._ui||(this._ui=yb.obj.extract(qa,yb.obj.keys(qa),function(Va,cb){Va=$jscomp.makeIterator(cb).next().value;return da.getSubmorphNamed(Va)}))}}}}}],Kb,{pathInPackage:function(){return"index.js"},unsubscribeFromToplevelDefinitionChanges:function(){return function(){}},
subscribeToToplevelDefinitionChanges:function(){return function(){}},package:function(){return{name:"ShapeFormatStyler",version:"0.1.1-144"}}},{start:176,end:4600})}(yb.Morph);xb=yb.ShapeFormatStyler;yb.default=xb;var wc=lively.FreezerRuntime.recorderFor("ShadowWidget/index.js");wc.Morph=ta;wc.ShadowPopover=hc;wc.connect=Nc;wc.signal=Ta;xb=function(ab){var Kb=lively.FreezerRuntime.recorderFor("ShadowWidget/index.js"),nc=Kb.hasOwnProperty("ShadowWidget")&&"function"===typeof Kb.ShadowWidget?Kb.ShadowWidget:
Kb.ShadowWidget=function(da){da&&da[Symbol.for("lively-instance-restorer")]||this[Symbol.for("lively-instance-initialize")].apply(this,arguments)};return Xc(nc,ab,[{key:"onHoverIn",value:function(){this.getSubmorphNamed("drop down indicator").animate({opacity:1,duration:200})}},{key:"onHoverOut",value:function(){this.getSubmorphNamed("drop down indicator").animate({opacity:0,duration:200})}},{key:"onMouseDown",value:function(da){this.openPopover()}},{key:"update",value:function(da){var qa=this.submorphs[0];
qa&&(qa.dropShadow=da)}},{key:"openPopover",value:function(){var da=this,qa;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Va){if(1==Va.nextAddress)return qa=new wc.ShadowPopover({hasFixedPosition:!!da.ownerChain().find(function(cb){return cb.hasFixedPosition}),shadowValue:da.shadowValue}),Va.yield(qa.fadeIntoWorld(da.globalBounds().center()),2);wc.connect(qa,"shadowValue",da,"shadowValue");wc.connect(da,"shadowValue",da,"update");wc.signal(da,"openWidget",qa);Va.jumpToEnd()})}}],[{key:"className",
get:function(){return"ShadowWidget"}},{key:"properties",get:function(){return{shadowValue:{set:function(da){this.setProperty("shadowValue",da);this.update(da)}}}}}],Kb,{pathInPackage:function(){return"index.js"},unsubscribeFromToplevelDefinitionChanges:function(){return function(){}},subscribeToToplevelDefinitionChanges:function(){return function(){}},package:function(){return{name:"ShadowWidget",version:"0.1.1-7"}}},{start:194,end:1231})}(wc.Morph);xb=wc.ShadowWidget;wc.default=xb;var Kc=lively.FreezerRuntime.recorderFor("BorderFormatStyler/index.js");
Kc.Morph=ta;Kc.obj=id;Kc.string=Fd;Kc.connect=Nc;Kc.noUpdate=nd;Kc.once=Yc;xb=function(ab){var Kb=lively.FreezerRuntime.recorderFor("BorderFormatStyler/index.js"),nc=Kb.hasOwnProperty("BorderFormatStyler")&&"function"===typeof Kb.BorderFormatStyler?Kb.BorderFormatStyler:Kb.BorderFormatStyler=function(da){da&&da[Symbol.for("lively-instance-restorer")]||this[Symbol.for("lively-instance-initialize")].apply(this,arguments)};return Xc(nc,ab,[{key:"setupUI",value:function(){var da=this;this.getSubmorphsByStyleClassName("NumberWidget").map(function(qa){var Va=
Kc.string.camelCaseString(qa.name);Va=Va[0].toLowerCase()+Va.slice(1);da.ui[Va]=qa})}},{key:"cleanupAnchors",value:function(){var da=this.withAllSubmorphsSelect(function(cb){return cb.anchors&&cb.anchors.filter(function(kb){return!kb.id})}),qa={};da=$jscomp.makeIterator(da);for(var Va=da.next();!Va.done;qa={$jscomp$loop$prop$m$2294:qa.$jscomp$loop$prop$m$2294},Va=da.next())qa.$jscomp$loop$prop$m$2294=Va.value,qa.$jscomp$loop$prop$m$2294.anchors.forEach(function(cb){return function(kb){return!kb.id&&
cb.$jscomp$loop$prop$m$2294.removeAnchor(kb)}}(qa))}},{key:Symbol.for("lively-instance-initialize"),value:function(da){Xc._get(Object.getPrototypeOf(nc.prototype),Symbol.for("lively-instance-initialize"),this).call(this,da);0<this.submorphs.length&&this.setupConnections()}},{key:"setupConnections",value:function(){for(var da=this.ui,qa={},Va=$jscomp.makeIterator(Object.entries(this.uiSpec)),cb=Va.next();!cb.done;qa={$jscomp$loop$prop$control$2296:qa.$jscomp$loop$prop$control$2296,$jscomp$loop$prop$prop$2297:qa.$jscomp$loop$prop$prop$2297},
cb=Va.next()){var kb=$jscomp.makeIterator(cb.value);cb=kb.next().value;kb=$jscomp.makeIterator(kb.next().value);kb.next();var Ma=kb.next().value;qa.$jscomp$loop$prop$prop$2297=kb.next().value;qa.$jscomp$loop$prop$control$2296=da[cb];Kc.connect(qa.$jscomp$loop$prop$control$2296,Ma,this,"updateTarget",{updater:function(Oa){return function(lb,Wb){Oa.$jscomp$loop$prop$control$2296._updating=!0;lb(Oa.$jscomp$loop$prop$prop$2297,Wb);Oa.$jscomp$loop$prop$control$2296._updating=!1}}(qa),varMapping:{prop:qa.$jscomp$loop$prop$prop$2297,
control:qa.$jscomp$loop$prop$control$2296}})}}},{key:"update",value:function(){var da=this,qa=this.target,Va=qa.borderStyle,cb=qa.borderColor,kb=qa.borderRadius,Ma=qa.borderWidth;Kc.noUpdate(function(){da.updateMultiValue("border style selector",Va,"selection");da.updateMultiValue("border color picker",cb,"colorValue");da.updateMultiValue("border radius field",kb,"number");da.updateMultiValue("border width field",Ma,"number")})}},{key:"updateTarget",value:function(da,qa){this.target[da]=qa;this.update()}},
{key:"updateControl",value:function(da,qa,Va){da._updating||Kc.obj.equals(da[qa],Va)||(da[qa]=Va)}},{key:"updateMultiValue",value:function(da,qa,Va){var cb=this.ui,kb=cb[this.join(da)],Ma=kb.get("multi value indicator"),Oa=Kc.obj.values(qa).some(function(lb){return!Kc.obj.isFunction(lb)&&!Kc.obj.equals(lb,qa.valueOf())});kb.visible=kb.isLayoutable=!Oa;if(Oa&&Ma.visible!=Oa)Kc.once(Ma,"onMouseDown",kb,Va,{converter:function(){return qa.valueOf()},varMapping:{value:qa}});Ma.visible=Ma.isLayoutable=
Oa;this.updateControl(kb,Va,qa.valueOf());kb=$jscomp.makeIterator(["top","left","bottom","right"]);for(Ma=kb.next();!Ma.done;Ma=kb.next())Ma=Ma.value,Oa=cb[this.join(da,Ma)],this.updateControl(Oa,Va,qa[Ma])}},{key:"lower",value:function(da){return da.charAt(0).toLowerCase()+da.slice(1)}},{key:"join",value:function(da,qa){return this.lower(Kc.string.camelCaseString(da+(qa?" "+qa:"")))}},{key:"unwrap",value:function(da,qa,Va){var cb={};cb=(cb[this.lower(Kc.string.camelCaseString(da))]=[da,qa,Va],cb);
for(var kb=$jscomp.makeIterator(["top","left","bottom","right"]),Ma=kb.next();!Ma.done;Ma=kb.next()){Ma=Ma.value;var Oa=da+" "+Ma;cb[this.lower(Kc.string.camelCaseString(Oa))]=[Oa,qa,this.join(Va,Ma)]}return cb}},{key:"attachToWorld",value:function(){Kc.connect($world,"showHaloFor",this,"focusOn",{garbageCollect:!0})}},{key:"focusOn",value:function(da){var qa=this,Va;return $jscomp.asyncExecutePromiseGeneratorProgram(function(cb){if(1==cb.nextAddress)return!da||qa.isAncestorOf(da)||qa.target===da||
Kc.obj.isArray(da)||(qa.target=da),Va=qa.visible,qa.visible=!0,cb.yield(qa.whenRendered(),2);if(3!=cb.nextAddress)return qa.update(),cb.yield(qa.whenRendered(),3);qa.getSubmorphsByStyleClassName("NumberWidget").map(function(kb){return kb.relayout()});qa.visible=Va;cb.jumpToEnd()})}},{key:"onHoverIn",value:function(da){this.watchForTarget=!1}},{key:"onHoverOut",value:function(da){this.watchForTarget=!0}}],[{key:"className",get:function(){return"BorderFormatStyler"}},{key:"properties",get:function(){return{uiSpec:{derived:!0,
serialize:!1,get:function(){return this._uiSpec||(this._uiSpec=Object.assign({},this.unwrap("border style selector","selection","borderStyle"),{},this.unwrap("border color picker","colorValue","borderColor"),{},this.unwrap("border radius field","number","borderRadius"),{},this.unwrap("border width field","number","borderWidth")))}},ui:{initialize:function(){this.setupUI()}}}}}],Kb,{pathInPackage:function(){return"index.js"},unsubscribeFromToplevelDefinitionChanges:function(){return function(){}},
subscribeToToplevelDefinitionChanges:function(){return function(){}},package:function(){return{name:"BorderFormatStyler",version:"0.1.1-16"}}},{start:185,end:5003})}(Kc.Morph);xb=Kc.BorderFormatStyler;Kc.default=xb;var zb=lively.FreezerRuntime.recorderFor("MasterComponentControl/index.js");zb.Morph=ta;zb.resource=sb;zb.arr=dc;zb.obj=id;zb.string=Fd;zb.Path=ac;zb.connect=Nc;zb.getMastersMenu=Vc;zb.resolvedMasters=Hd;xb=function(ab){var Kb=lively.FreezerRuntime.recorderFor("MasterComponentControl/index.js"),
nc=Kb.hasOwnProperty("MasterComponentControl")&&"function"===typeof Kb.MasterComponentControl?Kb.MasterComponentControl:Kb.MasterComponentControl=function(da){da&&da[Symbol.for("lively-instance-restorer")]||this[Symbol.for("lively-instance-initialize")].apply(this,arguments)};return Xc(nc,ab,[{key:"focusOn",value:function(da){this.target=da;this.update()}},{key:"onMouseUp",value:function(da){var qa=this,Va,cb,kb,Ma,Oa,lb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Wb){if(1==Wb.nextAddress){"auto master selection"==
da.targetMorph.name&&(Va="auto");"hover master selection"==da.targetMorph.name&&(Va="hover");"click master selection"==da.targetMorph.name&&(Va="click");qa.refreshButtons();if(!qa.target)return Wb.return();cb=$jscomp.makeIterator(["auto","hover","click"]);for(kb=cb.next();!kb.done;kb=cb.next())Ma=kb.value,qa.target.master&&qa.target.master[Ma]&&!qa.get(Ma+" master checkbox").checked&&qa.adjustMasterComponent(Ma,null);if(!Va)return Wb.jumpTo(0);Oa=qa;lb=Oa.openMenu;return Wb.yield(qa.getMastersMenu(Va),
3)}lb.call(Oa,Wb.yieldResult,da);Wb.jumpToEnd()})}},{key:"getMastersMenu",value:function(da){var qa=this;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Va){return 1==Va.nextAddress?Va.yield(Promise.all([].concat($jscomp.arrayFromIterable(Object.keys(zb.resolvedMasters)),[qa.world().name]).map(function(cb){var kb,Ma,Oa;return $jscomp.asyncExecutePromiseGeneratorProgram(function(lb){return 1==lb.nextAddress?(kb=cb,Ma=qa,Oa=Ma.componentsToMenu,lb.yield(zb.resource("styleguide://"+cb+"/").dirList(),
2)):lb.return([kb,Oa.call(Ma,lb.yieldResult,da)])})})),2):Va.return(Va.yieldResult)})}},{key:"componentsToMenu",value:function(da,qa,Va,cb){var kb=this;Va=void 0===Va?null:Va;cb=void 0===cb?1:cb;Va||(Va=da.map(function(Oa){return{name:zb.arr.last(Oa.name.split("/")),path:Oa.name.split("/"),value:Oa}}));if(0==Va.length||100<cb)return[];var Ma=this;return zb.arr.flatten(Object.entries(zb.arr.groupBy(Va,function(Oa){return Oa.path[cb-1]})).map(function(Oa){var lb=$jscomp.makeIterator(Oa);Oa=lb.next().value;
lb=lb.next().value;var Wb=$jscomp.makeIterator(zb.arr.partition(lb,function(Nb){return Nb.path.length<=cb}));lb=Wb.next().value;Wb=Wb.next().value;Oa=[Oa,kb.componentsToMenu(null,qa,Wb,cb+1)];return[].concat($jscomp.arrayFromIterable(lb.map(function(Nb){return[Nb.name,function(){Ma.adjustMasterComponent(qa,Nb.value)}]})),$jscomp.arrayFromIterable(Oa[1].length?[Oa]:[]))}),1)}},{key:"getComponentSelectionMenu",value:function(da){var qa=this,Va,cb,kb,Ma,Oa,lb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Wb){if(1==
Wb.nextAddress)return Va=qa.world().metadata.commit.name,cb=zb.resource("styleguide://"+Va+"/"),Wb.yield(cb.dirList(),2);if(3!=Wb.nextAddress)return kb=Wb.yieldResult,Wb.yield(zb.resource("styleguide://System/").dirList(),3);Ma=Wb.yieldResult;Oa=qa.componentsToMenu(kb,da);lb=qa.componentsToMenu(Ma,da);return Wb.return([].concat($jscomp.arrayFromIterable(0<Oa.length?[].concat($jscomp.arrayFromIterable(Oa),[{isDivider:!0}]):[]),$jscomp.arrayFromIterable(lb)))})}},{key:"adjustMasterComponent",value:function(da,
qa){if(this.target.master)this.target.master[da]=qa;else if(qa){var Va={};this.target.master=(Va[da]=qa,Va)}da=this.target.master;qa=da.hover;Va=da.click;da.auto||qa||Va||(this.target.master=null);this.update();this.target.withAllSubmorphsDo(function(cb){return delete cb._parametrizedProps});this.target.requestMasterStyling()}},{key:"componentsToMenu",value:function(da,qa,Va,cb){var kb=this;Va=void 0===Va?null:Va;cb=void 0===cb?1:cb;Va||(Va=da.map(function(Oa){return{name:zb.arr.last(Oa.name.split("/")),
path:Oa.name.split("/"),value:Oa}}));if(0==Va.length||100<cb)return[];var Ma=this;return zb.arr.flatten(Object.entries(zb.arr.groupBy(Va,function(Oa){return Oa.path[cb-1]})).map(function(Oa){var lb=$jscomp.makeIterator(Oa);Oa=lb.next().value;lb=lb.next().value;var Wb=$jscomp.makeIterator(zb.arr.partition(lb,function(Nb){return Nb.path.length<=cb}));lb=Wb.next().value;Wb=Wb.next().value;Oa=[Oa,kb.componentsToMenu(null,qa,Wb,cb+1)];return[].concat($jscomp.arrayFromIterable(lb.map(function(Nb){return[Nb.name,
function(){Ma.adjustMasterComponent(qa,Nb.value)}]})),$jscomp.arrayFromIterable(Oa[1].length?[Oa]:[]))}),1)}},{key:"update",value:function(){if(this.target){for(var da=$jscomp.makeIterator(["auto","hover","click"]),qa=da.next();!qa.done;qa=da.next()){qa=qa.value;var Va=this.getSubmorphNamed(qa+" master selection"),cb=this.getSubmorphNamed(qa+" master checkbox");zb.Path(["master",qa]).get(this.target)?cb.checked=!0:cb.checked=!1;Va.label=zb.string.truncateLeft(zb.Path(["master",qa,"name"]).get(this.target)||
"select master",15,"...")}this.refreshButtons()}}},{key:"refreshButtons",value:function(){for(var da=$jscomp.makeIterator(["auto","hover","click"]),qa=da.next();!qa.done;qa=da.next()){qa=qa.value;var Va=this.getSubmorphNamed(qa+" master selection"),cb=this.getSubmorphNamed(qa+" master checkbox");Va=Va.deactivated=!cb.checked;this.getSubmorphNamed(qa+" master selection").opacity=Va?.5:1}da=this.getSubmorphNamed("overridden props list");da.items=this.getOverriddenProps();this.getSubmorphNamed("clear overridden prop button").deactivated=
!da.selection}},{key:"getMasterForTarget",value:function(){if(this.target.isMorph)return[this.target].concat($jscomp.arrayFromIterable(this.target.ownerChain())).map(function(da){return da.master}).find(Boolean)}},{key:"clearSelectedProperty",value:function(){var da=this.getSubmorphNamed("overridden props list").selection;this.getMasterForTarget().clearOverriddenPropertiesFor(this.target,[da]);this.refreshButtons()}},{key:"getOverriddenProps",value:function(){var da=this.getMasterForTarget();return da&&
da._overriddenProps?(da=da._overriddenProps.get(this.target))?Object.keys(da):[]:[]}}],[{key:"className",get:function(){return"MasterComponentControl"}}],Kb,{pathInPackage:function(){return"index.js"},unsubscribeFromToplevelDefinitionChanges:function(){return function(){}},subscribeToToplevelDefinitionChanges:function(){return function(){}},package:function(){return{name:"MasterComponentControl",version:"0.1.1-108"}}},{start:315,end:6096})}(zb.Morph);xb=zb.MasterComponentControl;zb.default=xb}}});
