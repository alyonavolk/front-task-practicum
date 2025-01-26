document.addEventListener("DOMContentLoaded", () => {
  const pageLayout = document.querySelector(".pageLayout");
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("open");
    pageLayout.classList.toggle("isOpenMenu");
  });
});