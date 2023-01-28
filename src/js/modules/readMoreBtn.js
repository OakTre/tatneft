export default () => {
  const btns = document.querySelectorAll(".js-page-read-more");
  let flag = false;
  const mobile = window.matchMedia('(max-width: 767px)');

  if (btns.length === 0) return;
  const wrapper = document.querySelector(".page-read-more-inner");

  if (mobile.matches) {
    const wrapperheight = wrapper.offsetHeight;
    console.log(wrapperheight);

    if (wrapperheight <= 80) {
      wrapper.closest(".page-read-more-container").classList.add("is-normal")
    }

  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.page-read-more-container');

      switch (flag) {
        case false:
          btn.classList.add("is-active");
          parent.classList.add("is-active");

          btn.innerHTML = "Скрыть";

          flag = true;
          break;
        case true:
          btn.classList.remove("is-active");
          parent.classList.remove("is-active");

          btn.innerHTML = "Читать полностью";

          flag = false;
          break;
      }
    });
  });
};
