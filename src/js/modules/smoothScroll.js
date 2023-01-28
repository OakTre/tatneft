import LocomotiveScroll from 'locomotive-scroll';
import { primaryInput } from 'detect-it';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default () => {
  let locoScroll = null;

  if (document.querySelector(".js-no-loco-scroll")) return;

  if (primaryInput !== 'touch') {
    document.body.classList.add('loco-scroll-active');
    locoScroll = new LocomotiveScroll({
      el: document.querySelector('.smooth-scroll'),
      smooth: true,
      multiplier: 0.6
    });

    window.tatneft_api.locoScroll = locoScroll;

    locoScroll.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy('.smooth-scroll', {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.querySelector('.smooth-scroll').style.transform ? 'transform' : 'fixed'
    });
  }

  window.tatneft_api.scrollerOptions = {};

  if (locoScroll) {
    window.tatneft_api.scrollerOptions = {
      scroller: '.smooth-scroll'
    };
  }

  const prlxs = Array.from(document.querySelectorAll(".js-parallax-anim"));

  prlxs.forEach(prlx => {
    gsap.fromTo(prlx, {
      backgroundPosition: "50% 50%",
    }, {
      backgroundPosition: "50% 30%",
      ease: "linear",
      duration: 0.5,
      scrollTrigger: {
        trigger: prlx,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        ...window.tatneft_api.scrollerOptions
      }
    });
  });

  const links = document.querySelectorAll('.js-service-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.tatneft_api.closeMenu) {
        window.tatneft_api.closeMenu();

        const hash = link.hash;

        const elementToScroll = document.querySelector(hash);

        if (elementToScroll) {
          if (locoScroll) {
            locoScroll.scrollTo(elementToScroll, {
              'offset': -180,
            });
          } else {
            gsap.to(window, {
              duration: 1,
              ease: 'power2.out',
              scrollTo: {
                y: elementToScroll,
                autoKill: false,
                offsetY: 160
              }
            });
          }
        } else {
          console.error('No element to scroll');
        }
      }
    })
  })

  ScrollTrigger.addEventListener('refresh', () => {
    if (locoScroll) {
      locoScroll.update();
    }
  });
  ScrollTrigger.refresh();
  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
  });
};
