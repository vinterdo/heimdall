(this.webpackJsonpheimdall=this.webpackJsonpheimdall||[]).push([[0],{58:function(e,n,t){e.exports=t(84)},84:function(e,n,t){"use strict";t.r(n);var r=t(0),o=t.n(r),a=t(14),i=t.n(a),d=t(27),c=t(35),u=t(46),l=t(15),s=(t(65),t(42)),b=t(48),f=function(e,n){for(var t=n,r=0;void 0!==t&&t.id!==e;)t="a"===e.charAt(r)?t.a:t.b,r++;return t},p={tabs:{default:{rootNode:{id:"",a:void 0,b:void 0},windowToNode:{},nodeToWindow:{}}},windowIdToType:{},currentTab:"default"};function g(e){var n=JSON.parse(JSON.stringify(e)),t=n.tabs[n.currentTab];if(void 0===t)throw Error("current tab not found, state malformed");return{newState:n,currentTab:t}}function m(e,n){var t=g(e).newState,r=Object.keys(e.tabs);if(1===r.length)return e;var o,a=r.indexOf(n);return o=a===r.length-1?r.length-2:a+1,t.currentTab=r[o],delete t.tabs[n],t}function w(e,n){var t=n.nodeId,r=n.windowId,o=n.windowType,a=g(e),i=a.newState,d=a.currentTab;return d.nodeToWindow[t]=r,d.windowToNode[r]=t,i.windowIdToType[r]=o,i}function v(e,n){if(e.tabs[n])return e;var t=g(e).newState;return t.tabs[n]={rootNode:{id:"",a:void 0,b:void 0},nodeToWindow:{},windowToNode:{}},t.currentTab=n,t}function h(e,n){if(!e.tabs[n])return e;var t=g(e).newState;return t.currentTab=n,t}function E(e,n){var t=g(e),r=t.newState,o=t.currentTab,a=n,i=a.substr(0,a.length-1),d=a.substr(a.length-1,a.length),c=f(i,o.rootNode);if(void 0===c)throw Error("current node parent not found");var u="a"===d?c.b:c.a;if(void 0===u)throw Error("current node sibling not found");return o.nodeToWindow[n]&&(delete o.windowToNode[o.nodeToWindow[n]],delete o.nodeToWindow[n]),o.nodeToWindow[u.id]&&(o.nodeToWindow[i]=o.nodeToWindow[u.id],delete o.nodeToWindow[u.id],o.windowToNode[o.nodeToWindow[i]]=i),c.a=u.a,c.b=u.b,c.split=u.split,c.splitValue=u.splitValue,function e(n){function t(e,n){if(e){var t=o.nodeToWindow[e.id];delete o.nodeToWindow[e.id],e.id=n,o.nodeToWindow[e.id]=t,o.windowToNode[t]=e.id}}n&&(t(n.a,n.id+"a"),t(n.b,n.id+"b"),e(n.a),e(n.b))}(c),r}function O(e,n){var t=n.oldNodeId,r=n.newNodeId,o=n.windowId,a=g(e),i=a.newState,d=a.currentTab;return d.windowToNode[o]=r,d.nodeToWindow[r]=o,delete d.nodeToWindow[t],i}function y(e,n,t){var r=g(e),o=r.newState,a=r.currentTab,i=f(n,a.rootNode);if(void 0===i)throw Error("current node not found");return i.splitValue=t,o}function T(e,n,t){var r=g(e),o=r.newState,a=r.currentTab,i=f(n,a.rootNode);if(void 0===i)throw Error("current node not found");return i.a=Object.assign({},i),i.a.id+="a",a.nodeToWindow[i.id]&&(a.nodeToWindow[i.a.id]=a.nodeToWindow[i.id],delete a.nodeToWindow[i.id],a.windowToNode[a.nodeToWindow[i.a.id]]=i.id+"a"),i.b={id:i.id+"b"},i.split=t,i.splitValue=50,o}var N={key:"root",storage:t.n(b).a,whitelist:["layout"]},x=Object(l.c)({layout:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"SPLIT_NODE_HORIZONTALLY_ACTION":return T(e,n.payload.nodeId,"horizontal");case"SPLIT_NODE_VERTICALLY_ACTION":return T(e,n.payload.nodeId,"vertical");case"CLOSE_NODE_ACTION":return E(e,n.payload.nodeId);case"MOVE_WINDOW_BETWEEN_NODES":return O(e,n.payload);case"OPEN_NEW_WINDOW":return w(e,n.payload);case"CREATE_NEW_TAB":return v(e,n.payload.tabName);case"SWITCH_TAB":return h(e,n.payload.tabName);case"UPDATE_SPLIT_VALUE":return y(e,n.payload.nodeId,n.payload.newSplit);case"CLOSE_TAB":return m(e,n.payload.tabName);default:return e}}}),j=function(e,n){return x(e,n)};var I=t(12),_=t(5),S=t(6);function W(){var e=Object(_.a)(["\n  html {\n    height: 100%;\n    width: 100%;\n  }\n  body {\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n      sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n  #root {\n    height: 100%;\n    width: 100%;\n  }\n  .Resizer {\n    background: #000;\n    opacity: 0.2;\n    z-index: 1;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-background-clip: padding;\n    -webkit-background-clip: padding;\n    background-clip: padding-box;\n  }\n  \n  .Resizer:hover {\n    -webkit-transition: all 1s ease;\n    transition: all 1s ease;\n  }\n  \n  .Resizer.horizontal {\n    height: 11px;\n    margin: -5px 0;\n    border-top: 5px solid rgba(255, 255, 255, 0);\n    border-bottom: 5px solid rgba(255, 255, 255, 0);\n    cursor: row-resize;\n    width: 100%;\n  }\n  \n  .Resizer.horizontal:hover {\n    border-top: 5px solid rgba(0, 0, 0, 0.5);\n    border-bottom: 5px solid rgba(0, 0, 0, 0.5);\n  }\n  \n  .Resizer.vertical {\n    width: 11px;\n    margin: 0 -5px;\n    border-left: 5px solid rgba(255, 255, 255, 0);\n    border-right: 5px solid rgba(255, 255, 255, 0);\n    cursor: col-resize;\n  }\n  \n  .Resizer.vertical:hover {\n    border-left: 5px solid rgba(0, 0, 0, 0.5);\n    border-right: 5px solid rgba(0, 0, 0, 0.5);\n  }\n  .Resizer.disabled {\n    cursor: not-allowed;\n  }\n  .Resizer.disabled:hover {\n    border-color: transparent;\n  }\n  code {\n    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n      monospace;\n  }\n  \n.react-autosuggest__container {\n  position: relative;\n}\n\n.react-autosuggest__input {\n  width: 240px;\n  height: 30px;\n  padding: 10px 20px;\n  font-family: Helvetica, sans-serif;\n  font-weight: 300;\n  font-size: 16px;\n  border: 1px solid #aaa;\n  border-radius: 4px;\n}\n\n.react-autosuggest__input--focused {\n  outline: none;\n}\n\n.react-autosuggest__input--open {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.react-autosuggest__suggestions-container {\n  display: none;\n}\n\n.react-autosuggest__suggestions-container--open {\n  display: block;\n  position: absolute;\n  top: 51px;\n  width: 280px;\n  border: 1px solid #aaa;\n  background-color: #fff;\n  font-family: Helvetica, sans-serif;\n  font-weight: 300;\n  font-size: 16px;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n  z-index: 2;\n}\n\n.react-autosuggest__suggestions-list {\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n}\n\n.react-autosuggest__suggestion {\n  cursor: pointer;\n  padding: 10px 20px;\n}\n\n.react-autosuggest__suggestion--highlighted {\n  background-color: #ddd;\n}\n\n"]);return W=function(){return e},e}var k=Object(S.a)(W()),C=t(7),A=t(8),z=function(){function e(){Object(C.a)(this,e),this.templates=new Map}return Object(A.a)(e,[{key:"addTemplate",value:function(e,n){if(this.templates.has(e))throw Error("duplicated name "+e);this.templates.set(e,n)}},{key:"createWindow",value:function(n){if(!this.templates.has(n))throw new Error("Template with name "+n+" is not registered");var t=e.currentId;e.currentId++;var r=this.templates.get(n);if(!r)throw new Error("dafuq");return{id:t,window:r()}}},{key:"getAvailableTemplates",value:function(){return Array.from(this.templates.keys()).map((function(e){return{name:e}}))}},{key:"getRenderer",value:function(e){return this.templates.get(e)}}]),e}();z.currentId=1;var D=new z,R=t(53),F=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,o.a.createElement(R.a,{options:[{value:"chocolate",label:"Chocolate"},{value:"strawberry",label:"Strawberry"},{value:"vanilla",label:"Vanilla"}]})))},L=function(){return o.a.createElement(o.a.Fragment,null,"Form")},V=t(86),P=t(54),U=t(16);var B=t(25);function H(){var e=Object(_.a)(["\n  display: flex;\n  flex-direction: row;\n  &>button {\n    padding: 0.5rem 1rem;\n    font-size: 1rem;\n    border: none;\n    border-right: 2px solid white;\n  }\n"]);return H=function(){return e},e}function M(){var e=Object(_.a)(["\n  background: #EEE;\n"]);return M=function(){return e},e}var J=S.b.button(M()),Y=Object(S.b)((function(e){var n=Object(I.c)((function(e){return Object.keys(e.layout.tabs)})),t=Object(I.c)((function(e){return e.layout.currentTab})),o=Object(r.useState)(null),a=Object(U.a)(o,2),i=a[0],d=a[1],c=Object(I.b)(),u=Object(r.useState)(!1),l=Object(U.a)(u,2),s=l[0],b=l[1],f=function(e){return function(n){c(function(e){return{type:"CLOSE_TAB",payload:{tabName:e}}}(e)),n.stopPropagation()}};return r.createElement("div",{className:e.className},n.map((function(e){return r.createElement("button",{key:e,onClick:(n=e,function(){c(function(e){return{type:"SWITCH_TAB",payload:{tabName:e}}}(n))}),style:{background:t===e?"#DDD":"#EFEFEF"}},e,r.createElement(B.a,{icon:"times",onClick:f(e)}));var n})),s&&r.createElement("input",{type:"text",onChange:function(e){d(e.target.value)}}),r.createElement(J,{onClick:function(){if(s){if(b(!1),!i)return;c({type:"CREATE_NEW_TAB",payload:{tabName:i}})}else b(!0)}},"+"))}))(H()),q=t(55),$=t(88),Z=t(52),G=t.n(Z);function K(){var e=Object(_.a)(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return K=function(){return e},e}function Q(e){var n=e.trim().replace(/[.*+?^${}()|[\]\\]/g,"\\$&");if(""===n)return D.getAvailableTemplates();var t=new RegExp("^"+n,"i");return D.getAvailableTemplates().filter((function(e){return t.test(e.name)}))}function X(e){return e.name}function ee(e){return r.createElement("span",null,e.name)}function ne(){return!0}var te=Object(S.b)((function(e){var n,t=Object(r.useState)(""),o=Object(U.a)(t,2),a=o[0],i=o[1],d=Object(r.useState)(Q("")),c=Object(U.a)(d,2),u=c[0],l=c[1],s={placeholder:e.placeholder,value:a,onChange:function(n,t){var r=t.newValue,o=e.id,a=e.onChange;i(r),a&&a(o,r)}};return r.createElement("div",{className:e.className},r.createElement(G.a,{id:e.id,suggestions:u,onSuggestionsFetchRequested:function(e){var n=e.value;l(Q(n))},onSuggestionsClearRequested:function(){l([])},shouldRenderSuggestions:ne,onSuggestionSelected:e.onSelected&&(n=e.onSelected,function(e,t){var r=t.suggestion;n(r.name)}),getSuggestionValue:X,renderSuggestion:ee,inputProps:s}))}))(K()),re=t(87),oe=t(9),ae=t(10),ie=t(11),de={};function ce(e){return de[e]?de[e].inUse=!0:de[e]={mountNode:document.createElement("div"),inUse:!0},de[e].mountNode}var ue=function(e){function n(){var e,t;Object(C.a)(this,n);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(t=Object(oe.a)(this,(e=Object(ae.a)(n)).call.apply(e,[this].concat(o)))).el=void 0,t}return Object(ie.a)(n,e),Object(A.a)(n,[{key:"componentDidMount",value:function(){var e=ce(this.props.uid);this.el.appendChild(e),this.renderChildrenIntoNode(e)}},{key:"componentDidUpdate",value:function(){var e=ce(this.props.uid);this.renderChildrenIntoNode(e)}},{key:"componentWillUnmount",value:function(){var e;e=this.props.uid,de[e].inUse=!1,setTimeout((function(){de[e].inUse||(i.a.unmountComponentAtNode(de[e].mountNode),delete de[e])}),0)}},{key:"renderChildrenIntoNode",value:function(e){i.a.unstable_renderSubtreeIntoContainer(this,this.props.children,e)}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{ref:function(n){e.el=n}})}}]),n}(r.Component);function le(){var e=Object(_.a)(["\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n"]);return le=function(){return e},e}var se=Object(S.b)((function(e){var n=Object(I.c)((function(e){return e.layout.currentTab})),t=Object(I.c)((function(t){return t.layout.tabs[n].windowToNode[e.windowId]})),o=Object(re.a)({item:{type:"draggableWindow",windowId:e.windowId,nodeId:t},collect:function(e){return{opacity:e.isDragging()?.5:1}}}),a=Object(U.a)(o,2),i=a[0].opacity,d=a[1];return r.createElement("div",{ref:d,style:{opacity:i},className:e.className},r.createElement(ue,{uid:""+e.windowId},e.children||r.createElement(r.Fragment,null)))}))(le());function be(){var e=Object(_.a)(["\n  background: #FAFAFA;\n  display: flex;\n  height: 100%;\n  width: 100%;\n  flex-grow: 1;\n  flex-direction: column;\n"]);return be=function(){return e},e}function fe(){var e=Object(_.a)(["\n  flex-grow: 1;\n  background: ",";\n  overflow: auto;\n"]);return fe=function(){return e},e}function pe(){var e=Object(_.a)(["\n  display: flex;\n  flex-direction: row;\n  padding-right: 5px;\n  line-height: 1.5rem;\n  margin: auto 0;\n  svg {\n    padding-left: 5px;\n    cursor: pointer;\n  }\n"]);return pe=function(){return e},e}function ge(){var e=Object(_.a)(["\n  display: flex;\n  flex-direction: row;\n  line-height: 1.5rem;\n  margin: auto 0;\n  padding-left: 5px;\n"]);return ge=function(){return e},e}function me(){var e=Object(_.a)(["\n  color: #888;\n  height: 1.5rem;\n  width: 100%;\n  background: #DDD;\n  display: flex;\n  flex-direction: row;\n  line-height: 1.5rem;\n  margin: auto 0;\n  justify-content: space-between;\n"]);return me=function(){return e},e}var we=S.b.div(me()),ve=S.b.div(ge()),he=S.b.div(pe()),Ee=Object(S.b)((function(e){return o.a.createElement("div",{className:e.className},e.children)}))(fe(),(function(e){return e.isOver?"#CCC":"#FFF"})),Oe=Object(S.b)((function(e){var n=Object(I.b)(),t=Object(I.c)((function(e){return e.layout.currentTab})),r=Object(I.c)((function(n){return n.layout.tabs[t].nodeToWindow[e.id]})),a=Object(I.c)((function(e){return e.layout.windowIdToType[r]})),i=Object($.a)({accept:"draggableWindow",drop:function(t,o){return a=o.getItem().nodeId,i=o.getItem().windowId,void(a!==e.id&&(r||n(function(e,n,t){return{type:"MOVE_WINDOW_BETWEEN_NODES",payload:{oldNodeId:e,newNodeId:n,windowId:t}}}(a,e.id,i))));var a,i},collect:function(e){return{isOver:e.isOver()}}}),d=Object(U.a)(i,2),c=d[0].isOver,u=d[1],l=D.getRenderer(a);return o.a.createElement("div",{className:e.className,ref:u},o.a.createElement(we,null,o.a.createElement(ve,null,"ID: [",e.id,"]"),o.a.createElement(he,null,o.a.createElement(B.a,{icon:"grip-lines",onClick:e.onSplitHorizontal}),o.a.createElement(B.a,{icon:"grip-lines-vertical",onClick:e.onSplitVertical}),""!==e.id&&o.a.createElement(B.a,{icon:"times",onClick:e.onClose}))),o.a.createElement(Ee,{isOver:c&&!r},r?o.a.createElement(se,{windowId:r},o.a.createElement("div",null,l&&l())):o.a.createElement(te,{id:e.id,placeholder:"Select window",onSelected:function(t){var r=D.createWindow(t).id;n(function(e,n,t){return{type:"OPEN_NEW_WINDOW",payload:{nodeId:e,windowId:n,windowType:t}}}(e.id,r,t)),console.log("selected "+t)}})))}))(be());function ye(){var e=Object(_.a)(["\n  width: 100%;\n  height: 100%;\n"]);return ye=function(){return e},e}function Te(){var e=Object(_.a)(["\n  //position: relative !important;\n"]);return Te=function(){return e},e}var Ne=Object(S.b)(q.a)(Te()),xe=S.b.div(ye()),je=function e(n){var t=Object(I.b)(),a=n.node,i=Object(r.useRef)(null);switch(a.split){case"vertical":case"horizontal":return void 0===a.a||void 0===a.b?o.a.createElement(o.a.Fragment,null,"Error"):o.a.createElement(xe,{ref:i},o.a.createElement(Ne,{split:a.split,defaultSize:a.splitValue+"%",onDragFinished:function(e){var r="vertical"===n.node.split?i.current.offsetWidth:i.current.offsetHeight;t({type:"UPDATE_SPLIT_VALUE",payload:{nodeId:a.id,newSplit:100*e/r}})},maxSize:-1,minSize:0},o.a.createElement(e,{node:a.a}),o.a.createElement(e,{node:a.b})));case void 0:return o.a.createElement(Oe,{onClose:function(){return t({type:"CLOSE_NODE_ACTION",payload:{nodeId:a.id}})},onSplitHorizontal:function(){return t({type:"SPLIT_NODE_HORIZONTALLY_ACTION",payload:{nodeId:a.id}})},onSplitVertical:function(){return t({type:"SPLIT_NODE_VERTICALLY_ACTION",payload:{nodeId:a.id}})},id:a.id})}return o.a.createElement(o.a.Fragment,null)};function Ie(){var e=Object(_.a)(["\n  flex-grow: 1;\n  display: flex;\n  position: relative;\n"]);return Ie=function(){return e},e}var _e=Object(S.b)((function(e){var n=Object(I.c)((function(e){return e.layout.currentTab})),t=Object(I.c)((function(e){return e.layout.tabs[n]}));return void 0===t?(console.log("tab does not exits"),o.a.createElement(o.a.Fragment,null)):o.a.createElement("div",{className:e.className},o.a.createElement(je,{node:t.rootNode}))}))(Ie());function Se(){var e=Object(_.a)(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n"]);return Se=function(){return e},e}function We(){var e=Object(_.a)(["\n  flex-grow: 1;\n  display: flex;\n  position: relative;\n"]);return We=function(){return e},e}var ke=S.b.div(We()),Ce=Object(S.b)((function(e){return o.a.createElement("div",{className:e.className},o.a.createElement(V.a,{backend:P.a},o.a.createElement(Y,null),o.a.createElement(ke,null,o.a.createElement(_e,null))))}))(Se());d.b.add(c.c,c.a,c.b);var Ae=function(){var e=l.a.apply(void 0,[]),n=Object(l.d)(Object(s.a)(N,j),e);return{store:n,persistor:Object(s.b)(n)}}();D.addTemplate("Dropdown",(function(){return o.a.createElement(F,null)})),D.addTemplate("Form",(function(){return o.a.createElement(L,null)}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement((function(){return o.a.createElement(I.a,{store:Ae.store},o.a.createElement(u.a,{loading:null,persistor:Ae.persistor},o.a.createElement(k,null),o.a.createElement(Ce,null)))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[58,1,2]]]);
//# sourceMappingURL=main.9c3282fc.chunk.js.map