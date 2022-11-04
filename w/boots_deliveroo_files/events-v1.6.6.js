(()=>{var t={16:function(t,e){var n;t.exports=(n=n||function(t,e){var n=Object.create||function(){function t(){}return function(e){var n;return t.prototype=e,n=new t,t.prototype=null,n}}(),r={},o=r.lib={},i=o.Base={extend:function(t){var e=n(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},a=o.WordArray=i.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||s).stringify(this)},concat:function(t){var e=this.words,n=t.words,r=this.sigBytes,o=t.sigBytes;if(this.clamp(),r%4)for(var i=0;i<o;i++){var a=n[i>>>2]>>>24-i%4*8&255;e[r+i>>>2]|=a<<24-(r+i)%4*8}else for(i=0;i<o;i+=4)e[r+i>>>2]=n[i>>>2];return this.sigBytes+=o,this},clamp:function(){var e=this.words,n=this.sigBytes;e[n>>>2]&=4294967295<<32-n%4*8,e.length=t.ceil(n/4)},clone:function(){var t=i.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var n,r=[],o=function(e){var n=987654321,r=4294967295;return function(){var o=((n=36969*(65535&n)+(n>>16)&r)<<16)+(e=18e3*(65535&e)+(e>>16)&r)&r;return o/=4294967296,(o+=.5)*(t.random()>.5?1:-1)}},i=0;i<e;i+=4){var c=o(4294967296*(n||t.random()));n=987654071*c(),r.push(4294967296*c()|0)}return new a.init(r,e)}}),c=r.enc={},s=c.Hex={stringify:function(t){for(var e=t.words,n=t.sigBytes,r=[],o=0;o<n;o++){var i=e[o>>>2]>>>24-o%4*8&255;r.push((i>>>4).toString(16)),r.push((15&i).toString(16))}return r.join("")},parse:function(t){for(var e=t.length,n=[],r=0;r<e;r+=2)n[r>>>3]|=parseInt(t.substr(r,2),16)<<24-r%8*4;return new a.init(n,e/2)}},u=c.Latin1={stringify:function(t){for(var e=t.words,n=t.sigBytes,r=[],o=0;o<n;o++){var i=e[o>>>2]>>>24-o%4*8&255;r.push(String.fromCharCode(i))}return r.join("")},parse:function(t){for(var e=t.length,n=[],r=0;r<e;r++)n[r>>>2]|=(255&t.charCodeAt(r))<<24-r%4*8;return new a.init(n,e)}},f=c.Utf8={stringify:function(t){try{return decodeURIComponent(escape(u.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return u.parse(unescape(encodeURIComponent(t)))}},l=o.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=new a.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=f.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var n=this._data,r=n.words,o=n.sigBytes,i=this.blockSize,c=o/(4*i),s=(c=e?t.ceil(c):t.max((0|c)-this._minBufferSize,0))*i,u=t.min(4*s,o);if(s){for(var f=0;f<s;f+=i)this._doProcessBlock(r,f);var l=r.splice(0,s);n.sigBytes-=u}return new a.init(l,u)},clone:function(){var t=i.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),d=(o.Hasher=l.extend({cfg:i.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){l.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,n){return new t.init(n).finalize(e)}},_createHmacHelper:function(t){return function(e,n){return new d.HMAC.init(t,n).finalize(e)}}}),r.algo={});return r}(Math),n)},476:function(t,e,n){var r;t.exports=(r=n(16),n(530),n(672),r.HmacSHA256)},672:function(t,e,n){var r,o,i;t.exports=(o=(r=n(16)).lib.Base,i=r.enc.Utf8,void(r.algo.HMAC=o.extend({init:function(t,e){t=this._hasher=new t.init,"string"==typeof e&&(e=i.parse(e));var n=t.blockSize,r=4*n;e.sigBytes>r&&(e=t.finalize(e)),e.clamp();for(var o=this._oKey=e.clone(),a=this._iKey=e.clone(),c=o.words,s=a.words,u=0;u<n;u++)c[u]^=1549556828,s[u]^=909522486;o.sigBytes=a.sigBytes=r,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var e=this._hasher,n=e.finalize(t);return e.reset(),e.finalize(this._oKey.clone().concat(n))}})))},530:function(t,e,n){var r;t.exports=(r=n(16),function(t){var e=r,n=e.lib,o=n.WordArray,i=n.Hasher,a=e.algo,c=[],s=[];!function(){function e(e){for(var n=t.sqrt(e),r=2;r<=n;r++)if(!(e%r))return!1;return!0}function n(t){return 4294967296*(t-(0|t))|0}for(var r=2,o=0;o<64;)e(r)&&(o<8&&(c[o]=n(t.pow(r,.5))),s[o]=n(t.pow(r,1/3)),o++),r++}();var u=[],f=a.SHA256=i.extend({_doReset:function(){this._hash=new o.init(c.slice(0))},_doProcessBlock:function(t,e){for(var n=this._hash.words,r=n[0],o=n[1],i=n[2],a=n[3],c=n[4],f=n[5],l=n[6],d=n[7],h=0;h<64;h++){if(h<16)u[h]=0|t[e+h];else{var p=u[h-15],y=(p<<25|p>>>7)^(p<<14|p>>>18)^p>>>3,v=u[h-2],g=(v<<15|v>>>17)^(v<<13|v>>>19)^v>>>10;u[h]=y+u[h-7]+g+u[h-16]}var m=r&o^r&i^o&i,b=(r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22),w=d+((c<<26|c>>>6)^(c<<21|c>>>11)^(c<<7|c>>>25))+(c&f^~c&l)+s[h]+u[h];d=l,l=f,f=c,c=a+w|0,a=i,i=o,o=r,r=w+(b+m)|0}n[0]=n[0]+r|0,n[1]=n[1]+o|0,n[2]=n[2]+i|0,n[3]=n[3]+a|0,n[4]=n[4]+c|0,n[5]=n[5]+f|0,n[6]=n[6]+l|0,n[7]=n[7]+d|0},_doFinalize:function(){var e=this._data,n=e.words,r=8*this._nDataBytes,o=8*e.sigBytes;return n[o>>>5]|=128<<24-o%32,n[14+(o+64>>>9<<4)]=t.floor(r/4294967296),n[15+(o+64>>>9<<4)]=r,e.sigBytes=4*n.length,this._process(),this._hash},clone:function(){var t=i.clone.call(this);return t._hash=this._hash.clone(),t}});e.SHA256=i._createHelper(f),e.HmacSHA256=i._createHmacHelper(f)}(Math),r.SHA256)},373:(t,e)=>{!function(t){var e,n,r,o=String.fromCharCode;function i(t){for(var e,n,r=[],o=0,i=t.length;o<i;)(e=t.charCodeAt(o++))>=55296&&e<=56319&&o<i?56320==(64512&(n=t.charCodeAt(o++)))?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),o--):r.push(e);return r}function a(t){if(t>=55296&&t<=57343)throw Error("Lone surrogate U+"+t.toString(16).toUpperCase()+" is not a scalar value")}function c(t,e){return o(t>>e&63|128)}function s(t){if(0==(4294967168&t))return o(t);var e="";return 0==(4294965248&t)?e=o(t>>6&31|192):0==(4294901760&t)?(a(t),e=o(t>>12&15|224),e+=c(t,6)):0==(4292870144&t)&&(e=o(t>>18&7|240),e+=c(t,12),e+=c(t,6)),e+o(63&t|128)}function u(){if(r>=n)throw Error("Invalid byte index");var t=255&e[r];if(r++,128==(192&t))return 63&t;throw Error("Invalid continuation byte")}function f(){var t,o;if(r>n)throw Error("Invalid byte index");if(r==n)return!1;if(t=255&e[r],r++,0==(128&t))return t;if(192==(224&t)){if((o=(31&t)<<6|u())>=128)return o;throw Error("Invalid continuation byte")}if(224==(240&t)){if((o=(15&t)<<12|u()<<6|u())>=2048)return a(o),o;throw Error("Invalid continuation byte")}if(240==(248&t)&&(o=(7&t)<<18|u()<<12|u()<<6|u())>=65536&&o<=1114111)return o;throw Error("Invalid UTF-8 detected")}t.version="3.0.0",t.encode=function(t){for(var e=i(t),n=e.length,r=-1,o="";++r<n;)o+=s(e[r]);return o},t.decode=function(t){e=i(t),n=e.length,r=0;for(var a,c=[];!1!==(a=f());)c.push(a);return function(t){for(var e,n=t.length,r=-1,i="";++r<n;)(e=t[r])>65535&&(i+=o((e-=65536)>>>10&1023|55296),e=56320|1023&e),i+=o(e);return i}(c)}}(e)}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,n),i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};(()=>{"use strict";function t(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}n.r(r),n.d(r,{event:()=>Ut,logger:()=>$t,start:()=>Ft});var o=n(476),i=n.n(o),a=n(530),c=n.n(a);var s=setTimeout;function u(t){return Boolean(t&&void 0!==t.length)}function f(){}function l(t){if(!(this instanceof l))throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],g(t,this)}function d(t,e){for(;3===t._state;)t=t._value;0!==t._state?(t._handled=!0,l._immediateFn((function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null!==n){var r;try{r=n(t._value)}catch(t){return void p(e.promise,t)}h(e.promise,r)}else(1===t._state?h:p)(e.promise,t._value)}))):t._deferreds.push(e)}function h(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof l)return t._state=3,t._value=e,void y(t);if("function"==typeof n)return void g((r=n,o=e,function(){r.apply(o,arguments)}),t)}t._state=1,t._value=e,y(t)}catch(e){p(t,e)}var r,o}function p(t,e){t._state=2,t._value=e,y(t)}function y(t){2===t._state&&0===t._deferreds.length&&l._immediateFn((function(){t._handled||l._unhandledRejectionFn(t._value)}));for(var e=0,n=t._deferreds.length;e<n;e++)d(t,t._deferreds[e]);t._deferreds=null}function v(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function g(t,e){var n=!1;try{t((function(t){n||(n=!0,h(e,t))}),(function(t){n||(n=!0,p(e,t))}))}catch(t){if(n)return;n=!0,p(e,t)}}l.prototype.catch=function(t){return this.then(null,t)},l.prototype.then=function(t,e){var n=new this.constructor(f);return d(this,new v(t,e,n)),n},l.prototype.finally=function(t){var e=this.constructor;return this.then((function(n){return e.resolve(t()).then((function(){return n}))}),(function(n){return e.resolve(t()).then((function(){return e.reject(n)}))}))},l.all=function(t){return new l((function(e,n){if(!u(t))return n(new TypeError("Promise.all accepts an array"));var r=Array.prototype.slice.call(t);if(0===r.length)return e([]);var o=r.length;function i(t,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var c=a.then;if("function"==typeof c)return void c.call(a,(function(e){i(t,e)}),n)}r[t]=a,0==--o&&e(r)}catch(t){n(t)}}for(var a=0;a<r.length;a++)i(a,r[a])}))},l.allSettled=function(t){return new this((function(e,n){if(!t||void 0===t.length)return n(new TypeError(typeof t+" "+t+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var r=Array.prototype.slice.call(t);if(0===r.length)return e([]);var o=r.length;function i(t,n){if(n&&("object"==typeof n||"function"==typeof n)){var a=n.then;if("function"==typeof a)return void a.call(n,(function(e){i(t,e)}),(function(n){r[t]={status:"rejected",reason:n},0==--o&&e(r)}))}r[t]={status:"fulfilled",value:n},0==--o&&e(r)}for(var a=0;a<r.length;a++)i(a,r[a])}))},l.resolve=function(t){return t&&"object"==typeof t&&t.constructor===l?t:new l((function(e){e(t)}))},l.reject=function(t){return new l((function(e,n){n(t)}))},l.race=function(t){return new l((function(e,n){if(!u(t))return n(new TypeError("Promise.race accepts an array"));for(var r=0,o=t.length;r<o;r++)l.resolve(t[r]).then(e,n)}))},l._immediateFn="function"==typeof setImmediate&&function(t){setImmediate(t)}||function(t){s(t,0)},l._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)};const m=l;var b=Date.now(),w=(new Date).getTime(),S=!0,I=0,_=function(){return S?Date.now()-I:(new Date).getTime()-I},O=function(){return new Date((new Date).getTime()-I)};("number"!=typeof b||Math.abs(w-b)<10)&&(S=!1);var T,j,A="smc_lse_iframe";!function(t){t.SMCT="S",t.LOCALSTORAGE="L",t.XDOMAIN="C",t.MEMORY="M",t.FAILED="F"}(T||(T={}));var k,C,P,x,D,E,M,B={},R={},N=function(t,e){return new m((function(n,r){F().then((function(r){var o={action:"set",name:t,string:btoa(JSON.stringify(e))};switch(r){case T.SMCT:$smcT5.LS.set(o.name,o.string);break;case T.XDOMAIN:H(o);break;case T.LOCALSTORAGE:localStorage.setItem(o.name,o.string);break;case T.MEMORY:R[o.name]=o.string}n()})).catch(r)}))},H=function(t){var e=window.frames[A];return!!e&&(e.postMessage(t,"*"),!0)},$=function(t){return new m((function(e,n){F().then((function(r){switch(r){case T.SMCT:$smcT5.LS.get(t,(function(t){var n="string"==typeof t&&"e"===t.charAt(0)&&"y"===t.charAt(1)?atob(t):t;if("string"==typeof n&&"{"===n.charAt(0)&&"}"===n.charAt(n.length-1))try{n=JSON.parse(n)}catch(t){}e(n)}));break;case T.XDOMAIN:var o="px2_".concat(_());B[o]={resolver:e,rejectId:setTimeout((function(){n({error:"No response from iFrame within 0.5s: "+t})}),500)},H({action:"get",name:t,id:o});break;case T.LOCALSTORAGE:e(localStorage.getItem(t));break;case T.MEMORY:e(R[t]),delete R[t]}})).catch(n)}))},F=function(){return new m((function(t,e){j?t(j):z().then((function(e){t(j=e)}))}))},z=function(){return new m((function(t){try{var n="smc_pxv2_lsac";$smcT5.LS.set(n,{value:!0}),$smcT5.LS.get(n,(function(e){if(!e||!e.value)throw"Smarter Click LS not available";$smcT5.LS.del(n),t(T.SMCT)}))}catch(n){try{var r;(r=document.createElement("iframe")).setAttribute("src","https://ls.smct.io/lse1.3.html"),r.setAttribute("id",A),r.setAttribute("name",A),r.setAttribute("style","visibility:hidden;width:0;height:0;position:fixed;bottom:-10px;right:-10px;"),document.getElementsByTagName("body")[0].appendChild(r),r.onload=function(){t(T.XDOMAIN)},r.onerror=function(){throw"No iFrame allowed"},window.addEventListener("message",(function(t){if(void 0!==t.data&&"callback"===t.data.action&&"object"===e(B[t.data.id])){var n={};try{n=t.data.data?JSON.parse(atob(t.data.data)):{}}catch(t){}B[t.data.id].resolver(n),clearTimeout(B[t.data.id].rejectId)}void 0!==t.data&&t.data.action}))}catch(e){!function(){var t="smc_test_ls";try{return localStorage.setItem(t,t),localStorage.removeItem(t),!0}catch(t){return!1}}()?t(T.MEMORY):t(T.LOCALSTORAGE)}}}))},L="smc_identity",U="smc_credential",J=function(){return"https://cognito-identity.".concat(k,".amazonaws.com")},G={content:{name:"Content-Type",value:"application/x-amz-json-1.1"},targetGetId:{name:"X-AMZ-TARGET",value:"AWSCognitoIdentityService.GetId"},targetGetCreds:{name:"X-AMZ-TARGET",value:"AWSCognitoIdentityService.GetCredentialsForIdentity"}},K=function(t){var e=t.IdentityId,n=t.refresh;if(!e)throw"No identity";return void 0!==n&&n?q({IdentityId:e}):$(U).then((function(t){var n=t.Credentials;if(n&&n.Expiration&&Date.now()<1e3*n.Expiration&&Date.now()>1e3*n.Expiration-366e4)return{IdentityId:e,Credentials:n};throw"No local credentials"})).catch((function(t){return q({IdentityId:e})}))},q=function(t){var e=t.IdentityId;return Bt({url:J(),body:JSON.stringify({IdentityId:e}),headers:[G.content,G.targetGetCreds]}).then((function(t){var n=t.Credentials;if(!n)throw"No credentials";return N(U,{Credentials:n}),{IdentityId:e,Credentials:n}}))},W=function(t){var e,n=t.setupIdentityPoolId,r=t.resolver,o=t.rejecter;(e=n,Bt({url:J(),body:JSON.stringify({IdentityPoolId:e}),headers:[G.content,G.targetGetId]}).then((function(t){var n=t.IdentityId;return N(L,{IdentityId:n,IdentityPoolId:e}).catch((function(t){})),{IdentityId:n}}))).then((function(t){var e=t.IdentityId;K({IdentityId:e}).then(r).catch((function(t){}))})).catch((function(t){o(t)}))},X=function(t,e){return new m((function(n,r){k=e,$(L).then((function(e){var o=e&&e.IdentityId?e.IdentityId:null,i=e&&e.IdentityPoolId?e.IdentityPoolId:null;o&&i&&"string"==typeof o&&i===t?K({IdentityId:o}).then(n).catch((function(e){W({resolver:n,setupIdentityPoolId:t,rejecter:r})})):W({resolver:n,setupIdentityPoolId:t,rejecter:r})})).catch((function(t){r(t)}))}))},V=n(373),Y=n.n(V),Z=[],Q=[],tt=[],et=[],nt=[],rt=[],ot=!1,it=!1,at=50,ct=50,st=!1,ut=!1,ft="",lt={},dt="",ht=function(){return it=!0},pt=function(){return ot=!0},yt={},vt=(yt=1===(null===(C=$smcT5)||void 0===C||null===(P=C.outputs)||void 0===P?void 0:P.b64)?JSON.parse(atob(null===(E=$smctData)||void 0===E?void 0:E.o)):null===(M=$smctData)||void 0===M?void 0:M.o)&&yt.pxEvents?yt.pxEvents:[],gt=function t(){if(it){if(Z.length){for(var e=0;e<Z.length;e++){var n=Z[e].payload;if(n.iid=ft,n.bto=I,navigator&&(n.ua=navigator.userAgent||""),lt)for(var r in lt)lt.hasOwnProperty(r)&&(n[r]=lt[r])}if(ot){for(e=0;e<Z.length;e++)x(Z[e]);Z=[],mt()}else!function(){var n=[],r=function(){var t=Z[e].payload,r=t.etm,o=t.uid,i=t.aid,a=t.cid,c=JSON.stringify(Z[e].payload),s=Y().encode(c),u=btoa(s),f="$"+r+"-$"+o+"-$"+i+"-$"+a,l=vt.filter((function(t){return t.id===i}));if(1===l.length){var d=l[0];$t("Recording activity ID ".concat(d.id," - [").concat(d.desc,"]"))}var h=function(){n.push({Data:u}),$t("Set new deduplication key: ".concat(dt=f))};dt?dt!==f?h():$t("Duplicate event found, not sending: ".concat(dt)):h()};for(e=0;e<Z.length;e++)r();Mt({target:"Firehose_20150804.PutRecordBatch",body:{DeliveryStreamName:D,Records:n}}).then((function(t){Z=[],mt()})).catch((function(e){ot=!0,st||(st=!0,t())}))}()}}else--at>0&&setTimeout((function(){t()}),100)},mt=function(){for(var t=0;t<et.length;t++)et[t]();et=[]},bt=function(){for(var t=0;t<rt.length;t++)rt[t]();rt=[]},wt=function(){for(var t=0;t<nt.length;t++)nt[t]();nt=[]},St=function(t){"object"!==e(t.payload)&&(t.payload={}),t.payload.etm=_(),t.payload.mtd="D",t.payload.odc=JSON.stringify([]),Z.push(t),t.callback&&"function"==typeof t.callback&&et.push(t.callback),gt()},It=function t(e){if(it){if(Q.length)if(ot){for(var n=0;n<Q.length;n++)x(Q[n]);Q=[],wt()}else{var r=[];for(n=0;n<Q.length;n++){var o=JSON.stringify(Q[n].payload),i=Y().encode(o),a=btoa(i);r.push({Data:a})}Mt({target:"Firehose_20150804.PutRecordBatch",body:{DeliveryStreamName:e,Records:r}}).then((function(t){Q=[],wt()})).catch((function(n){ot=!0,st||(st=!0,t(e))}))}}else--at>0&&setTimeout((function(){t(e)}),100)},_t=function(t,n){"object"!==e(t.payload)&&(t.payload={}),t.payload.etm=_(),t.payload.mtd="D",t.payload.odc=JSON.stringify([]),Q.push(t),t.callback&&"function"==typeof t.callback&&nt.push(t.callback),It(n)},Ot=function t(e){if(it){if(tt.length)if(ot){for(var n=0;n<tt.length;n++)x(tt[n]);tt=[],bt()}else{var r=[];for(n=0;n<tt.length;n++){var o=JSON.stringify(tt[n].payload),i=Y().encode(o),a=btoa(i);r.push({Data:a})}Mt({target:"Firehose_20150804.PutRecordBatch",body:{DeliveryStreamName:e,Records:r}}).then((function(t){tt=[],bt()})).catch((function(n){ot=!0,ut||(ut=!0,t(e))}))}}else--ct>0&&setTimeout((function(){t(e)}),100)},Tt=function(t,n){"object"!==e(t.payload)&&(t.payload={}),t.payload.etm=_(),t.payload.mtd="D",tt.push(t),t.callback&&"function"==typeof t.callback&&rt.push(t.callback),Ot(n)};function jt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function At(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?jt(Object(r),!0).forEach((function(n){t(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):jt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var kt,Ct,Pt,xt="firehose",Dt={AccessKeyId:null,SecretKey:null,SessionToken:null,region:null},Et=function t(e){var n=e.region,r=e.IdentityId;setTimeout((function(){K({IdentityId:r,refresh:!0}).then((function(e){var r=e.Credentials,o=e.IdentityId;Dt=At(At({},r),{},{region:n}),t({IdentityId:o,region:n})})).catch((function(t){pt()}))}),18e5)},Mt=function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=O(),o=[r.getUTCFullYear(),"0".concat(r.getUTCMonth()+1).slice(-2),"0".concat(r.getUTCDate()).slice(-2),"T","0".concat(r.getUTCHours()).slice(-2),"0".concat(r.getUTCMinutes()).slice(-2),"0".concat(r.getUTCSeconds()).slice(-2),"Z"].join(""),a=o.substr(0,8),s=t.region||Dt.region||"eu-west-1",u=t.service||xt,f="string"==typeof t.path?t.path:"/";f="/"===f.charAt(0)?f:"/".concat(f);var l="string"==typeof t.method?t.method.toUpperCase():"POST",d="object"===e(t.query)?t.query:{},h=Object.keys(d).map((function(t){return"".concat(t,"=").concat(d[t])})).join("&");h=""!==h?"?".concat(h):"";var p="".concat(u,".").concat(s,".amazonaws.com"),y=t.target,v="https://".concat(p).concat(f).concat(h),g=JSON.stringify("object"===e(t.body)?t.body:{}),m=c()(g).toString(),b="".concat(a,"/").concat(s,"/").concat(u,"/aws4_request"),w={host:p,"x-amz-date":o,"x-amz-security-token":Dt.SessionToken,"x-amz-target":y},S=Object.keys(w).join(";"),I=Object.keys(w).map((function(t){return"".concat(t,":").concat(w[t])})).join("\n"),_="".concat(l,"\n").concat(f,"\n").concat(h,"\n").concat(I,"\n\n").concat(S,"\n").concat(m),T=c()(_).toString(),j="AWS4-HMAC-SHA256\n".concat(o,"\n").concat(b,"\n").concat(T),A=i()(a,"AWS4"+Dt.SecretKey),k=i()(s,A),C=i()(u,k),P=i()("aws4_request",C),x=i()(j,P).toString(),D={Authorization:"AWS4-HMAC-SHA256 Credential=".concat(Dt.AccessKeyId,"/").concat(b,", SignedHeaders=").concat(S,", Signature=").concat(x),"content-type":"application/x-amz-json-1.1"},E=At(At({},w),D);return Bt({detailsInput:t,isRetry:n,url:v,body:g,method:l,headers:Object.keys(E).map((function(t){return{name:t,value:E[t]}}))})},Bt=function(t){var e=t.body,n=t.method,r=void 0===n?"POST":n,o=t.url,i=t.headers,a=t.isRetry,c=void 0!==a&&a,s=t.detailsInput;return new m((function(t,n){var a=new XMLHttpRequest;a.open(r,o),i.filter((function(t){var e=t.name;return-1===["host"].indexOf(e)})).forEach((function(t){return a.setRequestHeader(t.name,t.value)})),a.timeout=4e3,a.onload=function(){try{if(e=a.getResponseHeader("date"),I=(new Date).getTime()-new Date(e).getTime(),a.status>=100&&a.status<400)t(JSON.parse(a.responseText||"{}"));else{if(c||400!==a.status||!JSON.parse(a.responseText).message.substr(0,"Signature expired".length))throw"HTTP request failed";Mt(s,!0).then(t)}}catch(t){n(t)}var e},a.ontimeout=function(t){n(t)},a.onerror=function(t){n(t)},a.send(e)}))};function Rt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function Nt(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?Rt(Object(r),!0).forEach((function(n){t(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Rt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Ht="smc-fp",$t=null===(kt=$smcT5)||void 0===kt||null===(Ct=kt.tagHelpers)||void 0===Ct||null===(Pt=Ct.DBC)||void 0===Pt?void 0:Pt.custom("Pixel Tracker","#9257ff"),Ft=function(t){var e,n=t.IdentityPoolId,r=t.callback,o=t.fallbackEvent;t.doFingerprint;try{x=o;var i=n.split(":")[0];e=n.split(":")[1],D=e,X(n,i).then((function(t){var e,n=t.Credentials,o=t.IdentityId;return e=o.split(":")[1],ft=e,function(t){var e=t.AccessKeyId,n=t.SecretKey,r=t.SessionToken,o=t.region,i=t.IdentityId;Dt={AccessKeyId:e,SecretKey:n,SessionToken:r,region:o},Et({IdentityId:i,region:o})}(Nt(Nt({},n),{},{region:i,IdentityId:o})),ht(),r(),$(Ht)})).then((function(t){return $t("then: getFingerprint",t),t&&t.fp?t:zt()})).then((function(t){var e=t.fp;return $t("then: setter fp 2:",e),N(Ht,{fp:e}),{fp:e}})).then((function(t){var e=t.fp;e?($t("then: setFingerprintProps",e),lt=e):$t("then: no fingerprint props",e)})).catch((function(t){$t("catch: init err",t,t.stack),Lt(t)}))}catch(t){$t("big try catch err",t,t.stack),Lt(t)}},zt=function(){return new m((function(t){var e={};try{if(!(function(){try{for(var t="smc_tpv=",e=decodeURIComponent(document.cookie).split(";"),n=0;n<e.length;n++){var r=e[n].trim();if(0===r.indexOf(t))return parseInt(r.substring(t.length,r.length))||0}}catch(t){}return 0}()>1))return void t({fp:e});for(var n=document.createElement("script"),r=document.getElementsByTagName("script"),o=0;o<r.length;o++)if($t("Trying to match events script... ".concat(o)),r[o].src.match(/events-v[0-9]*.[0-9]*.[0-9]*.js/)){$t("Matched events script file!",r[o].src),n.src=r[o].src.replace("events","fp");var i;if((i=$smcT5&&$smcT5.outputs&&1===$smcT5.outputs.b64?JSON.parse(atob($smctData.o)):$smctData.o)&&i.config&&1===i.config.enforceSri){var a=$smctResources.getSRI("px2a_fingerprint_url")||"sha512-sri.missing";a&&""!==a&&(n.integrity=a,n.crossOrigin="anonymous")}}document.getElementsByTagName("head")[0].appendChild(n);var c=setTimeout((function(){t({fp:e})}),500);n.onload=function(){clearTimeout(c),$smcT5&&$smcT5.TrackerV2&&$smcT5.TrackerV2.fingerprint&&"function"==typeof $smcT5.TrackerV2.fingerprint.make&&$smcT5.TrackerV2.fingerprint.make().then(t)},n.onerror=function(){clearTimeout(c),t({fp:e})}}catch(n){$t("GetFingerprint Error",n),t({fp:e})}}))},Lt=function(t){pt(),ht()},Ut=function(t){switch(t.type){case"overlay":St(t);break;case"pushsite":_t(t,"pushsite-sessions");break;case"machineLearning":Tt(t,"ml-delivery-stream")}}})(),$smcT5.TrackerV2.plugin=r})();