function showRainfall() {
  const cities = [
    臺北市,
    新北市,
    基隆市,
    宜蘭縣,
    花蓮縣,
    台東縣,
    桃園市,
    新竹縣,
    苗栗縣,
    台中市,
    彰化縣,
    南投縣,
    雲林縣,
    嘉義縣,
    台南市,
    高雄市,
    屏東縣,
  ];

  const rainfall = document.getElementById("rainfall");
  rainfall.addEventListener("click", () => {
    console.log("有點到");

    for (let i = 0; i < cities.length; i++) {
      fetch(
        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=CWB-07C5036C-DAAF-4D6A-BE2D-970D80FEF2B4&format=JSON"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
    }
  });
}
