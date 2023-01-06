let mainLeftToday = document.querySelector(".main-left-today")
let mainLeftTomorrow = document.querySelector(".main-left-tomorrow")
let w2 = document.querySelector(".w2")
let w3 = document.querySelector(".w3")
let climateToday = document.createElement("div");
let climateW2 = document.createElement("div");
let climateW3 = document.createElement("div");

window.onload=function(){
    let elements = "臺北市";
    getClimate(elements);
    getChart(elements);
}

document.querySelectorAll('a').forEach((elements) => {
    elements.addEventListener('click', () => {
        const theID = elements.getAttribute('id');
        deleteClimate();
        getClimate(theID);
    });
});

document.querySelector('#city').addEventListener('change', (elements) => {
    const value = elements.target.value
    deleteClimate();
    getClimate(value);
})

function deleteClimate() {
    climateToday.innerText = ""
    mainLeftToday.appendChild(climateToday);
    climateW2.innerText = ""
    w2.appendChild(climateW2);
    climateW3.innerText = ""
    w3.appendChild(climateW3);
}


function getClimate(elements) {
    let auth_key = "CWB-A8536306-4918-4223-97DB-2E09F3B3CDF8"
    fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=" + auth_key + "&locationName=" + elements
    ).then(function (response) {
        return response.json();
    }).then(function (data) {
        const locationData = data.records.location[0];
    
        let sttoday = data.records.location[0].weatherElement[0].time[0].startTime.substring(11, 16);
        let ettoday = data.records.location[0].weatherElement[0].time[0].endTime.substring(11, 16);
        let sttm = data.records.location[0].weatherElement[0].time[1].startTime.substring(11, 16);
        let ettm = data.records.location[0].weatherElement[0].time[1].endTime.substring(11, 16);
        let sttn = data.records.location[0].weatherElement[0].time[2].startTime.substring(11, 16);
        let ettn = data.records.location[0].weatherElement[0].time[2].endTime.substring(11, 16);
        let cvaluetd = data.records.location[0].weatherElement[0].time[0].parameter.parameterValue;
        let cvaluetm = data.records.location[0].weatherElement[0].time[1].parameter.parameterValue;
        let cvaluetn = data.records.location[0].weatherElement[0].time[2].parameter.parameterValue;

        // 現在
        const weatherElements = locationData.weatherElement.reduce(
            (neededElements, item) => {
                if (['Wx', 'PoP', 'CI', 'MinT', 'MaxT'].includes(item.elementName)) {
                    neededElements[item.elementName] = item.time[0].parameter;
                }
                return neededElements;
            },
            {}
        );

        climateToday.innerHTML = `
        <div class="w1">
            <div class="locationName">${locationData.locationName}</div>
            <div><span class="timeTitle"></span><br><span class="time">${sttoday}-${ettoday}</span></div>
        </div>
        <div><img src="" alt="" class="weatherImg"></div>
        <div class="w0">
        <label class="CI">${weatherElements.CI.parameterName}</label><br>
        <label class="climate"><span class="w1MinT">${weatherElements.MinT.parameterName}</span>°-<span class="w1MaxT">${weatherElements.MaxT.parameterName}</span>°</label>
        <label class="rainy"><img src="https://cdn-icons-png.flaticon.com/512/3418/3418570.png" alt=""
            class="rainpic"><span class="w1PoP">${weatherElements.PoP.parameterName}</span>%</label>
            </div>`
        
            mainLeftToday.appendChild(climateToday);

        // 明早
        const tomorrow_morning = locationData.weatherElement.reduce(
            (neededElements, item) => {
                if (['Wx', 'PoP', 'CI', 'MinT', 'MaxT'].includes(item.elementName)) {
                    neededElements[item.elementName] = item.time[1].parameter;
                }
                return neededElements;
            },
            {}
        );

        climateW2.innerHTML = `<div class="w22">
        <div>
            <div><label class="w2timeTitle"></label><br><label class="w2time">${sttm}-${ettm}</label></div>
            <div class="w2climate">最高氣溫&thinsp;<span class="MaxT">${tomorrow_morning.MaxT.parameterName}</span>°<br>最低氣溫&thinsp;<span
                    class="MinT">${tomorrow_morning.MinT.parameterName}</span>°</div>
            <div class="w2rainy">降雨機率&thinsp;<span class="PoP">${tomorrow_morning.PoP.parameterName}%</span></div>
        </div>
        <div><img src="" alt="" class="w2weatherImg">
        </div>
    </div>`
        w2.appendChild(climateW2);

        // 明晚
        const tomorrow_night = locationData.weatherElement.reduce(
            (neededElements, item) => {
                if (['Wx', 'PoP', 'CI', 'MinT', 'MaxT'].includes(item.elementName)) {
                    neededElements[item.elementName] = item.time[2].parameter;
                }
                return neededElements;
            },
            {}
        );

        climateW3.innerHTML = `<div class="w33">
        <div>
            <div><span class="w3timeTitle"></span><br><span class="w3time">${sttn}-${ettn}</span></div>
            <div class="w3climate">最高氣溫&thinsp;<span class="MaxT">${tomorrow_night.MaxT.parameterName}</span>°<br>最低氣溫&thinsp;<span
                    class="MinT">${tomorrow_night.MinT.parameterName}</span>°</div>
            <div class="w3rainy">降雨機率&thinsp;<span class="PoP">${tomorrow_night.PoP.parameterName}%</span></div>
        </div>
        <div><img src="" alt="" class="w3weatherImg">
        </div>
    </div>`
        w3.appendChild(climateW3);

        let timeTitle = document.querySelector(".timeTitle");
        let w2timeTitle = document.querySelector(".w2timeTitle");
        let w3timeTitle = document.querySelector(".w3timeTitle");
        let weatherImg = document.querySelector(".weatherImg");
        let w2weatherImg = document.querySelector(".w2weatherImg");
        let w3weatherImg = document.querySelector(".w3weatherImg");


        if (sttoday == "12:00" || sttoday == "06:00") {
            timeTitle.innerText = "今日白天";
        } else if (sttoday == "18:00" || sttoday == "00:00") {
            timeTitle.innerText = "今晚明晨";
        }

        if (sttm == "18:00") {
            w2timeTitle.innerText = "今晚明晨";
        } else if (sttm == "06:00") {
            w2timeTitle.innerText = "明日白天";
        }

        if (sttn == "06:00") {
            w3timeTitle.innerText = "明日白天";
        } else if (sttn == "18:00") {
            w3timeTitle.innerText = "明日晚上";
        }

        // today

        // 1 大太陽
        if (cvaluetd == 1) {
            if (sttoday == "12:00" || sttoday == "06:00") {
                weatherImg.src = "https://cdn-icons-png.flaticon.com/512/869/869767.png";
            } else if (sttoday == "18:00" || sttoday == "00:00") {
                weatherImg.src = "https://cdn-icons-png.flaticon.com/512/4139/4139162.png";
            }
        }
        // 23 晴天多雲
        if (cvaluetd == 2 || cvaluetd == 3) {
            if (sttoday == "12:00" || sttoday == "06:00") {
                weatherImg.src = "https://cdn-icons-png.flaticon.com/512/1146/1146808.png";
            } else if (sttoday == "18:00" || sttoday == "00:00") {
                weatherImg.src = "https://cdn-icons-png.flaticon.com/512/7105/7105025.png";
            }
        }
        // 4567 陰天
        if (cvaluetd == 4 || cvaluetd == 5 || cvaluetd == 6 || cvaluetd == 7) {
            weatherImg.src = "https://cdn-icons-png.flaticon.com/512/2402/2402808.png";
        }
        // 8-14 19-20 29-32 37-39 雨天
        if (cvaluetd == 8 || cvaluetd == 9 || cvaluetd == 10 || cvaluetd == 11 || cvaluetd == 12 || cvaluetd == 13 || cvaluetd == 14 || cvaluetd == 19 || cvaluetd == 20) {
            if (sttoday == "12:00" || sttoday == "06:00") {
                weatherImg.src = "https://cdn-icons-png.flaticon.com/512/5903/5903530.png";
            } else if (sttoday == "18:00" || sttoday == "00:00") {
                weatherImg.src = "https://cdn-icons-png.flaticon.com/512/5903/5903651.png";
            }
        }
        // 15-18 21-22 33-36 41 雨天打雷
        if (cvaluetd == 15 || cvaluetd == 16 || cvaluetd == 17 || cvaluetd == 18 || cvaluetd == 21 || cvaluetd == 22) {
            weatherImg.src = "https://cdn-icons-png.flaticon.com/512/1146/1146799.png";
        }

        // tomorrow moring

        // 1 大太陽
        if (cvaluetm == 1) {
            if (sttm == "18:00") {
                w2weatherImg.src = "https://cdn-icons-png.flaticon.com/512/4139/4139162.png";
            } else if (sttm == "06:00") {
                w2weatherImg.src = "https://cdn-icons-png.flaticon.com/512/869/869767.png";
            }
        }
        // 23 晴天多雲
        if (cvaluetm == 2 || cvaluetm == 3) {
            if (sttm == "18:00") {
                w2weatherImg.src = "https://cdn-icons-png.flaticon.com/512/7105/7105025.png";
            } else if (sttm == "06:00") {
                w2weatherImg.src = "https://cdn-icons-png.flaticon.com/512/1146/1146808.png";
            }
        }
        // 4567 陰天
        if (cvaluetm == 4 || cvaluetm == 5 || cvaluetm == 6 || cvaluetm == 7) {
            w2weatherImg.src = "https://cdn-icons-png.flaticon.com/512/2402/2402808.png";
        }
        // 8-14 19-20 29-32 37-39 雨天
        if (cvaluetm == 8 || cvaluetm == 9 || cvaluetm == 10 || cvaluetm == 11 || cvaluetm == 12 || cvaluetm == 13 || cvaluetm == 14 || cvaluetm == 19 || cvaluetm == 20) {
            if (sttm == "18:00") {
                w2weatherImg.src = "https://cdn-icons-png.flaticon.com/512/5903/5903651.png";
            } else if (sttm == "06:00") {
                w2weatherImg.src = "https://cdn-icons-png.flaticon.com/512/5903/5903530.png";
            }
        }
        // 15-18 21-22 33-36 41 雨天打雷
        if (cvaluetm == 15 || cvaluetm == 16 || cvaluetm == 17 || cvaluetm == 18 || cvaluetm == 21 || cvaluetm == 22) {
            w2weatherImg.src = "https://cdn-icons-png.flaticon.com/512/1146/1146799.png";
        }

        // tomorrow night

        // 1 大太陽
        if (cvaluetn == 1) {
            if (sttn == "06:00") {
                w3weatherImg.src = "https://cdn-icons-png.flaticon.com/512/869/869767.png";
            } else if (sttn == "18:00") {
                w3weatherImg.src = "https://cdn-icons-png.flaticon.com/512/4139/4139162.png";
            }
        }
        // 23 晴天多雲
        if (cvaluetn == 2 || cvaluetn == 3) {
            if (sttn == "06:00") {
                w3weatherImg.src = "https://cdn-icons-png.flaticon.com/512/1146/1146808.png";
            } else if (sttn == "18:00") {
                w3weatherImg.src = "https://cdn-icons-png.flaticon.com/512/7105/7105025.png";
            }
        }
        // 4567 陰天
        if (cvaluetn == 4 || cvaluetn == 5 || cvaluetn == 6 || cvaluetn == 7) {
            w3weatherImg.src = "https://cdn-icons-png.flaticon.com/512/2402/2402808.png";
        }
        // 8-14 19-20 29-32 37-39 雨天
        if (cvaluetn == 8 || cvaluetn == 9 || cvaluetn == 10 || cvaluetn == 11 || cvaluetn == 12 || cvaluetn == 13 || cvaluetn == 14 || cvaluetn == 19 || cvaluetn == 20) {
            if (sttn == "06:00") {
                w3weatherImg.src = "https://cdn-icons-png.flaticon.com/512/5903/5903530.png";
            } else if (sttn == "18:00") {
                w3weatherImg.src = "https://cdn-icons-png.flaticon.com/512/5903/5903651.png";
            }
        }
        // 15-18 21-22 33-36 41 雨天打雷
        if (cvaluetn == 15 || cvaluetn == 16 || cvaluetn == 17 || cvaluetn == 18 || cvaluetn == 21 || cvaluetn == 22) {
            w3weatherImg.src = "https://cdn-icons-png.flaticon.com/512/1146/1146799.png";
        }

    });

}
