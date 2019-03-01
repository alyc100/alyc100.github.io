_satellite.pushBlockingScript(function(event, target, $variables){
  Cog.addListener("elements.stateProvider", "stateChanged", function(e) {
    var pageData = e.eventData.state.pageData;
    window.lpTag = window.lpTag || [];
    window.lpTag.sdes = window.lpTag.sdes || [];
    window.lpTag.sdes.push({
        "type": "ctmrinfo",
        "info": {
            "cstatus": "",
            "ctype": "",
            "customerId": "",
            "balance": pageData.Vehicle_Value,
        }
    });
    window.lpTag.sdes.push({
        "type": "personal",
        "personal": {
            "firstname": pageData.forename,
            "lastname": pageData.surname,
            "age": {
                "year": pageData.birthDateYear,
                "month": pageData.birthDateMonth,
                "day": pageData.birthDateDay
            },
            "contacts": [{
                "email": pageData.email,
                "phone": ""
            }],
            "gender": pageData.gender,
            "company": ""
        }
    });
  
 	 var products = buildProducts(pageData);
  
    window.lpTag.sdes.push({
        "type": "cart",
        "total": pageData.annualPremium,
        "products": products, 
        "numItems": products.length
    });
});

function buildProducts(pageData) {
  var products= [];

  if(window.location.href.includes('premium')) {

    sessionStorage.removeItem('MLPcost');
    sessionStorage.removeItem('CarHirecost');
    
    sessionStorage.removeItem('RESGFcost');
    sessionStorage.removeItem('RESPGFcost');
    sessionStorage.removeItem('RECPGFcost');
    sessionStorage.removeItem('EURPGFcost');

    sessionStorage.setItem('MLPcost', $("[data-title='Motor Legal Protection']").attr("data-annual-price"));
    sessionStorage.setItem('CarHirecost', $("[data-title='Guaranteed Hire Car Plus']").attr("data-annual-price"));
    
  };

  products.push({"product": {
    "name": "motor",
    "category": "standard",
    "sku": pageData.quoteRef,
    "price": pageData.annualPremium
  },
  "quantity": 1
});

    if(pageData.Options_MLP == "MLP") {

    products.push({"product": {
      "name": "Motor Legal Protection",
      "category": "standard",
      "sku": pageData.quoteRef,
      "price": Number(sessionStorage.getItem('MLPcost'))
    },
   	"quantity": 1
  })
  };

    if(pageData.Options_Carhire == "GHP") {

    products.push({"product" : {
      "name": "Guaranteed Hire Car Plus",
      "category": "standard",
      "sku": pageData.quoteRef,
      "price": Number(sessionStorage.getItem('CarHirecost'))
    },
   	"quantity": 1
  })
  };


    if(pageData.greenFlagCoverLevel == "RES") {

      if(window.location.href.includes('premium')) {
          sessionStorage.setItem('RESGFcost', $('.breakdown-cover-column .price-value')[2].innerHTML.slice(1));
      }
      
    products.push({"product": {
      "name": "Breakdown Cover",
      "category": "Rescue Service",
      "sku": pageData.quoteRef,
      "price": Number(sessionStorage.getItem('RESGFcost'))
    },
   	"quantity": 1
  })
  };

    if(pageData.greenFlagCoverLevel == "RESP") {

       if(window.location.href.includes('premium')) {
        sessionStorage.setItem('RESPGFcost', $('.breakdown-cover-column .price-value')[1].innerHTML.slice(1));
       }
      
      products.push({"product": {
        "name": "Breakdown Cover",
        "category": "Rescue Plus Service",
        "sku": pageData.quoteRef,
        "price": Number(sessionStorage.getItem('RESPGFcost'))
    },
   	"quantity": 1
    })
    };

    if(pageData.greenFlagCoverLevel == "RECP") {

       if(window.location.href.includes('premium')) {  
         sessionStorage.setItem('RECPGFcost', $('.breakdown-cover-column .price-value')[0].innerHTML.slice(1));
       }
      
      products.push({"product": {
        "name": "Breakdown Cover",
        "category": "Recovery Plus Service",
        "sku": pageData.quoteRef,
        "price": Number(sessionStorage.getItem('RECPGFcost'))
    },
   	"quantity": 1
    })
    };
  
    if(pageData.greenFlagCoverLevel == "EURP") {

      if(window.location.href.includes('premium')) {
          sessionStorage.setItem('EURPGFcost', $('.breakdown-cover-column .price-value')[3].innerHTML.slice(1));
      }
      
    products.push({"product": {
      "name": "Breakdown Cover",
      "category": "Euro Plus Service",
      "sku": pageData.quoteRef,
      "price": Number(sessionStorage.getItem('EURPGFcost'))
 	 },
 	"quantity": 1
   })
   };

  return products;
};
});
