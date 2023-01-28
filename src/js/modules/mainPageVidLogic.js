import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { disableScroll, enableScroll } from "../helpers/disableScroll";
import { primaryInput } from 'detect-it';
import footerLogoSprite from "./footerLogoSprite";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const container = document.querySelector(".main-preloader");
  const video = document.querySelector(".main-intro__vid");
  const loader = document.querySelector(".main-preloader");
  const text = document.querySelector(".main-preloader__percents");
  if (!container) return;

  const url = container.dataset.vidUrl;
  var xhrReq = new XMLHttpRequest();
  xhrReq.open('GET', url, true);
  xhrReq.responseType = 'blob';

  xhrReq.onload = function () {
    if (this.status === 200) {
      var vid = URL.createObjectURL(this.response);
      video.src = vid;
    }
  }
  xhrReq.onerror = function () {
    console.log('err', arguments);
  }
  xhrReq.onprogress = function (e) {
    if (e.lengthComputable) {
      var percentComplete = ((e.loaded / e.total) * 100 | 0) + '%';

      loader.style.setProperty('--w', percentComplete);
      text.innerHTML = percentComplete;
      loader.classList.add("is-visible");

      if (percentComplete === "100%") {
        setTimeout(() => {
          loader.classList.add("is-hidden");
        }, 700);

        footerLogoSprite();
      }
    }
  }
  xhrReq.send();
})

export default () => {
  const INtro = document.querySelector('.main-intro');
  const video = document.querySelector(".main-intro__vid");
  let flag = true;
  const timeline = gsap.timeline({
    paused: true,
    reversed: true
  });

  if (!INtro) return;
  if (primaryInput === 'touch') return;

  disableScroll();

  timeline
    .to(".main-intro__content", {
      opacity: 0, y: "5rem", duration: 0.7, onComplete: sl => {
        video.play();
      }
    })

  video.addEventListener('loadeddata', function () {
    ScrollTrigger.addEventListener("scrollStart", () => {
      if (flag) {
        timeline.play();
      }
    });
  }, false);

  video.addEventListener("ended", function () {
    enableScroll();

    INtro.classList.add("is-hidden");

    setTimeout(() => {
      video.currentTime = 0;
    }, 300);

    flag = false;
  });

  const timeLinePlay = (tl) => {
    console.log("23");
    tl.reversed() ? tl.play() : tl.reverse();
  };

  window.tatneft_api.backToDefault = () => {
    INtro.classList.remove("is-hidden");

    // timeLinePlay(timeline);
    timeline.reverse();

    setTimeout(() => {
      flag = true;
    }, 500);

    disableScroll();

    if (window.tatneft_api.addEventWheel) {
      window.removeEventListener('wheel', window.tatneft_api.addEventWheel)
    }
  };
};
