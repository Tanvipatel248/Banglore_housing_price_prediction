function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  function getBalconyValue() {
    var uibalconys = document.getElementsByName("uibalconys");
    for(var i in uibalconys) {
      if(uibalconys[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var balcony= getBalconyValue();
    var location = document.getElementById("uiLocations");
    var area_type= document.getElementById("uiareatype")
    
    var estPrice = document.getElementById("uiEstimatedPrice");
    console.log(parseFloat(sqft.value), bhk,bathrooms, balcony, location.value,area_type.value)
      
     var url = "http://127.0.0.1:5000/predict_home_price"; 
    //var url = "/api/predict_home_price"; 
  
    $.post(url, {
        sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        balcony: balcony,
        area_type: area_type.value,
       //area_type: 'area_type_Built-up  Area',
        location: location.value
        //location: 'location_1st Block Jayanagar'
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );
     var url = "http://127.0.0.1:5000/get_location_names"; 
    //var url = "/api/get_location_names"; 
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
    var url= "http://127.0.0.1:5000/get_area_type";
    $.get(url,function(data, status) {
        console.log("got response for area_type request");
        console.log(data)
        if(data) {
            var area_type = data.area_type;
            var uiareatype = document.getElementById("uiareatype");
            $('#uiareatype').empty();
            for(var i in area_type) {
                var opt1 = new Option(area_type[i]);
                $('#uiareatype').append(opt1);
            }
        }
    });
    
  }
  
  window.onload = onPageLoad;