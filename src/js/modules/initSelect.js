import Choices from 'choices.js';

export default function initSelects() {
  const customSelects = Array.from(document.querySelectorAll('.js-empty-select'));
  const customSelectsType1 = Array.from(document.querySelectorAll('.js-custom-select-type1'));

  if (customSelects.length === 0 && customSelectsType1.length === 0) return;

  customSelects.forEach((select) => {
    let slct = new Choices(select, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
      allowHTML: true,
    });

    slct.passedElement.element.addEventListener(
      'choice',
      function (event) {
        if (!event.detail.choice.placeholder) {
          event.target.closest(".page-custom-select").classList.add("is-active");
        } else {
          event.target.closest(".page-custom-select").classList.remove("is-active");
        }
      },
      false,
    );


    slct.passedElement.element.addEventListener(
      'showDropdown',
      function (event) {
        if (window.tatneft_api.locoScroll) {
          window.tatneft_api.locoScroll.stop();
        }
      },
      false,
    );

    slct.passedElement.element.addEventListener(
      'hideDropdown',
      function (event) {
        if (window.tatneft_api.locoScroll) {
          window.tatneft_api.locoScroll.start();
        }
      },
      false,
    );
  });

  customSelectsType1.forEach((select) => {
    let slct = new Choices(select, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
      allowHTML: true,
    });

    slct.passedElement.element.addEventListener(
      'choice',
      function (event) {
        if (!event.detail.choice.placeholder) {
          event.target.closest(".custom-select-type1").classList.add("is-active");
        } else {
          event.target.closest(".custom-select-type1").classList.remove("is-active");
        }
      },
      false,
    );


    slct.passedElement.element.addEventListener(
      'showDropdown',
      function (event) {
        if (window.tatneft_api.locoScroll) {
          window.tatneft_api.locoScroll.stop();
        }
      },
      false,
    );

    slct.passedElement.element.addEventListener(
      'hideDropdown',
      function (event) {
        if (window.tatneft_api.locoScroll) {
          window.tatneft_api.locoScroll.start();
        }
      },
      false,
    );
  });
};
