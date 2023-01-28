import Swiper, {
  Navigation, Pagination
} from 'swiper/swiper-bundle';

Swiper.use([Navigation, Pagination]);

export default () => {
  const slider = document.querySelector(".js-values-slider");

  if (!slider) return;

  let sliderInstance = new Swiper(slider, {
    slidesPerView: 3,
    spaceBetween: 16,
    navigation: {
      nextEl: slider?.closest(".js-slider-parent")?.querySelector('.js-slider-btn-next'),
      prevEl: slider?.closest(".js-slider-parent")?.querySelector('.js-slider-btn-prev'),
    },
    pagination: {
      el: slider.querySelector('.page-swiper-pagination'),
      type: 'bullets',
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
        spaceBetween: 8,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
      1280: {
        slidesPerView: 3,
      }
    }
  });
};
