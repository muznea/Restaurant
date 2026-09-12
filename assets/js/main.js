document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('loaded');
    setTimeout(() => preloader.remove(), 400);
  }

  const navLinks = document.querySelectorAll('.navmenu a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(item => item.classList.remove('active'));
      this.classList.add('active');
    });
  });

  const initSpecialsTabs = () => {
    const tabLinks = document.querySelectorAll('#specials .nav-link');
    const tabPanes = document.querySelectorAll('#specials .tab-pane');

    if (!tabLinks.length || !tabPanes.length) return;

    tabLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();

        const targetId = this.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;

        const targetPane = document.querySelector(targetId);
        if (!targetPane) return;

        tabLinks.forEach(item => {
          item.classList.remove('active', 'show');
          item.setAttribute('aria-selected', 'false');
        });

        tabPanes.forEach(panel => {
          panel.classList.remove('active', 'show');
          panel.setAttribute('hidden', 'hidden');
        });

        this.classList.add('active', 'show');
        this.setAttribute('aria-selected', 'true');
        targetPane.classList.add('active', 'show');
        targetPane.removeAttribute('hidden');

        if (window.bootstrap && window.bootstrap.Tab) {
          const tab = new window.bootstrap.Tab(this);
          tab.show();
        }
      });
    });
  };

  const initGalleryFallback = () => {
    const lightboxLinks = document.querySelectorAll('.glightbox');

    lightboxLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (!href) return;
        event.preventDefault();

        if (window.GLightbox) {
          const gallery = window.GLightbox({ selector: '.glightbox' });
          gallery.openAt(0);
          return;
        }

        window.open(href, '_blank', 'noopener');
      });
    });
  };

  const scrollTop = document.getElementById('scroll-top');
  if (scrollTop) {
    scrollTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const initSwiper = () => {
    if (window.Swiper) {
      document.querySelectorAll('.init-swiper').forEach((swiperEl) => {
        const configEl = swiperEl.querySelector('.swiper-config');
        if (!configEl) return;
        try {
          const config = JSON.parse(configEl.textContent || '{}');
          new Swiper(swiperEl, config);
        } catch (error) {
          console.warn('Swiper config error:', error);
        }
      });
    }
  };

  initSpecialsTabs();
  initGalleryFallback();
  initSwiper();

  if (window.GLightbox) {
    const lightbox = window.GLightbox({ selector: '.glightbox' });
    if (lightbox && typeof lightbox.refresh === 'function') {
      lightbox.refresh();
    }
  }
});
