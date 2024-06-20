
/*@preserve
***Version 2.8.0***
*/

/*@license
 *                       Copyright 2002 - 2018 Qualtrics, LLC.
 *                                All rights reserved.
 *
 * Notice: All code, text, concepts, and other information herein (collectively, the
 * "Materials") are the sole property of Qualtrics, LLC, except to the extent
 * otherwise indicated. The Materials are proprietary to Qualtrics and are protected
 * under all applicable laws, including copyright, patent (as applicable), trade
 * secret, and contract law. Disclosure or reproduction of any Materials is strictly
 * prohibited without the express prior written consent of an authorized signatory
 * of Qualtrics. For disclosure requests, please contact notice@qualtrics.com.
 */

try {
  !function(t){var e={};function i(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(o,n,function(e){return t[e]}.bind(null,n));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){t.exports=i(1)},function(t,e){(void 0===window.QSI.EmbeddedTarget||window.QTest)&&(QSI.EmbeddedTarget=QSI.util.Class({initialize:function(t,e,i){i.options&&"Survey"===i.options.targetURLType&&(t=QSI.util.addScreenCaptureParameterToTarget(t)),this.parent=i,this.options=e||{},this.url=t,this.width=this.options.targetWidth,this.height=this.options.targetHeight,this.options.accessibilityTitle&&(this.accessibilityTitle=this.options.accessibilityTitle);var o=QSI.util.getPageSize(),n=o.width,r=o.height;this.width>n&&(this.width=n-30),this.height>r&&(this.height=r-30),this.popup(),void 0===QSI.reg[this.parent.id].embeddedWindows&&(QSI.reg[this.parent.id].embeddedWindows=[]),QSI.reg[this.parent.id].embeddedWindows.push({targetIframe:this.targetIframe,container:this.container}),this.closeButton&&this.closeButton.focus();var s=this;this.options.autoCloseTarget&&QSI.util.observe(window,"message",(function(t){try{if(QSI.Orchestrator&&QSI.Orchestrator.isMessageEventOriginAllowed&&!QSI.Orchestrator.isMessageEventOriginAllowed(t.origin))return;"closeQSIWindow"===t.data&&s.close()}catch(t){"undefined"!=typeof QSI&&QSI.dbg&&QSI.dbg.e&&QSI.dbg.e(t)}})),QSI.util.isAndroid()&&this.formatForAndroid()},formatForAndroid:function(){document.body.style.overflow="visible";var t=document.querySelector(".QSIEmbeddedTarget");t.style.position="absolute",this.scrollElementIntoMidViewport(t);var e=window.innerHeight,i=window.innerWidth,o=this;window.addEventListener("resize",(function(){try{var n=window.innerHeight;n>e&&n!==i&&o.scrollElementIntoMidViewport(t),e=n}catch(t){"undefined"!=typeof QSI&&QSI.dbg&&QSI.dbg.e&&QSI.dbg.e(t)}}))},scrollElementIntoMidViewport:function(t){var e=t.getBoundingClientRect().left-window.innerWidth/2+t.offsetWidth/2,i=t.getBoundingClientRect().top-window.innerHeight/2+t.offsetHeight/2;window.scrollBy(e,i)},clipPageToFitWithinViewport:function(){var t=document.documentElement.style.position,e=document.documentElement.style.width;document.documentElement.style.position="fixed",document.documentElement.style.width="100%",this.unclipPageFromViewport=function(){document.documentElement.style.position=t,document.documentElement.style.width=e}},resetStyles:function(){var t=this.options.resetStyle,e=QSI.util.build("style",{type:"text/css"},t);document.body.appendChild(e),QSI.util.addToStyleElements(e)},close:function(){try{QSI.util.remove(this.container),QSI.util.remove(this.shadowBox),QSI.util.startScrolling(),"iOS"===QSI.OS.name&&this.unclipPageFromViewport()}catch(t){QSI.dbg.e(t)}},popup:function(){try{this.container=this.build(),document.body.appendChild(this.container),this.shadowBox=this.buildShadowBox(),QSI.util.stopScrolling(),"iOS"===QSI.OS.name&&this.clipPageToFitWithinViewport(),document.body.appendChild(this.shadowBox),this.container.style.zIndex=QSI.global.currentZIndex++;var t=this.width,e=this.height,i=QSI.util.getScrollOffsets(),o=QSI.util.getPageSize(),n=o.width,r=o.height,s=(n-t)/2,l=(r-e)/2;QSI.util.isFixed()||(s+=i.left,l+=i.top),this.container.style.zoom=1,this.container.style.left=s+"px",this.container.style.top=l+"px"}catch(t){QSI.dbg.e(t)}},build:function(){var t=[this.buildContainer()],e="fixed";return QSI.util.isFixed()||(e="absolute"),QSI.util.build("div",{className:"QSIEmbeddedTarget",style:{position:e}},t)},buildCloseButtonElement:function(){var t=QSI.util.build("img",{src:QSI.global.imagePath+"/siteintercept/bwc_close.png",style:{cursor:"pointer",position:"absolute",top:"-15px",right:"-15px",height:"29px",width:"29px",zIndex:QSI.global.currentZIndex++},tabindex:"0",alt:"Close"}),e=this;return t.onclick=function(){e.onCloseClick()},t},buildContainer:function(){var t={style:{}};t.style={top:"0px",left:"0px",position:"absolute",zIndex:QSI.global.currentZIndex++,width:this.width+"px",height:this.height+"px",backgroundColor:"#ffffff",border:"3px solid #333333",borderRadius:"3px",mozBorderRadius:"3px",boxShadow:"0px 0px 10px 0px rgba(0,0,0,0.7)"};var e=QSI.util.build("div",t);this.closeButton=this.buildCloseButtonElement(),e.appendChild(this.closeButton),this.targetIframe=this.buildTargetIframe(),this.targetIframe.style.display="none";var i=this.buildWaiter(),o=this;QSI.util.observe(this.targetIframe,"load",(function(){try{o.targetIframe.style.display="block",i.style.display="none"}catch(t){"undefined"!=typeof QSI&&QSI.dbg&&QSI.dbg.e&&QSI.dbg.e(t)}}));var n=!1;this.parent&&this.parent.options&&(n=QSI.util.usePostToStart(this.parent.options.targetURLType)),n||(this.targetIframe.src=this.url),this.accessibilityTitle&&(this.targetIframe.title=this.accessibilityTitle),e.appendChild(i),e.appendChild(QSI.util.build("div",{style:{width:this.width+"px",height:this.height+"px",overflow:"auto","-webkit-overflow-scrolling":"touch"}},[this.targetIframe])),this.hidden=QSI.util.build("div",{tabindex:"0"}),QSI.util.observe(this.hidden,"focus",(function(){try{o.closeButton.focus()}catch(t){"undefined"!=typeof QSI&&QSI.dbg&&QSI.dbg.e&&QSI.dbg.e(t)}})),e.appendChild(this.hidden);var r=QSI.util.getDimensions(e);return e.bc={x:0+r.width,y:0+r.height},o=this,QSI.util.observe(e,"keydown",(function(t){try{32===t.which||13===t.which?t.target.click():9===t.which&&t.shiftKey&&t.target===o.closeButton&&(t.preventDefault(),o.targetIframe.focus())}catch(t){"undefined"!=typeof QSI&&QSI.dbg&&QSI.dbg.e&&QSI.dbg.e(t)}})),e},buildWaiter:function(){return QSI.util.build("img",{src:QSI.global.imagePath+"/ajax-loading.gif",style:{position:"absolute",top:this.height/2-10+"px",left:this.width/2-110+"px",width:"220px",height:"19px"},alt:""})},onCloseClick:function(){this.close()},buildIFrame:function(t,e){var i={style:{border:"none",position:"absolute",top:0,left:0,filter:"progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"},width:t+"px",height:e+"px",frameBorder:"0",src:QSI.global.imagePath+"/blank.html"};QSI.global.isHostedJS()&&!QSI.util.isIE(9)&&(i.sandbox="allow-scripts allow-same-origin allow-popups");var o=QSI.util.build("iframe",i);return o.setAttribute("name","survey-iframe-"+this.parent.options.id),o},buildTargetIframe:function(){var t={width:"100%",height:"100%",frameBorder:"0",tabindex:"0"};QSI.global.isHostedJS()&&!QSI.util.isIE(9)&&(t.sandbox="allow-scripts allow-same-origin allow-popups");var e=QSI.util.build("iframe",t);return e.setAttribute("name","survey-iframe-"+this.parent.options.id),e},buildShadowBox:function(){var t=QSI.util.getPageSize(),e=t.width,i=t.height,o=QSI.util.getScrollOffsets();return QSI.util.build("div",{className:"QSIEmbeddedWindowShadowBox",style:{position:"absolute",backgroundColor:"transparent",left:o.left+"px",top:o.top+"px",width:e+"px",height:i+"px",opacity:1,zIndex:QSI.global.currentZIndex++,filter:"alpha(opacity=100)"}})}}))}]);
} catch(e) {
  if (typeof QSI !== 'undefined' && QSI.dbg && QSI.dbg.e) {
    QSI.dbg.e(e);
  }
}