/**
 * This JS file contains the Gigya Web SDK functions required for WCS-Gigya integration
 *
 */
    var logoffURL;
    var uid;
    var UIDSignature;
	var signatureTimestamp;
	var ciamsAddAction;	
	var remember;
	var apiKey;
	
	function GigyaLoadFunctions() {
		  
	        	var oidcEnabledSwitch;
	        	if (typeof document.getElementById("oidcEnabled_global") != undefined && null !=document.getElementById("oidcEnabled_global") ){
	        		oidcEnabledSwitch = document.getElementById("oidcEnabled_global").value;
	        	}

				// Start  DWR-10947 Mobile App Touch				
				var mobileCookieName = 'trigger_login';
				var mobileCookie = getCookie(mobileCookieName);
				var userType = getCookie("UserType");	
				var bdcCookie = getCookie("_bdccookie_source");
				console.log ("In GigyaLoadFunctions, bdcCookie cookie: " + bdcCookie);
				var authMode = "nonOIDC";
				if(bdcCookie != undefined){
					var bdcCookieJSON = JSON.parse(bdcCookie);
					authMode= bdcCookieJSON["authMode"];
					if(authMode == undefined || authMode ==''){
						authMode = "nonOIDC";
					}
					console.log ("In GigyaLoadFunctions, authMode: " + authMode);
				}
				
				//start: call to gigya.syncGroupGltExp() which will sync the SSO session
				 apiKey = document.getElementById("gigyaAPIKey").value;
				var gltCookieName = 'glt_'+apiKey;
				var gltCookie = getCookie(gltCookieName);
				if(gltCookie != undefined && ((oidcEnabledSwitch == undefined || oidcEnabledSwitch != "true") || 
						(bdcCookie != undefined && bdcCookie != null && !isNewOIDCMobileApp()))){
					gigya.syncGroupGltExp();
				}
				//end: call to gigya.syncGroupGltExp() which will sync the SSO session
				
				console.log ("In GigyaLoadFunctions, trigger_login cookie: " + mobileCookie);
				if (mobileCookie != undefined && userType != 'R') {
					console .log ("Mobile App Specific flow .......");	
					gigya.accounts.getAccountInfo({ callback: getAccountInfoResponse,"authMode":authMode });
				}
				// END  DWR-10947 Mobile App Touch

		    	gigya.accounts.addEventHandlers({
		                context: { str: 'Congrats on your successful ' }
		                , onLogin: loginHandler
		                });
    }
	    	var onGigyaServiceReady = function() {
    		GigyaLoadFunctions();
    	}

    	function errorHandler(eventObj) {

            console.log("failed with error" + eventObj.errorCode);
            var response = eventObj.response;
            if (null != response) {
            	var showErrorOverlay = false;
	            if (null != response.operation) {
	            	var operation = response.operation.toString();	            
		            if (operation.indexOf('/accounts.getScreenSets') == 0) {
		            	showErrorOverlay = true;
		            }
	            }
	            var errorCode = response.errorCode.toString();
	            if(document.getElementById("guestCheckoutFlag")){
	            	var guestCheckoutFlag = document.getElementById("guestCheckoutFlag").value;
	            }
	            var isCheckGtmOldFlow = window.location.href.indexOf("\OrderItemDisplay?");
	            var isCheckGtm = window.location.href.indexOf("\CheckoutLoginView?");
	           
	            // CC-169 : datalayer message removed when invoked from new Checkout login page 
	           // DWR-14222
	            if((isCheckGtm > 1)  || (isCheckGtmOldFlow > 1) ) {
                 	analyticsJS.publishLogonScenarioWithStoreId(response, WCParamJS.storeId, WCParamJS.catalogId);
	            }
                 //errorCode==400006 ||
	            if (errorCode.indexOf('5')==0) {

					var isMyAccountUpdate = window.location.href.indexOf("UserRegistrationUpdate");
					var MyAccountPage =  window.location.href.indexOf("UserRegistrationForm");
					var isLogon = window.location.href.indexOf("BootsLogonForm");
					var isLoginCheckout = window.location.href.indexOf("OrderItemDisplay");
					var phEdit = window.location.href.indexOf("PrescriptionStart");




					console.log("failed with error isLogon" +isLogon);
					console.log("failed with error isLoginCheckout" +isLoginCheckout);
	            	if(guestCheckoutFlag != undefined && guestCheckoutFlag == 'true' ) {
	            		//Allow the customer to proceed with Guest checkout
	            		console.log("failed with error a " +isLogon);
	            		var params={
	            				screenSet:"master-registration-login"
	            			}
	            		//gigya.accounts.hideScreenSet(params);
	            		eStoreProductOverlay('gigyaUnavailableLoginCheckout_overlay');

	            	}else if(document.getElementById("gigyaServiceUnavailableaccnt_overlay") && (isMyAccountUpdate >0 || MyAccountPage >0 )) {
	            		var params={
	            				screenSet:"master-registration-login"
	            			}
	            			if (!showErrorOverlay) {
	            		gigya.accounts.hideScreenSet(params);
	            			}
						eStoreProductOverlay('gigyaServiceUnavailableaccnt_overlay');
	            	}
	            	else if(document.getElementById("userRegistrationPageFlag") ){
	            		eStoreProductOverlay('regGigyaServiceUnavailable_overlay');
	            	}
	            	else if(document.getElementById("isAdCardFlow") ){
	            		eStoreProductOverlay('regGigyaServiceUnavailable_overlay1');
	            	}else if(isLogon>1){
	            		console.log("failed with error c " +isLogon);
	            		eStoreProductOverlay('gigyaUnavailableLogin_overlay');


	            	} else if(isLoginCheckout>1 ){
	            		console.log("failed with error checkout " +isLoginCheckout);
	            		var params={
	            				screenSet:"master-registration-login"
	            			}
	            		//gigya.accounts.hideScreenSet(params);
	            		eStoreProductOverlay('gigyaUnavailableLoginCheckout_overlay');


	            	}else if (showErrorOverlay){
	            		console.log("failed with error d " +isLogon);
	            		eStoreProductOverlay('gigyaServiceUnavailable_overlay');

		            }
	            	console.log("failed with overlay@@@@@" );
	            }

        	}
            //error handling
    	}

      	function logoutGigyaFunctions(url) {
      		//MFA-1553
      		ajaxGetLogoutDetailsApi();

      		console.log("BootsGigyaLogin.js : logoutGigyaFunctions called start");
      		logoffURL = url;
      		if(typeof document.getElementById("cepHeaderSwitch") != undefined && null !=document.getElementById("cepHeaderSwitch") && document.getElementById("cepHeaderSwitch") !=""){
      			logoffURL=logoffURL.replaceAll("&","&amp;");
      		}
    		//gigya.accounts.logout({callback:logoutEventCallback});
      		
    		var apiKey = document.getElementById("gigyaAPIKey").value;
    		var gltexpCookieName = 'gltexp_'+apiKey;
    		var gltexpCookie = getCookie(gltexpCookieName);
    		if(gltexpCookie != undefined){
    			gigya.accounts.logout({callback:logoutEventCallback});    		
    		}else{
    			//[DWR-20283] Global Pages: <login> Event - Event Fire & New Attributes Added
    			// remove session storage variable when customer logs out
       			removeItemFromSessionStorage("isLoginEventFired");
       			if (sessionStorage.getItem("basketDetails") != null && sessionStorage.getItem("basketDetails") != undefined) {
  					removeItemFromSessionStorage("basketDetails");
  				}
				logout(url);
				deleteWCCartCookies();
    		}
    	}
      	
      	
      	function ajaxGetLogoutDetailsApi(){
      		$.ajax({
      		    type: "GET",
      		    url: "BootsOIDCGetLogoutDetailsCmd",
    		    async: false,  
    		    cache: false,
      		    data: "json",
              success: function (data, status, xhr) {
				data = data.replace('\/\*','');
				data = data.replace('\*\/','');
				var dataJson = JSON.parse(data);
				if(dataJson.logoutUrl != null)
		    	   {
					document.location.href = dataJson.logoutUrl;
		    	   }
              },
              error: function (xhr, status, err) {
                 console.log("error in ajaxGetLogoutDetailsApi");
              }
      		});
      	}

        // Start  DWR-10947 Mobile App Touch
        /**
         * This Method Get the response back when getAccount is called for Mobile Touch Flow
         *
         */
        function getAccountInfoResponse(response)
        {
            if ( response.errorCode == 0 ) {            
                processReAuth (response , 'mobileFlow');
            }
            else {
            	//Remove trigger_login cookie and invoke cordova callback method
            	console.log("getAccountInfo Response error Message: "+response.errorMessage);
            	document.cookie = "trigger_login" + '=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=' + "/";
    		loginStatusCallBack("failed");
            }    
        }
        
     // END  DWR-10947 Mobile App Touch
	

    	 function logoutEventCallback(response) {
    		 if(response.errorCode==0){
    			//check for safari and mobile devices
 	      		var uagent = navigator.userAgent.toLowerCase(); 
 	      		var isSafari = false;
 	      		if (uagent.indexOf('safari') != -1) { 
 	      		  if (uagent.indexOf('chrome') > -1) {
 	      			isSafari = false;
 	      		  } else {    	      		    
 	      		    isSafari = true;
 	      		  }
 	      		}
    			//[DWR-20283] Global Pages: <login> Event - Event Fire & New Attributes Added
    			// remove session storage variable when customer logs out
 	   			removeItemFromSessionStorage("isLoginEventFired");
	 	   		if (sessionStorage.getItem("basketDetails") != null && sessionStorage.getItem("basketDetails") != undefined) {
						removeItemFromSessionStorage("basketDetails");
				}
 	      		
 	      		//Temporary fix for logout to work in local & st env. Needs to be removed with Gigya Logout REST API redesign
 	      		var devEnv = false;
 	      		var hostName = window.location.hostname; 	      		
 	      		if(hostName.indexOf('dev1.int.boots') != -1 || hostName.indexOf('staging.st') != -1 || hostName.indexOf('dev.test.boots') != -1){ 	      			
 	      				devEnv = true; 	      		
 	      		}
 	      		if( /iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) || isSafari || devEnv) {   
 	      			console.log("BootsGigyaLogin.js : detected IOS/Safari");
 	      			//call wcs logoff URL
 	    			var params = [];
 	    			params["storeId"] = WCParamJS.storeId;
 	    			params["catalogId"] = WCParamJS.catalogId;
 	    			params["langId"] = WCParamJS.langId;
 	    			params["calledFrom"] = "Top";
 	    			wc.service.invoke("BootsAjaxGigyaLogoffCmd",params);
 	      		
 	      		}else{
 	      			console.log("BootsGigyaLogin.js : detected non IOS/Safari");
 	      			
 	      			var storeId=WCParamJS.storeId;
 	     			//if the current store id is Pharmacy store then use the store id of UK in the redirect URL
 	     			if (storeId == "11355"){
 	     				storeId="11352";
 	     			}
 	     			//take the user to the home page after logging off
 	     			var homePageUrl = '';
 	     			homePageUrl = window.location.protocol + "//" + window.location.host + "/TopCategoriesDisplay?storeId="+ storeId + "&catalogId=" + WCParamJS.catalogId
 	     			+ "&langId=" + WCParamJS.langId+"&calledFrom=Top";
 	     			console.log("homePageUrl : "+homePageUrl);
 	     		 document.location.href = homePageUrl;
 	      		}
				deleteWCCartCookies();
      		}else{      			
      			eStoreProductOverlay('gigyaServiceUnavailableLogOut_overlay');
      		}
    	 }
   
    	 function checkRememberMe(eventObj){
    		 
    		
 		    var myJSON = JSON.stringify(eventObj.formModel);
 			if (null != eventObj.formModel) {
 				remember = eventObj.formModel.data.wcsRememberMe;
 				console.log("BootsGigyaLogin.js : RememberMe flag: " +remember);
    			if(remember == true){ 
    				setRememberMeCookie('WC_REMEMBERME', 1);
    			} 
    			
			 var checkoutLoginFlow = document.getElementById("checkoutLoginFlow").value;
    		 if (null != checkoutLoginFlow && checkoutLoginFlow == "true" ) {
    			 if(remember == true){ 
    			 analyticsJS.publishcheckoutLoginRegisterClickGtm('Yes');
    			 }else  {
    				 analyticsJS.publishcheckoutLoginRegisterClickGtm('No');
    			 }
    			 
    		 }	
    			
    			
 			}
 	 }
    	 	
        //This will get invoked once the user is successfully registered in Gigya. This will call the WCS command and create the same user data in WCS DB
        function loginHandler(response) {        	
        	console.log("BootsGigyaLogin.js : loginHandler called start");
        	var errorCode = response.errorCode;  
        	      	
        	var mfaSwitch = null;
        	if (typeof document.getElementById("mfaSwitch") != undefined && null !=document.getElementById("mfaSwitch") ){
        		mfaSwitch = document.getElementById("mfaSwitch").value;        		
        	}
        	
        	var locationPage = window.location.href;
        	var changeLoginDetailsPage = locationPage.indexOf("BootsUserRegistrationUpdateCredentialsView");
        		if (response != undefined && response.loginMode == "reAuth"){
        			// Start  DWR-10947 Mobile App Touch
        			processReAuth(response , 'normalFlow')
        			// END  DWR-10947 Mobile App Touch
		    	} else if (changeLoginDetailsPage > 0) {
		    		// DWR-21813: Change email reauth issue - START  
		    		processReAuth(response , 'normalFlow')	
		    		// DWR-21813: Change email reauth issue - END 
		    	}else if(response != undefined){
	    			var postCode = "";
		        	var dobDay ="";
		        	var dobMonth = "";
		        	var dobYear = "";
		        	var advantageCard = "";
		        	var age13 = "";
		        	var age16 = "";
		    		var eventName = response.eventName;
		        	uid = response.UID;
		        	var source = response.source;
		        	var context = response.context;
		        	var loginMode = response.loginMode;
		        	var provider = response.provider;
		        	UIDSignature = response.UIDSignature;
		        	signatureTimestamp = response.signatureTimestamp;
		        	var fullEventName = response.fullEventName;
		        	/*var remember = false;
		        	
		        	if (null!= response &&  null != response.remember && "" != response.remember) {
		        		remember = response.remember;
		        	}
		        	*/
		        	
		        	if(response.profile != undefined){
		        		var email = response.profile.email;
		        		var firstName = response.profile.firstName;
			        	var lastName = response.profile.lastName;
		        	}

		        	if(response.data != undefined){
			        	var title = response.data.title;

			        	var terms = response.data.terms;//termsAndConditions.flag;//data.terms;

			        	var emailConsent = response.data.emailConsent.flag;


			        	if(response.data.age13 != undefined){
			        		age13 = response.data.age13.flag;
			        	}
			        	if(response.data.age16 != undefined){
			        		age16 = response.data.age16.flag;
			        	}

			        	if(response.data.advantageCard != undefined){

				        	if(response.data.advantageCard.postCode != undefined){
				        		postCode = response.data.advantageCard.postCode;
				        	}

				        	if(response.data.advantageCard.birthDay != undefined){
				        		dobDay = response.data.advantageCard.birthDay;
				        	}
				        	if(response.data.advantageCard.birthMonth != undefined){
				        		dobMonth = response.data.advantageCard.birthMonth;
				        	}
				        	if(response.data.advantageCard.birthYear != undefined){
				        		dobYear = response.data.advantageCard.birthYear;
				        	}
				        	if(response.data.advantageCard.value != undefined){
				        		advantageCard = response.data.advantageCard.value;

				        	}
			        	}

			        	/*if(response.data.identifier != "" && response.data.identifier != null && response.data.identifier != undefined){
				        	if(response.data.identifier[0] != undefined){
				        		advantageCard = response.data.identifier[0].value;
				        	}
			        	}*/
		    		}

		        	var locationPage = window.location.href;
		        	var isUserRegistrationForm = locationPage.indexOf("UserRegistrationForm");
		        	var fromEditRegistration = locationPage.indexOf("editRegistration");
		        	if(fromEditRegistration > 0){
		        		isUserRegistrationForm = -1;
		        	}
		        	if(isUserRegistrationForm == -1){

		        		if(document.getElementById("uid")){
		        			document.getElementById("uid").value=uid;
		        		}
		        		if(document.getElementById("uidSignature")){
		        			document.getElementById("uidSignature").value=UIDSignature;
		        		}

		        		if(document.getElementById("signatureTimestamp")){
		        			document.getElementById("signatureTimestamp").value=signatureTimestamp;
		        		}
		        		
		        		if(document.getElementById("rememberMe")){
		        			document.getElementById("rememberMe").value=remember;
		        		}
		        		
		        		if(document.getElementById("emailAdvCard")){
			        		document.getElementById("emailAdvCard").value=email;
			        	}
		        		
		        		if(response.eventName == 'login'){
		        	        
		        			// CC-169 : datalayer message removed when invoked from new Checkout login page 
		      	            var isCheckGtmOldFlow = window.location.href.indexOf("\OrderItemDisplay?");
		        			 var isCheckGtm = window.location.href.indexOf("/CheckoutLoginView?");

		        			 // DWR-14222
		        			 if((isCheckGtm > 1)  || (isCheckGtmOldFlow > 1) ) {
			                     	analyticsJS.publishLogonScenarioWithStoreId(response, WCParamJS.storeId, WCParamJS.catalogId);
		        			 }
		        			 
			 	         
			        	}
		        		

		        	}
		        	if(isUserRegistrationForm > 0){

		        	if(document.getElementById("uidSignature")){
		        		document.getElementById("uidSignature").value=UIDSignature;//email;
		        	}
		        	if(document.getElementById("signatureTimestamp")){
		        		document.getElementById("signatureTimestamp").value=signatureTimestamp;//email;
		        	}
		        	if(document.getElementById("reglogonId")){
		        		document.getElementById("reglogonId").value=uid;//email;
		        	}
		        	if(document.getElementById("reglogonIdConfirm")){
		        		document.getElementById("reglogonIdConfirm").value=uid;//email;
		        	}
		        	if(document.getElementById("firstName")){
		        		document.getElementById("firstName").value=firstName;
		        	}
		        	if(document.getElementById("lastName")){
		        		document.getElementById("lastName").value=lastName;
		        	}
		        	if(document.getElementById("personTitle")){
		        		document.getElementById("personTitle").value=title;
		        	}
		        	if(document.getElementById("termsAndConditions")){
		        		document.getElementById("termsAndConditions").value=terms;
		        	}

		        	if(document.getElementById("email1")){
		        		document.getElementById("email1").value=email;
		        	}
		        	if(document.getElementById("gigyaUser")){
		        		document.getElementById("gigyaUser").value='true';
		        	}

		//        	document.getElementById("gender").value=gender.charAt(0).toUpperCase();
		//        	document.getElementById("phone1").value=phone1;
		        	if(document.getElementById("dobDay")){
		        		document.getElementById("dobDay").value=dobDay;
		        	}
		        	if(document.getElementById("dobMonth")){
		        		document.getElementById("dobMonth").value=dobMonth;
		        	}
		        	if(document.getElementById("dobYear")){
		        		document.getElementById("dobYear").value=dobYear;
		        	}
		        	if(document.getElementById("WC_UserRegistrationAddForm_FormInput_receiveEmail_In_Register_1")){
		        		document.getElementById("WC_UserRegistrationAddForm_FormInput_receiveEmail_In_Register_1").value=emailConsent;
		        	}


		        	if(document.getElementById("age13")){
		        		document.getElementById("age13").value=age13;
		        	}
		        	if(document.getElementById("advantageCard")){
		        		document.getElementById("advantageCard").value=advantageCard;
		        	}
		        	if(document.getElementById("postCode")){
		        		document.getElementById("postCode").value=postCode;
		        	}
		        	if(document.getElementById("userRegistrationForm")){
		        		document.getElementById("userRegistrationForm").value='1';
		        	}
		        	if(document.getElementById("calledFromFullRegPage")){
		        		document.getElementById("calledFromFullRegPage").value="false";
		        	}
		        	var v = document.getElementById('pharmacyFullReg');
		        	}
		        	//var params = {"callback": jwtCallback,"fields": uid,
		        	  //      };
		        	var params = {"callback": jwtCallback,"fields": "UID",expiration:30};
		        	var bootsMobileCookie = getCookie("_bdccookie_source");
					if(bootsMobileCookie != undefined && bootsMobileCookie != null){
						//New version Mobile OIDC flow
						if (isNewOIDCMobileApp() && isUserRegistrationForm > 0 && document.Register != undefined && response.profile != undefined) {
			    	    	console.log("BootsGigyaLogin.js : New OIDC Mobile App flow...");
			    	    	var returnURL="";
			    	    	if(document.getElementById("returnURL")) {
			    	    		returnURL=document.getElementById("returnURL").value;
			    	    	}
			    	    	//get registered user login email-id.
			    	    	var email=response.profile.email;
			    	    	var status="";
			    	    	if (response.newUser != undefined && response.newUser == true) {
			    	    		status="REGISTER_SUCCESS";
			    	    	} else {
			    	    		status="REGISTER_FAILURE";
			    	    	}
			    	    	//console.log("BootsGigyaLogin.js : User registration status in New OIDC Mobile App: " + status + " : " + response.errorCode);
			    	    	//call gigya logout api to remove gigya/ciam cookies and then call cordova callback api. 
			    	    	logoutGigyaOnlyFunctions(status,returnURL,email);
			    	    	return;
			    	    } else {
			    	    	//existing Non-OIDC flow
			    	    	params = {"callback": jwtCallback,"fields": "UID",expiration:120};
			    	    }
					}
		        	gigya.accounts.getJWT(params);
		        }
        		
        }

        function processExtendedRegistration(eventObj)
    	{
	    	var myJSON = JSON.stringify(eventObj.response);
	    	var response = eventObj.response;
	    	var errorCode = response.errorCode;
	        var errorMessage = response.errorMessage;

	        var uid = response.UID;
	        var UIDSignature = response.UIDSignature;
	        var signatureTimestamp = response.signatureTimestamp;
	        if(document.getElementById("uid")){
	        	document.getElementById("uid").value=uid;
	        }
		    if(document.getElementById("uidSignature")){
		    	document.getElementById("uidSignature").value=UIDSignature;
		    }
			if(document.getElementById("signatureTimestamp")){
				document.getElementById("signatureTimestamp").value=signatureTimestamp;
			}


//			var params = {"callback": jwtCallback,"fields": uid,
//	    	        };
			var params = {"callback": jwtCallback,"fields": "UID",expiration:30};
        	var bootsMobileCookie = getCookie("_bdccookie_source");
			if(bootsMobileCookie != undefined && bootsMobileCookie != null){
				params = {"callback": jwtCallback,"fields": "UID",expiration:120};
			}
	    	gigya.accounts.getJWT(params);
    	}


        function processReAuth(response , flow )
    	{
        	
	        var errorCode = response.errorCode;
	        var errorMessage = response.errorMessage;
	        var uid = response.UID;
	        var UIDSignature = response.UIDSignature;
	        var signatureTimestamp = response.signatureTimestamp;
	        var authMode = "";
	        if (response.requestParams != undefined && response.requestParams != null 
	        		&& response.requestParams.authMode != undefined && response.requestParams.authMode != null) {
				authMode = response.requestParams.authMode;
			}
	       
	        if (flow == "mobileFlow") {
	        	console.log ("processReAuth Mobile App Flow........");
			var params = {"callback": jwtCallbackmobile,"fields": "UID",expiration:120 ,"uid" : uid , "UIDSignature" : 
					UIDSignature , "signatureTimestamp" :signatureTimestamp, "authMode":authMode};
		    	gigya.accounts.getJWT(params);
	        }else {
	        	console.log ("Normal Flow........");
	        	document.getElementById("uid").value=uid;
	        	document.getElementById("uidSignature").value=UIDSignature;
	        	document.getElementById("signatureTimestamp").value=signatureTimestamp;
	        	document.getElementById("isReAuth").value='Y';
	        	document.getElementById("gigyaAuth").value='Y';
	        	var params = {"callback": jwtCallback,"fields": "UID",expiration:30};
	        	gigya.accounts.getJWT(params);
	        }


    	}
        
        function   jwtCallbackmobile (response){

        	var idToken = response.id_token;
        	var requestParams = response.requestParams;
        	var params = [];
			params["idToken"] = idToken;
			params["uid"] = requestParams.uid;
			params["uidSignature"] = requestParams.UIDSignature;			
			params["signatureTimestamp"] = requestParams.signatureTimestamp;
			params["gigyaUser"] = "true";
			params["gigyaAuth"] = "Y";
			params["authMode"] = requestParams.authMode;
			console.log ("In jwtCallbackmobile, authMode: " + requestParams.authMode);
			params["URL"] = "TopCategoriesDisplay";			
			console.log ("Making Ajax call to BootsAjaxMobileLogonCmd......");
			
        	if (typeof document.getElementById("oidcEnabled_global") != undefined && null !=document.getElementById("oidcEnabled_global") ){
        		var oidcEnabledSwitch = document.getElementById("oidcEnabled_global").value;
        		params["oidcEnabled_global"] = oidcEnabledSwitch;
        	}
			
			wc.service.invoke("BootsAjaxMobileLogonCmd",params);        
        }

        function jwtCallback(response)
    	{
    		console.log("============BootsGigyaLogin.js jwtCallback called===========");
    		var errorCode = response.errorCode;
        	var apiVersion = response.apiVersion;
        	var idToken = response.id_token;
        	var operation = response.operation;
        	var requestParams = response.requestParams;
        	//var sessionExpiration = requestParams.sessionExpiration;
        	

        	var errorMessage = response.errorMessage;
        	var callId = response.callId;
        	var context = response.context;

        	if(document.getElementById("idToken")){
        		document.getElementById("idToken").value=idToken;
        	}
        	ciamsAddAction = window.location.protocol + "//" + window.location.host + "/webapp/wcs/stores/servlet/BootsCiamsLogon";
        	var locationPage = window.location.href;
        	var isUserRegistrationForm = locationPage.indexOf("UserRegistrationForm");
        	
        	var fromEditRegistration = locationPage.indexOf("editRegistration");
        	if(fromEditRegistration > 0){
        		isUserRegistrationForm = -1;
        	}        	
        	var isAdCardFlow1 = null;
        	if (typeof document.getElementById("isAdCardFlow") != undefined && null !=document.getElementById("isAdCardFlow") )
        		isAdCardFlow1 = document.getElementById("isAdCardFlow").value;
        	
        	var isExtendedPhReg1 = null;
        	if (typeof document.getElementById("isExtendedPhReg") != undefined && null !=document.getElementById("isExtendedPhReg") )
        		isExtendedPhReg1 = document.getElementById("isExtendedPhReg").value;

        	var isReAuth1 = null;
        	if (typeof document.getElementById("isReAuth") != undefined && null !=document.getElementById("isReAuth") )
        		isReAuth1 = document.getElementById("isReAuth").value;
        	
        	var is2FAReAuth = null;
        	if (typeof document.getElementById("2FAReAuth") != undefined && null !=document.getElementById("2FAReAuth") ){
        		is2FAReAuth = document.getElementById("2FAReAuth").value;
        		document.getElementById("2FAReAuth").value='N';
        	}
        	console.log("============BootsGigyaLogin.js isReAuthPatientDet called==========="+ document.getElementById("isReAuthPatientDet"));
        	var isReAuthPatientDetail = null;
        	if (typeof document.getElementById("isReAuthPatientDet") != undefined && null !=document.getElementById("isReAuthPatientDet") ){
        		isReAuthPatientDetail = document.getElementById("isReAuthPatientDet").value;
        	}

        	console.log("============BootsGigyaLogin.js isReAuthOneOffPatientDet called==========="+ document.getElementById("isReAuthOneOffPatientDet"));
        	var isReAuthOneOffPatientDetail = null;
        	if (typeof document.getElementById("isReAuthOneOffPatientDet") != undefined && null !=document.getElementById("isReAuthOneOffPatientDet") ){
        		isReAuthOneOffPatientDetail = document.getElementById("isReAuthOneOffPatientDet").value;
        	}

        	//var uid = null;
        	if (typeof document.getElementById("uid") != undefined && null !=document.getElementById("uid") ){
        		uid = document.getElementById("uid").value;
        	}
        	//var uidSignature = null;
        	if (typeof document.getElementById("uidSignature") != undefined && null !=document.getElementById("uidSignature") ){
        		uidSignature = document.getElementById("uidSignature").value;
        	}
        	//var signatureTimestamp = null;
        	if (typeof document.getElementById("signatureTimestamp") != undefined && null !=document.getElementById("signatureTimestamp") ){
        		signatureTimestamp = document.getElementById("signatureTimestamp").value;
        	}
        	var gigyaAuth = null;
        	if (typeof document.getElementById("gigyaAuth") != undefined && null !=document.getElementById("gigyaAuth") ){
        		gigyaAuth = document.getElementById("gigyaAuth").value;
        	}
        	
        	var oidcSwitch = null;
        	if (typeof document.getElementById("oidc_switch") != undefined && null !=document.getElementById("oidc_switch") ){
        		oidcSwitch = document.getElementById("oidc_switch").value;
        	}
        	
        	var fromOrderConfirmationPage = null;
        	if (typeof document.getElementById("fromOrderConfirmationPage") != undefined && null !=document.getElementById("fromOrderConfirmationPage") ){
        		fromOrderConfirmationPage = document.getElementById("fromOrderConfirmationPage").value;
        	}
        	

        	if (isReAuth1 == 'Y' && isReAuthPatientDetail != 'Y' && isReAuthOneOffPatientDetail != 'Y'){
        		if(null != is2FAReAuth && is2FAReAuth == 'Y'){
    				load2FAEnableScreen();
    			}else {
         			document.Register.submit();
         		}
        	}else  if(isReAuthPatientDetail == 'Y'){
        		console.log("============BootsGigyaLogin.js RepeatupdatePatientDetials called===========");
        		ReturningUIHelper.updatePatientDetailsGigya(false,uid,uidSignature,signatureTimestamp,gigyaAuth,idToken);
        	}else  if(isReAuthOneOffPatientDetail == 'Y'){
        		console.log("============BootsGigyaLogin.js OneOffupdatePatientDetials called===========");
        		//updatePatientDetailsGigya(false,uid,uidSignature,signatureTimestamp,gigyaAuth,idToken);
        		OneOffReturningUIHelper.updatePatientDetailsGigya(false,uid,uidSignature,signatureTimestamp,gigyaAuth,idToken);
        	}else  if(isExtendedPhReg1 == 'Y'){
        		if (typeof document.getElementById("storeId") != undefined && null !=document.getElementById("storeId") )
	        		document.getElementById("storeId").value='11352';
				document.PHFullRegister.action = ciamsAddAction ;
				document.PHFullRegister.method = "POST";
				document.PHFullRegister.submit();
	        }else  if(isAdCardFlow1 == 'Y'){        		
				document.AddCardRegistrationForm.action = ciamsAddAction ;
				document.AddCardRegistrationForm.method = "POST";
				document.AddCardRegistrationForm.submit();
	        } else if (isUserRegistrationForm > 0 && document.Register != undefined){
	        	var bootsMobileCookie = getCookie("_bdccookie_source");
	        	var isMobileFlow=false;
	        	if(bootsMobileCookie != undefined && bootsMobileCookie != null){
	        		isMobileFlow=true;
	        	}
	        	//if comreg OIDC switch is on and it is a Non-OIDC mobile app, it should work as is. 
	        	if(oidcSwitch =="true" && !isMobileFlow){
	        		var cepUserRegistrationURL = null;
	            	if (typeof document.getElementById("cepUserRegistrationURL") != undefined && null !=document.getElementById("cepUserRegistrationURL") ){
	            		cepUserRegistrationURL = document.getElementById("cepUserRegistrationURL").value;
	            		if(fromOrderConfirmationPage == 'Y'){
	            			cepUserRegistrationURL = cepUserRegistrationURL + '&fromOrderConfirmationPage=Y';
	            		}
	            		document.location.href = cepUserRegistrationURL;
	            	}
	            	
	        	}else{
					document.Register.action = ciamsAddAction ;
					document.Register.method = "POST";
					document.Register.submit();
	        	}
        	} else if(isUserRegistrationForm == -1 && document.Logon == undefined){
        		if(errorCode == 0){
        			var myaccountFlagElement = document.createElement("input");        			
        			myaccountFlagElement.value= "1";
        			myaccountFlagElement.name="myAcctMain";
        			myaccountFlagElement.type = "hidden"; 		    	  
        			autoLogIn(idToken,false,myaccountFlagElement);
        		}
        	} else if(isUserRegistrationForm == -1 && document.Logon != undefined){
        		//autoLogIn(idToken,false);
        		if(document.Logon.action != undefined){
        			document.Logon.action = ciamsAddAction ;
        		}
				if(document.Logon.method != undefined){
					document.Logon.method = "POST";
				}
				if(document.Logon.submit != undefined){
					document.Logon.submit();
					
				}
        	}

    	}
    	
    	//handle auto logon from external domains like DHP to WCS pages other than login/registration page
    	function autoLogIn(idToken,formSubmissionRequired,myaccountFlag) {
    		if(idToken != null && idToken != undefined){
	    	    var form = document.createElement("form");
	    	    var element1 = document.createElement("input");
	    	    var element2 = document.createElement("input");
	    	    var element3 = document.createElement("input"); 
	    	    var element4 = document.createElement("input");
	
	    	    element1.value=idToken;
	    	    element1.name="idToken";
	    	    element1.type = "hidden";
	    	    form.appendChild(element1); 
	    	    
	    	    element2.value=uid;
	    	    element2.name="uid";
	    	    element2.type = "hidden";
	    	    form.appendChild(element2);
	    	    
	    	    element3.value=UIDSignature;
	    	    element3.name="uidSignature";
	    	    element3.type = "hidden";
	    	    form.appendChild(element3);
	    	    
	    	    element4.value=signatureTimestamp;
	    	    element4.name="signatureTimestamp";
	    	    element4.type = "hidden";
	    	    form.appendChild(element4);
	
	    	    document.body.appendChild(form);
	    	    if(formSubmissionRequired){
	    	    	var element5 = document.createElement("input"); 
		    	    element5.value="true";
		    	    element5.name="gigyaUser";
		    	    element5.type = "hidden";
		    	    form.appendChild(element5);		    	    
		    	    
		    	    var element6 = document.createElement("input"); 
		    	    element6.value="Y";
		    	    element6.name="gigyaAuth";
		    	    element6.type = "hidden";
		    	    form.appendChild(element6);
		    	    
		    	    var element7 = document.createElement("input"); 
		    	    element7.value= document.getElementById("SSOLogonURL").value; 
		    	    element7.name="URL";
		    	    element7.type = "hidden";
		    	    form.appendChild(element7);
		    	    		    	    
		    	    form.appendChild(myaccountFlag);
		    	    
	    	    	form.method = "POST";
		    	    form.action = ciamsAddAction;
	    	    	form.submit();
	    	    }else{
	    	    	var params = [];
	    			params["idToken"] = idToken;
	    			params["uid"] = uid;
	    			params["uidSignature"] = UIDSignature;			
	    			params["signatureTimestamp"] = signatureTimestamp;
	    			params["gigyaUser"] = "true";
	    			params["gigyaAuth"] = "Y";
	    			var urlValue = document.getElementById("SSOLogonURL").value; 
	    			params["URL"] = urlValue;
	    			params["autoLogin"] = "true";
	    			wc.service.invoke("BootsAjaxSSOLogonCmd",params);
	    	    }
	    	    
    		}

    	}
    	
    	// create cookie for remember me
    	function setRememberMeCookie(cname, cvalue) {     	    
    		//var d = new Date();
    	    //d.setTime(d.getTime() + (exmin*60*1000));
    	    //var expires = "expires="+d.toUTCString();
    		this.deleteCookie(cname);
    	    document.cookie = cname + "=" + cvalue + ";path=/;";    	  
    	}
    	
    	function deleteCookie(cookieName) {
    		//console.info('deleteCookie(' + cookieName + ');');    		
    		var cookieValue = cookieName + "=;";
    		document.cookie = cookieValue + ";path=/;";
    	}

    	/**
    	 * This method is used to fix defect DWR-13973 for setting gltexp cookie.
    	 * @param params
    	 */
    	function callAjaxCookieCreation(params) {
			wc.service.invoke("AjaxBootsDummyCmd",params);
    	}
    	
    	function pageReload(viewName){
    		if(viewName == 'BootsUserRegistrationUpdateCredentialsView'){    			
    			var reloadURL = document.getElementById('BootsUserRegistrationUpdateCredentialsViewURL').value;
    			document.location.href = reloadURL;
    		}
    		
    	}
    	/**
    	 * MFA/TFA registration functions
    	 */
    	function setRbaRiskPolicy(riskPolicy) {
		  function setAccountInfoResponse(response) {
		    if (response.errorCode == 0) {
		      pageReload('BootsUserRegistrationUpdateCredentialsView');
		    } else {
		      // error handling...
		      console.error("TFA Tactical - " + "setRbaRiskPolicy " + "Gigya failed ");
		      pageReload('BootsUserRegistrationUpdateCredentialsView');
		    }
		  }
		  var params = {
		    rba: {
		      riskPolicy: riskPolicy,
		    },
		    callback: setAccountInfoResponse,
		  };

		  gigya.accounts.setAccountInfo(params);
		}

    	function load2FAEnableScreen() {
    	  document.getElementById("2FAReAuth").value='Y';
		  function afterSubmitHandler(eventObj) {
		    if (eventObj.screen == "gigya-tfa-registration-screen") {
		      if (eventObj.response.errorCode == 0 && eventObj.response.operation == "/accounts.tfa.finalizeTFA") {
		    	var mfaBootsRbaPolicy = dojo.byId("mfaBootsRbaPolicy").value;
		        setRbaRiskPolicy(mfaBootsRbaPolicy);
		      } else if (eventObj.response.errorCode == 403110) {
		        // errorDetails: Account Pending Recent Login
		        // This error triggers the re-authenticate so skip the page reload logic.
		      } else if (eventObj.response.errorCode != 0) {
		        // error handling...
		    	console.error("TFA Tactical - " + "load2FAEnableScreen " + "Gigya failed non-zero. ");
		        pageReload('BootsUserRegistrationUpdateCredentialsView');
		      } else {
		    	console.error("TFA Tactical - " + "load2FAEnableScreen " + "Gigya failed finalize. ");
		      }
		    }
		  }

		  gigya.accounts.showScreenSet({ 
		    screenSet:'master-registration-login',
		    deviceType:'desktop',
		    startScreen: 'gigya-tfa-registration-screen',
		    onError: errorHandler,
		    onAfterSubmit: afterSubmitHandler,
		  });
		}
    	
    	/**
    	 * Call Gigya Logout api to remove gigya/ciam cookies and then call cordova callback api.
    	 */
    	function logoutGigyaOnlyFunctions(status,returnURL,email) {
      		
      		var apiKey = document.getElementById("gigyaAPIKey").value;
    		var gltCookieName = 'glt_'+apiKey;
    		var gltCookie = getCookie(gltCookieName);
    		var errorLogOut = false;
    		//check Gigya/Ciam cookie exists.
    		if(gltCookie != undefined){
    			//console.log("BootsGigyaLogin.js : gltCookie cookie exists. ");
    			if(isAndroidMobileApp()){
    				if (typeof document.getElementById("testParam") != undefined && null !=document.getElementById("testParam") ){
    	    			if(document.getElementById("testParam").value == 'true'){
    	    				errorLogOut = true;
    	    			}
    	    		}
    				console.log("BootsGigyaLogin.js : explicitLoginCallbackPostLogout");
    		   		 //call cordova mobile app callback api.
    			   	explicitLoginCallbackPostLogout(status,returnURL,email,errorLogOut);
    			} else {
    				console.log("BootsGigyaLogin.js : logoutGigyaOnlyFunctions called start");
    				gigya.accounts.logout({callback:logoutGigyaOnlyEventCallback,"status":status,"returnURL":returnURL,"email":email});
    			}
    			    		
    		}else{
    			//[DWR-20283] Global Pages: <login> Event - Event Fire & New Attributes Added
    			// remove session storage variable when customer logs out
       			removeItemFromSessionStorage("isLoginEventFired");
       			if (sessionStorage.getItem("basketDetails") != null && sessionStorage.getItem("basketDetails") != undefined) {
  					removeItemFromSessionStorage("basketDetails");
  				}
				deleteWCCartCookies();

       			//console.log("BootsGigyaLogin.js : No gltCookie cookie exist.");
       			//call cordova mobile app callback api.
       			explicitLoginCallback(status,returnURL,email);
    		}
    	}
    	
    	/**
    	 * Once Gigya Logout api is returned then call Cordova Mobile App callback api with required attributes.
    	 */
    	function logoutGigyaOnlyEventCallback(response) {
    		//console.log("BootsGigyaLogin.js : logoutGigyaOnlyEventCallback called start");
    		var requestParams = response.requestParams;
    		var errorLogOut = false;
    		if (typeof document.getElementById("testParam") != undefined && null !=document.getElementById("testParam") ){
    			if(document.getElementById("testParam").value == 'true'){
    				errorLogOut = true;
    			}
    		}
    	
	   		 if(response.errorCode==0){
	   			//console.log("BootsGigyaLogin.js : logoutGigyaOnlyEventCallback logout successful.");
	   			//[DWR-20283] Global Pages: <login> Event - Event Fire & New Attributes Added
	   			// remove session storage variable when customer logs out
	   			removeItemFromSessionStorage("isLoginEventFired");
	   			if (sessionStorage.getItem("basketDetails") != null && sessionStorage.getItem("basketDetails") != undefined) {
  					removeItemFromSessionStorage("basketDetails");
  				}
				deleteWCCartCookies();
     		}else{      	
     			//DWR-23035 MFA- Mobile App error scenarios on Registration
     			console.log("BootsGigyaLogin.js : gigyaServiceUnavailableLogOut.");
     			errorLogOut = true;
     		}
	   		 //call cordova mobile app callback api.
		   	explicitLoginCallbackPostLogout(requestParams.status,requestParams.returnURL,requestParams.email,errorLogOut);
   	    }
    	
    	/**
    	 * Declares an AJAX service for Assumed login user-Inactivity logoff
    	 * @constructor
    	 */
    	wc.service.declare({
    		id: "BootsAjaxInactivityGigyaLogoff",
    		actionId: "BootsAjaxInactivityGigyaLogoff",
    		url: "BootsAjaxInactivityGigyaLogoffCmd?storeId=" + WCParamJS.storeId,
    		formId: ""
    		
    		/**
    		 * Redirects the browser to home page
    		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
    		 */
    		,successHandler: function(serviceResponse) {
    			
    			if (serviceResponse.serviceStatus == 'FAILURE' && serviceResponse.GIGYA_ERROR == 'GIGYA_ERROR') {     				
    				eStoreProductOverlay('gigyaServiceUnavailableLogOut_overlay');
    			}else{
    				//Fix for QC: 6214. UserVisitId will be removed from localstorage, when the user logs out.. [as per solution given by Boots Patrick]
    				if(localStorageEnabled()) {
    					localStorage.removeItem("userVisitId");
    				}
    				var rememeberMeCookie = getCookie("WC_REMEMBERME");		
    				if(rememeberMeCookie != undefined ){
    					//removeCookie("WC_REMEMBERME");
    					deleteCookie("WC_REMEMBERME", "/");
    				} 				
    									   					
					var storeId=WCParamJS.storeId;
	     			//if the current store id is Pharmacy store then use the store id of UK in the redirect URL
	     			if (storeId == "11355"){
	     				storeId="11352";
	     			}
	     			//take the user to the home page after logging off
	     			var homePageUrl = '';
	     			homePageUrl = window.location.protocol + "//" + window.location.host + "/TopCategoriesDisplay?storeId="+ storeId + "&catalogId=" + WCParamJS.catalogId
	     			+ "&langId=" + WCParamJS.langId+"&calledFrom=Top";
	     			console.log("homePageUrl : "+homePageUrl);
		     		document.location.href = homePageUrl;
    			}
    		}
    		
    		/**
    		 * Displays the error message returned with the service response.
    		 *
    		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
    		 */
    		,failureHandler: function(serviceResponse) {
    			var gigyaErr = serviceResponse.gigyaError;
    			console.log("Gigya Java SDK call accounts.logout failed");   			
    			
    		}

    	}),
    	
    	
    	/**
    	 * Declares an AJAX service for Assumed login user-Inactivity logoff
    	 * @constructor
    	 */
    	wc.service.declare({
    		id: "BootsAjaxSSOLogonCmd",
    		actionId: "BootsAjaxSSOLogonCmd",
    		url: "BootsAjaxSSOLogonCmd?storeId=" + WCParamJS.storeId,
    		formId: ""
    		
    		/**
    		 * Redirects the browser to home page
    		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
    		 */
    		,successHandler: function(serviceResponse) {    			
    			console.log("SSO Login is successful");    
    			
    		}
    		
    		/**
    		 * Displays the error message returned with the service response.
    		 *
    		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
    		 */
    		,failureHandler: function(serviceResponse) {    			
    			console.log("BootsAjaxSSOLogonCmd call failed");
    		}

    	}),
    	
    	
    	
    	/**
    	 * Declares an AJAX service for Assumed Mobile App Logged IN flow
    	 * @constructor
    	 */
    	wc.service.declare({
    		id: "BootsAjaxMobileLogonCmd",
    		actionId: "BootsAjaxMobileLogonCmd",
    		url: "BootsAjaxMobileLogonCmd?storeId=" + WCParamJS.storeId,
    		formId: ""
    		
    		/**
    		 * Redirects the browser to home page
    		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
    		 */
    		,successHandler: function(serviceResponse) {    			

    			console.log("Mobile App Logged IN is successful");
    			var userType = getCookie("UserType");
    			console.log("userType value: " + userType);
    			
    			var oidcEnabledSwitch = serviceResponse.oidcEnabled_global[0];
    			console.log("oidcEnabled_global: " + oidcEnabledSwitch);
          
    			apiKey = document.getElementById("gigyaAPIKey").value;
    			var gltCookieName = 'glt_'+apiKey;
    			var gltCookie = getCookie(gltCookieName);
    			
    			var bdcCookie = getCookie("_bdccookie_source");
    			
    			if(gltCookie != undefined && ((oidcEnabledSwitch == undefined || oidcEnabledSwitch != "true") || 
						(bdcCookie != undefined && bdcCookie != null && !isNewOIDCMobileApp()))){
    				gigya.syncGroupGltExp();
    			}
    			document.cookie = "trigger_login" + '=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=' + "/"; 
    			if(userType != undefined && userType == 'R'){
    				loginStatusCallBack("success");
    			}else{
    				loginStatusCallBack("failed");
    			}
    		}
    		
    		/**
    		 * Displays the error message returned with the service response.
    		 *
    		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
    		 */
    		,failureHandler: function(serviceResponse) {    			
    			console.log("BootsAjaxMobileLogonCmd call failed");
    			//Remove trigger_login cookie and invoke cordova callback method
    			document.cookie = "trigger_login" + '=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=' + "/";
    			loginStatusCallBack("failed"); 
    		}

    	}),
    	   // END  DWR-10947 Mobile App Touch
    	  
    	
    	/**
    	 * Declares an AJAX service for wcs logoff
    	 * @constructor
    	 */
    	wc.service.declare({
    		id: "BootsAjaxGigyaLogoffCmd",
    		actionId: "BootsAjaxGigyaLogoffCmd",
    		url: "BootsAjaxGigyaLogoffCmd?storeId=" + WCParamJS.storeId,
    		formId: ""
    		
    		/**
    		 * Redirects the browser to home page
    		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
    		 */
    		,successHandler: function(serviceResponse) {
    			
    			//Fix for QC: 6214. UserVisitId will be removed from localstorage, when the user logs out.. [as per solution given by Boots Patrick]
    				if(localStorageEnabled()) {
    					localStorage.removeItem("userVisitId");
    				}
    				var rememeberMeCookie = getCookie("WC_REMEMBERME");		
    				if(rememeberMeCookie != undefined ){
    					//removeCookie("WC_REMEMBERME");
    					deleteCookie("WC_REMEMBERME", "/");
    				}    				
    				
					var inactivityCookie = getCookie("WC_INACTIVITY_REMEMBERME");		
					if(inactivityCookie != undefined){			
						deleteCookie("WC_INACTIVITY_REMEMBERME", "/");
					}
    					
					var storeId=WCParamJS.storeId;
	     			//if the current store id is Pharmacy store then use the store id of UK in the redirect URL
	     			if (storeId == "11355"){
	     				storeId="11352";
	     			}
	     			//take the user to the home page after logging off
	     			var homePageUrl = '';
	     			homePageUrl = window.location.protocol + "//" + window.location.host + "/TopCategoriesDisplay?storeId="+ storeId + "&catalogId=" + WCParamJS.catalogId
	     			+ "&langId=" + WCParamJS.langId+"&calledFrom=Top";
	     			console.log("homePageUrl : "+homePageUrl);
		     		document.location.href = homePageUrl;
    			
    		}
    		
    		/**
    		 * Displays the error message returned with the service response.
    		 *
    		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
    		 */
    		,failureHandler: function(serviceResponse) {    			
    			console.log("Gigya Java SDK call accounts.logout failed");  
    			if (serviceResponse.errorMessage) {
    				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
    			} else {
    				if (serviceResponse.errorMessageKey) {
    					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
    				}
    			}    			
    			cursor_clear();
    			
    		}

    	}),
    	
    	/**
    	* Declares an AJAX service for wcs dummy ajax call for setting gltexp cookie DWR-13973.
    	* TODO The dummy Ajax call needs to be removed when a permemnet fix is in place for gltexp issue in the sign up flow
    	*/
    	wc.service.declare({
    		id: "AjaxBootsDummyCmd",
    		actionId: "AjaxBootsDummyCmd",
    		url: "AjaxBootsDummyCmd",
    		formId: ""
    		
    		/**
    		* Redirects the browser to home page
    		* @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
    		*/
    		,successHandler: function(serviceResponse) {
    			console.log("serviceResponse.jspPage::"+serviceResponse.jspPage);
    			console.log("serviceResponse.email::"+serviceResponse.email);
    			if (serviceResponse.jspPage == 'partialSuccessJSP') {    				
    				// Begin - DWR-9929: Pushback to mobile from the Digital First Sign up page 
					var bootsMobileCookie = getCookie("_bdccookie_source");
					if(bootsMobileCookie != undefined && bootsMobileCookie!=null) {	
						var jwtTokenId = serviceResponse.jwtTokenId[0];
						var advantageCardNumber = serviceResponse.advantageCardNumber[0];
						var adCardDOBSwitch = serviceResponse.adcardDOBSwitch[0];
						var adcardDateOfBirth = serviceResponse.adcardDateOfBirth[0];
						var regStatus = serviceResponse.regStatus[0];		
						 //DWR - 22266 - start
						if (isNewOIDCMobileApp()) {
							var flow = serviceResponse.flow[0];
							var email = serviceResponse.email[0];
							if (flow!=undefined && flow!=null  && flow == 'Registered' ){
								explicitLoginCallback(regStatus,"","");
							}else {
								logoutGigyaOnlyFunctions(regStatus ,"" ,email)
							}
						}
						//DWR --22266 End
						else {				
								if(jwtTokenId != null && jwtTokenId != ""){
									if(advantageCardNumber == undefined) {
										advantageCardNumber = "" ;
									}							
									implicitLoginCallBack(jwtTokenId,"",advantageCardNumber,adcardDateOfBirth,adCardDOBSwitch,regStatus);
								}
							}
					}
					// End - DWR-9929: Pushback to mobile from the Digital First Sign up page 					
    			}
    			if (serviceResponse.jspPage == 'registrationErrorJSP') {    				
    				// Begin - DWR-9929: Pushback to mobile from the Digital First Sign up page 
					var bootsMobCookie = getCookie("_bdccookie_source");
					var jwtTokenIdErrJSP = serviceResponse.jwtTokenId[0];
					var adCardDOBSwitchVar = serviceResponse.adcardDOBSwitch[0];
					var advantageCardNum = serviceResponse.advantageCardNumber[0];
					var registrationStatus = serviceResponse.regStatus[0];					
					if((bootsMobCookie != undefined) && (jwtTokenIdErrJSP != null && jwtTokenIdErrJSP != "")){
						if(advantageCardNum == undefined) {
							advantageCardNum = "" ;
						}						
						implicitLoginCallBack(jwtTokenIdErrJSP,"",advantageCardNum,"",adCardDOBSwitchVar,registrationStatus);
					}
					// End - DWR-9929: Pushback to mobile from the Digital First Sign up page					
    			}
    			if (serviceResponse.jspPage == 'mobileAppRedirectJSP') {    				
    				var jwtToken = serviceResponse.jwtToken[0];
    				var status = serviceResponse.regStatus[0];
    				var adCardNumber = serviceResponse.adCardNumber[0];
    				/*DWR: 13554 - adcard DOB mobile app Switch  - Begin*/
    				var adcardDOBSwitch = 'N';
    				if (dojo.byId("adcardDOB_Switch")!=undefined ) {
    					adcardDOBSwitch = dojo.byId("adcardDOB_Switch").value;    					
    					}
    				/*DWR: 13554 - adcard DOB mobile app Switch  - End*/    				
    				if((jwtToken != null && jwtToken != "") || (status != null && status != "")){
    					implicitLoginCallBack(jwtToken,"",adCardNumber,"",adcardDOBSwitch,status);
    				}else{
    					var loginScreenName = 'applyAdcard';
    					var returnURL = document.getElementById("returnURL").value;
    					nativeLoginCallback(loginScreenName,returnURL);
    				}
    			}
    		}
    		
    		/**
    		* Displays the error message returned with the service response.
    		*
    		* @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
    		*/
    		,failureHandler: function(serviceResponse) {
    			console.log("Dummy Ajax call failed");
    			var bootsMobCookie = getCookie("_bdccookie_source");
    			if(bootsMobCookie != undefined){
    				var jwtToken = document.getElementById("jwtToken").value;				
     				var status = document.getElementById("regStatus").value;
    				var adCardNumber = document.getElementById("adCardNumber").value; 
    				/*DWR: 13554 - adcard DOB mobile app Switch  - Begin*/
    				var adcardDOBSwitch = 'N';
    				if (dojo.byId("adcardDOB_Switch")!=undefined ) {
    					adcardDOBSwitch = dojo.byId("adcardDOB_Switch").value;    					
    				}
    				/*DWR: 13554 - adcard DOB mobile app Switch  - End*/    				
    				if((jwtToken != null && jwtToken != "") || (status != null && status != "")){
    					implicitLoginCallBack(jwtToken,"",adCardNumber,"",adcardDOBSwitch,status);
    				}
    			}
    			
    		}
    	})
    	
 function AjaxCallCEPKeepAlive(){
		
	if (typeof(mfaCepConfigs) != 'undefined' && mfaCepConfigs.oidcSwitch == 'true') {
	    var keepAliveURL = new URL(mfaCepConfigs.mfa_cep_keepalive_url, getAbsoluteURL());
		
	    $.ajax({   	  
		    url:keepAliveURL, 
		    type:'get',     
		    data:'',     
		    async: false,  
		    cache:false,
		    tryCount : 0,
            retryLimit : 3,    
		    dataType:'html', 
		    error : function(xhr, textStatus, errorThrown ) {
		    	var self = this;
		    	var retry = function () {
		    	    $.ajax(self);
		    	};
		    	
		        if (xhr.status/100 != 2) {
		            this.tryCount++;
		            if (this.tryCount <= this.retryLimit) {
		            	setTimeout(retry, 1000);
		                return;
		            }    
		            if(this.tryCount == 4){
						var genericErrPgURL = '';
							genericErrPgURL = window.location.protocol + "//" + window.location.host + "/GenericApplicationError.jsp";
							console.log("genericErrPgURL : "+genericErrPgURL);
						 document.location.href = genericErrPgURL;
						 return;
				   }
		           return;
		        }
       
		    },     
		    success: function(data, status, xhr){
		    	return status;
		    	
		    }
		});		
	}
}

function deleteWCCartCookies(){
	var orderIdCookie = getCookie("WC_CartOrderId_"+WCParamJS.storeId);
	if(orderIdCookie != null){
			dojo.cookie("WC_CartOrderId_"+WCParamJS.storeId, null, {expires: -1, path:'/'});
			dojo.cookie("WC_CartTotal_"+orderIdCookie, null, {expires: -1, path:'/'});
			dojo.cookie("WC_CartTotal_ItemCount", null, {expires: -1, path:'/'});
			
			var ordIdCookie=getCookie("WC_CartOrderId_"+WCParamJS.storeId) ? getCookie("WC_CartOrderId_"+WCParamJS.storeId) : null;
			if(!!ordIdCookie){
				dojo.cookie("WC_CartOrderId_"+WCParamJS.storeId, null, {expires: -1, path:'/', domain:".boots.com"});
				dojo.cookie("WC_CartTotal_"+orderIdCookie, null, {expires: -1, path:'/', domain:".boots.com"});
			}
	}
	
	 dojo.cookie("UserType", "G", {path:'/'});
	 console.log("=== updating UserType to G in BGL end === ");
		
};
