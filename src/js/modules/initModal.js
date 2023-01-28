import { Modal } from "./Modal";

export default () => {
  const modal = new Modal({
    isOpen: (modal) => {
      const hiddenInput = modal.modalContainer.querySelector(".hidden-input");
      const attr = modal.previousActiveElement.dataset.hiddenValue;
      const hiddenInputName = modal.previousActiveElement.dataset.hiddenName;

      if (attr) {
        hiddenInput.value = attr;
        hiddenInput.setAttribute("name", hiddenInputName);
      }
    },
    isClose: (modal) => {
    },
  });

  window.tatneft_api.modal = modal;
};
