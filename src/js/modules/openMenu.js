import gsap from "gsap";
import SplitText from '../../assets/js/gsap-bonus/SplitText';
import { primaryInput } from 'detect-it';
import { disableScroll, enableScroll } from "../helpers/disableScroll";
// import canUseWebp from "../helpers/canUseWebp";
import loadMenuImgs from "./loadMenuImgs";
import menuHover from "./menuHover";

gsap.registerPlugin(SplitText);

export default () => {
  const menuBtn = document.querySelector(".js-open-menu");
  const menu = document.querySelector(".main-menu");
  const heading1 = document.querySelector(".js-menu-legend1");
  const heading2 = document.querySelector(".js-menu-legend2");
  let menuFlag = false;
  const timeline = gsap.timeline({
    paused: true,
    reversed: true
  });

  if (!menuBtn) return;

  gsap.set(menu, { yPercent: -100, opacity: 1 });
  gsap.set(".main-menu__grid-block:nth-child(1)", { opacity: 0 });
  gsap.set(".main-menu__nav-list", { opacity: 0 });

  let splitHeading1 = new SplitText(heading1, {
    type: 'lines, chars',
    linesClass: "line"
  });

  let splitHeading2 = new SplitText(heading2, {
    type: 'lines, chars',
    linesClass: "line"
  });

  gsap.set(splitHeading1.chars, { yPercent: 120 });
  gsap.set(splitHeading2.chars, { yPercent: 120 });

  timeline
    .to(menu, { yPercent: 0, duration: 0.5 })
    .to(".main-menu__grid-block:nth-child(1)", { opacity: 1, duration: 0.3, clearProps: "all" })
    .to(".main-menu__nav-list", { opacity: 1, duration: 0.3, clearProps: "all" }, "-=0.2")
    .to(splitHeading1.chars, { yPercent: 0, duration: 0.3 }, "-=0.4")
    .to(splitHeading2.chars, { yPercent: 0, duration: 0.3 }, "-=0.4")

  const openMenu = () => {
    menuBtn.classList.add("is-active");
    menuBtn.classList.add("is-active");

    if (window.tatneft_api.locoScroll) {
      window.tatneft_api.locoScroll.stop();
    }

    if (primaryInput === 'touch') {
      disableScroll();
    }

    timeline.play();

    loadMenuImgs();

    if (window.tatneft_api.menuImages) {
      menuHover();
    }

    menuFlag = true;
  };

  const timeLinePlay = (tl) => {
    tl.reversed() ? tl.play() : tl.reverse();
  };

  const closeMenu = () => {
    menuBtn.classList.remove("is-active");

    menu.classList.remove("is-active");

    if (window.tatneft_api.locoScroll) {
      window.tatneft_api.locoScroll.start();
    }

    if (primaryInput === 'touch') {
      enableScroll();
    }

    timeline.reverse();
    menuFlag = false;
  };

  menuBtn.addEventListener("click", () => {
    switch (menuFlag) {
      case false:
        openMenu();

        break;
      case true:
        closeMenu();

        break;
    };
  });


  window.tatneft_api.closeMenu = () => {
    closeMenu();
  };

  window.tatneft_api.openMenu = () => {
    openMenu();
  };
};
