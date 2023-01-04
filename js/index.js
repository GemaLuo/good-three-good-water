const aElements = document.querySelectorAll("a");

document.querySelectorAll("a").forEach(function (aElements) {
  aElements.addEventListener("click", function () {
    const theID = aElements.getAttribute("id");
    document.querySelectorAll("a").forEach(function (element) {
      element.classList.remove("active");
    });
    document.querySelector("#" + theID).classList.add("active");
  });
});

document.querySelector("#city").addEventListener("change", function (event) {
  const valID = event.target.value;
  for (let i = 0; i < aElements.length; i++) {
    aElements[i].classList.remove("active");
  }
  document.querySelector("#" + valID).classList.add("active");
});
