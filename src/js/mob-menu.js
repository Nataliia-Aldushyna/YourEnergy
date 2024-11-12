const headerEl = document.querySelector('#js-header');
const burgerEl = document.querySelector('#js-menu');
const menuEl = document.querySelector('#js-header-pages');

document.addEventListener('DOMContentLoaded', function () {
  burgerEl.addEventListener('click', function () {
    headerEl.classList.toggle('open');
    if (headerEl.classList.contains('open')) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  });
});

// window.addEventListener('keydown', e => {
//   if (e.key === 'Escape') {
//     headerEl.classList.remove('open');
//     document.documentElement.style.overflow = 'auto';
//   }
// });

burgerEl.addEventListener('click', event => {
  event._isClickWithInMenu = true;
});

menuEl.addEventListener('click', e => {
  headerEl.classList.remove('open');
  document.documentElement.style.overflow = 'auto';
});

document.body.addEventListener('click', event => {
  if (event._isClickWithInMenu) return;
  headerEl.classList.remove('open');
  document.documentElement.style.overflow = 'auto';
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    headerEl.classList.remove('open');
    document.documentElement.style.overflow = 'auto';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  function setActiveMenu() {
    if (window.innerWidth >= 768) {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';

      document.querySelectorAll('.header-pages-item').forEach(item => {
        const link = item.querySelector('a');

        if (link && link.getAttribute('href').split('/').pop() === currentPath) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  setActiveMenu();
});

function toggleHeaderShadow() {
  if (window.scrollY > 50) {
    headerEl.classList.add('shadow');
  } else {
    headerEl.classList.remove('shadow');
  }
}

window.addEventListener('scroll', toggleHeaderShadow);
