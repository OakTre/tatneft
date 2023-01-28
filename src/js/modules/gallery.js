import { Fancybox } from "@fancyapps/ui";
import { declNum } from "../helpers/declNum";

export default () => {
  let text_arr = ['фотография', 'фотографии', 'фотографий'];

  Fancybox.bind('[data-fancybox]', {
    infinite: false,
    Toolbar: {
      display: [
        "close",
        { id: "counter", position: "center" },
      ],
      items: {
        counter: {
          type: "div",
          class: "fancybox__counter",
          html: `
            <span data-fancybox-count=""></span>
            <span class="fancybox__counter-text"></span>
          `,
          tabindex: -1,
          position: "left",
        },
        close: {
          class: "fancybox__button--close",
          html: `
            <svg class="icon icon-close" width="40" height="40">
              <use xlink:href="${path}images/sprites/sprite-mono.svg#close"></use>
            </svg>
          `,
        },
      },
    },
    Carousel: {
      Navigation: {
        prevTpl:
          `
          <svg class="icon icon-arrow-left page-circle-btn__icon" width="16" height="16">
            <use xlink:href="${path}images/sprites/sprite-mono.svg#arrow-left"></use>
          </svg>
          `,
        nextTpl:
          `
          <svg class="icon icon-arrow-left page-circle-btn__icon" width="16" height="16">
            <use xlink:href="${path}images/sprites/sprite-mono.svg#arrow-left"></use>
          </svg>
          `
      },
    },
    Image: {
      zoom: false,
    },
    on: {
      "ready": (event, fancybox, slide) => {
        const tollbar = event.$container.querySelector(".fancybox__toolbar");
        const slidesNum = event.items.length;
        const countText = event.$container.querySelector(".fancybox__counter-text");

        if (event.$carousel.innerText) {
          const caption = document.createElement("div");
          caption.classList.add("fancybox__new-caption");
          caption.innerHTML = event.$carousel.innerText;

          tollbar.insertBefore(caption, tollbar.firstElementChild);
        }

        if (countText) {
          countText.innerHTML = declNum(slidesNum, text_arr);
        }
      },
    }
  });
}
