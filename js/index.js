//地圖區塊顏色
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

//選單
document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }
  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});
