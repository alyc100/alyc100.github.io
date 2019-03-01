/*@preserve
***Version 1.1.1***
*/
/*@license
 *                       Copyright 2002 - 2018 Qualtrics, LLC.
 *                        CONFIDENTIAL.  All rights reserved.
 *
 * Notice: All code, text, concepts, and other information herein (collectively, the
 * "Materials") are the sole property of Qualtrics, LLC, except to the extent
 * otherwise indicated. The Materials are proprietary to Qualtrics and are protected
 * under all applicable laws, including copyright, patent (as applicable), trade
 * secret, and contract law. Disclosure or reproduction of any Materials is strictly
 * prohibited without the express prior written consent of an authorized signatory
 * of Qualtrics. For disclosure requests, please contact notice@qualtrics.com.
 */
try{(void 0===window.QSI.FeedbackLink||window.QTest)&&(QSI.FeedbackLink=QSI.util.Creative({initialize:function(i){this.link=null,this.globalInitialize(i),this.options=i,this.id=this.options.id,this.interceptDisplayOptions=i.interceptDisplayOptions||{},this.displayOptions=i.displayOptions||{},this.shouldShow()&&this.insertLink()},insertLink:function(){this.img=this.buildImage(),this.link=this.buildLink(),document.body.appendChild(this.link),this.impress(),this.displayed.resolve()},buildLink:function(){var i,t,e=this.displayOptions.verticalPosition,s=QSI.util.getPageSize().height,n=this.img.height||100;"middle"===e?(i=s/2-n/2+"px",t="auto"):"setfromtop"===e?(i=this.displayOptions.posFromTop+"px",t="auto"):"setfrombottom"===e&&(t=this.displayOptions.posFromBottom+"px",i="auto");var o=QSI.util.build("div",{className:"QSIFeedBackLink "+this.id+"_FeedBackLinkContainer",style:{fontSize:"0px",cursor:"pointer",position:"fixed",top:i,bottom:t,display:"block",backgroundColor:"transparent",border:"none",zIndex:QSI.global.currentZIndex++},tabindex:"0"},[this.img]);QSI.util.observe(o,"keydown",QSI.util.clickOnKeyDown),new QSI.Target(o,this.getTargetHelper(),this.actionOptions,this);var l=this.displayOptions.position;return o.style[l]=0,QSI.util.isFixed()||QSI.util.positionFixed(o,i,t),o},buildImage:function(){var i="";return i="UserDefined"===this.displayOptions.image?QSI.global.graphicPath+this.displayOptions.gid:QSI.global.imagePath+"/siteintercept/"+this.displayOptions.image+"-"+this.displayOptions.position+".png",QSI.util.build("img",{src:i,style:{border:"none",textDecoration:"none",padding:"0px",margin:"0px"},alt:"Feedback Link"})},remove:function(){this.link&&QSI.util.remove(this.link),this.cleanupImpressElement()}}))}catch(i){"undefined"!=typeof QSI&&QSI.dbg&&QSI.dbg.e&&QSI.dbg.e(i)}
//# sourceMappingURL=FeedbackLinkModule.js.map