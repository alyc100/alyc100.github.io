if (!(!!window.MSInputMethodContext && !!document.documentMode)){(function(){'use strict';var c,d,g,i,j,n,p,q,r,s,t,u,v,y,z,A,B,D,E,G;c="type",d="addEventListener",g=0,i="createElement",j="ciqentry",n='{"tagData":{"tagId":"e8383c25-d780-4b40-8c26-aeb7edda14cc-kk6syrgs","url":"https://www.boots.com","pixelSrc":"https://arh-prodboots.cloudiq.com/pubsub/push","mrid":"bootsmrid2021"},"targets":[{"captures":[{"from":{"patterns":{"subTotal":".oct-order-totals__row.oct-order-totals__subtotal dd","total":".oct-order-totals__row.oct-order-totals__total dd"},"type":"cart"},"to":"cart"},{"from":{"type":"currency","patterns":{"defaultSymbol":"","currencyCodes":"GBP,EUR","symbolOnly":true,"defaultCode":"","currencySymbols":"%C2%A3,%E2%82%AC","lookupCurrency":false,"currencyCode":"#ciq-placeholder","currencySymbol":".oct-order-totals__row.oct-order-totals__total dd","splitNumber":"","split":""}},"to":"cart"}],"when":[{"pageMatch":"/checkout/initialise","elementMatch":{"element":".oct-order-totals__row.oct-order-totals__total dd","waitUntilExist":true},"domChange":".oct-order-totals"}]},{"captures":[{"to":"cart","from":{"type":"cart","patterns":{"discountCode":"#offerCode"}}}],"when":[{"eventMatch":{"waitUntilExist":true,"event":"blur","target":"#offerCode"},"domChange":"body"}]},{"captures":[{"to":"cart","from":{"type":"cart","patterns":{"discountCode":"#offerCode"}}}],"when":[{"pageMatch":"/checkout/initialise","eventMatch":{"event":"blur","target":"#offerCode"},"domChange":".oct-checkout"}]},{"captures":[{"to":"user","from":{"patterns":{"email":"#your-details-email-address,input[id*=gigya-loginID],input#WC__ShoppingCartAddressEntryForm_ContactDetails_email_1,input#WC__ShoppingCartAddressEntryForm_deliveryContactDetails_email_1","lastName":"#your-details-last-name,input[data-display-name*=Last],input#WC__ShoppingCartAddressEntryForm__lastName_1,input#WC__ShoppingCartAddressEntryForm__deliverylastName_1,input#WC__ShoppingCartAddressEntryForm__billinglastName_1","firstName":"#your-details-first-name,input[data-display-name*=First],input#WC__ShoppingCartAddressEntryForm__firstName_1,input#WC__ShoppingCartAddressEntryForm__deliveryfirstName_1,input#WC__ShoppingCartAddressEntryForm__billingfirstName_1"},"type":"user"}}],"when":[{"pageMatch":"/BootsLogonForm,/CheckoutLoginView","eventMatch":{"event":"blur","waitUntilExist":true,"target":"input[id*=gigya-loginID]"}},{"pageMatch":"/UserRegistrationForm","eventMatch":{"waitUntilExist":true,"event":"blur","target":"input[id*=gigya-loginID],input[data-display-name*=First],input[data-display-name*=Last]"}},{"eventMatch":{"target":"input#WC__ShoppingCartAddressEntryForm__firstName_1,input#WC__ShoppingCartAddressEntryForm__lastName_1,input#WC__ShoppingCartAddressEntryForm_ContactDetails_email_1","event":"blur","waitUntilExist":true},"pageMatch":"/OrderShippingBillingView"},{"eventMatch":{"event":"blur","target":"input#WC__ShoppingCartAddressEntryForm__deliveryfirstName_1,input#WC__ShoppingCartAddressEntryForm__deliverylastName_1,input#WC__ShoppingCartAddressEntryForm_deliveryContactDetails_email_1","waitUntilExist":true},"pageMatch":"/OrderShippingBillingView"},{"pageMatch":"/OrderShippingBillingView","eventMatch":{"event":"blur","waitUntilExist":true,"target":"input#WC__ShoppingCartAddressEntryForm__billingfirstName_1,input#WC__ShoppingCartAddressEntryForm__billinglastName_1"}},{"pageMatch":"/checkout/initialise","eventMatch":{"event":"blur","waitUntilExist":true,"target":"#your-details-first-name,#your-details-last-name,#your-details-email-address"}}]},{"captures":[{"to":"event","from":{"patterns":["cartStarted","productViewed"],"type":"event"}},{"to":"product","from":{"type":"product","patterns":{"image":"#ciq-placeholder","total":"#ciq-placeholder","name":"h1:not(h1[id])","price":"#PDP_productPrice","qty":"input[id*=quantity]"}}},{"from":{"type":"currency","patterns":{"defaultSymbol":"","currencyCodes":"GBP,EUR","symbolOnly":true,"defaultCode":"","currencySymbols":"%C2%A3,%E2%82%AC","lookupCurrency":false,"currencyCode":"#ciq-placeholder","currencySymbol":"#PDP_productPrice","splitNumber":"","split":""}},"to":"cart"}],"when":[{"elementMatch":{"element":"#estore_productpage_template_container","waitUntilExist":true},"eventMatch":{"event":"click","waitUntilExist":true,"target":"#productPageAdd2Cart"}}]},{"captures":[{"to":"transaction","from":{"type":"transaction","patterns":{"orderNo":".oct-order-confirmation .oct-order-confirmation-item[data-element*= number] .oct-order-confirmation-item__value"}}}],"when":[{"elementMatch":{"element":".oct-order-confirmation .oct-order-confirmation-item[data-element*= number] .oct-order-confirmation-item__value","waitUntilExist":true},"pageMatch":"/checkout/process-order"}]},{"captures":[{"to":"event","from":{"patterns":["purchaseComplete"],"type":"event"}}],"when":[{"pageMatch":"/checkout/process-order"}]},{"captures":[{"from":{"patterns":["productViewed"],"type":"event"},"to":"event"}],"when":[{"elementMatch":{"element":"#estore_productpage_template_container","waitUntilExist":true}}]},{"captures":[{"to":"event","from":{"patterns":["cartCaptured"],"type":"event"}},{"from":{"type":"cartItem","patterns":{"url":"#ciq-placeholder","qty":".oct-drop-downs button[role=listbox]:not(button.disabled) .oct-selected-option span span","name":".oct-product-details__name","price":"#ciq-placeholder","total":".oct-product-details__price","image":"img","container":".oct-product-tile"}},"to":"cartItem"},{"from":{"patterns":{"total":".oct-basket-footer .oct-basket-totals__row .oct-basket-totals__descriptionEnd","subTotal":".oct-basket-totals__header .oct-basket-totals__descriptionEnd"},"type":"cart"},"to":"cart"},{"from":{"type":"currency","patterns":{"defaultSymbol":"","currencyCodes":"GBP,EUR","symbolOnly":true,"defaultCode":"","currencySymbols":"%C2%A3,%E2%82%AC","lookupCurrency":false,"currencyCode":"#ciq-placeholder","currencySymbol":".oct-basket-footer .oct-basket-totals__row .oct-basket-totals__descriptionEnd","splitNumber":"","split":""}},"to":"cart"}],"when":[{"elementMatch":{"element":".oct-product-tile","waitUntilExist":true},"domChange":".oct-overlay"}]},{"captures":[{"from":{"type":"paymentMethod","patterns":{"paypalShortcut":".paypal-checkout-sandbox","creditCard":".oct-payment-options__card-button button"}},"to":"cart"}],"when":[{"eventMatch":{"event":"click","waitUntilExist":true,"target":".oct-payment-options__card-button button"},"pageMatch":"checkout/initialise"},{"elementMatch":{"waitUntilExist":true,"element":".paypal-checkout-sandbox"}}]}],"campaigns":[{"metadata":{"overlayTemplate":"https://storage.googleapis.com/cloudiq-boots-prod-cdn/assets/e8383c25-d780-4b40-8c26-aeb7edda14cc-kk6syrgs/overlay_template_crec.html","overlayStyle":"https://storage.googleapis.com/cloudiq-boots-prod-cdn/assets/e8383c25-d780-4b40-8c26-aeb7edda14cc-kk6syrgs/overlay_template_crec.css","paused":false,"campaignType":"crec","campaignId":"e8383c25-d780-4b40-8c26-aeb7edda14cc-kk6syrgs","campaignDate":"2021-02-22T16:08:20.000Z"},"baseRules":[],"quests":[{"rules":[{"operator":"not.equal","value":0,"path":"cart.itemCount"},{"operator":"not.empty","path":"user.email"}],"actions":[{"name":"transfer"}]}]},{"metadata":{"overlayStyle":"https://storage.googleapis.com/cloudiq-boots-prod-cdn/assets/1e4991b1-e7f9-4a10-8f09-45c85caf1ca8/overlay_template_excp.css","campaignId":"1e4991b1-e7f9-4a10-8f09-45c85caf1ca8","testMode":false,"overlayTemplate":"https://storage.googleapis.com/cloudiq-boots-prod-cdn/assets/1e4991b1-e7f9-4a10-8f09-45c85caf1ca8/overlay_template_excp.html","paused":true,"campaignDate":"2021-05-05T11:26:53.000Z","campaignType":"excp","cookieExpiryDays":365},"baseRules":[{"operator":"empty","path":"event.purchaseComplete"}],"quests":[{"rules":[{"path":"device.type","value":"mobile","operator":"equal"},{"value":"/online/pharmacy/,/online/pharmacy-services,/online/pdc,boots.ie/,/health-pharmacy,/baby-child,/electrical,/dyson,/chanel,/Dior,CheckoutLoginView,OrderShippingBillingView,NewCheckoutOrderConfirmationCRMView","path":"page.destinationURL","operator":"not.match"},{"operator":"equal","value":false,"path":"user.returningStatus"}],"actions":[{"name":"injectOverlay"},{"delay":10000,"name":"showOverlay"}]},{"rules":[{"operator":"equal","value":"desktop","path":"device.type"},{"value":"/online/pharmacy/,/online/pharmacy-services,/online/pdc,boots.ie/,/health-pharmacy,/baby-child,/electrical,/dyson,/chanel,/Dior,CheckoutLoginView,OrderShippingBillingView,NewCheckoutOrderConfirmationCRMView","path":"page.destinationURL","operator":"not.match"},{"operator":"equal","value":false,"path":"user.returningStatus"}],"actions":[{"name":"injectOverlay"}]},{"rules":[{"value":"desktop","path":"device.type","operator":"equal"},{"value":0,"path":"event.exitIntent","operator":"not.equal"},{"value":"/online/pharmacy/,/online/pharmacy-services,/online/pdc,boots.ie/,/health-pharmacy,/baby-child,/electrical,/dyson,/chanel,/Dior,CheckoutLoginView,OrderShippingBillingView,NewCheckoutOrderConfirmationCRMView","path":"page.destinationURL","operator":"not.match"},{"operator":"equal","value":false,"path":"user.returningStatus"}],"actions":[{"name":"showOverlay","delay":500}]}]}]}',p=!0,q="className",r="getElementsByTagName",s="src",t="async",u="https://cloudiq-boots-prod-cdn.cloudiq.com/tag-modules-obf/entry.js",v="document",y="text/javascript",z="script",A="appendChild",B="head",D="load",E=n,G=window[v][i](z),G[s]=u,G[q]=j,G[c]=y,G[t]=p,G[d](D,function(){var a,b,c;a="entry",b="ciq",c="init",window[b][a][c](E)}),window[v][r](B)[g][A](G)})();}