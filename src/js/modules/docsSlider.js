import Swiper, {
  Pagination,
  Navigation
} from 'swiper/swiper-bundle';

Swiper.use([Pagination, Navigation]);

export default () => {
  const slider = document.querySelector(".js-docs-swiper");

  if (!slider) return;

  let sliderInstance = new Swiper(slider, {
    slidesPerView: 2,
    spaceBetween: 8,
    navigation: {
      nextEl: slider.closest(".js-docs-swiper-parent").querySelector('.js-slider-btn-next'),
      prevEl: slider.closest(".js-docs-swiper-parent").querySelector('.js-slider-btn-prev'),
    },
    pagination: {
      el: slider.querySelector('.page-swiper-pagination'),
      type: 'bullets',
    },
    breakpoints: {
      280: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 8,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 8,
      },
      1281: {
        slidesPerView: 4,
        spaceBetween: 53,
      }
    }
  });
};
