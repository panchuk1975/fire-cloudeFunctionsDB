(this["webpackJsonpnew-todo"]=this["webpackJsonpnew-todo"]||[]).push([[14],{121:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(27),o=a(83),r=a(79),s=a(86),m=a(5),i=a(122),u=a(120),d=a(91),E=a(90),f=a(88),w=a(78),h=Object(n.memo)((function(e){var t=e.dates,a=e.client,n=e.payments,c=e.userInfo,o=e.newProjects,r=e.sizeArray,s=e.openClientTableClass,h=e.openCurrentProject,j=e.clouseCurrentProject,p=e.windowWidth,P=e.setAlertClass,y=e.setAlertText,N=e.setFunct,b=e.setModalText,C=e.setModalClass,v=e.setId,z=e.modalClass,F=e.addPayment,k=e.openPayment,T=e.openNewPayment,D=e.clouseNewPayment,O=e.clousePayment;console.log(a);var g=m.a.auth.currentUser.uid,x=t.find((function(e){return e.owner===g}));x||(x={dateStart:"1970-01-01T00:00",dateFinish:"2070-01-01T00:00"});var M=function(e,t){for(var a=0,n=0;a<e;)n+=t[a].size,a++;return n};return l.a.createElement("form",null,l.a.createElement(i.a,{component:"ul",className:"project-group"},o.map((function(e){var t=Object(f.a)(e),m=n.filter((function(t){return t.paymentOwner===e.id})),i=w(new Date(e.projectReadinessDate)).format("YYYY-MM-DD")>=w(new Date).format("YYYY-MM-DD")?"goodTime":"badTime",g="\u0422\u0430\u043a"===e.signatur\u0443OfAct?"good":"bad",x="\u0422\u0430\u043a"===e.poketExistence?"good":"bad",I="\u0422\u0430\u043a"===e.contractExistence?"good":"bad";return l.a.createElement(u.a,{key:e.id,classNames:"note",timeout:800},l.a.createElement("li",{key:e.id,className:"project-group-item projectInnerLi"},!e.openProject&&l.a.createElement("div",{key:e.id,className:"projectBasis"},l.a.createElement("div",{className:"d-flex justify-content-between"},l.a.createElement("table",{className:"projectTable",onClick:function(){return h(e)}},l.a.createElement("tbody",null,l.a.createElement("tr",{align:"center"},p>75+M(1,r)&&l.a.createElement("td",{width:r[0].size,className:"head"},l.a.createElement("small",{className:"projectName"},t[0])),p>75+M(2,r)&&l.a.createElement("td",{width:r[1].size,className:"head ".concat(i)},l.a.createElement("small",{className:"smallProjectDateBold"},"".concat(w(t[1]).format("DD.MM.YY")))),p>75+M(3,r)&&l.a.createElement("td",{width:r[2].size},l.a.createElement("small",{className:I},t[2])),p>75+M(4,r)&&l.a.createElement("td",{width:r[3].size},l.a.createElement("small",{className:g},t[3])),p>75+M(5,r)&&l.a.createElement("td",{width:r[4].size},l.a.createElement("small",{className:x},t[4])),p>75+M(6,r)&&l.a.createElement("td",{width:r[5].size},l.a.createElement("small",null,t[5])),p>75+M(7,r)&&l.a.createElement("td",{width:r[6].size},l.a.createElement("small",null,t[6])),p>75+M(8,r)&&l.a.createElement("td",{width:r[7].size},l.a.createElement("small",null,t[7])),p>75+M(9,r)&&l.a.createElement("td",{width:r[8].size,className:"head"},l.a.createElement("small",null,"".concat(w(t[8]).format("DD.MM.YY")))),p>75+M(10,r)&&l.a.createElement("td",{width:r[9].size},l.a.createElement("small",null,t[9])),p>75+M(11,r)&&l.a.createElement("td",{width:r[10].size},l.a.createElement("small",null,t[10])),p>75+M(12,r)&&l.a.createElement("td",{width:r[11].size},l.a.createElement("small",null,t[11])),p>75+M(13,r)&&l.a.createElement("td",{width:r[12].size},l.a.createElement("small",null,t[12])),p>75+M(14,r)&&l.a.createElement("td",{width:r[13].size},l.a.createElement("small",null,t[13]))))),!e.openProject&!m.length&c.company===c.jointCompany&&l.a.createElement("button",{id:"deleteProjectBtn",type:"button",className:"btn btn-outline-danger btn-sm deleteProjectBtn",onClick:function(){v(e.id),N("removeList"),b("\u0412\u0438\u0434\u0430\u043b\u0435\u043d\u043d\u044f \u043f\u0440\u043e\u0435\u043a\u0442\u0443! \u0414\u043b\u044f \u0432\u0438\u0434\u0430\u043b\u0435\u043d\u043d\u044f \u043a\u043b\u0456\u0454\u043d\u0442\u0443 \u043d\u0435\u043e\u0431\u0445\u0456\u0434\u043d\u043e \u0432\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u0432\u0441\u0456 \u043f\u0440\u043e\u0435\u043a\u0442\u0438!!!"),C()}},"\u0425"))),l.a.createElement("div",null,l.a.createElement("div",{className:"clouseProjectBasis",onClick:function(){return j(e)}},e.openProject&&l.a.createElement("table",{className:"clouseProjectForm"},l.a.createElement("tbody",null,l.a.createElement("tr",{className:"clouseProjectTableButton"},l.a.createElement("td",null,"\u0417\u0430\u043a\u0440\u0438\u0442\u0438 \u0444\u043e\u0440\u043c\u0443 \u043f\u0440\u043e\u0435\u043a\u0442\u0430"))))),e.openProject&&l.a.createElement(E.a,{className:s,client:a,project:e,setAlertText:y,setAlertClass:P,newProjects:o,userInfo:c})),l.a.createElement(d.a,{project:e,setId:v,currentProjectPayments:m,openPayment:k,clousePayment:O,openNewPayment:T,clouseNewPayment:D,addPayment:F,setFunct:N,setModalClass:C,setModalText:b,windowWidth:p,setAlertText:y,setAlertClass:P,modalClass:z,userInfo:c})))}))))})),j=Object(n.memo)((function(e){var t=e.windowWidth,a=e.clientType,i=e.dates,u=e.client,d=e.userInfos,E=e.clients,w=e.projects,j=e.payments,p=e.removeProject,P=e.openCurrentProject,y=e.clouseCurrentProject,N=e.addPayment,b=e.openPayment,C=e.openNewPayment,v=e.clouseNewPayment,z=e.clousePayment,F=Object(n.useState)("modal"),k=Object(c.a)(F,2),T=k[0],D=k[1],O=Object(n.useState)(""),g=Object(c.a)(O,2),x=g[0],M=g[1],I=Object(n.useState)("modal"),Y=Object(c.a)(I,2),A=Y[0],S=Y[1],W=Object(n.useState)(""),B=Object(c.a)(W,2),L=B[0],U=B[1],R=Object(n.useState)(),J=Object(c.a)(R,2),q=J[0],G=J[1],H=Object(n.useState)(),K=Object(c.a)(H,2),Q=K[0],V=K[1],X=function(){(A="modal")?S("open"):S("modal")},Z=m.a.auth.currentUser.uid,$=d.find((function(e){return e.owner===Z}));if(!$)return null;var _=d.find((function(e){return e.company===$.jointCompany}));if(!_)return null;if((E=(E=E.filter((function(e){return e.owner===_.owner}))).filter((function(e){return e.clientType===a}))).sort((function(e,t){return new Date(t.registrationDate)-new Date(e.registrationDate)})),0===E.length)return null;var ee=Object(f.b)(t),te=function(e,t){for(var a=0,n=0;a<e;)n+=t[a].size,a++;return n};return w.sort((function(e,t){return new Date(e.projectReadinessDate)-new Date(t.projectReadinessDate)})),l.a.createElement("div",null,l.a.createElement("li",{className:"list-group-item clientInnerLi"},l.a.createElement("div",null,l.a.createElement("div",{className:"d-flex justify-content-between"},l.a.createElement("table",{className:"headTable"},l.a.createElement("tbody",null,l.a.createElement("tr",{align:"center"},t>75+te(1,ee)&&l.a.createElement("td",{width:ee[0].size,onClick:function(){U("showFunction"),G(ee[0].fullName),X()}},l.a.createElement("small",null,ee[0].name)),t>75+te(2,ee)&&l.a.createElement("td",{width:ee[1].size,onClick:function(){U("showFunction"),G(ee[1].fullName),X()}},l.a.createElement("small",null,ee[1].name)),t>75+te(3,ee)&&l.a.createElement("td",{width:ee[2].size,onClick:function(){U("showFunction"),G(ee[2].fullName),X()}},l.a.createElement("small",null,ee[2].name)),t>75+te(4,ee)&&l.a.createElement("td",{width:ee[3].size,onClick:function(){U("showFunction"),G(ee[3].fullName),X()}},l.a.createElement("small",null,ee[3].name)),t>75+te(5,ee)&&l.a.createElement("td",{width:ee[4].size,onClick:function(){U("showFunction"),G(ee[4].fullName),X()}},l.a.createElement("small",null,ee[4].name)),t>75+te(6,ee)&&l.a.createElement("td",{width:ee[5].size,onClick:function(){U("showFunction"),G(ee[5].fullName),X()}},l.a.createElement("small",null,ee[5].name)),t>75+te(7,ee)&&l.a.createElement("td",{width:ee[6].size,onClick:function(){U("showFunction"),G(ee[6].fullName),X()}},l.a.createElement("small",null,ee[6].name)),t>75+te(8,ee)&&l.a.createElement("td",{width:ee[7].size,onClick:function(){U("showFunction"),G(ee[7].fullName),X()}},l.a.createElement("small",null,ee[7].name)),t>75+te(9,ee)&&l.a.createElement("td",{width:ee[8].size,onClick:function(){U("showFunction"),G(ee[8].fullName),X()}},l.a.createElement("small",null,ee[8].name)),t>75+te(10,ee)&&l.a.createElement("td",{width:ee[9].size,onClick:function(){U("showFunction"),G(ee[9].fullName),X()}},l.a.createElement("small",null,ee[9].name)),t>75+te(11,ee)&&l.a.createElement("td",{width:ee[10].size,onClick:function(){U("showFunction"),G(ee[10].fullName),X()}},l.a.createElement("small",null,ee[10].name)),t>75+te(12,ee)&&l.a.createElement("td",{width:ee[11].size,onClick:function(){U("showFunction"),G(ee[11].fullName),X()}},l.a.createElement("small",null,ee[11].name)),t>75+te(13,ee)&&l.a.createElement("td",{width:ee[12].size,onClick:function(){U("showFunction"),G(ee[12].fullName),X()}},l.a.createElement("small",null,ee[12].name)),t>75+te(14,ee)&&l.a.createElement("td",{width:ee[13].size,onClick:function(){U("showFunction"),G(ee[13].fullName),X()}},l.a.createElement("small",null,ee[13].name)))))),l.a.createElement(h,{dates:i,payments:j,client:u,newProjects:w,removeProject:p,openCurrentProject:P,clouseCurrentProject:y,addPayment:N,openPayment:b,clousePayment:z,openNewPayment:C,clouseNewPayment:v,windowWidth:t,setAlertClass:D,setAlertText:M,setFunct:U,setModalText:G,setModalClass:X,setId:V,modalClass:A,sizeArray:ee,userInfo:$}),"removeList"===L&&l.a.createElement(o.a,{modalClass:A,modalText:q,modalFunction:S,Id:Q,innerFunction:p}),"showFunction"===L&&l.a.createElement(s.a,{modalClass:A,modalText:q,modalFunction:S}),l.a.createElement(r.a,{modalClass:T,modalText:x,modalFunction:D})),l.a.createElement("div",{className:"d-flex justify-content-between"})))})),p=a(26),P=a(16),y=Object(n.memo)((function(e){var t=e.windowWidth,a=m.a.auth.currentUser.email;a=a.split("@")[0];var c=Object(n.useContext)(p.a),o=c.clients,r=c.projects,s=c.payments,i=c.dates,u=c.userInfos,d=c.loading,E=c.fetchClients,f=c.fetchDates,w=c.fetchUsersInfo,h=c.openCurrentProject,y=c.clouseCurrentProject,N=c.removeProject,b=c.fetchProjects,C=c.addPayment,v=c.openPayment,z=c.openNewPayment,F=c.clouseNewPayment,k=c.clousePayment,T=c.fetchPayments;return Object(n.useEffect)((function(){E(),f(),w(),T(),b()}),[]),l.a.createElement("div",null,l.a.createElement("small",null,a),d?l.a.createElement(P.a,null):l.a.createElement(j,{dates:i,clients:o,projects:r,payments:s,userInfos:u,removeProject:N,clientType:"\u042e\u0440\u0456\u0434\u0438\u0447\u043d\u0438\u0439",windowWidth:t,openCurrentProject:h,clouseCurrentProject:y,fetchPayments:T,addPayment:C,openPayment:v,clousePayment:k,openNewPayment:z,clouseNewPayment:F}))}));t.default=y},86:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(0),l=a.n(n),c=function(e){var t=e.modalClass,a=e.modalText,n=e.modalFunction;return l.a.createElement("div",{id:t},l.a.createElement("div",{className:"showWindow"},l.a.createElement("div",{className:t},l.a.createElement("div",{className:"top-show-content"},l.a.createElement("button",{id:"deleteShowModal",type:"button",className:"btn btn-outline-secondary btn-sm",onClick:function(){n("modal")}},"\xd7"),l.a.createElement("p",null,a)))))}}}]);
//# sourceMappingURL=14.acce2d25.chunk.js.map