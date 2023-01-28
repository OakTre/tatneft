export default () => {
  const btns = document.querySelectorAll(".js-tabs-nav");

  if (btns.length === 0) return;

  btns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const attr = btn.dataset.tabParent;
      const parent = btn.closest(".js-tab-parent");

      parent.querySelectorAll(".js-tabs-nav").forEach(btn => btn.classList.remove("is-active"));

      btn.classList.add("is-active");

      parent.querySelectorAll(".js-tabs-content").forEach(content => content.classList.remove("is-active"));
      parent.querySelector(`.js-tabs-content[data-tab-child=${attr}]`).classList.add("is-active");

      if (window.tatneft_api.locoScroll) {
        window.tatneft_api.locoScroll.update();
      }
    });
  })
}
