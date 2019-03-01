_satellite.pushBlockingScript(function(event, target, $variables){
  var webChat = {
    load: function() {
        window.lpTag = window.lpTag || {};
        window.lpTag.autoStart = false;
        window.lpTag = window.lpTag || {};
        if (typeof window.lpTag._tagCount === "undefined") {
            window.lpTag = {
                site: window.location.hostname === "www.directline.com" ? "40325001" : "35131001",
                section: lpTag.section || "",
                autoStart: lpTag.autoStart === false ? false : true,
                ovr: lpTag.ovr || {},
                _v: "1.5.1",
                _tagCount: 1,
                protocol: location.protocol,
                events: {
                    bind: function(app, ev, fn) {
                        lpTag.defer(function() {
                            lpTag.events.bind(app, ev, fn);
                        }, 0);
                    },
                    trigger: function(app, ev, json) {
                        lpTag.defer(function() {
                            lpTag.events.trigger(app, ev, json);
                        }, 1);
                    }
                },
                defer: function(fn, fnType) {
                    if (fnType === 0) {
                        this._defB = this._defB || [];
                        this._defB.push(fn);
                    } else if (fnType === 1) {
                        this._defT = this._defT || [];
                        this._defT.push(fn);
                    } else {
                        this._defL = this._defL || [];
                        this._defL.push(fn);
                    }
                },
                load: function(src, chr, id) {
                    var t = this;
                    setTimeout(function() {
                        t._load(src, chr, id);
                    }, 0);
                },
                _load: function(src, chr, id) {
                    var url = src;
                    if (!src) {
                        url = this.protocol + "//" + ((this.ovr && this.ovr.domain) ? this.ovr.domain : "lptag.liveperson.net") + "/tag/tag.js?site=" + this.site;
                    }
                    var s = document.createElement("script");
                    s.setAttribute("charset", chr ? chr : "UTF-8");
                    if (id) {
                        s.setAttribute("id", id);
                    }
                    s.setAttribute("src", url);
                    document.getElementsByTagName("head").item(0).appendChild(s);
                },
                init: function() {
                    this._timing = this._timing || {};
                    this._timing.start = (new Date()).getTime();
                    var that = this;
                    if (window.attachEvent) {
                        window.attachEvent("onload", function() {
                            that._domReady("domReady");
                        });
                    } else {
                        window.addEventListener("DOMContentLoaded", function() {
                            that._domReady("contReady");
                        }, false);
                        window.addEventListener("load", function() {
                            that._domReady("domReady");
                        }, false);
                    }
                    if (typeof(window._lptStop) === "undefined") {
                        this.load();
                    }
                },
                start: function() {
                    this.autoStart = true;
                },
                _domReady: function(n) {
                    if (!this.isDom) {
                        this.isDom = true;
                        this.events.trigger("LPT", "DOM_READY", {
                            t: n
                        });
                    }
                    this._timing[n] = (new Date()).getTime();
                },
                vars: lpTag.vars || [],
                dbs: lpTag.dbs || [],
                ctn: lpTag.ctn || [],
                sdes: lpTag.sdes || [],
                ev: lpTag.ev || []
            };
            lpTag.init();
        } else {
            window.lpTag._tagCount += 1;
        }
        (function() {
            var firstTry = true,
                tryAgain;
            var _lpStopTrying = function() {
                clearInterval(tryAgain);
            };
            var startLETag = function() {
                if (lpTag.start) {
                    lpTag.isDom = true;
                    lpTag.start();
                    _lpStopTrying();
                } else if (firstTry) {
                    firstTry = false;
                    tryAgain = setInterval(startLETag, 100);
                }
            };
            startLETag();
        })();
        if (window.location.pathname.split("/")[1] === "qpm") {
            lpTag.section = ["Direct Line", "Motor", "QuoteAndPolicyManager"];
        } else {
            lpTag.section = ["Direct Line", "Motor", "QuoteAndBuy"];
        }
    },
    initialiseTrackingEvents: function() {
        if (lpTag) {
            var campaignID, engagementID, engagementType, conversationID;
            lpTag.events.bind({
                eventName: "START",
                appName: "LP_OFFERS",
                func: function(response) {
                    if (_satellite.readCookie("webChatAvailabilitySent") !== "Y") {
                        s.contextData.bau_wc_available = response.state;
                        s.tl();
                        delete s.contextData.bau_wc_available;
                    }
                },
                triggerOnce: true
            });
            lpTag.events.bind({
                eventName: "OFFER_CLICK",
                appName: "LP_OFFERS",
                func: function(response) {
                    campaignID = response.campaignId;
                    engagementID = response.engagementId;
                    engagementType = response.engagementType;
                },
                triggerOnce: true
            });
            lpTag.events.bind("lpUnifiedWindow", "conversationInfo", function(response) {
                conversationID = response.conversationId;
                if (_satellite.readCookie("initialLivePersonDataSent") !== "Y") {
                    s.contextData.bau_wc_click = "clicked";
                    s.contextData.bau_wc_campaignid = campaignID;
                    s.contextData.bau_wc_engagementid = engagementID;
                    s.contextData.bau_wc_engagementtype = engagementType;
                    s.contextData.bau_wc_visitorid = response.visitorId;
                    s.tl();
                    delete s.contextData.bau_wc_click;
                    delete s.contextData.bau_wc_campaignid;
                    delete s.contextData.bau_wc_engagementid;
                    delete s.contextData.bau_wc_engagementtype;
                    delete s.contextData.bau_wc_visitorid;
                    _satellite.setCookie("initialLivePersonDataSent", "Y");
                }
                if (response.state === "initialised" && (_satellite.readCookie("conversationLivePersonDataSent") !== "Y") && (_satellite.readCookie("webChatAvailabilitySent") !== "Y")) {
                    s.contextData.bau_wc_conversationid = conversationID;
                    s.tl();
                    delete s.contextData.bau_wc_conversationid;
                    _satellite.setCookie("conversationLivePersonDataSent", "Y");
                    _satellite.setCookie("webChatAvailabilitySent", "Y");
                }
            });
            lpTag.events.bind("lpUnifiedWindow", "state", function(response) {
                if (response.state === "interactive") {
                    s.contextData.bau_wc_initiated = "true";
                    s.events = "event88:" + conversationID;
                    s.tl();
                    delete s.contextData.bau_wc_initiated;
                }
                if (response.state === "ended") {
                    _satellite.setCookie("webChatAvailabilitySent", "N");
                }
            });
        }
    }
};
webChat.load();
webChat.initialiseTrackingEvents();

});
