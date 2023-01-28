export default () => {
  const hoverItems = Array.from(document.querySelectorAll(".js-hover-menu"));
  const hoverImgs = Array.from(document.querySelectorAll(".js-hover-imgs"));

  const hoverItems2 = Array.from(document.querySelectorAll(".js-hover-menu2"));
  const hoverImgs2 = Array.from(document.querySelectorAll(".js-hover-imgs2"));

  if (hoverItems.length === 0) return;

  hoverItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      hoverImgs.forEach(img => img.classList.remove("is-hovered"));
      hoverImgs[index].classList.add("is-hovered");
    });
  });

  hoverItems.forEach((item, index) => {
    item.addEventListener("mouseleave", () => {
      hoverImgs.forEach(img => img.classList.remove("is-hovered"));
    });
  });


  hoverItems2.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      hoverImgs.forEach(img => img.classList.remove("is-hovered"));
      hoverImgs2.forEach(img => img.classList.remove("is-hovered"));
      hoverImgs2[index].classList.add("is-hovered");
    });
  });

  hoverItems2.forEach((item, index) => {
    item.addEventListener("mouseleave", () => {
      hoverImgs.forEach(img => img.classList.remove("is-hovered"));
      hoverImgs2.forEach(img => img.classList.remove("is-hovered"));
    });
  });
};
