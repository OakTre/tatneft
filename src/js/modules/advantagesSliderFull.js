import Swiper, {
  Pagination, Navigation
} from 'swiper/swiper-bundle';

Swiper.use([Pagination, Navigation]);

export default () => {
  const slider = document.querySelector(".js-advantages-swiper-full");

  if (!slider) return;

  let sliderInstance = new Swiper(slider, {
    slidesPerView: "auto",
    spaceBetween: 8,
    navigation: {
      nextEl: slider.closest(".js-advantages-swiper-full-parent").querySelector('.js-slider-btn-next'),
      prevEl: slider.closest(".js-advantages-swiper-full-parent").querySelector('.js-slider-btn-prev'),
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
        spaceBetween: 8,
        pagination: {
          el: slider.querySelector('.page-swiper-pagination'),
          type: 'bullets',
        },
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
      1280: {
        slidesPerView: 3,
      },
      1281: {
        slidesPerView: 4,
      }
    }
  });
};
