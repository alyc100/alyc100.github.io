if(typeof window.__ta_cdif_frame==="undefined"){window.__ta_cdif_ready=false;window.__ta_cdif_frame=null;window.__ta_cdif_vars={'local':{},'session':{}};__tracead_jq(document).ready(function(){__tracead_jq('body').append('<iframe src="https://tracead.com/siteTagHandler.php?cId=5799&cdif=1" id="__tracead_cdif" name="__tracead_cdif" style="width: 10px; height: 10px; position: absolute; top: -9999px; left: -9999px;"></iframe>');window.addEventListener('message',function(event){if(typeof event.data==="string"&&event.data.substr(0,9)=="#tracead#"){var message=event.data.substr(9);window.__ta_cdif_vars=JSON.parse(message);__tracead_jq(document).trigger("__tracead_cdif:set");if(!window.__ta_cdif_ready){window.__ta_cdif_ready=true;window.__ta_cdif_frame=event.source;__tracead_jq(document).trigger("__tracead_cdif:ready");}}},false);});window.__tracead_jsonify=function(o){if(o&&typeof o==='object'&&typeof o.toJSON==='function'){return o.toJSON();}
return JSON.stringify(o);};window.__tracead_setvar=function(i,v,s){if(s!=='session')s='local';if(window.__ta_cdif_vars[s][i]!=v){window.__ta_cdif_vars[s][i]=v;__tracead_jq(document).trigger("__tracead_cdif:set");window.__ta_cdif_frame.postMessage("#tracead#"+window.__tracead_jsonify([s,i,v]),"*");}};window.__tracead_unsetvar=function(i,s){if(s!=='session')s='local';if(window.__ta_cdif_vars[s][i]){delete window.__ta_cdif_vars[s][i];window.__ta_cdif_frame.postMessage("#tracead#"+window.__tracead_jsonify([s,i]),"*");}};window.__tracead_getlocal=function(i){return window.__ta_cdif_vars['local'][i];};window.__tracead_getsession=function(i){return window.__ta_cdif_vars['session'][i];};}
window.__ta_number_find=function(sel){var number_selectors='a,b,div,em,h1,h2,h3,h4,h5,h6,li,p,small,span,strong,td,th,u,var,sup,sub,summary,section,s,q,output,ins,dt,dl,dfn,dd,caption,abbr';var parts=sel.split(':');var res=__tracead_jq(parts[0]).find(number_selectors).addBack().filter(':not(:has(*))');if(parts.length>1){res=res.filter(':'+parts[1]);}
return res;};window.__ta_number_formats=[{pattern:/(?:^|\s)(\$|€|£|kr\.?|EUR|DKK|GBP|USD|CAD|AUD|SEK|NOK)?\s*(\d{1,3}(?:,\d{3})*\.\d{2})\s*(\$|€|£|kr\.?|EUR|DKK|GBP|USD|CAD|AUD|SEK|NOK)?(?:\s|$)/,number:function(matches){return parseFloat(matches[2].replace(/,/g,''));},currency:function(matches){if(matches[1])return matches[1];if(matches[3])return matches[3];return null;}},{pattern:/(?:^|\s)(\$|€|£|kr\.?|EUR|DKK|GBP|USD|CAD|AUD|SEK|NOK)?\s*(\d{1,3}(?:\.\d{3})*\,\d{2})\s*(\$|€|£|kr\.?|EUR|DKK|GBP|USD|CAD|AUD|SEK|NOK)?(?:\s|$)/,number:function(matches){return parseFloat(matches[2].replace(/\./g,'').replace(/,/g,'.'));},currency:function(matches){if(matches[1])return matches[1];if(matches[3])return matches[3];return null;}},{pattern:/(?:^|\s)(\$|€|£|kr\.?|EUR|DKK|GBP|USD|CAD|AUD|SEK|NOK)?\s*(\d{1,3}(?:'\d{3})*\.\d{2})\s*(\$|€|£|kr\.?|EUR|DKK|GBP|USD|CAD|AUD|SEK|NOK)?(?:\s|$)/,number:function(matches){return parseFloat(matches[2].replace(/'/g,''));},currency:function(matches){if(matches[1])return matches[1];if(matches[3])return matches[3];return null;}},{pattern:/(?:^|\s)(\$|€|£|kr\.?|EUR|DKK|GBP|USD|CAD|AUD|SEK|NOK)?\s*(\d{1,3}(?:\s+\d{3})*\,\d{2})\s*(\$|€|£|kr\.?|EUR|DKK|GBP|USD|CAD|AUD|SEK|NOK)?(?:\s|$)/,number:function(matches){return parseFloat(matches[2].replace(/\s/g,'').replace(/,/g,'.'));},currency:function(matches){if(matches[1])return matches[1];if(matches[3])return matches[3];return null;}},{pattern:/\b(\d+[\.,]\d+)\b/,number:function(matches){return parseFloat(matches[1].replace(',','.'));},currency:function(matches){return null;}},{pattern:/\b(\d[\d\.,-]+\d)\b/,number:function(matches){return parseFloat(matches[1]);},currency:function(matches){return null;}},{pattern:/\b(\d+)\b/,number:function(matches){return parseFloat(matches[1]);},currency:function(matches){return null;}},{pattern:/(?:^|\s)(\$|€|£|kr\.?|EUR|DKK|GBP|USD|CAD|AUD|SEK|NOK)(?:\s|$)/,number:function(matches){return null;},currency:function(matches){if(matches[1])return matches[1];return null;}}];window.__tracead_sanh=function(host){var san=host;return san.replace(/^www\./,"")};window.__tracead_sanp=function(path){var san=path;return san.replace(/\/$/,"")};window.__tracead_fnm=function(pattern,string){for(var i=0,j=0;i<pattern.length;i++){var c=pattern[i];if(c=='*'){while(pattern[i+1]=='*'){i++;}
if(i>=pattern.length-1)return true;while(j<string.length){if(window.__tracead_fnm(pattern.substr(i+1),string.substr(j))){return true;}
j++;}}else{if(c!=string[j])return false;j++;}}
return j==string.length;};window.__tracead_fpqs=function(qs){var list={};if(!qs)return list;if(qs.substr(0,1)=='?')qs=qs.substr(1);var pairs=qs.split('&');__tracead_jq.each(pairs,function(i,pair){if(!pair)return true;var parts=pair.split('=');if(parts.length>2)parts.push('');list[unescape(parts[0])]=unescape(parts[1]);});return list;};window.__tracead_scvr=function(sc){var result=sc;var pattern=/\{\{([^:]+:[^\}]+)\}\}/g;var matches=pattern.exec(sc);while(matches!=null){var v=window.__tracead_getlocal(matches[1]);if(v===null||v===undefined)v='';result=result.replace(matches[0],escape(v));matches=pattern.exec(sc);}
return result;};window.__tracead_cllv_vm=[];window.__tracead_cllv_lc=new Date();window.__tracead_cllv_ax=false;(function(){var xhrorig=window.XMLHttpRequest.prototype.open;window.XMLHttpRequest.prototype.open=function(){var d=new Date();if((d-window.__tracead_cllv_lc)>2000){window.__tracead_cllv_lc=d;setTimeout(function(){window.__tracead_cllv_ax=true;__tracead_jq.each(window.__tracead_cllv_vm,function(i,vm){window.__tracead_cllv(vm[0],vm[1],vm[2]);});},1000);}
return xhrorig.apply(this,arguments);};})();window.__tracead_cllv_fmtnum=function(n,c,t,d){var c=isNaN(c=Math.abs(c))?2:c,d=d==undefined?".":d,t=t==undefined?",":t,s=n<0?"-":"",i=parseInt(n=Math.abs(+n||0).toFixed(c))+"",j=(j=i.length)>3?j%3:0;return s+(j?i.substr(0,j)+t:"")+i.substr(j).replace(/(\d{3})(?=\d)/g,"$1"+t)+(c?d+Math.abs(n-i).toFixed(c).slice(2):"");};window.__tracead_cllv_setfmt=function(v,val,pref,postf){var nval=null;var match_found=false;__tracead_jq.each(window.__ta_number_formats,function(i,format){var matches=String(val).match(format.pattern);if(matches){nval=format.number(matches);match_found=true;return false;}});if(!match_found&&__tracead_jq.isNumeric(val)){nval=parseFloat(val);}
if(__tracead_jq.isNumeric(nval)){if(pref=='cents'){nval=nval / 100.0;}
if(postf=='decimal'){nval=window.__tracead_cllv_fmtnum(nval,2,'','.');}else if(postf=='decimal_comma'){nval=window.__tracead_cllv_fmtnum(nval,2,'',',');}else if(postf=='us'){nval=window.__tracead_cllv_fmtnum(nval,2,',','.');}else if(postf=='german'){nval=window.__tracead_cllv_fmtnum(nval,2,'.',',');}else if(postf=='swiss'){nval=window.__tracead_cllv_fmtnum(nval,2,'\'','.');}else if(postf=='french'){nval=window.__tracead_cllv_fmtnum(nval,2,' ',',');}
window.__tracead_setvar(v,nval);}else{window.__tracead_setvar(v,val);}};window.__tracead_cllv=function(v,pref,postf){if(window.__tracead_cllv_ax!==true)window.__tracead_cllv_vm.push([v,pref,postf]);var i=v.indexOf(':');var vp=[v.slice(0,i),v.slice(i+1)];var id=vp[1];switch(vp[0]){case'query':var q=window.__tracead_fpqs(document.location.search);window.__tracead_cllv_setfmt(v,q[id]||'',pref,postf);break;case'meta_tags':__tracead_jq('meta[name][content]').each(function(){var o=__tracead_jq(this);if(o.attr('name')==id){window.__tracead_cllv_setfmt(v,o.attr('content'),pref,postf);return false;}});break;case'itemprops':__tracead_jq('*[itemprop]').each(function(){if(__tracead_jq(this).attr('itemprop')==id){if(__tracead_jq(this).attr('content')){window.__tracead_cllv_setfmt(v,__tracead_jq(this).attr('content'),pref,postf);}else{window.__tracead_cllv_setfmt(v,__tracead_jq(this).text(),pref,postf);}
return false;}});break;case'globals':if(window[id]!==undefined){window.__tracead_cllv_setfmt(v,window[id],pref,postf);}
break;case'inputs':__tracead_jq('input, textarea, select').each(function(){if(__tracead_jq(this).attr('name')==id){window.__tracead_cllv_setfmt(v,__tracead_jq(this).val(),pref,postf);if(!__tracead_jq(this).data('__ta_cllv')){__tracead_jq(this).on('keyup keypress blur change',function(){window.__tracead_cllv_setfmt(v,__tracead_jq(this).val(),pref,postf);});__tracead_jq(this).data('__ta_cllv',true);}
return false;}});break;case'numbers':var match_found=false;window.__ta_number_find(id).each(function(){var bite=__tracead_jq(this);var contents=bite.text();__tracead_jq.each(window.__ta_number_formats,function(i,format){var matches=contents.match(format.pattern);if(matches){var n=format.number(matches);if(n!==null){window.__tracead_cllv_setfmt(v,n,pref,postf);match_found=true;return false;}}});if(match_found){return false;}});break;case'currencies':var match_found=false;window.__ta_number_find(id).each(function(){var bite=__tracead_jq(this);var contents=bite.text();__tracead_jq.each(window.__ta_number_formats,function(i,format){var matches=contents.match(format.pattern);if(matches){var currency=format.currency(matches);if(currency!==null){window.__tracead_cllv_setfmt(v,currency,pref,postf);match_found=true;return false;}}});if(match_found){return false;}});break;}};__tracead_jq(document).on("__tracead_cdif:ready",function(){});(function(){if(document.referrer){var aw=(document.location.search.search(/[?&]gclid=/)!=-1);var ar=document.createElement('a');ar.href=document.referrer;var rh=window.__tracead_sanh(ar.hostname);var ch=window.__tracead_sanh(document.location.hostname);if(rh!=ch){__tracead_jq('body').append('<script type="text/javascript" src="https://tracead.com/siteTagHandler.php?cId=5799&ljq=2&o=1&a='+(aw?1:0)+'&r='+escape(rh)+'"></script>');}}})();window['__tracead_sitetag_id__']=5799;window['__tracead_sitetag_cl__']=false;__tracead_jq(document).on("__tracead_cdif:ready",function(){!function(){function g(g,h){g=g||"",h=h||{};for(var i in a)a.hasOwnProperty(i)&&(h.autoFix&&(h["fix_"+i]=!0),h.fix=h.fix||h["fix_"+i]);var j=[],k=document.createElement("div"),l=function(a){return"string"==typeof a&&-1!==a.indexOf("&")?(k.innerHTML=a,k.textContent||k.innerText||a):a},m=function(a){g+=a},n=function(a){g=a+g},o={comment:/^<!--/,endTag:/^<\//,atomicTag:/^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,startTag:/^</,chars:/^[^<]/},p={comment:function(){var a=g.indexOf("-->");return a>=0?{content:g.substr(4,a),length:a+3}:void 0},endTag:function(){var a=g.match(c);return a?{tagName:a[1],length:a[0].length}:void 0},atomicTag:function(){var a=p.startTag();if(a){var b=g.slice(a.length);if(b.match(new RegExp("</\\s*"+a.tagName+"\\s*>","i"))){var c=b.match(new RegExp("([\\s\\S]*?)</\\s*"+a.tagName+"\\s*>","i"));if(c)return{tagName:a.tagName,attrs:a.attrs,content:c[1],length:c[0].length+a.length}}}},startTag:function(){var a=g.indexOf(">");if(-1===a)return null;var c=g.match(b);if(c){var f={};return c[2].replace(d,function(a,b){var c=arguments[2]||arguments[3]||arguments[4]||e.test(b)&&b||null;f[b]=l(c)}),{tagName:c[1],attrs:f,unary:!!c[3],length:c[0].length}}},chars:function(){var a=g.indexOf("<");return{length:a>=0?a:g.length}}},q=function(){for(var a in o)if(o[a].test(g)){f&&console.log("suspected "+a);var b=p[a]();return b?(f&&console.log("parsed "+a,b),b.type=b.type||a,b.text=g.substr(0,b.length),g=g.slice(b.length),b):null}},r=function(a){for(var b;b=q();)if(a[b.type]&&a[b.type](b)===!1)return},s=function(){var a=g;return g="",a},t=function(){return g};return h.fix&&function(){var a=/^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,b=/^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i,c=[];c.last=function(){return this[this.length-1]},c.lastTagNameEq=function(a){var b=this.last();return b&&b.tagName&&b.tagName.toUpperCase()===a.toUpperCase()},c.containsTagName=function(a){for(var c,b=0;c=this[b];b++)if(c.tagName===a)return!0;return!1};var d=function(b){return b&&"startTag"===b.type&&(b.unary=a.test(b.tagName)||b.unary),b},e=q,f=function(){var a=g,b=d(e());return g=a,b},i=function(){var a=c.pop();n("</"+a.tagName+">")},j={startTag:function(a){var d=a.tagName;"TR"===d.toUpperCase()&&c.lastTagNameEq("TABLE")?(n("<TBODY>"),l()):h.fix_selfClose&&b.test(d)&&c.containsTagName(d)?c.lastTagNameEq(d)?i():(n("</"+a.tagName+">"),l()):a.unary||c.push(a)},endTag:function(a){var b=c.last();b?h.fix_tagSoup&&!c.lastTagNameEq(a.tagName)?i():c.pop():h.fix_tagSoup&&k()}},k=function(){e(),l()},l=function(){var a=f();a&&j[a.type]&&j[a.type](a)};q=function(){return l(),d(e())}}(),{append:m,readToken:q,readTokens:r,clear:s,rest:t,stack:j}}var a=function(){var b,a={},c=this.document.createElement("div");return b="<P><I></P></I>",c.innerHTML=b,a.tagSoup=c.innerHTML!==b,c.innerHTML="<P><i><P></P></i></P>",a.selfClose=2===c.childNodes.length,a}(),b=/^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,c=/^<\/([\-A-Za-z0-9_]+)[^>]*>/,d=/([\-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,e=/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i,f=!1;g.supports=a,g.tokenToString=function(a){var b={comment:function(a){return"<--"+a.content+"-->"},endTag:function(a){return"</"+a.tagName+">"},atomicTag:function(a){return console.log(a),b.startTag(a)+a.content+b.endTag(a)},startTag:function(a){var b="<"+a.tagName;for(var c in a.attrs){var d=a.attrs[c];b+=" "+c+'="'+(d?d.replace(/(^|[^\\])"/g,'$1\\"'):"")+'"'}return b+(a.unary?"/>":">")},chars:function(a){return a.text}};return b[a.type](a)},g.escapeAttributes=function(a){var b={};for(var c in a){var d=a[c];b[c]=d&&d.replace(/(^|[^\\])"/g,'$1\\"')}return b};for(var h in a)g.browserHasFlaw=g.browserHasFlaw||!a[h]&&h;this.htmlParser=g}(),function(){function a(){}function e(a){return a!==d&&null!==a}function h(a){return"function"==typeof a}function i(a,b,c){var d,e=a&&a.length||0;for(d=0;e>d;d++)b.call(c,a[d],d)}function j(a,b,c){var d;for(d in a)a.hasOwnProperty(d)&&b.call(c,d,a[d])}function k(a,b){return j(b,function(b,c){a[b]=c}),a}function l(a,b){return a=a||{},j(b,function(b,c){e(a[b])||(a[b]=c)}),a}function m(a){try{return g.call(a)}catch(b){var c=[];return i(a,function(a){c.push(a)}),c}}function o(a){return a&&"tagName"in a?!!~a.tagName.toLowerCase().indexOf("script"):!1}function p(a){return a&&"tagName"in a?!!~a.tagName.toLowerCase().indexOf("style"):!1}var b={afterAsync:a,afterDequeue:a,afterStreamStart:a,afterWrite:a,beforeEnqueue:a,beforeWrite:function(a){return a},done:a,error:function(a){throw a},releaseAsync:!1},c=this,d=void 0;if(!c.__tracead_ps){var f=!1,g=Array.prototype.slice,n=function(a){return a[a.length-1]},q=function(){function b(b,c,d){var f=a+c;if(2===arguments.length){var g=b.getAttribute(f);return e(g)?String(g):g}e(d)&&""!==d?b.setAttribute(f,d):b.removeAttribute(f)}function c(a,c){var d=a.ownerDocument;k(this,{root:a,options:c,win:d.defaultView||d.parentWindow,doc:d,parser:htmlParser("",{autoFix:!0}),actuals:[a],proxyHistory:"",proxyRoot:d.createElement(a.nodeName),scriptStack:[],writeQueue:[]}),b(this.proxyRoot,"proxyof",0)}var a="data-ps-";return c.prototype.write=function(){[].push.apply(this.writeQueue,arguments);for(var a;!this.deferredRemote&&this.writeQueue.length;)a=this.writeQueue.shift(),h(a)?this.callFunction(a):this.writeImpl(a)},c.prototype.callFunction=function(a){var b={type:"function",value:a.name||a.toString()};this.onScriptStart(b),a.call(this.win,this.doc),this.onScriptDone(b)},c.prototype.writeImpl=function(a){this.parser.append(a);for(var b,d,e,c=[];(b=this.parser.readToken())&&!(d=o(b))&&!(e=p(b));)c.push(b);this.writeStaticTokens(c),d&&this.handleScriptToken(b),e&&this.handleStyleToken(b)},c.prototype.writeStaticTokens=function(a){var b=this.buildChunk(a);if(b.actual)return b.html=this.proxyHistory+b.actual,this.proxyHistory+=b.proxy,this.proxyRoot.innerHTML=b.html,f&&(b.proxyInnerHTML=this.proxyRoot.innerHTML),this.walkChunk(),f&&(b.actualInnerHTML=this.root.innerHTML),b},c.prototype.buildChunk=function(b){var c=this.actuals.length,d=[],e=[],f=[];return i(b,function(b){if(d.push(b.text),b.attrs){if(!/^noscript$/i.test(b.tagName)){var g=c++;e.push(b.text.replace(/(\/?>)/," "+a+"id="+g+" $1")),"ps-script"!==b.attrs.id&&"ps-style"!==b.attrs.id&&f.push("atomicTag"===b.type?"":"<"+b.tagName+" "+a+"proxyof="+g+(b.unary?" />":">"))}}else e.push(b.text),f.push("endTag"===b.type?b.text:"")}),{tokens:b,raw:d.join(""),actual:e.join(""),proxy:f.join("")}},c.prototype.walkChunk=function(){for(var a,c=[this.proxyRoot];e(a=c.shift());){var d=1===a.nodeType,f=d&&b(a,"proxyof");if(!f){d&&(this.actuals[b(a,"id")]=a,b(a,"id",null));var g=a.parentNode&&b(a.parentNode,"proxyof");g&&this.actuals[g].appendChild(a)}c.unshift.apply(c,m(a.childNodes))}},c.prototype.handleScriptToken=function(a){var b=this.parser.clear();b&&this.writeQueue.unshift(b),a.src=a.attrs.src||a.attrs.SRC,a.src&&this.scriptStack.length?this.deferredRemote=a:this.onScriptStart(a);var c=this;this.writeScriptToken(a,function(){c.onScriptDone(a)})},c.prototype.handleStyleToken=function(a){var b=this.parser.clear();b&&this.writeQueue.unshift(b),a.type=a.attrs.type||a.attrs.TYPE||"text/css",this.writeStyleToken(a),b&&this.write()},c.prototype.writeStyleToken=function(a){var b=this.buildStyle(a);this.insertStyle(b),a.content&&(b.styleSheet&&!b.sheet?b.styleSheet.cssText=a.content:b.appendChild(this.doc.createTextNode(a.content)))},c.prototype.buildStyle=function(a){var b=this.doc.createElement(a.tagName);return b.setAttribute("type",a.type),j(a.attrs,function(a,c){b.setAttribute(a,c)}),b},c.prototype.insertStyle=function(a){this.writeImpl('<span id="ps-style"/>');var b=this.doc.getElementById("ps-style");b.parentNode.replaceChild(a,b)},c.prototype.onScriptStart=function(a){a.outerWrites=this.writeQueue,this.writeQueue=[],this.scriptStack.unshift(a)},c.prototype.onScriptDone=function(a){return a!==this.scriptStack[0]?(this.options.error({message:"Bad script nesting or script finished twice"}),void 0):(this.scriptStack.shift(),this.write.apply(this,a.outerWrites),!this.scriptStack.length&&this.deferredRemote&&(this.onScriptStart(this.deferredRemote),this.deferredRemote=null),void 0)},c.prototype.writeScriptToken=function(a,b){var c=this.buildScript(a),d=this.shouldRelease(c),e=this.options.afterAsync;a.src&&(c.src=a.src,this.scriptLoadHandler(c,d?e:function(){b(),e()}));try{this.insertScript(c),(!a.src||d)&&b()}catch(f){this.options.error(f),b()}},c.prototype.buildScript=function(a){var b=this.doc.createElement(a.tagName);return j(a.attrs,function(a,c){b.setAttribute(a,c)}),a.content&&(b.text=a.content),b},c.prototype.insertScript=function(a){this.writeImpl('<span id="ps-script"/>');var b=this.doc.getElementById("ps-script");b.parentNode.replaceChild(a,b)},c.prototype.scriptLoadHandler=function(a,b){function c(){a=a.onload=a.onreadystatechange=a.onerror=null}function e(){c(),b()}function f(a){c(),d(a),b()}var d=this.options.error;k(a,{onload:function(){e()},onreadystatechange:function(){/^(loaded|complete)$/.test(a.readyState)&&e()},onerror:function(){f({message:"remote script failed "+a.src})}})},c.prototype.shouldRelease=function(a){var b=/^script$/i.test(a.nodeName);return!b||!!(this.options.releaseAsync&&a.src&&a.hasAttribute("async"))},c}();c.__tracead_ps=function(){function g(){var b,a=e.shift();a&&(b=n(a),b.afterDequeue(),a.stream=i.apply(null,a),b.afterStreamStart())}function i(b,c,e){function l(a){a=e.beforeWrite(a),f.write(a),e.afterWrite(a)}f=new q(b,e),f.id=d++,f.name=e.name||f.id,j.streams[f.name]=f;var h=b.ownerDocument,i={close:h.close,open:h.open,write:h.write,writeln:h.writeln};k(h,{close:a,open:a,write:function(){return l(m(arguments).join(""))},writeln:function(){return l(m(arguments).join("")+"\n")}});var n=f.win.onerror||a;return f.win.onerror=function(a,b,c){e.error({msg:a+" - "+b+":"+c}),n.apply(f.win,arguments)},f.write(c,function(){k(h,i),f.win.onerror=n,e.done(),f=null,g()}),f}function j(d,i,j){h(j)&&(j={done:j}),j=l(j,b),d=/^#/.test(d)?c.document.getElementById(d.substr(1)):d.jquery?d[0]:d;var k=[d,i,j];return d.__tracead_ps={cancel:function(){k.stream?k.stream.abort():k[1]=a}},j.beforeEnqueue(k),e.push(k),f||g(),d.__tracead_ps}var d=0,e=[],f=null;return k(j,{streams:{},queue:e,WriteStream:q})}()}}();if(__tracead_jq('#__tracead_tsctr').length==0){__tracead_jq('body').append('<div id="__tracead_tsctr" style="display: none; visibility: hidden; opacity: 0; width: 0; height: 0; border: 0;"></div>');};if(window.tracead_def_platform==='manual'){__tracead_jq('body').append('<script type="text/javascript" src="https://tracead.com/siteTagHandler.php?cId=5799&ljq=2&ac=1&p='+escape(window.tracead_def_platform)+'&trigger='+escape(window.tracead_def_trigger)+'&u='+escape(document.location.href)+'"></script>');}else{};var sn=null;var sm=null;sm=document.location.search.match(/(\?|&)fb_ref=ta([a-zA-Z0-9]+)(&|#|$)/);if(sm){sn=sm[2];};sm=document.location.search.match(/(\?|&)ta_ref=ta([a-zA-Z0-9]+)(&|#|$)/);if(sm){sn=sm[2];};sm=document.location.search.match(/(\?|&)ta([a-zA-Z0-9]+)(&|#|$)/);if(sm){sn=sm[2];};sm=document.location.hash.match(/^#ta([a-zA-Z0-9]+)$/);if(sm){sn=sm[1];};if(sn){__tracead_jq('body').append('<script type="text/javascript" src="https://tracead.com/c'+sn+'?async=1"></script>');}});if(window.tracead_def_platform&&window.tracead_def_platform!=='manual'){__tracead_jq('body').append('<script type="text/javascript" src="https://tracead.com/siteTagHandler.php?cId=5799&ljq=2&ac=1&p='+escape(window.tracead_def_platform)+'&u='+escape(document.location.href)+'"></script>');};