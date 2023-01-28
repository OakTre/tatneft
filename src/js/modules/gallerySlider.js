import Swiper, {
  Pagination
} from 'swiper/swiper-bundle';

Swiper.use([Pagination]);

export default () => {
  const slider = document.querySelector(".js-gallery-swiper");

  if (!slider) return;

  let sliderInstance = new Swiper(slider, {
    slidesPerView: 2,
    spaceBetween: 16,
    pagination: {
      el: slider.querySelector('.page-swiper-pagination'),
      type: 'bullets',
    },
    on: {
      init: () => {
        if (window.tatneft_api.locoScroll) {
          setTimeout(() => {
            window.tatneft_api.locoScroll.update();
          }, 600);
        }
      },
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
        spaceBetween: 8,
      },
      1280: {
        slidesPerView: 2,
      }
    }
  });
};
