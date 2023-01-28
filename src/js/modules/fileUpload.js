export default function fileUpload() {
  const elements = Array.from(document.querySelectorAll('.js-file-upload'));

  elements.forEach((element) => {
    const input = element.querySelector('input[type="file"]');
    const label = element.querySelector('.js-file-upload-text');
    const text = label.dataset.text;

    input.addEventListener('change', () => {
      if (input.files.length) {
        label.textContent = input.files[0].name;
        label.closest(".js-file-upload").classList.add("is-active");
      } else {
        label.innerHTML = text;
        label.closest(".js-file-upload").classList.remove("is-active");
      }
    });

    label.addEventListener("click", () => {
      input.value = "";
      label.closest(".js-file-upload").classList.remove("is-active");
    });
  });
}
