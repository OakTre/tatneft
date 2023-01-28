export default () => {
  function getPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;

    if (e.offsetLeft || e.offsetTop) {
      posx = e.offsetLeft;
      posy = e.offsetTop;
    }

    return {
      x: posx,
      y: posy
    }
  }

  let clickCoords;
  let clickCoordsX;
  let clickCoordsY;
  let menuWidth;
  let menuHeight;
  let containerWidth;
  let containerHeight;

  // updated positionMenu function
  function positionMenu(e, container) {
    clickCoords = getPosition(e);
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;

    menuWidth = e.offsetWidth;
    menuHeight = e.offsetHeight;

    containerWidth = container.offsetWidth + 4;
    containerHeight = container.offsetHeight + 4;

    // console.log({
    //   "menu-width:": menuWidth,
    //   "menu-height:": menuHeight,
    //   "menu-x:": clickCoordsX,
    //   "menu-y:": clickCoordsY,
    //   "containerHeight": containerHeight,
    //   "containerWidth": containerWidth,
    //   "offsetY": containerHeight - clickCoordsY,
    //   "offsetYBoolean": menuHeight < (containerHeight - clickCoordsY),
    //   "percentY": (clickCoordsY / containerHeight) * 100
    // });

    // console.log({
    //   "menu-width:": menuWidth,
    //   "menu-x:": clickCoordsX,
    //   "containerWidth": containerWidth,
    //   "offsetX": containerWidth - clickCoordsX,
    //   "offsetXBoolean": (containerWidth - clickCoordsX) < menuWidth ,
    //   "percentX": (clickCoordsX / containerWidth) * 100,
    //   "percentX-right": 100 - ((clickCoordsX / containerWidth) * 100),
    // });

    if (menuHeight < (containerHeight - clickCoordsY)) {
      e.style.top = (clickCoordsY / containerHeight) * 100 + "%";
    }

    if ((containerWidth - clickCoordsX) < menuWidth) {
      e.style.left = "auto";
      e.style.right = 100 - ((clickCoordsX / containerWidth) * 100) + "%";
      e.classList.add("is-revert");
    }
  }

  const tooltips = Array.from(document.querySelectorAll(".js-spheres-tooltip-parent"));
  const container = document.querySelector(".spheres__content");

  tooltips.forEach(t => {
    positionMenu(t, container)
  });
};
