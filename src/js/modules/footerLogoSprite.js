import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import canUseWebp from "../helpers/canUseWebp";

gsap.registerPlugin(ScrollTrigger)

export default () => {
  const canvasContainer = document.querySelector(".js-logo-animated");
  const startSection = document.querySelector(".callback-section");

  if (!canvasContainer) return;

  const context = canvasContainer.getContext("2d");

  canvasContainer.width = 965;
  canvasContainer.height = 1040;

  const frameCount = 80;
  const imageType = canUseWebp() ? 'webp' : 'png';
  const currentFrame = index => (
    `${path}include/footer-logo/${(index + 1).toString().padStart(4, '0')}.${imageType}`
  );

  const images = []
  const LogoImg = {
    frame: 0
  };

  gsap.to(LogoImg, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "linear",
    duration: 6,
    onUpdate: render,
    repeat: -1,
    onStart: () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
      }

      images[0].onload = render;
    },
    // scrollTrigger: {
    //   trigger: startSection,
    //   start: 'top bottom',
    //   ...window.tatneft_api.scrollerOptions
    // }
  });

  function render() {
    context.clearRect(0, 0, canvasContainer.width, canvasContainer.height);
    context.drawImage(images[LogoImg.frame], 0, 0);
  }
};
