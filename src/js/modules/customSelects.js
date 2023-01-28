export default () => {
  const selects = Array.from(document.querySelectorAll(".js-custom-select"));
  const tooltips = Array.from(document.querySelectorAll(".js-tooltip"));
  let openFlag = false;

  const closeChoicesList = () => {
    selects.forEach(slct => {
      const selectHeading = slct.querySelector(".js-custom-select-name");
      const selectList = slct.querySelector(".js-custom-select-body");

      selectList.classList.remove("is-open");
      selectHeading.classList.remove("is-open");
      openFlag = false;
    });
  };

  if (!selects.length === 0) return;

  selects.forEach(slct => {
    const selectHeading = slct.querySelector(".js-custom-select-name");
    const selectList = slct.querySelector(".js-custom-select-body");
    const selectChoices = Array.from(slct.querySelectorAll(".js-custom-select-choise"));

    selectHeading.addEventListener('click', (e) => {
      // if (e.target.closest('.js-custom-select') && openFlag === true) {
      //   closeChoicesList();
      // } else {
      // }
      closeChoicesList();

      selectHeading.classList.toggle("is-open");
      selectList.classList.toggle("is-open");

    });

    selectChoices.forEach(choice => {
      choice.addEventListener("click", () => {
        const text = choice.querySelector(".custom-select__choose-label").innerHTML;
        const num = Number(choice.dataset.index);

        selectHeading.querySelector(".custom-select__heading").innerHTML = text;
        selectChoices.forEach(item => item.classList.remove("is-active"));
        choice.classList.add("is-active");
        selectHeading.classList.add("is-choosen");
        // tooltips.forEach(tooltip => { tooltip.classList.remove("is-choosen") });
        // tooltips.forEach(tooltip => {
        //   if (Number(tooltip.dataset.tooltipIndex) === num) {
        //     tooltip.classList.add("is-choosen");
        //   }
        // });
        closeChoicesList();
      });
    });
  });


  document.addEventListener('click', (e) => {
    if (!e.target.closest('.js-custom-select')) {
      closeChoicesList();
    }
  });
};
