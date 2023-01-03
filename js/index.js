//地圖
document.querySelector("a").addEventListener("hover", function () {
  var theID = document.querySelector(this).attr("id");
  document.querySelector("select").val(theID);
  document.querySelector("a").classList.remove("active");
  document.querySelector(this).classList.add("active");
});

document.querySelector("#city").addEventListener("change", function (event) {
  var valID = event.target.value;
  aElements = document.querySelectorAll("a");
  for (var i = 0; i < aElements.length; i++) {
    aElements[i].classList.remove("active");
  }
  document.querySelector("#" + valID).classList.add("active");
});
