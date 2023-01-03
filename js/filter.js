function showRainfall() {
  const rainfall = document.getElementById("rainfall");
  rainfall.addEventListener("click", () => {
    const cities = [
      { name: "臺北市", nowRainfall: 0 },
      { name: "新北市", nowRainfall: 0 },
      { name: "基隆市", nowRainfall: 0 },
      { name: "宜蘭縣", nowRainfall: 0 },
      { name: "花蓮縣", nowRainfall: 0 },
      { name: "臺東縣", nowRainfall: 0 },
      { name: "桃園市", nowRainfall: 0 },
      { name: "新竹縣", nowRainfall: 0 },
      { name: "苗栗縣", nowRainfall: 0 },
      { name: "臺中市", nowRainfall: 0 },
      { name: "彰化縣", nowRainfall: 0 },
      { name: "南投縣", nowRainfall: 0 },
      { name: "雲林縣", nowRainfall: 0 },
      { name: "嘉義縣", nowRainfall: 0 },
      { name: "臺南市", nowRainfall: 0 },
      { name: "高雄市", nowRainfall: 0 },
      { name: "屏東縣", nowRainfall: 0 },
    ];

    fetch(
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=CWB-07C5036C-DAAF-4D6A-BE2D-970D80FEF2B4&format=JSON"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const location = data.records.location;
        for (let i = 0; i < location.length; i++) {
          let city = location[i].parameter[0].parameterValue;
          let nowRainfall = location[i].weatherElement[6].elementValue;

          for (let j = 0; j < cities.length; j++) {
            if (cities[j].name == city) {
              cities[j].nowRainfall += parseFloat(nowRainfall);
            }
          }
        }

        const rainfallLevel = [
          10, 20, 60, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
          1200, 1500,
        ];
        const color = [
          "#DDDDDD",
          "#9CFEFF",
          "#8DE0FF",
          "#81CDFF",
          "#70B5FF",
          "#5F9AFE",
          "#0166FF",
          "#FFFF00",
          "#FEE600",
          "#FFCD00",
          "#FFB200",
          "#FE9900",
          "#E07C0D",
          "#C15D12",
          "#A34114",
          "#993400",
          "#662100",
        ];
        preventOverlap();
        createBars("pics/雨量色階圖.png", "雨量");
        findRainfallLevel(cities, rainfallLevel, color);
      });
  });
}

function showTEMP() {
  const temp = document.getElementById("temp");
  temp.addEventListener("click", () => {
    const cities = [
      { name: "臺北市", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "新北市", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "基隆市", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "宜蘭縣", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "花蓮縣", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "臺東縣", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "桃園市", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "新竹縣", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "苗栗縣", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "臺中市", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "彰化縣", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "南投縣", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "雲林縣", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "嘉義縣", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "臺南市", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "高雄市", totalTemp: 0, averageTemp: 0, locationCount: 0 },
      { name: "屏東縣", totalTemp: 0, averageTemp: 0, locationCount: 0 },
    ];

    fetch(
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWB-07C5036C-DAAF-4D6A-BE2D-970D80FEF2B4&format=JSON&elementName=TEMP"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const location = data.records.location;
        for (let i = 0; i < location.length; i++) {
          let city = location[i].parameter[0].parameterValue;
          let TEMP = location[i].weatherElement[0].elementValue;

          for (let j = 0; j < cities.length; j++) {
            if (cities[j].name == city && TEMP > 0) {
              cities[j].totalTemp += parseFloat(TEMP);
              cities[j].locationCount++;
              cities[j].averageTemp =
                cities[j].totalTemp / cities[j].locationCount;
            }
          }
        }

        const tempLevel = [5, 9, 11, 13, 15, 17, 19, 23, 27, 31, 35, 38];
        const color = [
          "#5CA9BD",
          "#87CBD8",
          "#B4E9F7",
          "#0D924B",
          "#42A85C",
          "#61B96A",
          "#87C874",
          "#CBE68F",
          "#F1F5C2",
          "#EB9D39",
          "#EB185A",
          "#7F259E",
        ];
        preventOverlap();
        createBars("pics/溫度色階圖.png", "溫度");
        findTempLevel(cities, tempLevel, color);
      });
  });
}

function findRainfallLevel(cities, rainfallLevel, color) {
  for (let i = 0; i < cities.length; i++) {
    let cityPattern = document.getElementById(`${cities[i].name}`);

    if (cities[i].nowRainfall < rainfallLevel[0]) {
      cityPattern.style.fill = color[0];
    } else if (
      cities[i].nowRainfall > rainfallLevel[rainfallLevel.length - 1]
    ) {
      cityPattern.style.fill = color[16];
    } else {
      for (let j = 0; j < rainfallLevel.length - 1; j++) {
        if (
          cities[i].nowRainfall > rainfallLevel[j] &&
          cities[i].nowRainfall <= rainfallLevel[j + 1]
        ) {
          cityPattern.style.fill = color[j];
        }
      }
    }
  }
}

function findTempLevel(cities, tempLevel, color) {
  for (let i = 0; i < cities.length; i++) {
    let cityPattern = document.getElementById(`${cities[i].name}`);

    if (cities[i].averageTemp < tempLevel[0]) {
      cityPattern.style.fill = color[0];
    } else if (cities[i].averageTemp > tempLevel[tempLevel.length - 1]) {
      cityPattern.style.fill = color[16];
    } else {
      for (let j = 0; j < tempLevel.length - 1; j++) {
        if (
          cities[i].averageTemp > tempLevel[j] &&
          cities[i].averageTemp <= tempLevel[j + 1]
        ) {
          cityPattern.style.fill = color[j];
        }
      }
    }
  }
}

function createBars(url, id) {
  const svg = document.getElementById("map");

  const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
  img.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", url);
  img.setAttribute("width", "500");
  img.setAttribute("height", "500");
  img.setAttribute("x", "450");
  img.setAttribute("y", "0");
  img.id = id;
  svg.appendChild(img);
}

function preventOverlap() {
  const rain = document.getElementById("雨量");
  const temp = document.getElementById("溫度");
  if (rain === null && temp === null) {
    return;
  } else if (rain !== null) {
    rain.remove();
  } else {
    temp.remove();
  }
}

showRainfall();
showTEMP();
