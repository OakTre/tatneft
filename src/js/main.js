// eslint-disable-next-line import/no-extraneous-dependencies
import 'focus-visible';
import lazyIMages from './modules/lazyIMages';
import documenReady from './helpers/documenReady';
import initModal from './modules/initModal';
import openMenu from './modules/openMenu';
import validation from './modules/validation';
import phoneMask from './modules/inputMask';
import advantagesSlider from './modules/advantagesSlider';
import advantagesSliderFull from './modules/advantagesSliderFull';
import gallerySlider from './modules/gallerySlider';
import galleryCursor from './modules/galleryCursor';
import docsSlider from './modules/docsSlider';
import tabs from './modules/tabs';
import customSelects from './modules/customSelects';
import gallery from './modules/gallery';
import detailGallerySlider from './modules/detailGallerySlider';
import initSelects from './modules/initSelect';
import fileUpload from './modules/fileUpload';
import contactsInfo from './modules/contactsInfo';
import setModalHeading from './modules/setModalHeading';
import loaderPages from './modules/loaderPages';
import smoothScroll from './modules/smoothScroll';
import { primaryInput } from 'detect-it';
import footerLogoSprite from './modules/footerLogoSprite';
import companyValuesSwiper from './modules/companyValuesSwiper';
import accordions from './modules/accordion';
import readMoreBtn from './modules/readMoreBtn';
import historySlider from './modules/historySlider';
import mainPageLogic from './modules/mainPageLogic';
import mainPageVidLogic from './modules/mainPageVidLogic';
import fixedHeader from './modules/fixedHeader';
import mainPagetooltips from './modules/mainPagetooltips';

documenReady(() => {
  window.tatneft_api = { locoFlag: false, menuImages: false };

  if (primaryInput === 'touch') {
    document.body.classList.remove('no-scroll');
  }

  loaderPages();
  smoothScroll();
  lazyIMages();
  initModal();
  openMenu();
  validation();
  phoneMask();
  advantagesSlider();
  advantagesSliderFull();
  gallerySlider();
  galleryCursor();
  docsSlider();
  tabs();
  customSelects();
  gallery();
  detailGallerySlider();
  initSelects();
  fileUpload();
  contactsInfo();
  setModalHeading();
  companyValuesSwiper();
  accordions();
  readMoreBtn();
  historySlider();
  mainPageVidLogic();
  mainPageLogic();
  mainPagetooltips();
  fixedHeader();
});


window.addEventListener("load", () => {
  const preloader = document.querySelector(".js-preloader");

  if (preloader) {
    if (window.tatneft_api.locoScroll) {
      window.tatneft_api.locoScroll.update();
      preloader.classList.add("is-loaded");
      document.body.classList.add('is-loaded');
      footerLogoSprite();
    } else {
      preloader.classList.add("is-loaded");
      document.body.classList.add('is-loaded');
      footerLogoSprite();
    }
  }
});
