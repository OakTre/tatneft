export default () => {
  const btns = Array.from(document.querySelectorAll("[data-modal-heading]"));
  const modalLegend = document.querySelector(".js-modal-legend");

  if (btns.length === 0) return;

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      let dataLegend = btn.getAttribute("data-modal-legend");

      modalLegend.querySelector(".modal__legend").innerHTML = dataLegend;
    });
  });
};
