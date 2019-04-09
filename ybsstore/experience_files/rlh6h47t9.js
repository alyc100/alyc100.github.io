



/* ControlTag Loader for DMP SA Productions 1dc36f02-f6b4-43ee-bdf8-1b00ee61a21f */
(function(w, cs) {
  
  if (/Twitter for iPhone/.test(w.navigator.userAgent || '')) {
    return;
  }

  var debugging = /kxdebug/.test(w.location);
  var log = function() {
    
    debugging && w.console && w.console.log([].slice.call(arguments).join(' '));
  };

  var load = function(url, callback) {
    log('Loading script from:', url);
    var node = w.document.createElement('script');
    node.async = true;  
    node.src = url;

    
    node.onload = node.onreadystatechange = function () {
      var state = node.readyState;
      if (!callback.done && (!state || /loaded|complete/.test(state))) {
        log('Script loaded from:', url);
        callback.done = true;  
        callback();
      }
    };

    
    var sibling = w.document.getElementsByTagName('script')[0];
    sibling.parentNode.insertBefore(node, sibling);
  };

  var config = {"app":{"name":"krux-scala-config-webservice","version":"3.41.0","schema_version":3},"confid":"rlh6h47t9","context_terms":[],"publisher":{"name":"DMP SA Productions","active":true,"uuid":"1dc36f02-f6b4-43ee-bdf8-1b00ee61a21f","version_bucket":"stable","id":2062},"params":{"link_header_bidder":false,"site_level_supertag_config":"site","recommend":false,"control_tag_pixel_throttle":100,"fingerprint":false,"optout_button_optout_text":"Browser Opt Out","user_data_timing":"load","consent_active":true,"use_central_usermatch":true,"store_realtime_segments":false,"tag_source":false,"link_hb_start_event":"ready","optout_button_optin_text":"Browser Opt In","first_party_uid":false,"link_hb_timeout":2000,"link_hb_adserver_subordinate":true,"optimize_realtime_segments":false,"link_hb_adserver":"dfp","target_fingerprint":false,"prioritized_segments":false,"context_terms":false,"optout_button_id":"kx-optout-button","dfp_premium":true,"control_tag_namespace":"dmpsaprod"},"prioritized_segments":[],"realtime_segments":[{"id":"tjzfizghh","test":["and",["and",["or",["intersects","$event_MFNFl7Rc_attr_productOffer",["trailfit"]]]]]},{"id":"s4eszunvc","test":["and",["and",["or",["intersects","$event_MFNFl7Rc_attr_productOffer",["tent"]]]]]},{"id":"s46k97my1","test":["and",["and",["or",["or","$event_MGLZ2rWg"]]]]},{"id":"s5ypx3d7x","test":["and",["and",["or",["intersects","$page_attr_Weather_Status",["cloudy and/or precipitation"]]],["and",["intersects","$page_attr_Weather_Temp",["<15"]],["intersects","$page_attr_Location_Tesco",["Manchester"]]]]]},{"id":"s45pv2pv3","test":["and",["and",["or",["intersects","$page_attr_utm_source",["facebook"]]]]]},{"id":"s5yppk44j","test":["and",["and",["or",["intersects","$page_attr_Weather_Temp",[">15"]]],["and",["intersects","$page_attr_Weather_Status",["sun and/or sunny intervals"]],["intersects","$page_attr_Location_Tesco",["London"]]]]]},{"id":"su75572db","test":["and",["and",["or",["intersects","$page_attr_cardvisitcount",["1"]]]]]},{"id":"s5xydeawi","test":["and",["and",["or",["contains","$page_attr_utm_campaign",["Hiking"]]]]]},{"id":"s4eswl3sj","test":["and",["and",["or",["intersects","$event_MFNFl7Rc_attr_productOffer",["jacket"]]]]]},{"id":"s4ijne1mr","test":["and",["and",["or",["contains","$page_attr_utm_campaign",["social"]]]]]},{"id":"spu3dbpfv","test":["and",["and",["or",["or","$event_LT3-77zV"]]]]},{"id":"s4es1zgcg","test":["and",["and",["or",["intersects","$event_MFNFl7Rc_attr_productOffer",["tent"]]]]]},{"id":"rw2h8sjpt","test":["and",["and",["or",["or","$event_LT3-77zV"]]]]},{"id":"s0gnlid2r","test":["and",["and",["or",["intersects","$event_MAy-aTG1_attr_offerCode",["abc"]],["intersects","$event_MAy-aTG1_attr_offerResponse",["declined"]],["or","$event_L0tlrKEd"]]]]},{"id":"s5yy94yzu","test":["and",["and",["or",["intersects","$page_attr_Segments",["Travel enthusiast"]]],["and",["intersects","$page_attr_utm_campaign",["cn"]]]]]},{"id":"su76i0yv9","test":["and",["and",["or",["intersects","$page_attr_cardvisitcount",["3"]]]]]},{"id":"s5x670ems","test":["and",["and",["or",["contains","$page_attr_utm_campaign",["Jackets"]]]]]},{"id":"su76dd3zy","test":["and",["and",["or",["intersects","$page_attr_cardvisitcount",["2"]]]]]}],"services":{"userdata":"//cdn.krxd.net/userdata/get","contentConnector":"https://connector.krxd.net/content_connector","stats":"//apiservices.krxd.net/stats","optout":"//cdn.krxd.net/userdata/optout/status","event":"//beacon.krxd.net/event.gif","set_optout":"https://consumer.krxd.net/consumer/optout","data":"//beacon.krxd.net/data.gif","link_hb_stats":"//beacon.krxd.net/link_bidder_stats.gif","userData":"//cdn.krxd.net/userdata/get","link_hb_mas":"https://link.krxd.net/hb","config":"//cdn.krxd.net/controltag/{{ confid }}.js","social":"//beacon.krxd.net/social.gif","addSegment":"//cdn.krxd.net/userdata/add","pixel":"//beacon.krxd.net/pixel.gif","um":"https://usermatch.krxd.net/um/v2","controltag":"//cdn.krxd.net/ctjs/controltag.js.{hash}","loopback":"https://consumer.krxd.net/consumer/tmp_cookie","remove":"https://consumer.krxd.net/consumer/remove/1dc36f02-f6b4-43ee-bdf8-1b00ee61a21f","click":"https://apiservices.krxd.net/click_tracker/track","stats_export":"//beacon.krxd.net/controltag_stats.gif","userdataApi":"//cdn.krxd.net/userdata/v1/segments/get","cookie":"//beacon.krxd.net/cookie2json","proxy":"//cdn.krxd.net/partnerjs/xdi","consent_get":"https://consumer.krxd.net/consent/get/1dc36f02-f6b4-43ee-bdf8-1b00ee61a21f","consent_set":"https://consumer.krxd.net/consent/set/1dc36f02-f6b4-43ee-bdf8-1b00ee61a21f","is_optout":"https://beacon.krxd.net/optout_check","impression":"//beacon.krxd.net/ad_impression.gif","transaction":"//beacon.krxd.net/transaction.gif","log":"//jslog.krxd.net/jslog.gif","portability":"https://consumer.krxd.net/consumer/portability/1dc36f02-f6b4-43ee-bdf8-1b00ee61a21f","set_optin":"https://consumer.krxd.net/consumer/optin","usermatch":"//beacon.krxd.net/usermatch.gif"},"experiments":[],"site":{"name":"Northern Trail Outfitters","cap":255,"id":1651856,"organization_id":2062,"uid":"rlh6h47t9"},"tags":[{"id":35959,"name":"AR - Consent Tag","content":null,"target":null,"target_action":"append","timing":"asap","method":"apply","priority":null,"template_replacement":true,"internal":false,"criteria":[],"collects_data":true},{"id":36336,"name":"David - Page View","content":null,"target":null,"target_action":"append","timing":"asap","method":"apply","priority":null,"template_replacement":true,"internal":false,"criteria":[],"collects_data":true},{"id":22738,"name":"Technographic Data provider tag","content":"<script>\r\n// this tag is intentionally blank\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]],"collects_data":true},{"id":22739,"name":"Krux Geographic Data provider tag","content":null,"target":null,"target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]],"collects_data":true},{"id":24214,"name":"GA dataLayer dtc","content":"<script>\n(function(){\n    var dataObj = Krux('scrape.js_global', 'dataLayer'),\n        userKeys = 'null',\n        omitKeys = 'null',\n        custDelimit = 'null',\n        prefix = 'false_',\n        config = {\n            'userKeys': userKeys ? userKeys.split(',') : undefined,\n            'omitKeys': omitKeys ? omitKeys.split(',') : [],\n            'customDelimited': custDelimit ? custDelimit.split(',') : undefined,\n            'caseSensitive': 'false' === 'true',\n            'useFullPath': 'false' === 'true',\n            'useLastValue': 'false' === 'true',\n            'convertAttrNames': []\n        };\n    if (!prefix.match(/^$|null|undefined|false/)) {\n        config.convertAttrNames.push({\n            pattern: /((?:page|user)_attr_)/,\n            replacement: '$1' + prefix\n        });\n    }\n    config.omitKeys.push(/gtm\\./);\n    Krux('ingestDataLayer', dataObj, config);\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":false,"criteria":[],"collects_data":true},{"id":31137,"name":"Tim Cook | Real-time Segment Test Tag","content":"<script>\n  window.Krux||((Krux=function(){Krux.q.push(arguments);}).q=[]);\n  Krux('admEvent', 'LT3-77zV', {});\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":[],"collects_data":true},{"id":31143,"name":"Tim Cook | DataLayer","content":"<script>\n  SFDMP_DL = {}\n  SFDMP_DL.product = document.getElementsByClassName('categorization')[0].innerText;\n  SFDMP_DL.price = document.getElementsByClassName('sale')[0].innerText.split('$')[1];\n  SFDMP_DL.price = Math.ceil(SFDMP_DL.price)\n  SFDMP_DL.domain = document.domain;\n  SFDMP_DL.category = document.documentURI.split(\"/\")[4];\n  SFDMP_DL.bestrainer = \"You are Tim.\"\n  if(localStorage._kxsaproductions_kuid){\n  document.cookie = \"NTO_ID: \" + localStorage._kxsaproductions_kuid;\n  }\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":["and",["and",["or",["matches","$url","http://ntoretail.com/shop/electronics/headphones/502100"]]]],"collects_data":true},{"id":35113,"name":"NTORetail - UTM params","content":"<script>\n(function(){\n\n\tvar params = Krux('require:util').urlParams();\n\t\n\tKrux ('set', { \n\t'page_attr_utm_source': params.utm_source,\n\t'page_attr_utm_medium': params.utm_medium,\n\t'page_attr_utm_campaign': params.utm_campaign,\n\t'page_attr_utm_content': params.utm_content,\n\t'page_attr_utm_term': params.utm_term,\n    'page_attr_utm_kxconfid': params.utm_kxconfid,\n    'page_attr_utm_date': params.utm_date\n\t});\n\t\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":[],"collects_data":true},{"id":35209,"name":"BBVA dataLayer","content":"<script>\n(function() {\n    /* Selective Attribute DataLayer Library Tag */\n    var _, allAttr, allowedList, attr, attributes, dataLayerIngester, dataObj,\n        isAllowed, keepCase, normalizeName, omitKeys, optimizeNames, pageAttr, prefix,\n        toSet, trim, userAttr, value,\n        hasProp = {}.hasOwnProperty;\n    _ = Krux('require:underscore');\n    dataLayerIngester = Krux('require:scrape').ingestDataLayer;\n\n    /* Safe copy of dataLayer object */\n    dataObj = Krux('scrape.javascript', 'datalayer_bbvatest');\n\n    /* String trimming helper function */\n    trim = function(attr) {\n        return (\"\" + attr).replace(/^\\s+|\\s+$/g, '');\n    };\n\n    /* Attribute configs */\n    pageAttr = _.map('cardvisitcount,dashboardvisitcount,loginvisitcount,welcomevisitcount'.split(','), trim);\n    userAttr = _.map('undefined'.split(','), trim);\n\n    /* Create a array of attributes striping any empty strings */\n    allAttr = _.without(pageAttr.concat(userAttr), '');\n\n    /* Configuration settings */\n    prefix = 'undefined_';\n    keepCase = 'true' === 'true';\n    omitKeys = 'undefined'.split(',');\n\n    /* Function to varify if attribute should be used */\n    isAllowed = function(value, whitelist) {\n        var i, len, str, x;\n        str = \"\" + value;\n        if (!((value != null) && str.length > 0)) {\n            return false;\n        }\n        for (i = 0, len = whitelist.length; i < len; i++) {\n            x = whitelist[i];\n            if (value.match(x) != null) {\n                return true;\n            }\n        }\n        return false;\n    };\n\n    /* Function to standardise the attribute names */\n    normalizeName = function(name, optimize) {\n        if (optimize == null) {\n            optimize = false;\n        }\n        if (keepCase) {\n            return name;\n        }\n        return (\"\" + name).replace(/([A-Z])([A-Z]+)/g, function(full, first, rest) {\n            if (optimize === true) {\n                return \"\" + first + (rest.toLowerCase());\n            }\n            return \"\" + full;\n        }).replace(/_*([A-Z])/g, '_$1').replace(/^_/, '').toLowerCase();\n    };\n\n    /* Creates a pattern/replacement config for dataLayer tool to clean up names */\n    optimizeNames = function(names) {\n        var config, i, len, name;\n        config = [{\n            pattern: /(\\.)_/,\n            replacement: '$1'\n        }];\n        for (i = 0, len = names.length; i < len; i++) {\n            name = names[i];\n            config.push({\n                pattern: normalizeName(name),\n                replacement: normalizeName(name, true)\n            });\n        }\n        if (!prefix.match(/^_$|null|undefined|false/)) {\n            config.push({\n                pattern: /((?:page|user)_attr_)/,\n                replacement: \"$1\" + prefix\n            });\n        }\n        return config;\n    };\n\n    /* Get a full list of attributes usting the dataLayer tool */\n    attributes = dataLayerIngester(dataObj, {\n        omitKeys: _.without(omitKeys.concat([/gtm\\./, /sessionid/i,\n            /\\.phpsessid$/i, /\\.sid$/i, /\\.zenid$/i,\n            /\\.requestid$/i\n        ]), ''),\n        omitValues: [/.*@.*(?:\\..*)+/, /gtm\\./, /^(https?:)?\\/\\/[^\\/]+/,\n            /^\\/[^\\/]+/, /.{255}/\n        ],\n        caseSensitive: keepCase,\n        useFullPath: 'true' === 'true',\n        useLastValue: 'true' === 'true',\n        customDelimited: [/./],\n        altDelimiter: ',',\n        userKeys: _.map(userAttr, function(exp) {\n            return new RegExp(\"(^|\\\\.)\" + exp + \"$\");\n        }),\n        convertAttrNames: optimizeNames(allAttr)\n    });\n\n    /* Only set Attributes in the allowed list */\n    allowedList = _.map(allAttr, function(name) {\n        return new RegExp(\"(_attr_|_attr_\" + prefix + \"|\\\\.)\" + (\n            normalizeName(name, true)) + \"$\");\n    });\n    toSet = {};\n    for (attr in attributes) {\n        if (!hasProp.call(attributes, attr)) continue;\n        value = attributes[attr];\n        if (isAllowed(attr, allowedList)) {\n            toSet[attr] = value;\n        }\n    }\n    Krux('set', toSet);\n}).call();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":[],"collects_data":true},{"id":36325,"name":"Interchange Snippet","content":"<script class=\"kxint\"  type=\"text/javascript\">\nwindow.Krux||((Krux=function(){Krux.q.push(arguments);}).q=[]);\n(function(){\n  function retrieve(n){\n    var k= 'kx'+''+n, ls=(function(){\n      try {\n        return window.localStorage;\n      } catch(e) {\n        return null;\n      }\n    })();\n    if (ls) {\n        return ls[k] || '';\n    } else if (navigator.cookieEnabled) {\n        var m = document.cookie.match(k+'=([^;]*)');\n        return (m && unescape(m[1])) || '';\n    } else {\n        return '';\n    }\n  }\n  Krux.user = retrieve('user');\n  Krux.segments = retrieve('segs') ? retrieve('segs').split(',') : [];\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":false,"criteria":[],"collects_data":true},{"id":22745,"name":"URL DTC - collect all URL parameters","content":"<script>\n(function(){\n    var k,p = Krux('require:util').urlParams();\n    for(k in p) {\n\t\tKrux('set', 'page_attr_' + k, decodeURIComponent(p[k]));\n    }\n})();\n</script>","target":null,"target_action":"append","timing":"onready","method":"document","priority":null,"template_replacement":true,"internal":false,"criteria":[],"collects_data":true},{"id":32173,"name":"Krux url paths","content":"<script>\n(function(){\n\tKrux('scrape',{'page_attr_url_path_1':{'url_path':'1'}});\n\tKrux('scrape',{'page_attr_url_path_2':{'url_path':'2'}});\n\tKrux('scrape',{'page_attr_url_path_3':{'url_path':'3'}});\n\tKrux('scrape',{'page_attr_meta_keywords':{meta_name:'keywords'}});\n\n\tKrux('scrape',{'page_attr_domain':{url_domain: '2'}});\n\n})();\n</script>","target":null,"target_action":"append","timing":"onready","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":[],"collects_data":true}],"usermatch_tags":[{"id":15,"name":"TheTradeDesk User Match","content":"<script>\r\n(function(){\r\nvar kuid = Krux('get', 'user');\r\nvar consent = Krux('iab:urlParams');\r\nif (kuid) {\r\nif(!consent){\r\nconsent = \"\";\r\n}\r\nvar p = location.protocol == 'https:' ? 'https:' : 'http:';\r\nvar purl = '//match.adsrvr.org/track/cmf/generic?ttd_pid=krux&ttd_tpi=1';\r\n(new Image()).src  = p + purl + consent; \r\n}\r\n})();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":21,"name":"Acxiom","content":"<script>\n(function(){\n  var kuid = Krux('get', 'user');\n  if (kuid) {\n      var liveramp_url = 'https://idsync.rlcdn.com/379708.gif?partner_uid=' + kuid;\n      var i = new Image();\n      i.src = liveramp_url;      \n  }\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":25,"name":"eXelate Media","content":"<script>\r\n(function(){\r\n  var kuid = Krux('get', 'user');\r\n  if (kuid) {\r\n    Krux('require:http').pixel({\r\n      url: \"//loadm.exelator.com/load\",\r\n      data: {\r\n          _kdpid: 'e4942ff0-4070-4896-a7ef-e6a5a30ce9f9',\r\n          buid: kuid,\r\n          p: '204',\r\n          g: '270',\r\n          j: '0'\r\n      }});\r\n  }\r\n  })();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":34,"name":"Comscore Data Tag","content":"<script>\r\n(function(){\r\n  var kuid = Krux('get', 'user');\r\n  var cbust = Math.round(new Date().getTime() / 1000);\r\n  var prefix = location.protocol == 'https:' ? \"https:\" :\"http:\";\r\n  var url = prefix == 'https:' ? '//sb.scorecardresearch.com/p' : '//b.scorecardresearch.com/p';\r\n  if (kuid) {\r\n    Krux('require:http').pixel({\r\n      url: url,\r\n      data: {\r\n          c1: '9',\r\n          c2: '8188709',\r\n          cs_xi: kuid,\r\n          rn: cbust\r\n      }});\r\n  }\r\n  })();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":51,"name":"Eyeota User Match","content":"<script>\r\n(function(){\r\n        var kuid = Krux('get', 'user');\r\n        var prefix = window.location.protocol == 'https:' ? 'https:' : 'http:';\r\n\r\n        if (kuid) {\r\n           var url = prefix + '//ps.eyeota.net/match?bid=i0r4o4v&uid=' + kuid;\r\n           (new Image()).src = url;\r\n        }\r\n})();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":76,"name":"LiveRamp User Matching","content":"<script>\r\n(function(){\r\n  var kuid = Krux('get', 'user');\r\n  if (kuid) {\r\n      var liveramp_url = 'https://idsync.rlcdn.com/379708.gif?partner_uid=' + kuid;\r\n      var i = new Image();\r\n      i.src = liveramp_url;     \r\n  }\r\n})();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":86,"name":"Neustar AdAdvisor S2S","content":"<script>\r\n(function(){\r\nvar kuid = Krux('get', 'user');\r\nvar prefix = window.location.protocol == 'https:' ? 'https:' : 'http:';\r\nif (kuid) {\r\n    new Image().src = prefix + '//aa.agkn.com/adscores/g.js?sid=9212244187&_kdpid=2111c0af-fc3a-446f-ab07-63aa74fbde8e';\r\n     }\r\n})();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":55,"name":"Acxiom APAC Usermatch","content":"<script>\r\n(function(){\r\n\tvar liveramp_url = '//s.acxiomapac.com/sci',\r\n\tdata = {\r\n\t\tpid: 90010,\r\n\t\tuid: Krux('get','user')\r\n\t};\r\n\tif(data.uid){\r\n\t\tKrux('require:http').pixel({\r\n\t\t\turl: liveramp_url,\r\n\t\t\tdata: data\r\n\t\t});\r\n\t}\r\n})();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":3,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":81,"name":"Bombora","content":"<script>\n\n(function () {\n_ml = window._ml || {};\n_ml.pub = '748';\n_ml.redirect = '//beacon.krxd.net/usermatch.gif?partner=madisonlogic&partner_uid=[PersonID]';\nvar s = document.getElementsByTagName('script')[0], cd = new Date(), mltag = document.createElement('script');\nmltag.type = 'text/javascript'; mltag.async = true;\nmltag.src = '//ml314.com/tag.aspx?' + cd.getDate() + cd.getMonth() + cd.getFullYear();\ns.parentNode.insertBefore(mltag, s);\n})();\n\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":3,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":82,"name":"DataLogix - Legacy","content":"<script>\r\n    (function() {\r\n        var kuid = Krux('get', 'user');\r\n        if (kuid) {\r\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\r\n            var kurl_params = encodeURIComponent(\"_kuid=\" + kuid + \"&_kdpid=2dd640a6-6ebd-4d4f-af30-af8baa441a0d&dlxid=<na_id>&dlxdata=<na_da>\");\r\n            var kurl = prefix + \"//beacon.krxd.net/data.gif?\" + kurl_params;\r\n            var dlx_url = '//r.nexac.com/e/getdata.xgi?dt=br&pkey=gpwn29rvapq62&ru=' + kurl;\r\n            var i = new Image();\r\n            i.src = dlx_url;\r\n        }\r\n    })();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":3,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":85,"name":"IXI Digital Open Market","content":"<script>\n(function(){\n    var prefix = window.location.protocol == 'https:' ? 'https:' : 'http:';\n    new Image().src = prefix + '//kr.ixiaa.com/C726AB29-0470-440B-B8D2-D552CED3A3DC/a.gif';\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":3,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true}],"link":{"adslots":{},"bidders":{}}};
  
  for (var i = 0, tags = config.tags, len = tags.length, tag; (tag = tags[i]); ++i) {
    if (String(tag.id) in cs) {
      tag.content = cs[tag.id];
    }
  }

  
  var esiGeo = String(function(){/*
   <esi:include src="/geoip_esi"/>
  */}).replace(/^.*\/\*[^{]+|[^}]+\*\/.*$/g, '');

  if (esiGeo) {
    log('Got a request for:', esiGeo, 'adding geo to config.');
    try {
      config.geo = w.JSON.parse(esiGeo);
    } catch (__) {
      
      log('Unable to parse geo from:', config.geo);
      config.geo = {};
    }
  }



  var proxy = (window.Krux && window.Krux.q && window.Krux.q[0] && window.Krux.q[0][0] === 'proxy');

  if (!proxy || true) {
    

  load('//cdn.krxd.net/ctjs/controltag.js.09ebc571a022d419934530eaf14c8a78', function() {
    log('Loaded stable controltag resource');
    Krux('config', config);
  });

  }

})(window, (function() {
  var obj = {};
  
    
    obj['35959'] = function() {
      Krux('consent:set', {
  dc: true,
  al: true,
  tg: true,
  cd: true,
  sh: true,
  re: true
}, function(errors, body) {
  if (errors) {
    console.error(errors);
  } else {
    console.log('Successfully set consent flags.');
  }
});
    };
  
    
    obj['36336'] = function() {
      window.Krux||((Krux=function(){Krux.q.push(arguments);}).q=[]);
  Krux('admEvent', 'MGLZ2rWg', {});
    };
  
  return obj;
})());
