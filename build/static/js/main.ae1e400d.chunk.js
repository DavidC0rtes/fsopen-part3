(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),u=t.n(o),c=t(4),l=t(2),i=function(e){var n=e.person,t=e.removePerson;return r.a.createElement("p",null,n.name," ",n.number,r.a.createElement("button",{onClick:t,key:n.name},"delete"))},m=function(e){return r.a.createElement("form",{onSubmit:e.addName},r.a.createElement(r.a.Fragment,null," name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNewName})," "),r.a.createElement(r.a.Fragment,null," number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNewNumber})),r.a.createElement(r.a.Fragment,null," ",r.a.createElement("button",{type:"submit"},"add")," "))},d=function(e){var n=e.numbersToShow,t=e.removeNumberOf;return r.a.createElement("div",null,n.map((function(e){return r.a.createElement(i,{key:e.name,person:e,removePerson:function(){return window.confirm("Delete ".concat(e.name,"?"))&&t(e.id)}})})))},f=function(e){var n=e.newFilter,t=e.handleNewFilter;return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:n,onChange:t}))},s=function(e){var n=e.message;if(null===n)return null;var t={color:"success"===n.type?"green":"red",background:"lightgrey",fontStyle:"italic",borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return r.a.createElement("div",{style:t},n.text)},b=t(3),h=t.n(b),p="/api/persons",v=function(){return h.a.get(p).then((function(e){return e.data}))},w=function(e){return h.a.post(p,e).then((function(e){return e.data}))},E=function(e){return h.a.delete("".concat(p,"/").concat(e)).then((function(e){return e.data}))},g=function(e,n){return h.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))},N=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),i=Object(l.a)(u,2),b=i[0],h=i[1],p=Object(a.useState)(""),N=Object(l.a)(p,2),y=N[0],O=N[1],j=Object(a.useState)(""),k=Object(l.a)(j,2),S=k[0],x=k[1],F=Object(a.useState)(null),T=Object(l.a)(F,2),C=T[0],I=T[1];Object(a.useEffect)((function(){v().then((function(e){o(e)}))}),[]);var P=function(e){var n=Object(c.a)(Object(c.a)({},e),{},{number:y}),a=e.id;g(a,n).then((function(n){o(t.map((function(e){return e.id!==a?e:n}))),I({text:"Updated phone number of ".concat(e.name),type:"success"}),setTimeout((function(){I(null)}),4e3)})).catch((function(n){n.message.includes("400")?I({text:"Information of ".concat(e.name," didn't pass validations."),type:"error"}):I({text:"Information of ".concat(e.name," has already been removed from server"),type:"error"}),o(t.filter((function(e){return e.id!==a}))),setTimeout((function(){I(null)}),6e3)}))},A=S?t.filter((function(e){return e.name.match(new RegExp(S,"i"))})):t;return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(s,{message:C}),r.a.createElement(f,{newFilter:S,handleNewFilter:function(e){return x(e.target.value)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(m,{addName:function(e){e.preventDefault();var n=t.filter((function(e){return e.name===b}));n.length?window.confirm("".concat(b," is already added to phonebook, replace the old number with a new one?"))&&P(n[0]):(w({name:b,number:y}).then((function(e){o(t.concat(e)),I({text:"Added ".concat(b),type:"success"})})).catch((function(e){I({text:e.response.data.error,type:"error"}),console.log(e.response.data)})),setTimeout((function(){I(null)}),6e3));h(""),O("")},newName:b,newNumber:y,handleNewName:function(e){return h(e.target.value)},handleNewNumber:function(e){return O(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(d,{numbersToShow:A,removeNumberOf:function(e){E(e).then((function(){o(t.filter((function(n){return n.id!==e})))}))}}))};u.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.ae1e400d.chunk.js.map