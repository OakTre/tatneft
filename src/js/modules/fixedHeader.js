export default () => {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    let scrollDistance = window.scrollY;

    if (scrollDistance >= 2) {
      header.classList.add("is-fixed");
    } else {
      header.classList.remove("is-fixed");
    }
  });
};
