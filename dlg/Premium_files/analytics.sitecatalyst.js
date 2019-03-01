
        CQ_Analytics.registerAfterCallback(function(options) {
            if( $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
                return false;    // component not in framework, skip SC callback
            CQ_Analytics.Sitecatalyst.saveEvars();
            CQ_Analytics.Sitecatalyst.updateEvars(options);
            CQ_Analytics.Sitecatalyst.updateLinkTrackVars();
            return false;
        }, 10);

        CQ_Analytics.registerAfterCallback(function(options) {
            if( $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
                return false;    // component not in framework, skip SC callback
            s = s_gi("dlgdirectlineprod");
            if (s.linkTrackVars == "None") {
                s.linkTrackVars = "events";
            } else {
                s.linkTrackVars = s.linkTrackVars + ",events";
            }
            CQ_Analytics.Sitecatalyst.trackLink(options);
            return false;
        }, 100);


        CQ_Analytics.registerAfterCallback(function(options) {
            if( $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
                return false;    // component not in framework, skip SC callback
            CQ_Analytics.Sitecatalyst.restoreEvars();
            return false;
        }, 200);

        CQ_Analytics.adhocLinkTracking = "false";
        

 		var visitor = Visitor.getInstance("B968E69B54063CFB0A4C98A7@AdobeOrg", {
        	trackingServer: "metrics.directline.com",
        	trackingServerSecure: "smetrics.directline.com"
        });

        var s_account = "dlgdirectlineprod";
        var s = s_gi(s_account);
        s.fpCookieDomainPeriods = "2";

		s.visitor = Visitor.getInstance("B968E69B54063CFB0A4C98A7@AdobeOrg");

        s.currencyCode= 'GBP';
        s.trackInlineStats= true;
        s.linkTrackVars= 'None';
        s.charSet= 'UTF-8';
        s.linkLeaveQueryString= false;
        s.linkExternalFilters= '';
        s.linkTrackEvents= 'None';
        s.trackExternalLinks= true;
        s.linkDownloadFileTypes= 'exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls';
        s.linkInternalFilters= 'javascript:,'+window.location.hostname;
        s.trackDownloadLinks= true;
        
        s.visitorNamespace = "dlg";
        s.trackingServer = "metrics.directline.com";
        s.trackingServerSecure = "smetrics.directline.com";
        
        s.usePlugins=true;
function s_doPlugins(s) {
		var value = CQ_Analytics.PageDataMgr.data.pageName,
				loadEvent = CQ_Analytics.PageDataMgr.data.loadEvent,
				additionalEvent = CQ_Analytics.PageDataMgr.data.additionalEvent,
				additionalEvars = CQ_Analytics.PageDataMgr.data.additionalEvars;
				
    if (CQ_Analytics.PageDataMgr.data.link1) {
       if (!s.linkTrackVars.contains(',list1')) {
       s.linkTrackVars = s.linkTrackVars + 
                              ',list1';
       }
       s.list1 = CQ_Analytics.PageDataMgr.data.link1;
    }
    
    if (!value || 0 === value.length) {
        s.pageName = location.protocol + '//' + location.host + location.pathname;
    } else
    s.pageName = CQ_Analytics.PageDataMgr.data.pageName;
		
		if (additionalEvent) {
			s.events = s.events ? s.events + ',' : ''; 
			s.events += additionalEvent;
		}		

    if (loadEvent) {
        if(s.events) {
            s.events += "," + loadEvent;
        } else {
            s.events = loadEvent;
        }
    }
	
	if (additionalEvars) { 
		window.s.eVar5 = additionalEvars.eVar5;
		window.s.eVar8 = additionalEvars.eVar8;
		window.s.eVar15 = additionalEvars.eVar15;
		window.s.eVar51 = additionalEvars.eVar51;
		window.s.eVar52 = additionalEvars.eVar52;
		window.s.eVar53 = additionalEvars.eVar53;
		window.s.eVar54 = additionalEvars.eVar54;
		window.s.eVar55 = additionalEvars.eVar55;
		CQ_Analytics.PageDataMgr.data.additionalEvars = null;
	}
}
s.doPlugins=s_doPlugins;



