document.querySelectorAll("a").forEach(function (aElements) {
  aElements.addEventListener("click", function (evt) {
    const theID = aElements.getAttribute("id");
    // 取得 theId 元素的座標
    var element = document.getElementById(theID);
    var rect = element.getClientRects()[0];
    var x = evt.offsetX - 100
    var y = evt.offsetY - rect.width
    if (y < 0){
      y = 0
    }
    if(x < 50){
      x = 50
    }
    console.log(evt)
    // console.log(rect)
    console.log("x: ", x , "y: ", y)
    //更新可愛座標圖示的位置，平移到點擊地點  
    document.getElementById("position").setAttribute("transform", "translate(" + x  + " " + y + ")")
    const card = document.querySelector(".card")
    card.textContent = theID  
    let location = theID 
    climate(location);
  });
});

window.addEventListener("load", ()=>{
  let location = "臺北市"
  climate(location);
  let x = 326
  let y = 47
  document.getElementById("position").setAttribute("transform", "translate(" + x  + " " + y + ")")
  const card = document.querySelector(".card")
  card.textContent = location
});


function climate(location){
  myAuthKey = "CWB-822A6C3E-CBEC-40EE-A718-985DB6C1C34D"
  fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=" + myAuthKey + "&locationName=" + location)
  .then(function(response){
    return response.json();
  })
  .then(function(data){    
    let theWeatherTxt = data.records.location[0].weatherElement[3].time[0].parameter.parameterName
    const theWeather = document.querySelector(".the-weather")
    theWeather.textContent = theWeatherTxt    
    // 依降雨量換圖片 > 30% 就下雨   
    let rainTxt = data.records.location[0].weatherElement[1].time[0].parameter.parameterName
    const img = document.querySelector("image")
    // rain
    if (rainTxt >= "30"){      
      img.setAttribute('xlink:href', 'pics/rain.png');
    }    
    else{
        // sun
      let maxT = data.records.location[0].weatherElement[4].time[0].parameter.parameterName
      if (maxT >= "23"){
        img.setAttribute('xlink:href', 'pics/sun-01.png');
      }
      // cloud
      else if( "20" <  maxT && maxT < "23"){
        img.setAttribute('xlink:href', 'pics/cloud.png');
      }    
      // dark cloud
      else{
        img.setAttribute('xlink:href', 'pics/dark-cloud.png');
      }
    };   
    
  });
};