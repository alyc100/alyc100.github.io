/*
 * personify = new PersonifyXP(config);
 * personify.init()
 * personify.displayRecs(config)
 * personify.displaySocialPDP(config)
 * personify.displaySocialPLP(config)
 * personify.rankList(config,"elements|contents")
 * 
 *  personify.initScrollTracking({
            headerElements: ["#shopify-section-announcement","#shopify-section-header"],
            trackingElements: {
 *              1: document.querySelector( '#tab-1' ),
 *              2: document.querySelector( '#tab-2' ), 
 *              3: document.querySelector( '#tab-3' )
 *          }
 *      });
 */
class PersonifyXP {
	constructor(config) {
		this.config = config;
		this.version = "0.25";    
		this.page_bundles = [];
		this.page_recommendations = [];
		this.isTabActive=false;
		this.scrollHeaderEl="";
		this.trackingHeaderElements = [];
		this.trackingElements = {};	
		this.trackingValues = {};	
		this.dwellCount = 0;
		this.dwellFinished = false;
		this.savedHidden = false;
		this.testVariants = [];
		this.testBranches = [];
		this.viewLinks = {};
		this.trackedGAViewCodes = [];
		this.apiCalls = [];
		this.apiMissions = [];
		this.apiTags = [];
		this.apiAttributes = [];
	}

	

	// AB Test Tracking - Config example below:
	// abtest: {
	//     type: "ga",
	//     name: "Social Proofing Test",
	//     experimentId: "social001",
	//     branches: {
	//         control: {
	//             id: 0,
	//             name: "Control Group",
	//             type: "ga",
	//             traffic: 0.5
	//         },
	//         experiment: {
	//             id: 1,
	//             name: "Personify XP Group",
	//             type: "ga",
	//             traffic: 0.5
	//         }
	//     }
	// },
	//testVariants = [
		// {
		// 	name: 'social001',
		// 	variant: 1,
		// 	variant_name: 'experiment'
		// }
	//];


	loadABTest(testConfig) {
	
		// Helpers
		function setCookie(testID, variantID, prefix, testDays) {
			if (typeof(testDays) === 'undefined') testDays = 120;
			var date = new Date();
			date.setTime(date.getTime() + (testDays * 86400000));
			var expires = '; expires=' + date.toGMTString();
			document.cookie = prefix + testID + '=' + variantID + expires + '; path=/';
			//console.log(prefix + testID + '=' + variantID + expires + '; path=/');
		}
		
		function readCookie(testID, prefix) {
			var name = prefix + testID;
			var re = new RegExp(name + "=([^;]+)");
			var value = re.exec(document.cookie);
			if (value != null) {
			return unescape(value[1]);
			}
			return null;
		}
			
		function variant(testID,variantID,testConfig,p) {
			var testBranch = "";
			var testType = "";
			
			for(var k in testConfig.branches) {
				if(testConfig.branches[k].id==variantID){
					testBranch = k;
					testType = testConfig.type;
				}
			}
	
			p.testBranches.push(testBranch);
			p.testVariants.push({
				name: testID,
				variant: variantID,
				variant_name: testBranch,
				type: testType
			});
			setCookie(testID,variantID,prefix,testDays);
		}

		
		var testID = testConfig.experimentId;
		var testDays = testConfig.days;
		var prefix = 'personifyxp-test';
		var testVariant = readCookie(testID, prefix);

		// Check variants v.s. cookies		
		this.debug("Looking for preview parameter (preview-"+testID+")...");
		if (this.getParameterByName('preview-'+testID) != "") {
			testVariant=this.getParameterByName('preview-'+testID);
			this.debug("Test ("+testID+") using preview - " + testVariant);
				variant(testID,this.getParameterByName('preview-'+testID),testConfig,this);
		} else if (testVariant) {
			this.debug("Test ("+testID+") using cookie - " + testVariant);
				variant(testID,testVariant,testConfig,this);
		} else {
			var random = Math.floor(Math.random() * 100);
			var total = 0.0;
			for(var i in testConfig.branches){
				total += testConfig.branches[i].traffic;
			}
			var threshold = 0.0;
			for(var j in testConfig.branches) {
					threshold += (testConfig.branches[j].traffic/total)*100;
					if(random<threshold) {
						testVariant=testConfig.branches[j].id
						this.debug("Test ("+testID+") setting cookie - " + testVariant);
						variant(testID,testConfig.branches[j].id,testConfig,this);
						break;
					}
			}
		}

	}

	getParameterByName(name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.search);
		if (results == null) {
			return "";
		} else {
			return decodeURIComponent(results[1].replace(/\+/g, " "));
		}
	}

	pageMatchesBranch(personifyPage) {
		if (personifyPage.testBranches) {
			//find the intersection of page and user and return true if it's non null
			var p = this;
			var intersection = personifyPage.testBranches.filter(function(n) {
					return p.testBranches.indexOf(n) !== -1;
				})
			return intersection.length>0;
		} else {
			return true; // if no branches specified it runs on all
		}
	}

	loadABTests() {
		for(var i in this.config.abtest){
			this.debug("Loading AB Test:");
			this.debug(this.config.abtest[i]);
			this.loadABTest(this.config.abtest[i]);
		}		
		this.debug(this.testVariants[i]);
		this.logTestVariantsToGA(this);
	}


	logTestVariantsToGA(p) {	
		p.debug("Logging tests to GA");
		if(typeof ga === "function"){
			try {
				ga(function() {
					ga.getAll().forEach(function(t) {
						for(var i in p.testVariants) {
							if(p.testVariants[i].type=='ga'){
								// p.debug("Sending test branch details to GA");
								ga(t.get("name")+'.send', 'event', 'PersonifyTestBranch', 'personifyxp-test-'+p.testVariants[i].name+'-'+p.testVariants[i].variant, 'personifyxp-test-'+p.testVariants[i].name, {nonInteraction: true});
							}
						}
					});
				});		
			} catch(e) { 
				console.error("Personify XP: problem with GA"); 
				console.error(e); 
			}			
		} else {
			p.debug("Waiting for GA");
			window.setTimeout(function(){p.logTestVariantsToGA(p)}, 200);
		}
	}

	

	getEndpoint(type) {
		switch (type){
			case 'plp':
			case 'category':
				return "viewcategory";
			case 'pdp':
			case 'pdp-set':
			case 'product':
				return "viewpdp";
			case 'search':
				return "search";
			case 'add':
			case 'addlist':
			case 'addbasket':
				return "addbasket";
			case 'checkout':
				return "checkout";
			case 'conversion':
				return "conversion";
			case 'scroll':
				return "scroll";
			case 'basket':
			case 'viewbasket':
				return "viewbasket";
			case 'content':
				return "viewcontent";
			default:
				return "";
		}
	}
	
	getDeviceType() {
		var check = false;
		(function(a){
			if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) 
				check = true;
		})(navigator.userAgent||navigator.vendor||window.opera);
		
		if(check) {
			return 'mobile';
		} else {
			return 'desktop';
		}

	}
	
	sentenceCase(theString) {
		var newString = theString.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g,function(c){return c.toUpperCase();});
		return newString;
	}

	buildElements(infoSet,buildFunction,response,p) {
		console.log(p);
		for (var r in infoSet) {
			if(infoSet[r].buildFunction){
				p.buildRecs(infoSet[r],infoSet[r].buildFunction,response,p,infoSet[r].callback);
			} else {
				p.buildRecs(infoSet[r],buildFunction,response,p,infoSet[r].callback);
			}
		}
	}

	buildRecs(recsPreMergeConfig,buildFunction,response,p,callback) {
		var recsConfig = p.mergeRecsConfig(recsPreMergeConfig,p);
		if(response==null||(recsConfig.type&&recsConfig.type!="freeform")||(recsConfig.overrides&&recsConfig.overrides.length>0)){
			//can't use the base tracking for anything with overrides or non-freeform
			p.fetchAndBuildRecs(recsConfig,buildFunction,p,callback);
		} else {
			var el = document.createElement("div");
			el.setAttribute("id", recsConfig.id);			
			if("classes" in recsConfig) {
				el.setAttribute("class", recsConfig.classes);
			}			
			el.innerHTML = buildFunction(response,(("show_mobile" in recsConfig && p.isMobile())? recsConfig.show_mobile:recsConfig.show),recsConfig.template,recsConfig.title);			
			if(recsConfig.pos_type=="after") {
				try { p.insertAfter(document.querySelector(recsConfig.pos_element),el) } catch(e){ console.log("Error with: "+recsConfig.pos_element+" or with: ");console.log(el);console.log(e); };
			} else if(recsConfig.pos_type=="before") { 
				try { p.insertBefore(document.querySelector(recsConfig.pos_element),el) } catch(e) {console.log("Error with Insert Before")}
			} else if(recsConfig.pos_type=="insert") { 
				try { document.querySelector(recsConfig.pos_element).innerHTML=el.outerHTML; } catch(e) {console.log("Error with Insert Into")}
			}
			if(callback!=null){
				callback(el,recsConfig.template);
			}
			if(recsConfig.clickTrackingIds){
				var gaEnabled = false;
				if(recsConfig.gaTracking){gaEnabled=true;}
				for(var i=0;i<recsConfig.clickTrackingIds.length;i++) {
					p.trackClicksOnElementGAEnabled(recsConfig.clickTrackingIds[i],gaEnabled);
				}
			}
		}
	}

	mergeRecsConfig(recsPreMergeConfig,p) {
		var recsConfig = {};
		for (var attrname in recsPreMergeConfig) { recsConfig[attrname] = recsPreMergeConfig[attrname]; }
		if(recsPreMergeConfig.slot&&p.config.slots&&p.config.slots[recsPreMergeConfig.slot]){
			for (var attrname in p.config.slots[recsPreMergeConfig.slot]) { recsConfig[attrname] = p.config.slots[recsPreMergeConfig.slot][attrname]; }
		}
		try { delete recsConfig.slot; } catch(e) {}
		p.debug("Merged Recs Config:");
		p.debug(recsConfig);
		return recsConfig;		
	}

	fetchAndBuildRecs(recsConfig,buildFunction,p,callback) {
		var type = "freeform";
		var overrides = [];
		//deleting these so we don't get a recursive loop
		if(recsConfig.type) {
			type = recsConfig.type;
			delete recsConfig.type;
		}
		if(recsConfig.overrides) {
			overrides = recsConfig.overrides;
			delete recsConfig.overrides;
		}
		var apiArr = {				
			sessionid: p.getPersonifySessionId(),
			shopperid: p.getPersonifyShopperId(),
			referrer: p.getReferrer(),
			pagesize: recsConfig.fetch,
			algorithm: type,
			overrides: (overrides.length>0)?p.convertOverridesForAPI(overrides,recsConfig.fetch):[],
			slot: ((recsConfig.slot)?recsConfig.slot:"default")
		};
		if(p.getEndpoint(p.getCurrentPage().type)=="viewpdp") {
			apiArr.productcontext = p.getValueFromParameter(p.getCurrentPage().getProductCode);
		}
		if(recsConfig.format){
			if(recsConfig.format.toLowerCase()=="product"){
				apiArr.rectype = 0;
			}
			if(recsConfig.format.toLowerCase()=="content"){
				apiArr.rectype = 1;
			}
			if(recsConfig.format.toLowerCase()=="all"){
				apiArr.rectype = 2;
			}
			if(recsConfig.format.toLowerCase()=="category"){
				apiArr.rectype = 3;
			}
		}
		var apiJSON = JSON.stringify(apiArr);
		var p2 = p;
		this.callAPI(apiJSON, (type=="trending")?'gettrending':'getrecs', function(err,response) {
			var recs = (type=="trending")?response.trending_products:response.recommendations;
			if(recs){
				p2.buildRecs(recsConfig,buildFunction,recs,p2,callback);
			} else {
				p2.debug("No Recommendations");
			}
		});
	}

	displayRecs(recsPreMergeConfig){
		this.debug("Fetching Recommendations...");
		this.buildRecs(recsPreMergeConfig,recsPreMergeConfig.buildFunction,null,this,recsPreMergeConfig.callback);
	}

	convertOverridesForAPI(overrides,fetch) {
		var apiOverrides = [];
		for(var i=0; i<overrides.length; i++) {
			var override = overrides[i];
			var rule = "ALL";
			var type = "";
			var items = [];
			switch(override.type.split("|")[0]) {
				case "minPrice":
					type = "minPrice:"+override.val; 
					break;
				case "maxPrice":
					type = "maxPrice:"+override.val; 
					break;
				case "excCategory":
					type = "excludeCategory";
					items = override.val.split("|");
					break;
				case "incCategory":
					type = "limitCategories";
					items = override.val.split("|");
					break;
				case "excGroupList":
					type = "excludeList"; 
					items = override.val.split("|");
					break;
				case "incGroupList":
					type = "selectBest:"+((override.type.split("|").length>1)?override.type.split("|")[1]:Math.min(override.val.split("|").length,fetch));
					items = override.val.split("|");
					break;
				case "excGroupName":
					type = "excludeGroup"; 
					items = override.val.split("|");
					break;
				case "incGroupName":
					type = "selectBestGroup:"+((override.type.split("|").length>1)?override.type.split("|")[1]:Math.min(override.val.split("|").length,fetch)); 
					items = override.val.split("|");
					break;
			}
			var itemList = [];
			for(var i2=0; i2<items.length; i2++) {
				var item = {
					item_id: items[i2],
				}
				itemList.push(item);
			}
			
			apiOverrides.push({"rule":rule,"type":type,"items":itemList});
		}
		return apiOverrides;
	}

	getMaxFetch(list) {
		if(list) {
			var max = 0;
			for(var i in list) {
				if(list[i].fetch>max) { max = list[i].fetch; }
			}
			return max;
		}
	}

	getCurrentPage() {
		if(this.config.pages) {
			for( var p in this.config.pages ) {
				if('isPage' in this.config.pages[p]) {
					if(this.config.pages[p].isPage) {
						if(this.config.testLive) {
							if(this.pageMatchesBranch(this.config.pages[p])){
								return this.config.pages[p];
							}
						} else {
							return this.config.pages[p];
						}
					}
				}
			}
		}
		return null;		
	}

	removeElements() {
		for(var e in this.config.removeElements) {
			this.debug("Removing: " + this.config.removeElements[e]);
			try {document.querySelector(this.config.removeElements[e]).remove();} catch(e){}
		}
	}

	removeAllElements(){
		for (var e in this.config.removeAllElements) {
			this.debug("Removing all: " + this.config.removeAllElements[e]);
			try {
				var elements = document.querySelectorAll(this.config.removeAllElements[e]);
				for (var i = 0; i < elements.length; i++){
					elements[i].remove();
				}
			}
			catch (e) {}
		}
	}

	debug(msg) {
		if(this.config.debug) {
			console.log(msg);
		}
	}

	insertAfter(referenceNode, newNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}

	insertBefore(referenceNode, newNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode);
	}

	escape(string) {
		try {
		return encodeURI(string);
		} catch (e) {}
		try {
		return escape(string);
		} catch (e) {
		return string;
		}
	}

	getReferrer() {
		return document.referrer != "" ? document.referrer : null;
	}

	param_exists(field){
		var url = window.location.href;
		if (url.indexOf('?' + field + '=') != -1)
			return true;
		else if (url.indexOf('&' + field + '=') != -1)
			return true;
		return false
	}

	guidGenerator(){
		var S4 = function ()
		{
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		var date = new Date();
		return (date.getTime() + "-" + S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	}

	getPersonifyCookie(name){
		var re = new RegExp(name + "=([^;]+)");
		var value = re.exec(document.cookie);
		if (value != null)
		{
			value = unescape(value[1]);
		}
		else
		{
			value = this.guidGenerator();
		}

		if (name == "PERSONIFY")
		{
			var date = new Date();
			date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000)); //7 day session for articles
			var expires = "; expires=" + date.toGMTString();
			document.cookie = name + "=" + escape(value) + expires + "; path=/";
		}

		return value;
	}

	getPersonifyShopperId() {
		if(this.config.getUserID) {
			return this.config.getUserID();
		} else {
			return "";
		}
	}

	getPersonifySessionId() {
		if(this.config.getSessionID) {
			return this.config.getSessionID();
		} else {
			return this.getPersonifyCookie("PERSONIFY");
		}
	}
	
	httpGetAsync(theUrl, callback) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
		};
		xmlHttp.open("GET", theUrl, true); // true for asynchronous
		xmlHttp.send(null);
	}

	callAPI(apiJSON, endpoint, callback) {  

		//Making sure the api link has a trailing slash
		var api = this.config.api;
		if(api.substr(api.length-1)!="/") { 
			api += "/";
		}
		apiJSON = JSON.parse(apiJSON);
		if(this.config.geocode) {
			apiJSON.country = this.getValueFromParameter(this.config.geocode);
		}
		if (this.config.language){
			apiJSON.language = this.getValueFromParameter(this.config.language);
		}
		if (this.config.currency){
			apiJSON.currency = this.getValueFromParameter(this.config.currency);
		}
		apiJSON.device = this.getDeviceType();
		apiJSON = JSON.stringify(apiJSON);
		this.debug("API Request: " + api + endpoint);
		this.debug(apiJSON);
		if(this.config.sendStubResponse) {
			this.debug("Using Stub API Call");
			this.debug("API Response:");
			this.debug(personifyStubsResponse);
			callback(null, personifyStubsResponse);
		} else {
			var xhr = new XMLHttpRequest();
			if (callback !== null) {
				var p = this;
				xhr.addEventListener("readystatechange", function () {
					if (this.readyState === 4) {
						p.apiCalls.push({
							endpoint: endpoint,
							xhr: xhr,
							response: xhr.response,
							status: xhr.status
						});
						p.debug("API Response:");
						p.debug(xhr.response);
						if(xhr.response!==null){
							if('missions' in xhr.response && xhr.response.missions.length>0){
								p.apiMissions = xhr.response.missions;
							}
							if('mission_tags' in xhr.response && xhr.response.mission_tags.length>0){
								p.apiTags = xhr.response.mission_tags;
							}
							if('mission_attributes' in xhr.response && xhr.response.mission_attributes.length>0){
								p.apiAttributes = xhr.response.mission_attributes;
							}
						}
						callback(null, xhr.response);
					}
				});
			}
			xhr.open("POST", api + endpoint, true);
			xhr.responseType = "json";
			xhr.setRequestHeader("content-type", "application/json");
			xhr.send(apiJSON);
		}	
	}

	personifyClickThrough(pcode,p) {
		var data = JSON.stringify({
		target: pcode,
		targettype: "PRODUCT",
		sourcetype: "PRODUCT",
		source: p.getCurrentProduct(),
		sessionid: p.getPersonifySessionId(),
		shopperid: p.getPersonifyShopperId(),
		});

		p.callAPI(data, "clickthrough", null);
	}

	isInViewport(elem) {
		var bounding = elem.getBoundingClientRect();
		return (
		bounding.top >= 0 &&
		bounding.left >= 0 &&
		bounding.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		bounding.right <=
			(window.innerWidth || document.documentElement.clientWidth)
		);
	}

	personifyViewRec(pcode,p) {
		if (pcode in p.viewLinks) {
		//console.log("Already seen");
		} else {
		p.viewLinks[pcode] = true;

		var data = JSON.stringify({
			productcode: pcode,
			sessionid: p.getPersonifySessionId(),
			shopperid: p.getPersonifyShopperId(),
		});
		p.callAPI(data, "viewrec", null);
		}
	}

	trackClicks() {
		for(var e in this.config.trackElements) {
			this.debug("Tracking: " + this.config.trackElements[e]);
			try {this.trackClicksOnElement(this.config.trackElements[e]);} catch(e){}
		}
	}
			
	trackClicksOnElement(elID) {
		this.trackClicksOnElementGAEnabled(elID,false);
	}

	

	trackClicksOnElementGAEnabled(elID,gaEnabled) {
		//clickthrough actions and view tracks
		var index;
		var a = document
		.getElementById(elID)
		.getElementsByTagName("a");
		for (index = 0; index < a.length; ++index) {
		if (a[index].hasAttribute("product-code")) {
			
			var href = a[index].getAttribute("product-code");		  
			var p = this;

			(function () {
			var el = a[index];
			var hr = a[index].getAttribute("product-code");
			var p1 = p;
			a[index].addEventListener(
				"click",
				function (event) {
				var h = hr;
				var p2 = p1;
				p2.personifyClickThrough(h,p2);
				if(gaEnabled){
					p2.sendGA("Personify-"+elID,"ClickThrough",h,true);
				}
				},
				false
			);
			})();
			
			(function () {
			var el = a[index];
			var hr = a[index].getAttribute("product-code");
			var p1 = p;
			window.addEventListener(
				"scroll",
				function (event) {
				var e = el;
				var p2 = p1;
				if (p2.isInViewport(e)) {
					var h = hr;
					p2.personifyViewRec(h,p2);
					if(gaEnabled){
					if (h in p2.trackedGAViewCodes) {
						//console.log("Already seen");
					} else {
						p2.trackedGAViewCodes.push(h);
						p2.sendGA("Personify-"+elID,"ViewRec",h,false);
					}
					}
				}
				},
				false
			);
			})();
		}
		}
	}
	
	sendGA(a, b, c, interaction) {
		try {
			ga(function() {
			ga.getAll().forEach(function(t) {
				ga(t.get("name")+'.send', 'event', a, b, c, { nonInteraction: interaction});
			});
			});
		} catch ( e ){ console.log("tracker fail"); }
	}
	
	rankList(rankingConfig, moveType, callback) {
		var pList = null;

		if('getList' in rankingConfig) {
			pList = rankingConfig.getList();
		}
		if('getProductList' in rankingConfig) {
			pList = rankingConfig.getProductList();
		}
		if('getContentList' in rankingConfig) {
			pList = rankingConfig.getContentList();
		}
		
		this.debug("Ranking Items...");
		this.debug(pList);

		var itemList = [];
		
		for(var i=0; i<pList.length; i++) {
			var item = {
				type: pList[i].type,
				id: pList[i].id
			}
			itemList.push(item);
		}
		
		var apiArr = {
			sessionid: this.getPersonifySessionId(),
			shopperid: this.getPersonifyShopperId(),
			items: itemList
		};
		
		var p = this;

		this.callAPI(JSON.stringify(apiArr), "rankitems", function(err,response) {
			p.applyRanking(rankingConfig, response.rankeditems, moveType, p);
			if (typeof callback !== "undefined"){
				callback();
			}
		});
	}

	rankSections(rankingConfig){

		var apiJSON = JSON.stringify({
			"sessionid": this.getPersonifySessionId(),
			"shopperid": this.getPersonifyShopperId(),
			"items": [],
			"context_type": "PRODUCT",
			"context_id": rankingConfig.getProductCode(),
			"ranking_type": "SECTIONS",
		});

		var p = this

		this.callAPI(apiJSON, "rankitems", function(err,response){
			p.debug("Ranking Sections...")
			p.debug(response.ranked_sections);
			p.debug("Fixed Elements");
			p.debug(rankingConfig.fixElements);
			p.debug("Promoted Elements");
			p.debug(rankingConfig.promoteElements);
			
			var index_arr = p.sortList(response.ranked_sections,rankingConfig.fixElements,rankingConfig.promoteElements);
			var element_arr = p.selectElements(index_arr);
			p.reinsertElements(element_arr);
		});
	}

	displaySocialPDP(socialConfig) {
		this.debug("Social Proofing (PDP)");
		var apiArr = {
			"sessionid": this.getPersonifySessionId(),
			"shopperid": this.getPersonifyShopperId(),
			"products": socialConfig.getCurrentProduct()
		};
		if("useViews" in socialConfig || "useStock" in socialConfig || "usePurchases" in socialConfig || "useAdds" in socialConfig){
			apiArr["metric_whitelist"] = []
		}

		if("useViews" in socialConfig && socialConfig["useViews"]){
			apiArr["metric_whitelist"].push("views");
		}
		if("useStock" in socialConfig && socialConfig["useStock"]){
			apiArr["metric_whitelist"].push("stock");
		}
		if("usePurchases" in socialConfig && socialConfig["usePurchases"]){
			apiArr["metric_whitelist"].push("purchases");
		}
		if("useAdds" in socialConfig && socialConfig["useAdds"]){
			apiArr["metric_whitelist"].push("adds");
		}

		var p = this;
		var productcode = socialConfig.getCurrentProduct()
		this.callAPI(JSON.stringify(apiArr), "getproducttrends", function(err,response){
			for (var i in response.socialmessages){
				if ("productcode" in response.socialmessages[i] && response.socialmessages[i].productcode == productcode) {
					p.debug(response.socialmessages[i]);
					socialConfig.callback(response.socialmessages, response.productdata[0].total_stock);
				}
			}
		});	
	}	
	
	displaySocialPLP(socialConfig) {
		this.debug("Social Proofing (PLP)");

		var pList = socialConfig.getProductList();

		var stockThreshold = socialConfig.stockThreshold;

		var apiArr = {
			sessionid: this.getPersonifySessionId(),
			shopperid: this.getPersonifyShopperId(),
			products: []
		};

		if(!socialConfig.strategy||socialConfig.strategy=="top"){
			this.debug(socialConfig.maxMessages);
			apiArr.maxmessages = (socialConfig.maxMessages?Math.ceil(pList.length*socialConfig.maxMessages):pList.length);
		}

		for(var i=0;i<pList.length;i++){
			apiArr.products.push(pList[i].id);
		}

		var p = this;
		var productcode = this.getCurrentProduct()
		this.callAPI(JSON.stringify(apiArr), "getproducttrends", function(err,response){
			var lookup = {};
			var rList = socialConfig.getProductList(); //getting it again in case it's changed
			for(var j=0;j<rList.length;j++){
				lookup[rList[j].id] = rList[j];
			}            
			
			if(!socialConfig.strategy||socialConfig.strategy=="top"){
				for (var k in response.socialmessages){
					var msg = [];
					msg[0] = response.socialmessages[k];
					var prd = lookup[msg[0].productcode];
					var productdata = response.productdata.find(x => x.productcode == msg[0].productcode);
					if (!productdata.size_availability || productdata.size_availability >= stockThreshold){
						if (((msg[0].score!==null)||(socialConfig.useStock)) && (typeof prd !== "undefined")){
							socialConfig.callback(msg, prd.element);
						}
					}
				}
			} else if(socialConfig.strategy=="spacing"){
				var spacing = (socialConfig.gap?socialConfig.gap:3);
				var lastMsgIdx = 0-spacing-1;
				var lookupMsg = {};

				for(var idx in response.socialmessages){
					lookupMsg[response.socialmessages[idx].productcode] = response.socialmessages[idx];
				}    

				for(var l=0;l<rList.length;l++){
					var msg = [];
					msg[0] = lookupMsg[rList[l].id];
					if(l>lastMsgIdx+spacing&&typeof msg[0]!=="undefined"&&(msg[0].score!=null||socialConfig.useStock)){
						var productdata = response.productdata.find(x => x.productcode == msg[0].productcode);
						if (!productdata.size_availability || productdata.size_availability >= stockThreshold){
							lastMsgIdx=l;
							socialConfig.callback(msg,rList[l].element)
						}
					}
				}
			}

		});	
	}	

	applyRanking(rankingConfig, rankedItems, rankingType, p){
		p.debug("Scored Items");
		p.debug(rankedItems);

		var rankLookup = {};
		var scoreLookup = {};
		var middle = 0; //this signifies where the out of stocks start (score=-1)

		for(var i=0; i<rankedItems.length; i++){
			if(rankedItems[i].score<0&&middle==0){
				middle = i;
			}
			rankLookup[rankedItems[i].id]=(rankedItems[i].score<0?i+1:i);  
			scoreLookup[rankedItems[i].id]=rankedItems[i].score;            
		}
		if(middle==0) {
			middle = rankedItems.length;
		}
		//console.log(middle);
		//console.log(rankLookup);

		var pList = rankingConfig.getProductList();
		var rList = [];
		for(var j=0;j<pList.length;j++) {
			pList[j]["tid"] = (rankLookup[pList[j].id]!=null?rankLookup[pList[j].id]:middle);
		}
		//console.log(pList);
		
		//fixed pass
		for(var k=0;k<pList.length;k++) {
			if(pList[k].fixed) {
				rList[k] = pList[k];
				pList[k] = null;
			}
		}
		
		//ranked pass
		for(var l=0;l<pList.length;l++) {
			if(!rList[l]) {
				var idx = p.getNext(pList);
				if(scoreLookup[pList[idx].id]<0) {
					rList[rList.length] = pList[idx];
				} else {
					rList[l] = pList[idx];
				}
				pList[idx] = null;
			}
		}

		p.debug("Ranked Items");
		p.debug(rList);

		p.debug("Applying Ranking - " + rankingType);

			
		if(rankingType=="contents"){

			var order = [];
			var elList = rankingConfig.getProductList();
			for(var m=0;m<rList.length;m++){
				for(var n=0;n<elList.length;n++){
					if(rList[m].sid==elList[n].sid){
						order.push(n+1);
						break;
					}
				}
			}
			p.applyContentsRanking(elList,order);

		} else {
			//default is move elements
			for(var q=0;q<rList.length;q++) {
				var start = false;
				if(!start&&rList[q]&&!rList[q].fixed){
					start = true;
				}
				if(rList[q]&&start){
					rankingConfig.rankingContainer.appendChild(rList[q].element);
				}
			}
		}
	}

	applyContentsRanking(targetEls,order) {	
		var tmpEls = []; 

		for(var i=0;i<order.length;i++){
			var el=targetEls[i].element;
			var tmpEl = document.createElement("div");
			tmpEl.id = "tmp-"+(i+1);
			while(el.children.length>0){
				tmpEl.appendChild(el.children[0]);
			} 
			tmpEls[i+1]=tmpEl;
		}

		for(var k=0;k<order.length;k++){
			var tmpEl2 = tmpEls[order[k]];
			var el2=targetEls[k].element;
			while(tmpEl2.children.length>0){
				el2.appendChild(tmpEl2.children[0]);
			} 
		}
	}

	getNext(pList) {
		var min = 99999999;
		var idx = -1;
		for(var i=0;i<pList.length;i++){
			//console.log(pList[i]);
			if(pList[i]&&pList[i].tid<min){
				idx = i;
				min = pList[i].tid;
			}
		}
		if (idx>-1) {
			return idx;
		}
	}

	isMobile() {
		return screen.width<this.config.screenBreak;
	}
	
	addCSS(css) {
		var style1 = document.createElement("style");
		style1.type = "text/css";
		style1.innerHTML += css;
		document.getElementsByTagName("head")[0].appendChild(style1);
	}

	addScripts(scripts) {
		for(var i=0;i<scripts.length;i++){
			var scriptList = scripts[i].list;
			for(var j=0;j<scriptList.length;j++){				
				this.addScript(scriptList[j],scripts[i].type);
			}
		}
	}

	addScript(scriptURL,scriptType){
		this.debug("Adding "+scriptType.toUpperCase()+": " + scriptURL);
		if(scriptType.toUpperCase()=="JS"){
			this.addJSScript(scriptURL);
		} else if(scriptType.toUpperCase()=="CSS") {
			this.addCSSScript(scriptURL);
		}
	}
	
	addCSSScript(scriptURL) {
		var script = document.createElement("link");
		script.type = "text/css";
		script.rel = "stylesheet";
		script.href = scriptURL
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	addJSScript(scriptURL) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = scriptURL
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	getCurrentProduct() {
		if(this.config.getCurrentProduct) {
			return this.config.getCurrentProduct();
		} else {
			return "";
		}
	}
	
	getCategoryCode() {
		if(this.config.getCategoryCode) {
			return this.config.getCategoryCode();
		} else {
			return "";
		}
	}
	
	isFunction(functionToCheck) {
		return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
	}
	
	getValueFromParameter(possibleFunction) {
		if(this.isFunction(possibleFunction)){
			return possibleFunction();
		} else {
			return possibleFunction;
		}
	}
	
	checkElement(id){
		var details = {};
		if (document.getElementById(id)){
			details.exist = true;
			details.childen = document.getElementById(id).children.length > 0;
		}
		else{
			details.exist = false;
			details.children = false;
		}
		return details;
	}

	addCustomAPIFields(apiArray, pageOrActionArray) {
		switch(pageOrActionArray.type) {			
			case 'plp':
			case 'category':
				apiArray.categorycode= this.getValueFromParameter(pageOrActionArray.getCategoryCode);
				apiArray.categoryname= this.getValueFromParameter(pageOrActionArray.getCategoryName);
				break;
			case 'pdp-set':	
				break;
			case 'pdp':
			case 'product':
				apiArray.producturl = window.location.href;
				apiArray.productcode=this.getValueFromParameter(pageOrActionArray.getProductCode);
				apiArray.categorycode=this.getValueFromParameter(pageOrActionArray.getCategoryCode);
				if(pageOrActionArray.getProductName){
					apiArray.productname = this.getValueFromParameter(pageOrActionArray.getProductName);
				}
				if(pageOrActionArray.getProductDescription){
					apiArray.productdescription = this.getValueFromParameter(pageOrActionArray.getProductDescription);
				}
				if(pageOrActionArray.getProductCategories){
					apiArray.productcategories = this.getValueFromParameter(pageOrActionArray.getProductCategories).join("|");
				}
				if(pageOrActionArray.getProductImage){
					apiArray.productimage = this.getValueFromParameter(pageOrActionArray.getProductImage);
				}
				if(pageOrActionArray.getProductStatus){
					apiArray.productstatus = this.getValueFromParameter(pageOrActionArray.getProductStatus);
				}
				if(pageOrActionArray.getProductPrice){
					apiArray.productprice = this.getValueFromParameter(pageOrActionArray.getProductPrice);
				}
				if(pageOrActionArray.getProductRRP){
					apiArray.productrrp = this.getValueFromParameter(pageOrActionArray.getProductRRP);
				}
				if(pageOrActionArray.getProductBrand){
					apiArray.productbrand = this.getValueFromParameter(pageOrActionArray.getProductBrand);
				}
				break;
			case 'search':
				apiArray.searchterms= this.getValueFromParameter(pageOrActionArray.getTerms);
				break;
			case 'addlist':
				apiArray.listname = this.getValueFromParameter(pageOrActionArray.getListType);
				apiArray.productcode = this.getValueFromParameter(pageOrActionArray.getProduct);
				apiArray.categorycode = this.getValueFromParameter(pageOrActionArray.getCategoryCode);
				apiArray.unitprice = "0.0";
				apiArray.quantity = 1.0;
				break;
			case 'add':
			case 'addbasket':
				if (pageOrActionArray.getProduct){
					apiArray.productcode = this.getValueFromParameter(pageOrActionArray.getProduct);
				}
				else if (pageOrActionArray.getProductCode){
					apiArray.productcode = this.getValueFromParameter(pageOrActionArray.getProductCode);
				}
				apiArray.categorycode = this.getValueFromParameter(pageOrActionArray.getCategoryCode);
				apiArray.unitprice = this.getValueFromParameter(pageOrActionArray.getUnitPrice);
				apiArray.quantity = this.getValueFromParameter(pageOrActionArray.getQuantity);
				break;
			case 'checkout':
				break;
			case 'conversion':
				apiArray.id = pageOrActionArray.id;
				break;
			case 'scroll':
				break;
			case 'basket':            
			case 'viewbasket':
				apiArray.basket = this.getValueFromParameter(pageOrActionArray.getBasket);
				break;
			case 'content':
			default:	
				apiArray.contenturl = window.location.href;
				try {
					apiArray.contentname = this.getValueFromParameter(pageOrActionArray.getContentName);
					apiArray.contenttitle = this.getValueFromParameter(pageOrActionArray.getContentTitle);
					apiArray.contentcategory = this.getValueFromParameter(pageOrActionArray.getContentCategory);
					apiArray.contentimage = this.getValueFromParameter(pageOrActionArray.getContentImage);
					apiArray.contentdescription = this.getValueFromParameter(pageOrActionArray.getContentDescription);
				} catch (e) {
					apiArray.contentname = window.location.pathname;
				}
				if(apiArray.contentname.trim()=="") {
					apiArray.contentname = window.location.pathname;
				}
				break;
		}
		return apiArray;
	}

	action(actionName) {
		var actionArr = this.config.actions[actionName];

		var apiArr = {
			sessionid: this.getPersonifySessionId(),
			shopperid: this.getPersonifyShopperId(),
			pagesize: 0,
			url: window.location.href
		};

		apiArr = this.addCustomAPIFields(apiArr, actionArr);
		
		this.callAPI(JSON.stringify(apiArr), this.getEndpoint(actionArr.type), function(err,response) {});
	}
	
	init() {
		this.debug("Initialising Personify XP...");
		this.debug(this);
		this.removeElements();
		this.removeAllElements();
		if(this.config.testLive) {
			this.loadABTests();
		}
		var personifyPage = this.getCurrentPage();
		
		if(personifyPage!=null) {
			this.debug("Executing Page ("+personifyPage.name+")");
			this.debug(personifyPage);
			
			//Add custom CSS if needed
			if(personifyPage.css){
				this.addCSS(personifyPage.css);
			}
			//Insert scripts if needed
			if(personifyPage.scripts){
				this.addScripts(personifyPage.scripts);
			}
			
			//Handle Ranking
			if(personifyPage.ranking){
				if(personifyPage.ranking_type){
					//accepts move_elements or move_contents
					if (personifyPage.rankingCallback){
						this.rankList(personifyPage,personifyPage.ranking_type, personifyPage.rankingCallback);
					}
					else {
						this.rankList(personifyPage,personifyPage.ranking_type)
					}
				} else {
					if (personifyPage.rankingCallback){
						this.rankList(personifyPage, "elements", personifyPage.rankingCallback);
					}
					else {
						this.rankList(personifyPage, "elements");
					}
				}
			}

			if (personifyPage.rankSections){
				this.rankSections(personifyPage.sections);
			}
			
			//Handle checkout
			if(personifyPage.track && personifyPage.type=="checkout"){
				this.debug("Tracking Checkout...");
				
				var apiJSON = JSON.stringify({
					sessionid: this.getPersonifySessionId(),
					shopperid: this.getPersonifyShopperId(),
					orderid: this.getValueFromParameter(personifyPage.getOrderID),
					basket: this.getValueFromParameter(personifyPage.getBasket),
					useViewBasket: (personifyPage.hasOwnProperty("useViewBasket")?personifyPage.useViewBasket:false),
					pagesize: 0
				});
				
				this.callAPI(apiJSON, this.getEndpoint("checkout"), function(err,response) {});
				
			} else if (personifyPage.track && personifyPage.type=='pdp-set') {
				//TODO API will move to one call approach
				this.debug("Multiple Products...");
				var prods = getProducts();

				this.debug(prods);

				for(var i = 0;i<prods.length;i++) {
					var prod = prods[i];
					var recQty = this.getMaxFetch(personifyPage.recommendations);
					var bunQty = this.getMaxFetch(personifyPage.bundles);
					var apiArr = {				
						sessionid: this.getPersonifySessionId(),
						shopperid: this.getPersonifyShopperId(),
						referrer: this.getReferrer(),
						pagesize: (bunQty>recQty ? bunQty : recQty),
						bundleqty: bunQty
					};

					for(var k in prod) { apiArr[k]=prod[k]; };

					var apiJSON = JSON.stringify(apiArr);

					var bElem = this.buildElements;
					var p = this;
					this.callAPI(apiJSON, this.getEndpoint(personifyPage.type), ((i==0)?function(err,response) {
						if(personifyPage.bundles&&personifyPage.bundles.length>0) {
							this.debug("Generating Bundles...");
							bElem(personifyPage.bundles,(personifyPage.bundles.buildFunction?personifyPage.bundles.buildFunction:personifyPage.makeBundlesFunction),(response.bundles.length>0?response.bundles:response.recommendations,p));
						}
						if(personifyPage.recommendations&&personifyPage.recommendations.length>0) {
							this.debug("Generating Recommendations...");
							bElem(personifyPage.recommendations,(personifyPage.recommendations.buildFunction?personifyPage.recommendations.buildFunction:personifyPage.makeRecommendationsFunction),response.recommendations,p);
						}
					}:null));
				}
			} else if(personifyPage.track || (personifyPage.recommendations&&personifyPage.recommendations.length>0) 
						|| (personifyPage.bundles&&personifyPage.bundles.length>0)) {
				//Make Recs and Bundles
				this.debug("Tracking and Bundles/Recommendations...");
				var recQty = this.getMaxFetch(personifyPage.recommendations);
				var bunQty = this.getMaxFetch(personifyPage.bundles);
				var apiArr = {				
					sessionid: this.getPersonifySessionId(),
					shopperid: this.getPersonifyShopperId(),
					referrer: this.getReferrer(),
					pagesize: (bunQty>recQty ? bunQty : recQty),
					bundleqty: bunQty
				};
				apiArr = this.addCustomAPIFields(apiArr, personifyPage);
				var apiJSON = JSON.stringify(apiArr);
				var bElem = this.buildElements;
				var p = this;
				this.callAPI(apiJSON, this.getEndpoint(personifyPage.type), function(err,response) {
					try {
						p.page_recommendations = response.recommendations;
						p.page_bundles = response.bundles;
					}catch(e){}

					if(personifyPage.bundles&&personifyPage.bundles.length>0) {
						p.debug("Generating Bundles...");
						bElem(personifyPage.bundles,(personifyPage.bundles.buildFunction?personifyPage.bundles.buildFunction:personifyPage.makeBundlesFunction),(response.bundles&&response.bundles.length>0?response.bundles:response.recommendations),p);
					}
					if(personifyPage.recommendations&&personifyPage.recommendations.length>0) {
						p.debug("Generating Recommendations...");
						bElem(personifyPage.recommendations,(personifyPage.recommendations.buildFunction?personifyPage.recommendations.buildFunction:personifyPage.makeRecommendationsFunction),response.recommendations,p);
					}
				});
			}
			
			//Show Categories
			if(personifyPage.categories&&personifyPage.categories.length>0) {
				var apiJSON = {}
				if(this.getCurrentProduct()!=="") {
					apiJSON = JSON.stringify({
						sessionid: this.getPersonifySessionId(),
						shopperid: this.getPersonifyShopperId(),
						referrer: this.getReferrer(),
						productcode: this.getCurrentProduct(),
						pagesize: this.getMaxFetch(personifyPage.categories),
						forcedetails: ("forcedetails" in personifyPage.categories[0]?personifyPage.categories[0].forcedetails:true)
					});
				} else {
					apiJSON = JSON.stringify({
						contentname: window.location.pathname,
						sessionid: this.getPersonifySessionId(),
						shopperid: this.getPersonifyShopperId(),
						referrer: this.getReferrer(),
						pagesize: this.getMaxFetch(personifyPage.categories),
						forcedetails: ("forcedetails" in personifyPage.categories[0]?personifyPage.categories[0].forcedetails:true)
					});
				}
				var bElem = this.buildElements;				
				var p = this;
				this.callAPI(apiJSON, 'getcats', function(err,response) {
					bElem(personifyPage.categories,p.config.makeCategoriesFunction,(p.config.sendStubResponse?dummyCatResponse.recommendations:response.recommendations),p);
				});
			}
			
			//track clicks and views
			if((personifyPage.recommendations&&personifyPage.recommendations.length>0) || (personifyPage.bundles&&personifyPage.bundles.length>0) 
				|| (personifyPage.categories&&personifyPage.categories.length>0)) {
				this.trackClicks();
			}
			
			if(personifyPage.social) {
				if(personifyPage.social.type == "pdp"){
					personifyPage.social.getCurrentProduct = this.config.getCurrentProduct;
					this.displaySocialPDP(personifyPage.social);
				} else if (personifyPage.social.type == "plp") {
					personifyPage.social.getProductList = personifyPage.getProductList;
					this.displaySocialPLP(personifyPage.social);
				}
			}
			
			//execute any custom code
			if(personifyPage.execute){
				personifyPage.execute();
			}
		}

		//Trigger Slots
		this.slots();
			
	}


	slots() {
		this.debug("Checking Slots");
		if(this.config.slots) {
			for( var s in this.config.slots ) {
				//console.log(this.config.slots[s]);
				if('pos_element' in this.config.slots[s] && 'trigger' in this.config.slots[s]) {
					//console.log(document.querySelectorAll(this.config.slots[s].pos_element));
					if(document.querySelectorAll(this.config.slots[s].pos_element).length>0) {
						this.debug("Slot Triggered: " + s);
						this.config.slots[s].trigger();
					}
				}
			}
		}
	}

	decision(p,slot_config,variants,render) {
		if(p.apiMissions.length==0){
			var apiJSON = JSON.stringify({
				"sessionid": p.getPersonifySessionId(),
				"shopperid": p.getPersonifyShopperId(),
				"referrer": "",
				"pagesize": 0
			});
			p.callAPI(apiJSON,"getrecs",function(){ p.makeDecision(p,slot_config,variants,render); });
			return;
		}
		else{
			p.makeDecision(p,slot_config,variants,render);
		}
		
	}
	
	makeDecision(p,slot_config,variants,render){
		p.debug("Content Decisioning: " + slot_config.id);
		p.debug("Variants Found");		
		p.debug(variants);	

		var topScore = 0;
		var topID = variants[0].id;

		for(var i in variants){
			var v = variants[i];
			var bScore = 0;
			var tScore = 0;

			if(v.behaviours.trim()!=""){
				for (var b in v.behaviours.split("|")){
					bScore += p.behaviourScore(p,v.behaviours.split("|")[b]);
				}
				bScore = bScore / v.behaviours.split("|").length;
			}
			
			if(v.tags.trim()!=""){
				for (var t in v.tags.split("|")){
					tScore += p.tagScore(p,v.tags.split("|")[t]);
				}
				tScore = tScore / v.tags.split("|").length;
			}

			if(bScore>topScore) {
				topScore = bScore;
				topID = v.id;
			}

			if(tScore>topScore) {
				topScore = tScore;
				topID = v.id;
			}
		}

		p.debug("Variant Selected: " + topID + " (score=" + topScore + ")");

		var el = document.createElement("div");
		el.setAttribute("id", slot_config.id);
		if("classes" in slot_config) {
			el.setAttribute("class", slot_config.classes);
		}
		el.innerHTML = render(topID);
			
		// if(slot_config.pos_type=="after") {
		// 	try { p.insertAfter(document.querySelector(slot_config.pos_element),el) } catch(e){ console.log("Error with: "+slot_config.pos_element+" or with: ");console.log(el);console.log(e); };
		// } else if(slot_config.pos_type=="before") { 
		// 	try { p.insertBefore(document.querySelector(slot_config.pos_element),el) } catch(e) {console.log("Error with Insert Before")}
		// } else if(slot_config.pos_type=="insert") { 
		// 	try { document.querySelector(slot_config.pos_element).innerHTML=el.outerHTML; } catch(e) {console.log("Error with Insert Into")}
		// }
	}

	behaviourScore(p,name) {
		for(var i in p.apiMissions) {
			if(p.apiMissions[i].name.toLowerCase() == name.toLowerCase() || p.apiMissions[i].id+"" == name){
				return p.apiMissions[i].val;
			}
		}
		p.debug("Cannot find mission: " + name);
		return "0";
	}

	tagScore(p,name) {
		for(var i in p.apiTags) {
			if(p.apiTags[i].tag_name.toLowerCase() == name.toLowerCase()){
				return p.apiTags[i].tag_score;
			}
		}
		p.debug("Cannot find tag: " + name);
		return "0";
	}

	attributeScore(p,name) {
		for(var i in p.apiAttributes) {
			if(p.apiAttributes[i].tag_name.toLowerCase() == name.toLowerCase()){
				return p.apiAttributes[i].tag_score;
			}
		}
		p.debug("Cannot find attribute: " + name);
		return "0";
	}


	/**************************************************** START SCROLL TRACKING ****************************************************/

	// trackingElements = {
	// 	1: document.querySelector( '#tab-description' ),
	// 	2: document.querySelector( '#tab-additional' ),
	// 	3: document.querySelector( '#tab-manual' ),
	// 	4: document.querySelector( '#tab-warranty' ),
	// 	5: document.querySelector( '#tab-reviews' ),
	// 	6: document.querySelector( '#tab-qa' ),
	// 	7: document.querySelector( '#tab-videos' ),
	// 	8: document.querySelector( '#tab-related' ),
	// 	9: document.querySelector( '#tab-personify' ),
	// 	10: document.querySelector( '#tab-similar' )
	// }
	// initScrollTracking(trackingElements)

	initScrollTracking(trackingConfig) {
		this.debug("Starting scroll tracking...")
		var p=this;
		window.onfocus = function () { 
			p.isTabActive = true; 
		}; 
		window.onblur = function () { 
			p.isTabActive = false; 
		};
		this.trackingElements = trackingConfig.trackingElements;
		this.trackingHeaderElements = trackingConfig.headerElements;
		this.debug("Setting Elements for Tracking");
		this.debug(this.trackingElements);
		
		this.dwellTracker(this);
		this.dwellUpdate(this);
	} 

	divInView(els,p) {
		for(var x in els) {
			if(p.isDivInView(els[x],p)) {
				return x;
			}
		}
		return 0;
	}

	isDivInView(el,p) {		
		if (el!==null) {
			if (el.clientHeight==0) { return false }
		
			var topOfPane = 0;
			for(var i = 0; i<p.trackingHeaderElements.length;i++){
				try {
					topOfPane += document.querySelector(p.trackingHeaderElements[i]).clientHeight;
				} catch(e) {
					p.debug("Can't find Element: " + p.trackingHeaderElements[i]);
				}
			}
			var scroll = (window.scrollY || window.pageYOffset)
			var boundsTop = el.getBoundingClientRect().top + scroll	
			
			var viewport = {
				top: scroll + topOfPane,
				bottom: scroll + window.innerHeight,
			}
			
			var bounds = {
				top: boundsTop,
				bottom: boundsTop + el.clientHeight,
			}
			
			return ( bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom ) 
				|| ( bounds.top <= viewport.bottom && bounds.top >= viewport.top ) || (bounds.top <= viewport.top && bounds.bottom >= viewport.bottom);
		} else {
			return false;
		}
	}

	dwellTracker(p) {
		var y = 500
		if (!document.hidden&&p.isTabActive&&p.dwellCount<180000) {
			var x = p.divInView(p.trackingElements,p)
			p.debug("Scroll Tracking: Viewing Element "+x);
			p.debug(p.trackingElements[x]);
			if(x in p.trackingValues){
				p.trackingValues[x] += y/1000;	
			} else {
				p.trackingValues[x] = y/1000;
			}
			p.dwellCount += y;
		} else {
			p.debug("Scroll Tracking: Window Hidden");
		}
		var p2 = p;
		setTimeout( function(){p2.dwellTracker(p2);}, y );
	}

	dwellUpdate(p) {
		var y = 5000;
		
		if (p.dwellCount<180000){
			
			if((!document.hidden&&p.isTabActive)||!p.savedHidden){
				
				//only do this once while hidden and reset next time it is unhidden
				if(!document.hidden&&p.isTabActive) {
					p.savedHidden = false;
				} else {
					p.savedHidden = true;
				}
				
				p.trackingValues["0"]=0.0;
				
				var productCode = p.getCurrentProduct();
				
				var apiJSON = JSON.stringify({
					"sessionid": p.getPersonifySessionId(),
					"shopperid": p.getPersonifyShopperId(),
					"referrer": "",
					"type": "PRODUCT",
					"value": productCode,
					"track_values": p.trackingValues
				});

				p.debug("Sending scroll update");
				p.callAPI(apiJSON, "scroll", function(response){});
			}
		}
		if(p.dwellCount>=120000) {
			p.dwellFinished = true;
		}
		var p2 = p;
		if(!p.dwellFinished){
			setTimeout( function(){ p2.dwellUpdate(p2);}, y );
		}
	}

	sortList(input,fix_list,promote_list) {

		var i = 0;
		var input_list = [];

		for(i in input) {
			input_list[i] = input[i]*1;
		}

		var output = [];

		var max = 0;
		for(i in input_list) {
			if(input_list[i]>max){
				max = input_list[i];
			}
		}
		for(i in fix_list) {
			if(fix_list[i]>max){
				max = fix_list[i];
			}
		}
		for(i in promote_list) {
			if(promote_list[i]>max){
				max = promote_list[i];
			}
		}

		var j=0;
		for(i=1; i<=max; i++) {
			var idx = input_list.indexOf(i);
			if(idx == -1){
				idx = input_list.length-1+j;
				j++;
			}
			output[idx]=i;
		}

		for(var f in fix_list) {
			var idx = output.indexOf(fix_list[f]);
			if(idx>0&&fix_list[f]<=idx){
				output = this.moveTo(output,idx,fix_list[f]-1);
			}
		}

		for(var p in promote_list) {
			var idx = output.indexOf(promote_list[p]);
			if(idx>0){//cant bubble first
				//don't promote past a fixed
				if(fix_list.indexOf(output[idx-1])==-1){
					output = this.bubble(output,idx);
				}
			}
		}
		
		return output;	
	}
	
	moveTo(arr, old_index, new_index){
		var idx = old_index;
		if(new_index<old_index) {
			for(var b=0;b<old_index-new_index;b++){
				arr = this.bubble(arr,idx);
				idx--;
			}
		}
		return arr;
	}

	bubble(arr,index) {
		return this.array_move(arr,index,index-1);
	}

	array_move(arr, old_index, new_index) {
		//https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
		if (new_index >= arr.length) {
			var k = new_index - arr.length + 1;
			while (k--) {
				arr.push(undefined);
			}
		}
		arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
		return arr; // for testing
	};
	
	selectElements(input_list) {
		var output = [];
		
		for(var i=0;i<input_list.length;i++) {
			output[i] = this.trackingElements[input_list[i]];
		}
		
		console.log(output);
		return output;	
	}
	
	reinsertElements(input_list) {
		var e = this.trackingElements[1];
		for(var i=input_list.length-1;i>=0;i--){
			if(input_list[i]!=null) {
				this.insertAfter(e,input_list[i]);
			}
		}
	}

	/**************************************************** END SCROLL TRACKING ****************************************************/
}