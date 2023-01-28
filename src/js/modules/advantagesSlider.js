import Swiper, {
  Pagination
} from 'swiper/swiper-bundle';

Swiper.use([Pagination]);

export default () => {
  const slider = document.querySelector(".js-advantages-swiper");
  const media = window.matchMedia('(max-width: 767px)');

  if (!slider) return;

  if (media.matches) {
    let sliderInstance = new Swiper(slider, {
      slidesPerView: "auto",
      spaceBetween: 8,
      pagination: {
        el: slider.querySelector('.page-swiper-pagination'),
        type: 'bullets',
      },
    });
  };
};
