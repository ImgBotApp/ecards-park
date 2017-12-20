"use strict";!function(){function e(e){var t=e.type,s=null;if("text"===t||"email"===t||"password"===t)s=validate.single(e.value,e.rules);else if("checkbox"===t){var i=document.querySelector(e.selector.input);e.rules.presence&&!i.checked&&(s=e.rules.checkbox.message)}var n=document.querySelector(e.selector.notice);s?(n.innerText=s,n.classList.remove("is-hidden"),e.isValid=!1):(n.classList.add("is-hidden"),e.isValid=!0)}function t(){for(var e=0;e<s.inputs.length;e+=1){var t=s.inputs[e].selector.input,i=document.querySelector(t),n=i.type;"text"!==n&&"email"!==n&&"password"!==n||(i.focus(),i.blur()),"checkbox"===n&&(i.click(),i.click())}for(var c=!0,r=0;r<s.inputs.length;r+=1)if(!s.inputs[r].isValid){c=!1;break}if(c){var u=s.submit.selector.button+" .spinner";document.querySelector(u).classList.remove("is-hidden"),setTimeout(function(){for(var e=0;e<s.inputs.length;e+=1){var t=s.inputs[e].selector.input,i=document.querySelector(t),n=i.type;"text"!==n&&"email"!==n&&"password"!==n||(i.value=""),"checkbox"===n&&(i.checked=!1)}var c=s.submit.selector.button;document.querySelector(c).classList.add("is-hidden");var r=s.submit.selector.notice;document.querySelector(r).classList.remove("is-hidden")},3e3)}}var s={inputs:[{name:"fullName",type:"text",selector:{input:".js-full-name-input",notice:".js-full-name-notice"},rules:{presence:!0,length:{minimum:5,tooShort:"Needs to have %{count} characters or more."}},value:null,isValid:!1},{name:"email",type:"email",selector:{input:".js-email-input",notice:".js-email-notice"},rules:{presence:!0,email:{message:"Email address is not valid."}},value:null,isValid:!1},{name:"terms",type:"checkbox",selector:{input:".js-terms-input",notice:".js-terms-notice"},rules:{presence:!0,checkbox:{message:"Please agree with terms and conditions."}},isValid:!1}],submit:{selector:{button:".js-submit-button",notice:".js-submit-notice"},url:""}};!function(){for(var i=function(t){var i=s.inputs[t].selector.input,n=document.querySelector(i),c=n.type;"text"!==c&&"email"!==c&&"password"!==c||n.addEventListener("blur",function(i){s.inputs[t].value=i.target.value,e(s.inputs[t])}),"checkbox"===c&&n.addEventListener("click",function(){e(s.inputs[t])})},n=0;n<s.inputs.length;n+=1)i(n);document.querySelector(s.submit.selector.button).addEventListener("click",t)}()}();