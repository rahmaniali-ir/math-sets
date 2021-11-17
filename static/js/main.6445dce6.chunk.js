(this["webpackJsonpmath-sets"]=this["webpackJsonpmath-sets"]||[]).push([[0],[,,,,,,,,,,,,,function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),r=n(8),o=n.n(r),i=(n(13),n(3)),l=n(4),s=n(2),u=n(0),d={collections:[{elements:["a","b","c"],name:"A"},{elements:["1","2","3","4"],name:"B"}],relations:[{name:"R",source:"A",target:"B",nodes:[]}]},j=function(e,t){return e.collections.findIndex((function(e){return e.name===t}))},O=function(e,t){return e.relations.findIndex((function(e){return e.name===t}))},m=function(e,t){switch(t.type){case"ADD_COLLECTION":var n=function(e){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZ",n=e.collections.map((function(e){return e.name}));if(n.length===t.length)return"";for(;;){var c=t[Math.floor(Math.random()*t.length)];if(!n.includes(c))return c}}(e);if(!n)return e;var c={name:n,elements:[]};return Object(s.a)(Object(s.a)({},e),{},{collections:[].concat(Object(l.a)(e.collections),[c])});case"ADD_TO_COLLECTION":var a=j(e,t.payload.collection),r=t.payload.input.split(",").map((function(e){return e.trim()})).filter((function(e){return e})),o=[].concat(Object(l.a)(e.collections[a].elements),Object(l.a)(r)),u=Array.from(new Set(o)),d=e.collections.map((function(e,t){return t===a&&(e.elements=u),e}));return Object(s.a)(Object(s.a)({},e),{},{collections:d});case"RENAME_COLLECTION":var m=t.payload.name.toUpperCase();if(function(e,t){return e.collections.some((function(e){return e.name===t}))}(e,m))return e;var f=j(e,t.payload.name),b=e.collections.map((function(e,t){return t===f?{name:m,elements:e.elements}:e}));return Object(s.a)(Object(s.a)({},e),{},{collections:b});case"REMOVE_COLLECTION":var h=j(e,t.payload.name);return Object(s.a)(Object(s.a)({},e),{},{collections:e.collections.filter((function(e,t){return t!==h}))});case"REMOVE_FROM_COLLECTION":var v=j(e,t.payload.name),x=e.collections.map((function(e,n){return n===v?Object(s.a)(Object(s.a)({},e),{},{elements:e.elements.filter((function(e){return e!==t.payload.element}))}):e})),p=e.relations.map((function(e){return e.source===t.payload.name&&(e.nodes=e.nodes.filter((function(e){return e[0]!==t.payload.element}))),e.target===t.payload.name&&(e.nodes=e.nodes.filter((function(e){return e[1]!==t.payload.element}))),e}));return Object(s.a)(Object(s.a)({},e),{},{collections:x,relations:p});case"ADD_RELATION":var g=function(e){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZ",n=e.relations.map((function(e){return e.name}));if(n.length===t.length)return"";for(;;){var c=t[Math.floor(Math.random()*t.length)];if(!n.includes(c))return c}}(e);return Object(s.a)(Object(s.a)({},e),{},{relations:[].concat(Object(l.a)(e.relations),[{name:g,source:"",target:"",nodes:[]}])});case"UPDATE_RELATION_SOURCE":var C=O(e,t.payload.name);if(e.relations[C].source===t.payload.source)return e;var E=e.relations.map((function(e,n){return n===C?Object(s.a)(Object(s.a)({},e),{},{source:t.payload.source,nodes:[]}):e}));return Object(s.a)(Object(s.a)({},e),{},{relations:E});case"UPDATE_RELATION_TARGET":var N=O(e,t.payload.name);if(e.relations[N].target===t.payload.target)return e;var y=e.relations.map((function(e,n){return n===N?Object(s.a)(Object(s.a)({},e),{},{target:t.payload.target,nodes:[]}):e}));return Object(s.a)(Object(s.a)({},e),{},{relations:y});case"TOGGLE_RELATION_NODE":var M=O(e,t.payload.name),T=e.relations[M],L=Object(i.a)(t.payload.node,2),k=L[0],A=L[1],_=T.nodes.some((function(e){return e[0]===k&&e[1]===A}));return T.nodes=_?T.nodes.filter((function(e){return!(e[0]===k&&e[1]===A)})):[].concat(Object(l.a)(T.nodes),[[k,A]]),Object(s.a)({},e);default:return e}},f=Object(c.createContext)({state:d,dispatch:function(){}}),b=function(){return Object(c.useContext)(f)},h=function(e){var t=e.children,n=Object(c.useReducer)(m,d),a=Object(i.a)(n,2),r=a[0],o=a[1];return Object(u.jsx)(f.Provider,{value:{state:r,dispatch:o},children:t})},v=(n(15),function(e){var t=e.collection,n=b().dispatch,a=Object(c.useRef)(null);Object(c.useEffect)((function(){a.current.value=t.name}),[t.name]);var r=Object(c.useCallback)((function(e){"Enter"===e.key&&n({type:"RENAME_COLLECTION",payload:{collection:t.name,name:e.target.value}})}),[n,t.name]),o=Object(c.useCallback)((function(e){"Enter"===e.key&&(n({type:"ADD_TO_COLLECTION",payload:{collection:t.name,input:e.target.value}}),e.target.value="")}),[n,t.name]),i=Object(c.useCallback)((function(){n({type:"REMOVE_COLLECTION",payload:{name:t.name}})}),[n,t.name]),l=Object(c.useCallback)((function(e){n({type:"REMOVE_FROM_COLLECTION",payload:{name:t.name,element:e}})}),[n,t.name]);return Object(u.jsxs)("div",{className:"box set",children:[Object(u.jsx)("header",{children:Object(u.jsx)("input",{type:"text",maxLength:1,defaultValue:t.name,onKeyUp:r,ref:a})}),Object(u.jsx)("main",{children:t.elements.map((function(e,t){return Object(u.jsx)("div",{className:"element",onClick:function(){return l(e)},children:Object(u.jsx)("span",{children:e})},t)}))}),Object(u.jsx)("div",{className:"add",children:Object(u.jsx)("input",{type:"text",onKeyUp:o})}),Object(u.jsx)("div",{className:"delete",children:Object(u.jsx)("button",{onClick:i,children:"Del"})}),Object(u.jsx)("footer",{children:t.elements.length})]})}),x=(n(16),function(){var e=b(),t=e.state,n=e.dispatch,a=Object(c.useCallback)((function(){n({type:"ADD_COLLECTION"})}),[n]);return Object(u.jsxs)("div",{className:"collections",children:[t.collections.map((function(e,t){return Object(u.jsx)(v,{collection:e},t)})),Object(u.jsx)("button",{className:"add",onClick:a,children:"Add Set"})]})}),p=(n(17),{symmetry:'<svg viewBox="0 0 384 384"><path d="M234.667 0H192c0 106.027-85.973 192-192 192v42.667C129.6 234.667 234.667 129.6 234.667 0z"/><path d="M149.333 0h-42.667C106.667 58.88 58.88 106.667 0 106.667v42.667C82.453 149.333 149.333 82.453 149.333 0zM64 0H0v64c35.307 0 64-28.693 64-64zM234.667 384h42.667c0-58.88 47.787-106.667 106.667-106.667v-42.667c-82.454.001-149.334 66.881-149.334 149.334z"/><path d="M149.333 384H192c0-106.027 85.973-192 192-192v-42.667C254.4 149.333 149.333 254.4 149.333 384zM320 384h64v-64c-35.307 0-64 28.693-64 64z"/></svg>',grid:'<svg viewBox="0 0 408 408"><path d="M0 102h102V0H0v102zm153 306h102V306H153v102zM0 408h102V306H0v102zm0-153h102V153H0v102zm153 0h102V153H153v102zM306 0v102h102V0H306zM153 102h102V0H153v102zm153 153h102V153H306v102zm0 153h102V306H306v102z"/></svg>',plus:'<svg viewBox="0 0 357 357"><path d="M357 204H204v153h-51V204H0v-51h153V0h51v153h153v51z"/></svg>',heart:'<svg viewBox="0 0 391.837 391.837"><path d="M285.257 35.528c58.743.286 106.294 47.836 106.58 106.58 0 107.624-195.918 214.204-195.918 214.204S0 248.165 0 142.108c0-58.862 47.717-106.58 106.58-106.58a105.534 105.534 0 0189.339 48.065 106.578 106.578 0 0189.338-48.065z" /></svg>'}),g=function(e){var t=e.name,n=Object(c.useMemo)((function(){return{__html:p[t]}}),[t]);return Object(u.jsx)("div",{className:"icon",dangerouslySetInnerHTML:n})},C=(n(18),function(e){var t=e.icon,n=e.text,c=e.className;return Object(u.jsxs)("div",{className:"chips ".concat(c),title:n,children:[Object(u.jsx)(g,{name:t}),n&&Object(u.jsx)("main",{children:n})]})}),E=(n(19),function(e){var t=e.name,n=e.domain,a=e.range,r=e.relation,o=e.changed,l=Object(c.useState)({domain:null,range:null}),d=Object(i.a)(l,2),j=d[0],O=d[1],m=Object(c.useCallback)((function(e,t){O({domain:e,range:t})}),[O]),f=Object(c.useCallback)((function(){O({domain:null,range:null})}),[O]),b=Object(c.useCallback)((function(e,t){o&&(o(e,t),O((function(e){return Object(s.a)({},e)})))}),[o,O]),h=Object(c.useCallback)((function(e,t){return r.nodes.some((function(n){var c=Object(i.a)(n,2),a=c[0],r=c[1];return e===a&&t===r}))}),[r]),v=Object(u.jsxs)("main",{children:[Object(u.jsxs)("div",{className:"domain",children:[Object(u.jsx)("div",{}),n.map((function(e,t){return Object(u.jsx)("div",{className:j.domain===e?"hovered":"",children:e},t)}))]}),Object(u.jsxs)("div",{className:"range",children:[Object(u.jsx)("div",{}),a.map((function(e,t){return Object(u.jsx)("div",{className:j.range===e?"hovered":"",children:e},t)}))]}),Object(u.jsx)("div",{className:"table",onMouseLeave:f,children:n.map((function(e,t){return Object(u.jsx)("div",{className:"row",children:a.map((function(t,n){return Object(u.jsx)("div",{onMouseEnter:function(){return m(e,t)},onClick:function(){return b(e,t)},title:"(".concat(e,", ").concat(t,")"),children:Object(u.jsx)("span",{children:h(e,t)?"1":"0"})},n)}))},t)}))})]});return Object(u.jsxs)("div",{className:"matrix",children:[Object(u.jsxs)("header",{children:["M",Object(u.jsx)("span",{children:t})]}),n.length>0&&a.length>0?v:Object(u.jsx)("div",{className:"empty",children:"N/A"})]})}),N=(n(20),2*Math.PI),y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t>0?Math.max(t,Math.min(e-t,Math.floor(Math.random()*e))):Math.floor(Math.random()*e)},M=function(e){var t=e.relation,n=Object(c.useRef)(null),a=b().state,r=Object(c.useMemo)((function(){return a.collections.find((function(e){return e.name===t.source}))}),[a.collections,t.source]),o=Object(c.useMemo)((function(){return a.collections.find((function(e){return e.name===t.target}))}),[a.collections,t.target]);return Object(c.useEffect)((function(){var e=n.current.getContext("2d");e.textAlign="center",e.textBaseline="middle",e.font="14px sans-serif"}),[]),Object(c.useEffect)((function(){var e=n.current,c=e.height,a=e.width,l=e.getContext("2d");if(l.fillStyle="#f5f5f5",l.fillRect(0,0,a,c),l.fillStyle="#000",t.source===t.target)t.nodes.forEach((function(e,t){var n=Object(i.a)(e,1)[0],r=y(a,9),o=y(c,9);l.beginPath(),l.arc(r,o,8,0,N),l.closePath(),l.stroke(),l.beginPath(),l.fillText(n,r,o,16)}));else{var s=a/4,u=.2*s,d=c/2,j=c/r.elements.length,O=c/o.elements.length;l.beginPath(),l.ellipse(s,d,s/2,.9*d,0,0,N),l.stroke(),l.beginPath(),l.ellipse(3*s,d,s/2,.9*d,0,0,N),l.stroke(),r.elements.forEach((function(e,t){l.fillText(e,s,j*t+j/2,s)})),o.elements.forEach((function(e,t){l.fillText(e,3*s,O*t+O/2,s)})),t.nodes.forEach((function(e){var t=Object(i.a)(e,2),n=t[0],c=t[1],a=r.elements.findIndex((function(e){return e===n})),d=o.elements.findIndex((function(e){return e===c}));!function(e,t,n){var c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:8,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:30,r=-(a=180-a)*Math.PI/180,o=a*Math.PI/180,i=n[0]-t[0],l=n[1]-t[1];e.beginPath(),e.moveTo(t[0],t[1]),e.lineTo(n[0],n[1]),e.stroke();var s=Math.atan2(l,i),u=n[0]+c*Math.cos(s+r),d=n[1]+c*Math.sin(s+r),j=n[0]+c*Math.cos(s+o),O=n[1]+c*Math.sin(s+o);e.beginPath(),e.moveTo(n[0],n[1]),e.lineTo(u,d),e.stroke(),e.beginPath(),e.moveTo(n[0],n[1]),e.lineTo(j,O),e.stroke()}(l,[s+u,j*a+j/2],[3*s-u,O*d+O/2],6)}))}}),[t,a,r,o]),Object(u.jsx)("div",{className:"diagram",children:Object(u.jsx)("canvas",{ref:n})})},T=(n(21),function(e){var t=e.changed,n=b().state,a=Object(c.useState)(!1),r=Object(i.a)(a,2),o=r[0],l=r[1],s=Object(c.useState)(""),d=Object(i.a)(s,2),j=d[0],O=d[1],m=Object(c.useMemo)((function(){return n.collections.map((function(e){return e.name})).sort((function(e,t){return t===j?0:-1}))}),[n,j]);Object(c.useEffect)((function(){window.addEventListener("click",(function(){o&&l(!1)}))}),[o,l]);var f=Object(c.useCallback)((function(e){e.stopPropagation()}),[]),h=Object(c.useCallback)((function(){l(!o)}),[o,l]),v=Object(c.useCallback)((function(e){O(e),t&&t(e),l(!o)}),[o,l,O,t]);return Object(u.jsxs)("div",{className:"box select-relation ".concat(o?"open":""),onClick:f,children:[Object(u.jsx)("header",{onClick:h,children:Object(u.jsx)("div",{className:"item",children:j||"#"})}),Object(u.jsx)("main",{children:m.map((function(e,t){return Object(u.jsx)("div",{className:"item",onClick:function(){return v(e)},children:e},t)}))})]})}),L=(n(22),function(e){var t=e.relation,n=b(),a=n.state,r=n.dispatch,o=Object(c.useState)(""),l=Object(i.a)(o,2),s=l[0],d=l[1],j=Object(c.useState)(""),O=Object(i.a)(j,2),m=O[0],f=O[1],h=Object(c.useMemo)((function(){var e;return null===(e=a.collections.find((function(e){return e.name===t.source})))||void 0===e?void 0:e.elements}),[a,t.source]),v=Object(c.useMemo)((function(){var e;return null===(e=a.collections.find((function(e){return e.name===t.target})))||void 0===e?void 0:e.elements}),[a,t.target]),x=Object(c.useMemo)((function(){return h&&v&&t.nodes.length===h.length*v.length}),[t.nodes.length,h,v]);Object(c.useEffect)((function(){t.source&&d(t.source),t.target&&f(t.target)}),[t.source,t.target,d,f]);var p=Object(c.useCallback)((function(e){d(e),r({type:"UPDATE_RELATION_SOURCE",payload:{name:t.name,source:e}})}),[d,r,t.name]),g=Object(c.useCallback)((function(e){f(e),r({type:"UPDATE_RELATION_TARGET",payload:{name:t.name,target:e}})}),[f,r,t.name]),N=Object(c.useCallback)((function(e,n){r({type:"TOGGLE_RELATION_NODE",payload:{name:t.name,node:[e,n]}})}),[r,t.name]);return Object(u.jsxs)("div",{className:"box column relation",children:[Object(u.jsxs)("header",{className:"flex-align",children:[Object(u.jsxs)("div",{className:"flex-align relation-details",children:[Object(u.jsx)("input",{type:"text",maxLength:1,defaultValue:t.name}),"=",Object(u.jsx)(T,{changed:function(e){return p(e)}}),"->",Object(u.jsx)(T,{changed:function(e){return g(e)}})]}),Object(u.jsx)("div",{className:"flex-align attributes",children:Object(u.jsx)(C,{icon:"grid",text:"Filled",className:x?"on":"off"})})]}),(!s||!m)&&Object(u.jsx)("main",{className:"not-ready",children:"Select source and target sets!"}),s&&m&&Object(u.jsxs)("main",{children:[Object(u.jsx)(E,{name:t.name,relation:t,domain:h,range:v,changed:N}),Object(u.jsx)(M,{relation:t})]})]})}),k=(n(23),function(){var e=b(),t=e.state,n=e.dispatch,a=Object(c.useCallback)((function(){n({type:"ADD_RELATION"})}),[n]);return Object(u.jsxs)("div",{className:"relations",children:[Object(u.jsx)("main",{children:t.relations.map((function(e,t){return Object(u.jsx)(L,{relation:e},t)}))}),Object(u.jsx)("footer",{children:Object(u.jsx)("button",{className:"add",onClick:a,children:"Add Relation"})})]})});var A=function(){return Object(u.jsx)(h,{children:Object(u.jsxs)("div",{className:"app",children:[Object(u.jsx)(x,{}),Object(u.jsx)(k,{}),Object(u.jsxs)("footer",{children:["With",Object(u.jsx)("span",{className:"love",children:Object(u.jsx)(g,{name:"heart"})}),"By",Object(u.jsx)("strong",{children:Object(u.jsx)("a",{href:"https://rahmaniali.ir",target:"_blank",rel:"noreferrer",children:"Ali Rahmani"})})]})]})})},_=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,25)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),r(e),o(e)}))};o.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(A,{})}),document.getElementById("root")),_()}],[[24,1,2]]]);
//# sourceMappingURL=main.6445dce6.chunk.js.map