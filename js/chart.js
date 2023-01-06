const mainLeftBottom = document.querySelector(".main-left-bottom");

document.querySelectorAll('a').forEach((elem) => {
    elem.addEventListener('click', () => {
        const theID = elem.getAttribute('id');    
        deleteChart();
        getChart(theID);
    });
});

document.querySelector('#city').addEventListener('change', (elem) =>{
    const value = elem.target.value
    deleteChart();
    getChart(value);
})

function deleteChart(){
    const canvasTag = document.querySelectorAll('canvas');
    canvasTag.forEach((elem) => {
        const img = document.querySelector(".img");
        const tips = document.querySelector(".tips");
        mainLeftBottom.removeChild(elem);
        mainLeftBottom.removeChild(img);
        mainLeftBottom.removeChild(tips);
    })
}

function getChart(elem){
    const CWB_API_KEY = "CWB-D829E2E0-121F-4FCE-8821-AB3ADF5357E7";
    fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization="+ CWB_API_KEY + "&locationName=" + elem + "&elementName=MinT,MaxT").then((response)=>{
        return response.json();
    }).then((data)=>{
        // 整理數值
        let location = data.records.locations[0].location[0];
        let Name = location.locationName;
        let MinT = [], MaxT = [], Day = [];
        let num = 10;
        for (let i = 0; i < num; i += 1){
            let min = location.weatherElement[0].time[i].elementValue[0].value;
            MinT.push(min);
            let max = location.weatherElement[1].time[i].elementValue[0].value;
            MaxT.push(max);
            let date = location.weatherElement[1].time[i].startTime;
            if (date.split(" ")[1] === "06:00:00" || date.split(" ")[1] === "12:00:00"){
                let newDay = date.split(" ")[0].split("-");
                Day.push(newDay[1] + "/" + newDay[2] + "早");
            }else{
                let newDay = date.split(" ")[0].split("-");
                Day.push(newDay[1] + "/" + newDay[2] + "晚");
            }
        }
        // 畫折線圖
        let canvas = document.createElement("canvas")
        mainLeftBottom.appendChild(canvas)
        canvas.id = `myChart-${Name}`
        const ctx = document.getElementById(`myChart-${Name}`);

        new Chart(ctx, {
        type: 'line',	
        data: {
            labels: Day,
            datasets: [{
                label: '最高溫',
                data: MaxT,
                fill: false,
                borderColor: '#ffd15b',
                backgroundColor : '#ffd15b',
                tension: 0.4,
            }, {
                label: '最低溫',
                data: MinT,
                fill: false,
                borderColor: '#60a5fa',
                backgroundColor: '#60a5fa',
                tension: 0.4,
            }]
        },
        options: {
            transitions: {
                show: {
                    animations: {
                        x: {
                            from: 0
                        },
                        y: {
                            from: 0
                        }
                    }
                },
                hide: {
                    animations: {
                        x: {
                            to: 0
                        },
                        y: {
                            to: 0
                        }
                    }
                }
            },
            layout: {
                padding:{
                    bottom: 40,
                    left: 20
                }
            },
            maintainAspectRatio: false
        }
        });

        // 顯示 tips
        let imgDiv = document.createElement("div");
        mainLeftBottom.appendChild(imgDiv);
        imgDiv.className = "img";
        let tipsDiv = document.createElement("div");
        mainLeftBottom.appendChild(tipsDiv);
        tipsDiv.className = "tips";
        tipsDiv.innerText = "click the label to show specific chart.";
        const tips = document.querySelector(".tips");
        document.querySelector(".img").addEventListener("mouseover", () => {
            tips.style.display = "block";
        })
        document.querySelector(".img").addEventListener("mouseout", () => {
            tips.style.display = "none";
        })
    });
}



