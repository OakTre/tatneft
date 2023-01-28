import Swiper, {
  Navigation,
  EffectFade,
  Controller
} from 'swiper/swiper-bundle';

Swiper.use([Navigation, EffectFade, Controller]);

export default () => {
  const slider = document.querySelector(".js-about-history-swiper");

  if (!slider) return;

  let sliderInstance = new Swiper(slider, {
    slidesPerView: 1,
    spaceBetween: 16,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    on: {
      init: () => {
        if (window.tatneft_api.locoScroll) {
          setTimeout(() => {
            window.tatneft_api.locoScroll.update();
          }, 600);
        }
      },
    }
  });


  const slider2 = document.querySelector(".js-about-history-swiper-2");

  if (!slider2) return;

  let sliderInstance2 = new Swiper(slider2, {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: '.js-slider-btn-next',
      prevEl: '.js-slider-btn-prev'
    },
    on: {
      init: () => {
        if (window.tatneft_api.locoScroll) {
          setTimeout(() => {
            window.tatneft_api.locoScroll.update();
          }, 600);
        }
      },
    }
  });

  sliderInstance.controller.control = sliderInstance2;
  sliderInstance2.controller.control = sliderInstance;

};
