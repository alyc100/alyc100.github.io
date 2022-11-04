// geotargeting.js

	
	function processSelection(countryCode,targetUrl,onw,cookieValue){
		var host = window.location.hostname;	
		
		if (typeof(cookieValue) != 'undefined') {
			var now = new Date();
			var time = now.getTime();
			time += 3600 * 1000 *24 * 365;
			now.setTime(time);
			document.cookie = 
    			'cookiePrefDomain=' + cookieValue + 
    			'; expires=' + now.toGMTString() + 
    			'; path=/';
		}

		var url = targetUrl;
		var onw = onw;
		if(onw == "*") {
			window.open(url);
		} else {
			host = "https://"+host;
			if(host == url) {
				// close overlay
				eStoreProductOverlay('shipToOverlay')
				var newURL = updateURLParameter(window.location.href, 'geoCode', cookieValue);
				window.location.href = newURL;
				//$(location).attr('href',newURL);		
			} else {
				// close overlay if Select country
				if(typeof url === 'undefined'){
					eStoreProductOverlay('shipToOverlay');
				} else {
					// close overlay
					eStoreProductOverlay('shipToOverlay');
					// redirect to url for country selected
					// add isRedirect=Y to queryString
					var newURL = updateURLParameter(url, 'isRedirect', 'Y');
					newURL = updateURLParameter(newURL, 'geoCode', cookieValue);
					window.location.href = newURL;
				}
			}
		}
		
		//RB: Publish an event to tell the rest of the site we've changed the country
		dojo.publish("headerCountryChange", countryCode);
	}
		
	function updateURLParameter(url, param, paramVal){
	    var newAdditionalURL = "";
	    var tempArray = url.split("?");
	    var baseURL = tempArray[0];
	    var additionalURL = tempArray[1];
	    var temp = "";
	    if (additionalURL) {
	        tempArray = additionalURL.split("&");
	        for (i=0; i<tempArray.length; i++){
	            if(tempArray[i].split('=')[0] != param){
	                newAdditionalURL += temp + tempArray[i];
	                temp = "&";
	            }
	        }
	    }
	
	    var rows_txt = temp + "" + param + "=" + paramVal;
	    return baseURL + "?" + newAdditionalURL + rows_txt;
	}
	
	function getQueryStringParams(sParam){
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++){
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam){
				return sParameterName[1];
			}
		}
	}
	
	function readCookie(name) {
    	var nameEQ = name + "=";
    	var ca = document.cookie.split(';');
   		for(var i=0;i < ca.length;i++) {
        	var c = ca[i];
        	while (c.charAt(0)==' ') c = c.substring(1,c.length);
        	if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    	}
    	return null;
	}
	
	function closeOverlay(elementId){
		if(document.getElementById(elementId)!=null && document.getElementById(elementId)!='undefined'){
			if(document.getElementById(elementId).style.display == "block" || document.getElementById(elementId).style.display == ''){
				eStoreProductOverlay('shipToOverlay');
			}
		}
	}