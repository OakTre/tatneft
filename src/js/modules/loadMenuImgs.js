import canUseWebp from "../helpers/canUseWebp";

export default () => {
  const imgProductItems = Array.from(document.querySelectorAll(".js-products-img"));
  const imgSecrvicesItems = Array.from(document.querySelectorAll(".js-services-img"));
  const productContainer = document.querySelector(".js-products-img-container");
  const servicesContainer = document.querySelector(".js-services-img-container");
  const pathsProsucts = [];
  const pathsSrvices = [];
  const newPathProducts = [];
  const newPathServices = [];

  if (window.tatneft_api.menuImages) return;

  imgProductItems.forEach(img => pathsProsucts.push(img.dataset.image));
  imgSecrvicesItems.forEach(img => pathsSrvices.push(img.dataset.image));

  for (let i = 0; i < pathsProsucts.length; i++) {
    // let images = pathsProsucts[i].split(".")[0];
    // let format = canUseWebp() ? "webp" : pathsProsucts[i].split(".").slice(-1).pop();

    // newPathProducts.push(images + "." + format);

    const layer = `
      <div class="main-menu__nav-img js-hover-imgs">
        <img src="${pathsProsucts[i]}">
      </div>
    `;

    productContainer.innerHTML += layer;

    if (i === pathsProsucts.length -1) {
      window.tatneft_api.menuImages = true;
    }
  };

  for (let i = 0; i < pathsSrvices.length; i++) {
    // let images = pathsSrvices[i].split(".")[0];
    // let format = canUseWebp() ? "webp" : pathsSrvices[i].split(".").slice(-1).pop();

    // newPathServices.push(images + "." + format);

    const layer = `
      <div class="main-menu__nav-img main-menu__nav-img--full js-hover-imgs2">
        <img src="${pathsSrvices[i]}">
      </div>
    `;

    servicesContainer.innerHTML += layer;
  };
};
