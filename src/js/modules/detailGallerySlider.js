import Swiper, {
  Navigation
} from 'swiper/swiper-bundle';

Swiper.use([Navigation]);

export default () => {
  const slider = document.querySelector(".js-slider");

  if (!slider) return;

  let sliderInstance = new Swiper(slider, {
    slidesPerView: 1,
    spaceBetween: 9,
    navigation: {
      nextEl: slider?.closest(".js-slider-parent")?.querySelector('.js-slider-btn-next'),
      prevEl: slider?.closest(".js-slider-parent")?.querySelector('.js-slider-btn-prev'),
    },
  });
};
