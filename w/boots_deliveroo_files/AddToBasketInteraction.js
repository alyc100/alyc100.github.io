window.addEventListener("add-to-basket:success", function(e) {
	console.log("add-to-basket:success", e);
	console.log("success addToBasket");
	if (!!e && !!e.detail) {
		var pageName = e.detail.additionalDetails.pageName;
		var totalMessageArray= e.detail.payload.messages;
		var messageArray = [];
		var basket=e.detail.payload;
		var redesign=e.detail.additionalDetails.redesign;
		if (totalMessageArray.length > 0) {
				for (var i = 0; i < totalMessageArray.length; i++){
					if(totalMessageArray[i].messagePriority != -1){
						messageArray.push(totalMessageArray[i]);
					}
				}
		}
		var basketItems = null;

	    if (basket.basketDetails) {
	      sessionStorage.setItem("basketDetails", JSON.stringify(basket));
	      createOrUpdateCartCookies(basket);
	      basketItems = basket.basketDetails.orderItems;
		  } else if (basket.basketNotificationDetails && (basket.basketNotificationDetails.orderItems || basket.basketNotificationDetails.orderItem)) {
	      var currentStorage = sessionStorage.getItem("basketDetails");
	      currentStorage = currentStorage
	        ? JSON.parse(currentStorage)
	        : {
	          basketDetails: {
	            orderItems: []
	          }
	        };
	      if(!currentStorage.basketDetails){
			currentStorage	= {
					basketDetails: {
						orderItems: []
					}	
				}
	      }
	      var newNtfBasket = {
	        basketDetails: {
	          ...currentStorage.basketDetails,
	          totalPrice: basket.basketNotificationDetails.totalPrice,
	          totalItemCount: basket.basketNotificationDetails.totalItemCount,
	          orderId: basket.basketNotificationDetails.orderId,
			  orderItems: basket.basketNotificationDetails.orderItems ? basket.basketNotificationDetails.orderItems
			  : [
	        	  ...(currentStorage.basketDetails.orderItems ? currentStorage.basketDetails.orderItems : []),
					basket.basketNotificationDetails.orderItem
				]
	        }
	      };
	      basketItems = newNtfBasket.basketDetails.orderItems;
	      sessionStorage.setItem("basketDetails", JSON.stringify(newNtfBasket));
	      createOrUpdateCartCookies(newNtfBasket);
		}
		if(!!basket.redirectURL){
			window.location.href=basket.redirectURL;
		}
		
		if (pageName == "ProductPage") {
			var hasVariant=!!$("#productHasVariants")?$("#productHasVariants").val():"false";
			var hasPMEDMessage = "false";
			if ( !!messageArray && messageArray.length > 0) {
				for (var i = 0; i < messageArray.length; i++){
					if (messageArray[i].messageTitle && messageArray[i].messageTitle
							.indexOf("PMED NOT LOGGED IN") > -1) {
						cursor_clear();		
						$('#pmedRedirect').attr('href',messageArray[i].messageURL);	
						eStoreProductOverlay('Pmed_overlay');
						hasPMEDMessage = "true";
						}
					else if (messageArray[i].messageTitle && messageArray[i].messageTitle
							.indexOf("PMED LOGGED IN") > -1) {
						window.location.href=messageArray[i].messageURL;
						hasPMEDMessage = "true";
				  }
					else if (messageArray[i].messageTitle && messageArray[i].messageTitle
							.indexOf("CSR PMED BASKET") > -1) {
						cursor_clear();
						eStoreProductOverlay('Pmed_overlay_CSR');
						hasPMEDMessage = "true";
				  }
				}
			}
			if(hasPMEDMessage == "false" && !!basketItems) {
				var partNumber=null;
						if(hasVariant==="true"){
							partNumber=$("#selectedVariantCode").val();
						} else{			
							partNumber=document.getElementById("dlProductId_" + $('#catalogEntry_ID').val()).value.replace(".P","");
						}
						for (let i=0;i<basketItems.length;i++){
						if(basketItems[i].partNumber==partNumber){
							$('#quantity_'+$('#catalogEntry_ID').val()).val(basketItems[i].quantity);
						}
				}

			}
			cursor_wait_new($('#catalogEntry_ID').val(), false);
		} else if (pageName == "PLP"){
			if (!redesign){
				cursor_clear();
			}
			var hasPMEDMessage = "false";
			if (!!messageArray && messageArray.length > 0) {
				for (var i = 0; i < messageArray.length; i++){
					if (messageArray[i].messageTitle && messageArray[i].messageTitle
							.indexOf("PMED NOT LOGGED IN") > -1) {
						cursor_clear();		
						$('#pmedRedirect').attr('href',messageArray[i].messageURL);	
						eStoreProductOverlay('Pmed_overlay');
						hasPMEDMessage = "true";
						}
					else if (messageArray[i].messageTitle && messageArray[i].messageTitle
							.indexOf("PMED LOGGED IN") > -1) {
						window.location.href=messageArray[i].messageURL;
						hasPMEDMessage = "true";
				  }
					else if (messageArray[i].messageTitle && messageArray[i].messageTitle
							.indexOf("CSR PMED BASKET") > -1) {
						cursor_clear();
						eStoreProductOverlay('Pmed_overlay_CSR');
						hasPMEDMessage = "true";
				  }
				}
			} 
			if(hasPMEDMessage == "false" && !!basketItems) {
					var partNumber=document.getElementById("dlProductId_" +e.detail.additionalDetails.productId).value.replace(".P","");				
					for (let i=0;i<basketItems.length;i++){
							if(basketItems[i].partNumber==partNumber){
							$('#quantity_'+e.detail.additionalDetails.productId).val(basketItems[i].quantity);
							}
					}
					cursor_wait_new(e.detail.additionalDetails.productId, false);
				}
			  
		} else if (pageName == "KitPage" || pageName == "WISHLIST") {
			cursor_clear();
		}  else {
			if (!!messageArray && messageArray.length > 0) {
				dojo.query(".shopperActions #add2CartBtn_"+e.detail.additionalDetails.productId).style("visibility", "visible");
				dojo.query(".shopperActions #quantity_section_"+e.detail.additionalDetails.productId).style("visibility", "hidden");
			}
			
					
			if(!!basketItems){
				let partNumber=null;
					if(hasVariant=="true"){
						partNumber=$("#selectedVariantCode").val();
					} else{			
						partNumber=document.getElementById("dlProductId_" + e.detail.additionalDetails.productId).value.replace(".P","");
					}
					for (let i=0;i<basketItems.length;i++){
					if(basketItems[i].partNumber==partNumber){
						$('#quantity_'+e.detail.additionalDetails.productId).val(basketItems[i].quantity);
						if(basketItems[i].quantity != 0){
							dojo.query(".shopperActions #add2CartBtn_"+e.detail.additionalDetails.productId).style("visibility", "hidden");
							dojo.query(".shopperActions #quantity_section_"+e.detail.additionalDetails.productId).style("visibility", "visible");
						}
					}
				}
			}
			cursor_wait_new(e.detail.additionalDetails.productId, false);
		}
		var isButtonsDisabled = "false";
		if (!!messageArray && messageArray.length > 0) {
			for (var i = 0; i < messageArray.length; i++){
				if (messageArray[i].messageType && messageArray[i].messageType == "Error" && messageArray[i].messageText && messageArray[i].messageText != "") {
						if(messageArray[i].messageTitle && messageArray[i].messageTitle.startsWith("MAX QUANTITY")){
							if(dojo.query(".shopperActions #quantity_section_"+e.detail.additionalDetails.productId).children(".plus_quantity_redesign").style("visibility") == "visible"){
								dojo.query(".shopperActions #quantity_section_"+e.detail.additionalDetails.productId).children(".plus_quantity_redesign").addClass("disabled");
								isButtonsDisabled = "true";
							}
							else if(dojo.query(".shopperActions #add2CartBtn_"+e.detail.additionalDetails.productId).style("visibility") == "visible") {
								dojo.query(".shopperActions #add2CartBtn_"+e.detail.additionalDetails.productId).addClass("disabled");
								isButtonsDisabled = "true";
							}
							if(pageName == "ProductPage"){
								if(dojo.query(".quickBuyPDPNewContainer #quickBuyPDPBtnRedesign").length === 1){
									dojo.query(".quickBuyPDPNewContainer #quickBuyPDPBtnRedesign").addClass("disabled");
									isButtonsDisabled = "true";
								}
							} else if(pageName == "PLP"){
								if(dojo.query("#quickBuyPLPBtn_"+e.detail.additionalDetails.productId).length === 1){
									dojo.query("#quickBuyPLPBtn_"+e.detail.additionalDetails.productId).addClass("disabled");
									isButtonsDisabled = "true";
								}
							} else if(pageName == "SLP"){
								if(dojo.query("#quickBuySLPBtn_"+e.detail.additionalDetails.productId).length === 1){
									dojo.query("#quickBuySLPBtn_"+e.detail.additionalDetails.productId).addClass("disabled");
									isButtonsDisabled = "true";
								}
							} else if(pageName == "WISHLIST"){
								if(dojo.query("#quickBuyWishList_"+e.detail.additionalDetails.productId).length === 1){
									dojo.query("#quickBuyWishList_"+e.detail.additionalDetails.productId).addClass("disabled");
									isButtonsDisabled = "true";
								}
							}
							publishMaxQtyThresholdMsg(pageName, e.detail.additionalDetails.productId);
						}
						MessageHelper.displayErrorMessage(messageArray[i].messageText);
					}
			}
		}
		if(!!basketItems){
				let partNumber=null;
				var hasVariant="false";
				if(pageName == "ProductPage"){
					hasVariant = !!$("#productHasVariants")?$("#productHasVariants").val():"false";
				}
					if(hasVariant=="true"){
						partNumber=$("#selectedVariantCode").val();
					} else if (document.getElementById("dlProductId_" + e.detail.additionalDetails.productId)){			
						partNumber=document.getElementById("dlProductId_" + e.detail.additionalDetails.productId).value.replace(".P","");
					} else if ($('#catalogEntry_ID') && document.getElementById("dlProductId_" + $('#catalogEntry_ID').val())){
						partNumber=document.getElementById("dlProductId_" + $('#catalogEntry_ID').val()).value.replace(".P","");
					}
					for (let i=0;i<basketItems.length;i++){
					if(partNumber != null && basketItems[i].partNumber==partNumber){
						if(basketItems[i].productLineInformationMessages){
							var prodInfoMsg = basketItems[i].productLineInformationMessages;
							if (prodInfoMsg.length > 0) {
									for (var j = 0; j < prodInfoMsg.length; j++){
										if(prodInfoMsg[j].messageType == "Error" ){
											if(prodInfoMsg[j].messageTitle && (prodInfoMsg[j].messageTitle == "INSUFFICIENT STOCK" || prodInfoMsg[j].messageTitle == "MAX QUANTITY")){
																								
												if(dojo.query(".shopperActions #quantity_section_"+e.detail.additionalDetails.productId).children(".plus_quantity_redesign").style("visibility") == "visible"){
													dojo.query(".shopperActions #quantity_section_"+e.detail.additionalDetails.productId).children(".plus_quantity_redesign").addClass("disabled");
													isButtonsDisabled = "true";
												}
												else if(dojo.query(".shopperActions #add2CartBtn_"+e.detail.additionalDetails.productId).style("visibility") == "visible") {
													dojo.query(".shopperActions #add2CartBtn_"+e.detail.additionalDetails.productId).addClass("disabled");
													isButtonsDisabled = "true";
												}
												if(pageName == "ProductPage"){
													if(dojo.query(".quickBuyPDPNewContainer #quickBuyPDPBtnRedesign").length === 1){
														dojo.query(".quickBuyPDPNewContainer #quickBuyPDPBtnRedesign").addClass("disabled");
														isButtonsDisabled = "true";
													}
												} else if(pageName == "PLP"){
													if(dojo.query("#quickBuyPLPBtn_"+e.detail.additionalDetails.productId).length === 1){
														dojo.query("#quickBuyPLPBtn_"+e.detail.additionalDetails.productId).addClass("disabled");
														isButtonsDisabled = "true";
													}
												} else if(pageName == "SLP"){
													if(dojo.query("#quickBuySLPBtn_"+e.detail.additionalDetails.productId).length === 1){
														dojo.query("#quickBuySLPBtn_"+e.detail.additionalDetails.productId).addClass("disabled");
														isButtonsDisabled = "true";
													}
												}  else if(pageName == "WISHLIST"){
													if(dojo.query("#quickBuyWishList_"+e.detail.additionalDetails.productId).length === 1){
														dojo.query("#quickBuyWishList_"+e.detail.additionalDetails.productId).addClass("disabled");
														isButtonsDisabled = "true";
													}
												}
																								
												MessageHelper.displayErrorMessage((prodInfoMsg[j].messageText).replace("this",basketItems[i].item.parentName));
												if(prodInfoMsg[j].messageTitle == "MAX QUANTITY"){
													publishMaxQtyThresholdMsg(pageName, e.detail.additionalDetails.productId);
												}else{
													publishLtdStkAvailabilityExceededMsg(pageName, e.detail.additionalDetails.productId);
												}
											}
											else{
												MessageHelper.displayErrorMessage(prodInfoMsg[j].messageText);
											}
											
										}
									}
							}
						}
				}
			}
		}
		if(isButtonsDisabled == "false"){
			if(pageName == "ProductPage"){
				if(dojo.query(".quickBuyPDPNewContainer #quickBuyPDPBtnRedesign").length === 1 && dojo.hasClass("quickBuyPDPBtnRedesign", "disabled")){
					dojo.query(".quickBuyPDPNewContainer #quickBuyPDPBtnRedesign").removeClass("disabled");
					
				}
			} else if(pageName == "PLP"){
				if(dojo.query("#quickBuyPLPBtn_"+e.detail.additionalDetails.productId).length === 1 && dojo.hasClass("quickBuyPLPBtn_"+e.detail.additionalDetails.productId, "disabled")){
					dojo.query("#quickBuyPLPBtn_"+e.detail.additionalDetails.productId).removeClass("disabled");
					
				}
			} else if(pageName == "SLP"){
				if(dojo.query("#quickBuySLPBtn_"+e.detail.additionalDetails.productId).length === 1 && dojo.hasClass("quickBuySLPBtn_"+e.detail.additionalDetails.productId, "disabled")){
					dojo.query("#quickBuySLPBtn_"+e.detail.additionalDetails.productId).removeClass("disabled");
					
				}
			}  else if(pageName == "WISHLIST"){
				if(dojo.query("#quickBuyWishList_"+e.detail.additionalDetails.productId).length === 1 &&  dojo.hasClass("quickBuyWishList_"+e.detail.additionalDetails.productId, "disabled")){
					dojo.query("#quickBuyWishList_"+e.detail.additionalDetails.productId).removeClass("disabled");
				}
			}		
			
		}
	}
});

window.addEventListener("add-to-basket:failure", function (e) {
	if (!!e && !!e.detail) {
		var pageName = e.detail.additionalDetails.pageName;
		var basket=e.detail.payload;
				
	    if(!!basket && !!basket.status  && basket.status != 200){
			if (pageName == "ProductPage") {
				dojo.query(".shopperActions #add2CartBtn").style("visibility", "visible");
				dojo.query(".shopperActions #quantity_section_"+e.detail.additionalDetails.productId).style("visibility", "hidden");
			} else if (pageName == "KitPage") {
				cursor_clear();
			} else {
			var productId=e.detail.additionalDetails.productId;
				dojo.query(".shopperActions #add2CartBtn_"+productId).style("visibility", "visible");
				dojo.query(".shopperActions #quantity_section_"+productId).style("visibility", "hidden");
				cursor_wait_new(e.detail.additionalDetails.productId, false);
			}
		}
		    
		
		if(!!basket && (basket.detail && basket.detail !="")){
			if (basket.status != 200) {
				if(basket.type.indexOf("_ERR_THRESHOLD_SHOPPING_CART_MAX_ITEMS") > 0 && dojo.byId('cartThresholdTitleDiv')){
					dojo.byId('cartThresholdTitleDiv').style.display='block';
				}
				MessageHelper.displayErrorMessage(basket.detail);
			}else if (basket.status == 200 && basket.detail.startsWith("Insufficient stock")){
				var errorMsgArray =[];
				errorMsgArray.push(basket);
				
				var currentStorage = JSON.parse(sessionStorage.getItem("basketDetails"));
				var basketItems = !!currentStorage && !!currentStorage.basketDetails ? currentStorage.basketDetails.orderItems : null;
				
                if (!!basketItems && errorMsgArray.length > 0){
					disableButtonsOnError(basketItems, pageName, e.detail.additionalDetails.productId, "errorEvent", errorMsgArray );
				}
				
				cursor_wait_new(e.detail.additionalDetails.productId, false);
				MessageHelper.displayErrorMessage(basket.detail);
				publishLtdStkAvailabilityExceededMsg(pageName, e.detail.additionalDetails.productId);
			}
		}
	}
  });

window.addEventListener("get-basket:sucess", function (e) {
	console.log("get-basket:sucess");
      });

window.addEventListener("get-basket:failure", function (e) {
	console.log("get-basket:failure");
});

window.addEventListener("update-basket:success", function (e) {
	console.log("update-basket:success");
	if (!!e && !!e.detail) {
		var pageName = e.detail.additionalDetails.pageName;
		var totalMessageArray = e.detail.payload.messages;
		var messageArray =[];
		var isEmptyCart = false;
		var hasPMEDMessage = "false";
		if (totalMessageArray.length > 0) {
				for (var i = 0; i < totalMessageArray.length; i++){
					if(totalMessageArray[i].messagePriority!= -1){
						messageArray.push(totalMessageArray[i]);
					}
					if(totalMessageArray[i].messageTitle && totalMessageArray[i].messageTitle == "EMPTY BASKET"){
						isEmptyCart = true;
					}
					
					if(totalMessageArray[i].messageTitle && (totalMessageArray[i].messageTitle.indexOf("PMED NOT LOGGED IN") > -1 || totalMessageArray[i].messageTitle.indexOf("PMED Logged in") > -1)){
						hasPMEDMessage = true;
					}
				}
		}
		var basket=e.detail.payload;
		
		var basketItems=!!basket && !!basket.basketDetails?basket.basketDetails.orderItems:null;
		var redesign=e.detail.additionalDetails.redesign;
		if(!!basketItems || isEmptyCart){
			sessionStorage.setItem("basketDetails", JSON.stringify(basket));
			createOrUpdateCartCookies(basket);
		}
		if (pageName == "ProductPage") {
			cursor_wait_new(dojo.byId('catalogEntry_ID').value, false);
			if (messageArray.length > 0) {
				for (let i = 0; i < messageArray.length; i++){
					if (messageArray[i].messageTitle && messageArray[i].messageTitle
							.indexOf("PMED NOT LOGGED IN") > -1) {
						cursor_clear();		
						$('#pmedRedirect').attr('href',messageArray[i].messageURL);	
						eStoreProductOverlay('Pmed_overlay');
					}
					else if (messageArray[i].messageTitle && messageArray[i].messageTitle
							.indexOf("PMED Logged in") > -1) {
						window.location.href=messageArray[i].messageUrl;
					}
				}
			}
			if($('#quantity_'+$('#catalogEntry_ID').val()).val()==0){
				dojo.query(".shopperActions #add2CartBtn").style("visibility", "visible");
				dojo.query(".shopperActions #quantity_section_"+$('#catalogEntry_ID').val()).style("visibility", "hidden");
			}
		} else if (pageName == "KitPage" ) {
			cursor_clear();
		}  else if (pageName == "WISHLIST"){
			cursor_clear();
		}  else {
			var productId=e.detail.additionalDetails.productId;
			var productIdQuantity=e.detail.additionalDetails.quantity;
			if ((!!messageArray && messageArray.length >0 && hasPMEDMessage == "true") || productIdQuantity ==0)  {
				dojo.query(".shopperActions #add2CartBtn_"+productId).style("visibility", "visible");
				dojo.query(".shopperActions #quantity_section_"+productId).style("visibility", "hidden");
				
			}
			
			if(!!basketItems){
				var partNumber=document.getElementById("dlProductId_" +e.detail.additionalDetails.productId).value.replace(".P","");				
				for (let i=0;i<basketItems.length;i++){
					if(basketItems[i].partNumber==partNumber){
						$('#quantity_'+e.detail.additionalDetails.productId).val(basketItems[i].quantity);
						if(redesign && basketItems[i].quantity != 0){
							dojo.query(".shopperActions #add2CartBtn_"+e.detail.additionalDetails.productId).style("visibility", "hidden");
							dojo.query(".shopperActions #quantity_section_"+e.detail.additionalDetails.productId).style("visibility", "visible");
						}
					}
				}
			}
			cursor_wait_new(productId, false);
		}
		var isButtonsDisabled = "false";
		if (!!messageArray && messageArray.length > 0) {
			for (var i = 0; i < messageArray.length; i++){
				if (messageArray[i].messageType && messageArray[i].messageType == "Error" && messageArray[i].messageText && messageArray[i].messageText != "") {
						if(messageArray[i].messageTitle && messageArray[i].messageTitle.startsWith("MAX QUANTITY")){
							
							if(dojo.query(".shopperActions #quantity_section_"+e.detail.additionalDetails.productId).children(".plus_quantity_redesign").style("visibility") == "visible"){
								dojo.query(".shopperActions #quantity_section_"+e.detail.additionalDetails.productId).children(".plus_quantity_redesign").addClass("disabled");
								isButtonsDisabled = "true";
							}
							else if(dojo.query(".shopperActions #add2CartBtn_"+e.detail.additionalDetails.productId).style("visibility") == "visible") {
								dojo.query(".shopperActions #add2CartBtn_"+e.detail.additionalDetails.productId).addClass("disabled");
								isButtonsDisabled = "true";
							}
							if(pageName == "ProductPage"){
								if(dojo.query(".quickBuyPDPNewContainer #quickBuyPDPBtnRedesign").length === 1){
									dojo.query(".quickBuyPDPNewContainer #quickBuyPDPBtnRedesign").addClass("disabled");
									isButtonsDisabled = "true";
								}
							} else if(pageName == "PLP"){
								if(dojo.query("#quickBuyPLPBtn_"+e.detail.additionalDetails.productId).length === 1){
									dojo.query("#quickBuyPLPBtn_"+e.detail.additionalDetails.productId).addClass("disabled");
									isButtonsDisabled = "true";
								}
							} else if(pageName == "SLP"){
								if(dojo.query("#quickBuySLPBtn_"+e.detail.additionalDetails.productId).length === 1){
									dojo.query("#quickBuySLPBtn_"+e.detail.additionalDetails.productId).addClass("disabled");
									isButtonsDisabled = "true";
								}
							}  else if(pageName == "WISHLIST"){
								if(dojo.query("#quickBuyWishList_"+e.detail.additionalDetails.productId).length === 1){
									dojo.query("#quickBuyWishList_"+e.detail.additionalDetails.productId).addClass("disabled");
									isButtonsDisabled = "true";
								}
							}
							publishMaxQtyThresholdMsg(pageName, e.detail.additionalDetails.productId);
						}
						MessageHelper.displayErrorMessage(messageArray[i].messageText);
					}
			}
		}
		if(!!basketItems){
				let partNumber=null;
				var hasVariant="false";
				if(pageName == "ProductPage"){
					hasVariant = !!$("#productHasVariants")?$("#productHasVariants").val():"false";
				}
					if(hasVariant=="true"){
						partNumber=$("#selectedVariantCode").val();
					} else if (document.getElementById("dlProductId_" + e.detail.additionalDetails.productId)){			
						partNumber=document.getElementById("dlProductId_" + e.detail.additionalDetails.productId).value.replace(".P","");
					} else if ($('#catalogEntry_ID') && document.getElementById("dlProductId_" + $('#catalogEntry_ID').val())){
						partNumber=document.getElementById("dlProductId_" + $('#catalogEntry_ID').val()).value.replace(".P","");
					}
					for (let i=0;i<basketItems.length;i++){
					if(partNumber != null && basketItems[i].partNumber==partNumber){
						if(basketItems[i].productLineInformationMessages){
							var prodInfoMsg = basketItems[i].productLineInformationMessages;
							if (prodInfoMsg.length > 0) {
									for (var j = 0; j < prodInfoMsg.length; j++){
										if(prodInfoMsg[j].messageType == "Error" ){
											if(prodInfoMsg[j].messageTitle && (prodInfoMsg[j].messageTitle == "INSUFFICIENT STOCK" || prodInfoMsg[j].messageTitle == "MAX QUANTITY")){
																								
												if(dojo.query(".shopperActions #quantity_section_"+e.detail.additionalDetails.productId).children(".plus_quantity_redesign").style("visibility") == "visible"){
													dojo.query(".shopperActions #quantity_section_"+e.detail.additionalDetails.productId).children(".plus_quantity_redesign").addClass("disabled");
													isButtonsDisabled = "true";
												}
												else if(dojo.query(".shopperActions #add2CartBtn_"+e.detail.additionalDetails.productId).style("visibility") == "visible") {
													dojo.query(".shopperActions #add2CartBtn_"+e.detail.additionalDetails.productId).addClass("disabled");
													isButtonsDisabled = "true";
												}
												if(pageName == "ProductPage"){
													if(dojo.query(".quickBuyPDPNewContainer #quickBuyPDPBtnRedesign").length === 1){
														dojo.query(".quickBuyPDPNewContainer #quickBuyPDPBtnRedesign").addClass("disabled");
														isButtonsDisabled = "true";
													}
												} else if(pageName == "PLP"){
													if(dojo.query("#quickBuyPLPBtn_"+e.detail.additionalDetails.productId).length === 1){
														dojo.query("#quickBuyPLPBtn_"+e.detail.additionalDetails.productId).addClass("disabled");
														isButtonsDisabled = "true";
													}
												} else if(pageName == "SLP"){
													if(dojo.query("#quickBuySLPBtn_"+e.detail.additionalDetails.productId).length === 1){
														dojo.query("#quickBuySLPBtn_"+e.detail.additionalDetails.productId).addClass("disabled");
														isButtonsDisabled = "true";
													}
												}  else if(pageName == "WISHLIST"){
													if(dojo.query("#quickBuyWishList_"+e.detail.additionalDetails.productId).length === 1){
														dojo.query("#quickBuyWishList_"+e.detail.additionalDetails.productId).addClass("disabled");
														isButtonsDisabled = "true";
													}
												}
												
												MessageHelper.displayErrorMessage((prodInfoMsg[j].messageText).replace("this",basketItems[i].item.parentName));
												if(prodInfoMsg[j].messageTitle == "MAX QUANTITY"){
													publishMaxQtyThresholdMsg(pageName, e.detail.additionalDetails.productId);
												}
											}
											else{
												MessageHelper.displayErrorMessage(prodInfoMsg[j].messageText);
											}
										}
									}
							}
						}
				}
			}
		}
		
		if(isButtonsDisabled == "false"){
			if(pageName == "ProductPage"){
				if(dojo.query(".quickBuyPDPNewContainer #quickBuyPDPBtnRedesign").length === 1 && dojo.hasClass("quickBuyPDPBtnRedesign", "disabled")){
					dojo.query(".quickBuyPDPNewContainer #quickBuyPDPBtnRedesign").removeClass("disabled");
					
				}
			} else if(pageName == "PLP"){
				if(dojo.query("#quickBuyPLPBtn_"+e.detail.additionalDetails.productId).length === 1 && dojo.hasClass("quickBuyPLPBtn_"+e.detail.additionalDetails.productId, "disabled")){
					dojo.query("#quickBuyPLPBtn_"+e.detail.additionalDetails.productId).removeClass("disabled");
					
				}
			} else if(pageName == "SLP"){
				if(dojo.query("#quickBuySLPBtn_"+e.detail.additionalDetails.productId).length === 1 && dojo.hasClass("quickBuySLPBtn_"+e.detail.additionalDetails.productId, "disabled")){
					dojo.query("#quickBuySLPBtn_"+e.detail.additionalDetails.productId).removeClass("disabled");
					
				}
			}  else if(pageName == "WISHLIST"){
				if(dojo.query("#quickBuyWishList_"+e.detail.additionalDetails.productId).length === 1 &&  dojo.hasClass("quickBuyWishList_"+e.detail.additionalDetails.productId, "disabled")){
					dojo.query("#quickBuyWishList_"+e.detail.additionalDetails.productId).removeClass("disabled");
				}
			}		
			
		}
	}
});

window.addEventListener("update-basket:failure", function (e) {
	if (!!e && !!e.detail) {
		var pageName = e.detail.additionalDetails.pageName;
		var quantity = parseInt(e.detail.additionalDetails.quantity);
		var basket=e.detail.payload;
		
		if(quantity !=0){
           quantity = parseInt(e.detail.additionalDetails.quantity)-1;
		}

	    if (pageName == "KitPage") {
			cursor_clear();
		} else {
			//for all other pages
			var productId=e.detail.additionalDetails.productId;
	    	$('#quantity_'+productId).val(quantity.toString());
			cursor_wait_new(productId, false);
		}
		if (quantity==0){
				dojo.query(".shopperActions #add2CartBtn_"+productId).style("visibility", "visible");
				dojo.query(".shopperActions #quantity_section_"+productId).style("visibility", "hidden");
			
		}
		
		if(!!basket && basket.status != 200 && (basket.detail && basket.detail !="")){
			MessageHelper.displayErrorMessage(basket.detail);
		}
		
	    }
});

window.addEventListener("oct-basket:updated", function (e) {
	console.log("oct-basket:updated ,Success");
	if (!!e && !!e.detail) {
		console.log(typeof(e));
		var payloadbasket=e.detail;
		var payloadbasketItems=!!payloadbasket?payloadbasket:null;
		var sessionBasketDetails=null;
		var stockleft=0;
		//console.log("before",JSON.parse(sessionStorage.basketDetails));
		let payloadMap = new Map();
		if(!!payloadbasketItems){
		    if(!! payloadbasketItems.orderItems){
		    	for (let i=0;i<payloadbasketItems.orderItems.length;i++){
                payloadMap.set(payloadbasketItems.orderItems[i].partNumber,payloadbasketItems.orderItems[i].quantity);
                }
		    }

		    if(!!payloadbasketItems){
                var partNumber=null;
                var pageName=null;
				if(document.getElementById("listPageType") && document.getElementById("listPageType").value=='WISHLIST'){
                   	if(!!sessionStorage.basketDetails){
                		sessionBasketDetails=JSON.parse(sessionStorage.basketDetails);
                    }else{
						sessionBasketDetails	= {
								basketDetails: {
									orderItems: []
								}	
							}
					}
					sessionBasketDetails.basketDetails=payloadbasket;
                    sessionStorage.setItem("basketDetails", JSON.stringify(sessionBasketDetails));
					createOrUpdateCartCookies(sessionBasketDetails);
				}
                else if (document.querySelectorAll("[id*='dlProductId_']").length ===1 && document.querySelectorAll("[id*='dlParentCatentryID']").length ===0){
                    pageName ="PDP";
                    var hasVariant=!!$("#productHasVariants")?$("#productHasVariants").val():"false";
					console.log("coming correct");
					if(hasVariant==="true"){
							partNumber=$("#selectedVariantCode").val();
					} else{			
							partNumber=document.getElementById("dlProductId_" + $('#catalogEntry_ID').val()).value.replace(".P","");
					}
					if( payloadbasketItems.orderItems == null || JSON.stringify(payloadbasketItems.orderItems).indexOf(partNumber) === -1){
                        dojo.query("#quantity_section_" + $('#catalogEntry_ID').val()).style('visibility', 'hidden');
	                    dojo.query("#add2CartBtn").style('visibility', 'visible');
					}
                    else if (JSON.stringify(payloadbasketItems.orderItems).indexOf(partNumber) > -1){
                        var ordItems=payloadbasketItems.orderItems;
	                    for (let i=0;i<ordItems.length;i++){
	                    	stockleft=ordItems[i].item.inventory.currentStockLevel;
                            if(ordItems[i].partNumber==partNumber && ordItems[i].quantity <= stockleft){
                            	document.getElementById("quantity_" + $('#catalogEntry_ID').val()).value=ordItems[i].quantity;
                             }
                             
	                     }

                    }
                    if(!!sessionStorage.basketDetails){
                		sessionBasketDetails=JSON.parse(sessionStorage.basketDetails);
                    }else{
						sessionBasketDetails	= {
								basketDetails: {
									orderItems: []
								}	
							}
					}
					sessionBasketDetails.basketDetails=payloadbasket;
                    sessionStorage.setItem("basketDetails", JSON.stringify(sessionBasketDetails));
					createOrUpdateCartCookies(sessionBasketDetails);
                }
                
				else if ((document.querySelectorAll("[id*='dlParentCatentryID_']").length > 0) || (document.getElementById("listPageType") && document.getElementById("listPageType").value =='PLP')){	
                    var basket=JSON.parse(sessionStorage.getItem("basketDetails"));
		            var basketItems=!!basket && !!basket.basketDetails?basket.basketDetails.orderItems:null;
                	if (!! basketItems){
                		for (let i=0;i<basketItems.length;i++){
                			var parentPartNumber ="";
                			if(basketItems[i].isBundle){
                				parentPartNumber=basketItems[i].partNumber;
                			}
                			else{
                				parentPartNumber=basketItems[i].parentPartNumber;
                			}
                            var catalogEntry_ID =null;
                            var identifier="";
                            if (!!$("#listPageType").val() && $("#listPageType").val()=='PLP'){
                            	identifier="dlcatalogEntryID_";
                            } else {
                            	identifier="dlParentCatentryID_";
                            }
	                        if(!! document.getElementById(identifier + parentPartNumber)){
                             	catalogEntry_ID = document.getElementById(identifier + parentPartNumber).value;
                                 if (payloadMap.has(basketItems[i].partNumber)){
                                    if(payloadMap.get(basketItems[i].partNumber) ){
                            	            document.getElementById("quantity_" + catalogEntry_ID).value=payloadMap.get(basketItems[i].partNumber);
                                    }
                                 }
                                 else{
                             	    dojo.query("#quantity_section_" + catalogEntry_ID).style('visibility', 'hidden');
                                    dojo.query(".shopperActions #add2CartBtn_"+catalogEntry_ID).style("visibility", "visible");
                                 }
                             }
                             
                	     }
                	    if(!!sessionStorage.basketDetails){
							sessionBasketDetails=JSON.parse(sessionStorage.basketDetails);
						}else{
							sessionBasketDetails	= {
									basketDetails: {
										orderItems: []
									}	
								}
						}
						sessionBasketDetails.basketDetails=payloadbasket;
						sessionStorage.setItem("basketDetails", JSON.stringify(sessionBasketDetails));
						createOrUpdateCartCookies(sessionBasketDetails);
                	} else{
						if(!!sessionStorage.basketDetails){
							sessionBasketDetails=JSON.parse(sessionStorage.basketDetails);
						}else{
							sessionBasketDetails	= {
									basketDetails: {
										orderItems: []
									}	
								}
						}
						sessionBasketDetails.basketDetails=payloadbasket;
						sessionStorage.setItem("basketDetails", JSON.stringify(sessionBasketDetails));
						createOrUpdateCartCookies(sessionBasketDetails);
					}
                	
                 } else if(document.querySelectorAll(".oct-overlay--visible").length === 1 || (document.querySelectorAll(".oct-process-order") && document.querySelectorAll(".oct-process-order").length === 1))	{
					 if(!!sessionStorage.basketDetails){
                		sessionBasketDetails=JSON.parse(sessionStorage.basketDetails);
                    }else{
						sessionBasketDetails	= {
								basketDetails: {
									orderItems: []
								}	
							}
					}
					sessionBasketDetails.basketDetails=payloadbasket;
                    sessionStorage.setItem("basketDetails", JSON.stringify(sessionBasketDetails));
					createOrUpdateCartCookies(sessionBasketDetails);
				} 
		    }
		}
	}
});

function createOrUpdateCartCookies(basket){
	var basketDetails=basket.basketDetails;
	var orderIdCookie = getCookie("WC_CartOrderId_"+WCParamJS.storeId);
	
	var isEmptyBasket = false;
	if (basket.messages && basket.messages.length > 0) {
		for (var i = 0; i < basket.messages.length; i++){
			if(basket.messages[i].messageTitle == "EMPTY BASKET" && orderIdCookie != null ){
				isEmptyBasket = true;
			}
		}
	}
	if(isEmptyBasket || (basketDetails.totalItemCount != null && basketDetails.totalItemCount != undefined && basketDetails.totalItemCount == 0)){
		if(document.querySelectorAll(".oct-process-order") && document.querySelectorAll(".oct-process-order").length === 1){
			dojo.cookie("WC_CartOrderId_"+WCParamJS.storeId, null, {expires: -1, path:'/'});
			dojo.cookie("WC_CartTotal_"+orderIdCookie, null, {expires: -1, path:'/'});
			dojo.cookie("WC_CartTotal_ItemCount", null, {expires: -1, path:'/'});
			
			var ordIdCookie=getCookie("WC_CartOrderId_"+WCParamJS.storeId) ? getCookie("WC_CartOrderId_"+WCParamJS.storeId) : null;
			if(!!ordIdCookie){
				dojo.cookie("WC_CartOrderId_"+WCParamJS.storeId, null, {expires: -1, path:'/', domain:".boots.com"});
				dojo.cookie("WC_CartTotal_"+orderIdCookie, null, {expires: -1, path:'/', domain:".boots.com"});
			}
			
		}else{
			dojo.cookie("WC_CartTotal_"+orderIdCookie, 0, {path:'/'});
			dojo.cookie("WC_CartTotal_ItemCount", 0, {path:'/'});
		}
	}else{
		if(orderIdCookie == null || orderIdCookie!=basketDetails.orderId){
			dojo.cookie("WC_CartOrderId_"+WCParamJS.storeId, basketDetails.orderId, {path:'/'});
			dojo.cookie("WC_CartTotal_"+basketDetails.orderId, basketDetails.totalItemCount, {path:'/'});
		} else{
			dojo.cookie("WC_CartTotal_"+basketDetails.orderId, basketDetails.totalItemCount, {path:'/'});
		}
		dojo.cookie("WC_CartTotal_ItemCount", basketDetails.totalItemCount, {expires: 30, path:'/'});
		//Cordova call back for Clare project
		 if(typeof(clareBootsAppCookieFlag)!= "undefined" && clareBootsAppCookieFlag == "true"){
			 updateCartCallBack(basketDetails.totalItemCount);
		 }
	}
	
};
function publishLtdStkAvailabilityExceededMsg(pageName, productId){
	if(document.getElementById("gtm_switch") != null) {
		var gtm_switch = document.getElementById("gtm_switch").value;
		if(pageName == "ProductPage"){
			productId = document.getElementById("catalogEntry_ID") ? document.getElementById("catalogEntry_ID").value : productId;
		}
			if(document.getElementById("gtm_pdp_switch") != null) {
				var gtm_pdp_switch = document.getElementById("gtm_pdp_switch").value;
				if(gtm_switch == 'true' && gtm_pdp_switch == 'true') {	
				dlProductId =  dojo.byId("dlProductId_"+productId).value;
				dlProductName =  dojo.byId("dlProductName_"+productId).value;
								
				var prod = {'id': dlProductId,
							'name': dlProductName};
							var objstr = {'detail': {'products': [prod]}} ;
							analyticsJS.gtmPush({
								'event': 'limitedStockAvailabilityExceededMessage',
								'eventCategory': 'Errors',
								'eventAction': 'View',
								'eventLabel': "Add to basket quantity exceeds limited stock availability",
								'ecommerce':objstr
							});
					}
			}				
	}
};
function publishMaxQtyThresholdMsg(pageName, productId){
	if(document.getElementById("gtm_switch") != null) {
		var gtm_switch = document.getElementById("gtm_switch").value;
		if(pageName == "ProductPage"){
			productId = document.getElementById("catalogEntry_ID") ? document.getElementById("catalogEntry_ID").value : productId;
		}
			if(document.getElementById("gtm_pdp_switch") != null) {
				var gtm_pdp_switch = document.getElementById("gtm_pdp_switch").value;
				if(gtm_switch == 'true' && gtm_pdp_switch == 'true') {	
				dlProductId =  dojo.byId("dlProductId_"+productId).value;
				dlProductName =  dojo.byId("dlProductName_"+productId).value;
								
				var prod = {'id': dlProductId,
							'name': dlProductName};
							var objstr = {'detail': {'products': [prod]}} ;
							analyticsJS.gtmPush({
								'event': 'maximumQuantityThresholdMessage',
								'eventCategory': 'Errors',
								'eventAction': 'View',
								'eventLabel': "Add to basket quantity exceeds maximum quantity threshold..",
								'ecommerce':objstr
							});
					}
			}				
	}
};

function disableButtonsOnError(basketItems, pageName, productId, typeOfEvent, payload){
	if(!!basketItems){
				let partNumber=null;
				var hasVariant="false";
				if(pageName == "ProductPage"){
					hasVariant = !!$("#productHasVariants")?$("#productHasVariants").val():"false";
				}
					if(hasVariant=="true"){
						partNumber=$("#selectedVariantCode").val();
					} else if (document.getElementById("dlProductId_" + productId)){			
						partNumber=document.getElementById("dlProductId_" + productId).value.replace(".P","");
					} else if ($('#catalogEntry_ID') && document.getElementById("dlProductId_" + $('#catalogEntry_ID').val())){
						partNumber=document.getElementById("dlProductId_" + $('#catalogEntry_ID').val()).value.replace(".P","");
					}
					for (let i=0;i<basketItems.length;i++){
					if(partNumber != null && basketItems[i].partNumber==partNumber){
						var prodInfoMsg = "";
						if(basketItems[i].productLineInformationMessages || (typeOfEvent == "errorEvent" && !!payload)){
							if(typeOfEvent == "errorEvent"){
								prodInfoMsg = payload;
								if(document.getElementById("quantity_" + productId)){
									$('#quantity_' + productId).val(basketItems[i].quantity);
								}else if(pageName == "ProductPage"){
									$('#quantity_' + $('#catalogEntry_ID').val()).val(basketItems[i].quantity);
								}
							}else{
								prodInfoMsg = basketItems[i].productLineInformationMessages;
							}
							
							if (prodInfoMsg.length > 0) {
									for (var j = 0; j < prodInfoMsg.length; j++){
										if(prodInfoMsg[j].messageType == "Error" || (prodInfoMsg[j].detail && prodInfoMsg[j].detail !="") ){
											if((prodInfoMsg[j].messageTitle && (prodInfoMsg[j].messageTitle == "INSUFFICIENT STOCK" || prodInfoMsg[j].messageTitle == "MAX QUANTITY")) || prodInfoMsg[j].detail.startsWith("Insufficient stock") ){
																								
												if(dojo.query(".shopperActions #quantity_section_"+productId).children(".plus_quantity_redesign").style("visibility") == "visible"){
													dojo.query(".shopperActions #quantity_section_"+productId).children(".plus_quantity_redesign").addClass("disabled");
													isButtonsDisabled = "true";
												}
												else if(dojo.query(".shopperActions #add2CartBtn_"+productId).style("visibility") == "visible") {
													dojo.query(".shopperActions #add2CartBtn_"+productId).addClass("disabled");
													isButtonsDisabled = "true";
												}
												if(pageName == "ProductPage"){
													if(dojo.query(".quickBuyPDPNewContainer #quickBuyPDPBtnRedesign").length === 1){
														dojo.query(".quickBuyPDPNewContainer #quickBuyPDPBtnRedesign").addClass("disabled");
														isButtonsDisabled = "true";
													}
												} else if(pageName == "PLP"){
													if(dojo.query("#quickBuyPLPBtn_"+productId).length === 1){
														dojo.query("#quickBuyPLPBtn_"+productId).addClass("disabled");
														isButtonsDisabled = "true";
													}
												} else if(pageName == "SLP"){
													if(dojo.query("#quickBuySLPBtn_"+productId).length === 1){
														dojo.query("#quickBuySLPBtn_"+productId).addClass("disabled");
														isButtonsDisabled = "true";
													}
												}  else if(pageName == "WISHLIST"){
													if(dojo.query("#quickBuyWishList_"+productId).length === 1){
														dojo.query("#quickBuyWishList_"+productId).addClass("disabled");
														isButtonsDisabled = "true";
													}
												}
												if(!!prodInfoMsg[j].messageText){											
													MessageHelper.displayErrorMessage((prodInfoMsg[j].messageText).replace("this",basketItems[i].item.parentName));
													if(prodInfoMsg[j].messageTitle == "MAX QUANTITY"){
														publishMaxQtyThresholdMsg(pageName, productId);
													}else{
														publishLtdStkAvailabilityExceededMsg(pageName, productId);
													}
												}
											}
											else if(!!prodInfoMsg[j].messageText){
												MessageHelper.displayErrorMessage(prodInfoMsg[j].messageText);
											}
											
										}
									}
							}
						}
				}
			}
		}
};