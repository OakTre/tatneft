import { sendRequest } from "../helpers/sendRequest";

export default () => {
  const contactsSection = document.querySelector(".js-contacts-section");

  if (!contactsSection) return;

  const map = document.querySelector(".js-map");
  const url = contactsSection.dataset.url;
  const icon = contactsSection.dataset.mapIcon;
  const tabBtns = document.querySelector(".js-contacts-nav-btns");
  const cityInfoInner = document.querySelector(".js-city-info-container");
  const btnsLoader = document.querySelector(".js-contacts-nav-btns-loader");
  const departmentContainer = document.querySelector('.js-departments-container');

  let placemark;
  let contactsMap;
  let response;
  let firstCoords;

  function init() {
    let zoom = 16;
    let center = [55.844051, 52.102682];

    contactsMap = new ymaps.Map(
      map, {
      center: firstCoords,
      zoom: zoom,
      controls: [],
    }, {
      searchControlProvider: "yandex#search",
    }
    )

    let housesCollection = new ymaps.GeoObjectCollection(null, {
      hideIconOnBalloonOpen: false,
    });

    contactsMap.behaviors.disable('scrollZoom');
    contactsMap.behaviors.disable('drag');

    // проходимся по бз и подставляем иконки на карту
    response.forEach((city) => {
      let marActive = `<a data-img="" href="" class="map-marker"><img src="${icon}"></a>`;

      placemark = new ymaps.Placemark(
        city.coords, {}, {
        iconLayout: ymaps.templateLayoutFactory.createClass(marActive),
        zIndex: 700,
        zIndexHover: 700,
        zIndexActive: 700,
        iconShape: {
          type: "Rectangle",
          coordinates: [
            [10, 10],
            [10, 10]
          ],
        },
      });

      housesCollection.add(placemark);
    });

    contactsMap.geoObjects.add(housesCollection);
  };

  const setNavBtns = (data) => {
    const navBtns = data.map(({ id, city, tab_name, ...etc }) => {
      let navBtn = `
        <li class="page-intro__tag page-intro__tag--grid">
          <button data-city-id="${id}" class="page-tab-btn page-tab-btn--full-width js-contacts-btn-nav ${id === 0 ? "is-active" : ""}">${tab_name}</button>
        </li>
      `;

      return {
        btns: navBtn,
      }
    });

    return navBtns;
  }

  const setContactsInfo = (data, btnNavId) => {
    let newData = data;

    if (btnNavId) {
      newData = data.filter(({ id, ...etc }, index) => {
        return id === Number(btnNavId);
      });
    }

    const elements = newData.map(({ id, city, tab_name, req_file, company_info, company_departments, req_name }) => {
      const cityBloksElements = company_info.map(({ name, legend, req }) => {
        let cityBlockElement =
          req ?
            `
              <span class="city-info__legend-small">${name}</span>

              <div class="city-info__legend-container">
                <p class="city-info__legend">${req[0]}</p>
                <p class="city-info__legend">${req[1]}</p>
                <p class="city-info__legend">${req[2]}</p>
              </div>
            `
            :
            `
              <span class="city-info__legend-small">${name}</span>
              <p class="city-info__legend">${legend}</p>
            `;

        return cityBlockElement;
      });

      const companyDepartments = company_departments.map(({ name, contacts, head: { img: image, headName: chifName, label: chifLabel } }) => {
        let contactsLayoutArray = contacts.map(({ type, label, value }) => {
          let contacts =
            label ?
              `
          <a class="department__legend department__legend--link department__legend--labeled" data-text="${label}" href="${type === 'phone' ? 'tel:+' + value : 'mailto:' + value}">
            <span class="page-hover-effect">${value}</span>
          </a>
          `
              :
              `
            <a class="department__legend department__legend--link" href="${type === 'phone' ? 'tel:+' + value : 'mailto:' + value}">
              <span class="page-hover-effect">${value}</span>
            </a>
          `;

          return contacts;
        });

        let department =
          image ?
            `
              <li class="departments__item">
                <div class="department">
                  <h4 class="department__legend">${name}</h4>
                  <div class="author department__author">
                    <img class="author__image" src="${image}" alt="">
                    <div class="author__info">
                      <span class="author__legend">${chifLabel}</span>
                      <span class="author__name">${chifName}</span>
                    </div>
                  </div>
                  <div class="department__contacts">
                    ${contactsLayoutArray.join('')}
                  </div>
                </div>
              </li>
            `
            :
            `
              <li class="departments__item">
                <div class="department">
                  <h4 class="department__legend">${name}</h4>
                  <div class="department__contacts">
                    ${contactsLayoutArray.join('')}
                  </div>
                </div>
              </li>
            `

        return department;
      });


      let cityInfoBlockLayout = `
        <div class="city-info">
          ${cityBloksElements.join('')}
          <a class="page-tab-btn page-tab-btn--small page-tab-btn--active city-info__download-btn" href="${req_file}" target="_blank">${req_name}</a>
        </div>
      `;

      return {
        cityInfoBlockLayout,
        companyDepartments
      }
    });

    return elements;
  };

  const listenNavBtns = () => {
    const btns = document.querySelectorAll(".js-contacts-btn-nav");

    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        let cityId = btn.dataset.cityId;

        btns.forEach(btn => btn.classList.remove("is-active"));

        btn.classList.add("is-active");
        setContactsInfo(response, cityId)
          .forEach(({ cityInfoBlockLayout, companyDepartments }, index) => {
            cityInfoInner.innerHTML = cityInfoBlockLayout;
            departmentContainer.innerHTML = companyDepartments.join('');
          });

        contactsMap.setCenter(response[Number(cityId)].coords)

      });
    })
  };

  sendRequest("GET", url)
    .then(data => {
      response = data;
      firstCoords = data[0].coords
      ymaps.ready(init);

      setNavBtns(data)
        .forEach(({ btns }, index) => {
          tabBtns.innerHTML += btns;
          btnsLoader.classList.add("is-hidden");
          listenNavBtns();
        });

      setContactsInfo(data)
        .forEach(({ btns, cityInfoBlockLayout, companyDepartments }, index) => {
          if (index === 0) {
            cityInfoInner.innerHTML = cityInfoBlockLayout;
            departmentContainer.innerHTML = companyDepartments.join('');
            return;
          }
        });
    })
    .then(data => {
      if (window.tatneft_api.locoScroll) {
        window.tatneft_api.locoScroll.update();
      }
    })
    .catch((error) => {
      // ошибка запроса
      console.log(error);
    })
};
