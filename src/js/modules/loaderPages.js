export default () => {
  document.addEventListener('click', event => {
    if (document.body.classList.contains('admin-bar')) return;
    if (event.target.matches('a') || event.target.closest('a')) {
      const link = event.target.matches('a') ? event.target : event.target.closest('a');

      if (
        link.hostname !== location.hostname ||
        link.href.match(/^mailto\:/) ||
        link.href.match(/^tel\:/) ||
        link.matches('[data-fancybox]') ||
        link.hash ||
        link.matches("[href^='#']") ||
        link.matches('[download]') ||
        link.matches('[target="_blank"]')
      ) {
        return;
      } else {
        event.preventDefault();
        document.body.classList.add('loader-active');

        // requestAnimationFrame(() => {
        //   document.body.classList.add('loader-active');
        // });

        const DURATION = window.matchMedia('(max-width: 640px)').matches ? 500 : 600;

        setTimeout(() => {
          window.location = link.href;
        }, DURATION);
      }
    }
  });
}
