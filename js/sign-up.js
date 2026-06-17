const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");

const headerHeight = header.offsetHeight;

menuBtn.addEventListener("click", function () {
  mobileMenu.classList.toggle("hidden");

  if (mobileMenu.classList.contains("hidden")) {
    menuIcon.src = "./assets/icons/List.svg";
  } else {
    menuIcon.src = "./assets/icons/close.svg";
  }
});
