var script=document.createElement("script");script.src="/portal/resources/vendor/lit-element/lit-element-2.4.0/lit-element.js",document.head.appendChild(script),script.onload=function(){!function(n){var t={};function e(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return n[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=n,e.c=t,e.d=function(n,t,o){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:o})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var r in n)e.d(o,r,function(t){return n[t]}.bind(null,r));return o},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=4)}([function(n,t){n.exports=litElement_240},function(n,t,e){"use strict";t.a=function(n){var t=e(2);return void 0!==t[n]?t[n]:n}},function(n){n.exports=JSON.parse('{"languages":[{"label":"NL","title":"Nederlands","url":"/portalserver/mijn-abnamro/mijn-overzicht/overzicht/index.html"},{"label":"EN","title":"English","url":"/portalserver/my-abnamro/my-overview/overview/index.html"}],"label:navigation":"Footer navigation","footer:items":[{"label":"About ABN AMRO","url":"/en/personal/overabnamro/index.html"},{"label":"Security","url":"/en/personal/overabnamro/secure-banking/index.html"},{"label":"Accessibility","url":"/en/personal/overabnamro/toegankelijkheid.html"},{"label":"Privacy and cookies","url":"/en/personal/overabnamro/privacy/index.html"},{"label":"Disclaimer","url":"/en/personal/overabnamro/disclaimer.html"}],"copyright":"© ABN AMRO Bank N.V."}')},,function(n,t,e){"use strict";e.r(t);var o=e(0),r=e(1);const i='\n  h2,\n  .h2 {\n    font-family: "Roboto Condensed", "Helvetica Neue", Arial, sans-serif;\n    font-weight: 400;\n    margin-top: 0;\n    margin-bottom: 0.5rem;\n    font-size: 2rem;\n    line-height: 2.5rem;\n    color: #222;\n  }\n\n  @media only screen and (max-width: 576px) {\n    h2,\n    .h2 {\n      font-size: 1.75rem;\n      line-height: 2rem;\n      color: #222;\n    }\n  }\n';function a(){var n=function(n,t){t||(t=n.slice(0));return Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}}))}(["\n    ","\n    \n    ","\n    ","\n    ","\n    ","\n    ","\n    ","\n    ","\n    ","\n    ","\n\n    ","\n    ","\n    ","\n    ","\n    ","\n    ","\n    ","\n    ","\n    ","\n    \n    ","\n    ","\n\n  .footer {\n    background-color: ",";\n    font-size: 14px;\n  }\n  .footer a {\n    color: ",";\n    text-decoration:none;\n    background-color:transparent\n  }\n  .footer a:hover {\n    color:",";\n    text-decoration:none\n  }\n  .footer .sr-only {\n    position:absolute;\n    width:1px;\n    height:1px;\n    padding:0;\n    overflow:hidden;\n    clip:rect(0, 0, 0, 0);\n    white-space:nowrap;\n    border:0\n  }\n  .footer .sr-only-focusable:active,.footer .sr-only-focusable:focus {\n    position:static;\n    width:auto;\n    height:auto;\n    overflow:visible;\n    clip:auto;\n    white-space:normal\n  }\n  .footer .btn-link {\n    font-weight:400;\n    color:",";\n    text-decoration:none\n  }\n  .footer .btn-link:hover { \n    color:",";\n    text-decoration:none\n  }\n  .footer .btn-link:focus, .footer .btn-link.focus {\n    text-decoration:none;\n    box-shadow:none\n  }\n  \n  .footer .copyright, .footer .language-switch {\n    color: ",";\n  }\n  .footer .language-switch .btn-link:not(.active) {\n    color: inherit;\n  }\n  .footer .language-switch .btn-link.active {\n    pointer-events: none;\n    cursor: default;\n  }\n  .footer .language-switch .footer-nav-item::after {\n    padding: 0 3px;\n  }\n  \n  .footer .footer-navigation .footer-nav-item::after {\n    padding: 0 7px;\n  }\n  .footer .language-switch .footer-nav-item::after,\n  .footer .footer-navigation .footer-nav-item::after {\n    color: ",';\n    content: "|";\n  }\n  .footer .language-switch .footer-nav-item:last-child::after,\n  .footer .footer-navigation .footer-nav-item:last-child::after {\n    content: "";\n    padding: 0;\n  }\n}\n']);return a=function(){return n},n}var l=Object(o.css)(a(),Object(o.unsafeCSS)(i),Object(o.unsafeCSS)("\n  *,\n  *::before,\n  *::after {\n    box-sizing: border-box;\n  }\n"),Object(o.unsafeCSS)("\n.em-page-grid {\n    max-width: 1320px;\n    padding-left: 0;\n    padding-right: 0;\n    overflow: hidden;\n  }\n  \n  @media (min-width: 768px) {\n    .em-page-grid {\n      padding-left: 24px;\n      padding-right: 24px;\n    }\n  }\n"),Object(o.unsafeCSS)("\n  .container-fluid {\n    width: 100%;\n    padding-right: 12px;\n    padding-left: 12px;\n    margin-right: auto;\n    margin-left: auto;\n  }\n"),Object(o.unsafeCSS)("\n  .row {\n    display: flex;\n    flex-wrap: wrap;\n    margin-right: -12px;\n    margin-left: -12px;\n  }\n"),Object(o.unsafeCSS)("\n  .col {\n    position: relative;\n    width: 100%;\n    padding-right: 12px;\n    padding-left: 12px;\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%;\n  }\n"),Object(o.unsafeCSS)("\n  .col-auto {\n    position: relative;\n    width: 100%;\n    padding-right: 12px;\n    padding-left: 12px;\n    flex: 0 0 auto;\n    width: auto;\n    max-width: 100%;\n  }\n"),Object(o.unsafeCSS)("\n  .col-lg-1 {\n    position: relative;\n    width: 100%;\n    padding-right: 12px;\n    padding-left: 12px;\n  }\n\n  @media (min-width: 992px) {\n    .col-lg-1 {\n      flex: 0 0 8.33333%;\n      max-width: 8.33333%;\n    }\n  }\n"),Object(o.unsafeCSS)("\n  .col-lg-3 {\n    position: relative;\n    width: 100%;\n    padding-right: 12px;\n    padding-left: 12px;\n  }\n\n  @media (min-width: 992px) {\n    .col-lg-3 {\n      flex: 0 0 25%;\n      max-width: 25%;\n    }\n  }\n"),Object(o.unsafeCSS)('\n  .no-gutters {\n    margin-right: 0;\n    margin-left: 0;\n  }\n  \n  .no-gutters>.col, .no-gutters>[class*="col-"] {\n    padding-right: 0;\n    padding-left: 0;\n  }\n'),Object(o.unsafeCSS)("\n@media (min-width: 992px) {\n  .py-lg-3 {\n    padding-top: 24px !important;\n    padding-bottom: 24px !important;\n  }\n}\n"),Object(o.unsafeCSS)("\n  .py-3 {\n    padding-top: 24px !important;\n    padding-bottom: 24px !important;\n  }\n"),Object(o.unsafeCSS)("\n@media (min-width: 992px) {\n  .px-lg-2 {\n    padding-right: 16px !important;\n    padding-left: 16px !important;\n  }\n}\n"),Object(o.unsafeCSS)("\n@media (min-width: 1320px) {\n  .px-xl-8 {\n    padding-right: 64px !important;\n    padding-left: 64px !important;\n  }\n}\n"),Object(o.unsafeCSS)("\n  .mb-3 {\n    margin-bottom: 24px !important;\n  }\n"),Object(o.unsafeCSS)("\n@media (min-width: 992px) {\n  .mb-lg-0 {\n    margin-bottom: 0px !important;\n  }\n}\n"),Object(o.unsafeCSS)("\n  .mt-3 {\n    margin-top: 24px !important;\n  }\n"),Object(o.unsafeCSS)("\n@media (min-width: 992px) {\n  .mt-lg-0 {\n    margin-top: 0px !important;\n  }\n}\n"),Object(o.unsafeCSS)("\n  .ml-auto {\n    margin-left: auto !important;\n  }\n"),Object(o.unsafeCSS)("\n.text-center {\n    text-align: center !important;\n}\n"),Object(o.unsafeCSS)("\n.justify-content-center {\n    -ms-flex-pack: center !important;\n    justify-content: center !important;\n}\n"),Object(o.unsafeCSS)("#fff"),Object(o.unsafeCSS)("#00716b"),Object(o.unsafeCSS)("#00857a"),Object(o.unsafeCSS)("#00716b"),Object(o.unsafeCSS)("#00857a"),Object(o.unsafeCSS)("#666"),Object(o.unsafeCSS)("#00716b"));function c(n){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function u(){var n=d(['\n            <div class="col-lg-1 mb-3 mb-lg-0">\n              <h2 class="sr-only">','</h2>\n              <div class="row no-gutters justify-content-center language-switch">\n                ',"\n              </div>\n            </div>"]);return u=function(){return n},n}function f(){var n=d(['\n      <footer class="footer py-3 px-lg-2 px-xl-8">\n        <div class="container-fluid em-page-grid">\n          <div class="row py-lg-3">\n            ','\n\n            <div class="col">\n              <h2 class="sr-only">','</h2>\n              <div class="row no-gutters justify-content-center footer-navigation">\n                ','\n              </div>\n            </div>\n            <div class="col-lg-3 mt-3 mt-lg-0 ml-auto text-center copyright">',"</div>\n          </div>\n        </div>\n      </footer>\n    "]);return f=function(){return n},n}function p(){var n=d(['\n      <div class="col-auto footer-nav-item">\n        <a href="','">',"</a>\n      </div>\n    "]);return p=function(){return n},n}function s(){var n=d(['\n        <div class="col-auto footer-nav-item">\n          <a\n            class="btn-link','"\n            title="','"\n            href="','"\n          >\n            ',"\n          </a>\n        </div>\n      "]);return s=function(){return n},n}function d(n,t){return t||(t=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}}))}function g(n,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n):t}function m(n){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function b(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function h(n,t,e){return t&&b(n.prototype,t),e&&b(n,e),n}function v(n,t){return(v=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(n,t)}e.d(t,"default",(function(){return x}));var x=function(n){function t(){var n;return function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=g(this,m(t).call(this))).hideLanguageSwitch=!1,n}return function(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&v(n,t)}(t,n),h(t,null,[{key:"properties",get:function(){return{languageSwitchUrl:{type:String},hideLanguageSwitch:{type:Boolean,attribute:"hide-language-switch"}}}}]),h(t,[{key:"render",value:function(){var n=this,t=Object(r.a)("languages").map((function(t){return Object(o.html)(s(),t.label==="en".toUpperCase()?" active":"",t.title,n.languageSwitchUrl||t.url,t.label)})),e=Object(r.a)("footer:items").map((function(n){return Object(o.html)(p(),n.url,n.label)}));return Object(o.html)(f(),this.hideLanguageSwitch?"":Object(o.html)(u(),Object(r.a)("label:navigation"),t),Object(r.a)("label:navigation"),e,Object(r.a)("copyright"))}}],[{key:"styles",get:function(){return l}}]),t}(o.LitElement);customElements.define("footer-panel",x)}])};