import $ from 'jquery';
import 'parsleyjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

window.Parsley.addValidator('requiredIfChecked', {
  requirementType: 'string',
  validateString: (value, requirement) => {
    const checkbox = document.querySelector(requirement);

    if (!checkbox) {
      return false;
    }

    if (checkbox.checked && !value.trim()) {
      return false;
    }
    return true;
  },
  messages: {
    en: `
    <span class="error">
      <svg class="icon icon-alert" width="14" height="14">
        <use xlink:href="${path}images/sprites/sprite-mono.svg#alert"></use>
      </svg>
      <span class="error__text-wrapper">
        <span class="error__text">Required</span>
      </span>
    </span>`,
    ru: `
    <span class="error">
      <svg class="icon icon-alert" width="14" height="14">
        <use xlink:href="${path}images/sprites/sprite-mono.svg#alert"></use>
      </svg>
      <span class="error__text-wrapper">
        <span class="error__text">Обязательное поле</span>
      </span>
    </span>`,
  },
  priority: 33,
});

window.Parsley.addValidator('phone', {
  requirementType: 'string',
  validateString: (value) => {
    if (value.trim() === '') return true;
    return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(value);
  },
  messages: {
    en: `
    <span class="error">
      <svg class="icon icon-alert" width="14" height="14">
        <use xlink:href="${path}images/sprites/sprite-mono.svg#alert"></use>
      </svg>
      <span class="error__text-wrapper">
        <span class="error__text">Invalid Phone number</span>
      </span>
    </span>`,
    ru: `
    <span class="error">
      <svg class="icon icon-alert" width="14" height="14">
        <use xlink:href="${path}images/sprites/sprite-mono.svg#alert"></use>
      </svg>
      <span class="error__text-wrapper">
        <span class="error__text">Неверный номер моб. телефона</span>
      </span>
    </span>`,
  },
});

window.Parsley.addValidator('date', {
  requirementType: 'string',
  validateString: (value) => {
    if (value.trim() === '') return true;
    return dayjs(value, 'DD.MM.YYYY', true).isValid();
  },
  messages: {
    en: 'Enter correct date',
    ru: 'Введите правильно дату',
  },
});

window.Parsley.addValidator('fio', {
  requirementType: 'string',
  validateString: (value) => {
    if (value.trim() === '') return true;
    return /^[a-яA-Я\s]+$/.test(value);
  },
  messages: {
    en: `
    <span class="error">
      <svg class="icon icon-alert" width="14" height="14">
        <use xlink:href="${path}images/sprites/sprite-mono.svg#alert"></use>
      </svg>
      <span class="error__text-wrapper">
        <span class="error__text">Invalid value</span>
      </span>
    </span>`,
    ru: `
    <span class="error">
      <svg class="icon icon-alert" width="14" height="14">
        <use xlink:href="${path}images/sprites/sprite-mono.svg#alert"></use>
      </svg>
      <span class="error__text-wrapper">
        <span class="error__text">Некорректное значение</span>
      </span>
    </span>`,
  },
});

Parsley.addMessages('ru', {
  defaultMessage: 'Некорректное значение.',
  type: {
    email: `
    <span class="error">
      <svg class="icon icon-alert" width="14" height="14">
        <use xlink:href="${path}images/sprites/sprite-mono.svg#alert"></use>
      </svg>
      <span class="error__text-wrapper">
        <span class="error__text">Некорректный E-mail</span>
      </span>
    </span>`,
    url: 'Адрес сайта введен неверно.',
    number: 'Введите число.',
    integer: 'Введите целое число.',
    digits: 'Введите только цифры.',
    alphanum: 'Введите буквенно-цифровое значение.',
  },
  notblank: 'Это поле должно быть заполнено.',
  required: `
  <span class="error">
    <svg class="icon icon-alert" width="14" height="14">
      <use xlink:href="${path}images/sprites/sprite-mono.svg#alert"></use>
    </svg>
    <span class="error__text-wrapper">
      <span class="error__text">Заполните поле</span>
    </span>
  </span>`,
  pattern: `
  <span class="error">
    <svg class="icon icon-alert" width="14" height="14">
      <use xlink:href="${path}images/sprites/sprite-mono.svg#alert"></use>
    </svg>
    <span class="error__text-wrapper">
      <span class="error__text">Некорректное значение</span>
    </span>
  </span>`,
  min: 'Это значение должно быть не менее чем %s.',
  max: 'Это значение должно быть не более чем %s.',
  range: 'Это значение должно быть от %s до %s.',
  minlength: 'Это значение должно содержать не менее %s символов.',
  maxlength: 'Это значение должно содержать не более %s символов.',
  length: 'Это значение должно содержать от %s до %s символов.',
  mincheck: 'Выберите не менее %s значений.',
  maxcheck: 'Выберите не более %s значений.',
  check: 'Выберите от %s до %s значений.',
  equalto: 'Несовпадающие пароли',
});


Parsley.addMessages('en', {
  defaultMessage: `
  <span class="error">
    <svg class="icon icon-alert" width="14" height="14">
      <use xlink:href="${path}images/sprites/sprite-mono.svg#alert"></use>
    </svg>
    <span class="error__text-wrapper">
      <span class="error__text">Invalid message</span>
    </span>
  </span>`,
  type: {
    email: `
    <span class="error">
      <svg class="icon icon-alert" width="14" height="14">
        <use xlink:href="${path}images/sprites/sprite-mono.svg#alert"></use>
      </svg>
      <span class="error__text-wrapper">
        <span class="error__text">Invalid e-mail</span>
      </span>
    </span>`,
  },
  required: `
  <span class="error">
    <svg class="icon icon-alert" width="14" height="14">
      <use xlink:href="${path}images/sprites/sprite-mono.svg#alert"></use>
    </svg>
    <span class="error__text-wrapper">
      <span class="error__text">Required filed</span>
    </span>
  </span>`,
  pattern: `
  <span class="error">
    <svg class="icon icon-alert" width="14" height="14">
      <use xlink:href="${path}images/sprites/sprite-mono.svg#alert"></use>
    </svg>
    <span class="error__text-wrapper">
      <span class="error__text">Invalid meassage</span>
    </span>
  </span>`,
});

export default function validation() {
  const formsToValidate = Array.from(document.querySelectorAll('form[data-need-validation]'));
  const pageLang = document.querySelector("html").dataset.lang;

  Parsley.setLocale(pageLang);

  formsToValidate.forEach((form) => {
    $(form).parsley({
      focus: 'none',
      errorClass: 'is-error',
      successClass: 'success',
      classHandler: (field) => {
        return field.$element.closest('.js-validation-wrapper');
      },
      trigger: 'change'
    });

    // form.addEventListener("submit", (e) => {
    //   e.preventDefault();
    //   let formData = new FormData(form);
    //   const url = form.getAttribute("action");
    //   const labels = form.querySelectorAll('.js-input-heading');

    //   if ($(form).parsley().isValid()) {
    //     axios.post(url, formData)
    //       .then((response) => {
    //         if (response.data.ID > 0) {
    //           const fileContainer = form.querySelector(".file-upload__text");
    //           form.querySelector(".form__btn").classList.remove("disabled");

    //           if (fileContainer) fileContainer.remove();

    //           window.gis_API.modal.close();

    //           window.gis_API.modal.onOpen("success");

    //           $(form).trigger("reset");
    //           labels.forEach(label => label.classList.remove("is-active"));
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error.message);
    //         window.gis_API.modal.close();
    //         window.gis_API.modal.onOpen("error");
    //       });
    //   }
    // });
  });
}
