document.addEventListener('DOMContentLoaded', () => {
  try {
    setCorrectSliders();
    setCorrectLazyLoad();
    setCorrectFormPopup();
    setCorrectFormValidity();
    setCorrectIntlInputs();
    setCorrectVideoPopups();
  } catch(err) {
    console.error(err);
  }
});

window.addEventListener('orientationchange', () => {
  location.reload();
});

// Слайдеры
function setCorrectSliders() {
  const doWelcomeSlider = () => {
    const welcomeSlider = document.querySelector('.welcome-slider__main');
    const welcomeSwiper = new Swiper(welcomeSlider, {
      slidesPerView: 1,
      grabCursor: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.welcome-slider__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: 'pagination-bullet',
        bulletActiveClass: 'pagination-bullet_active',
      }
    });
  };
  const doActionsSlider = () => {
    const actionsSliders = document.querySelectorAll('.action__slider');
    actionsSliders.forEach((actionSlider) => {
      const actionsSwiper = new Swiper(actionSlider, {
        grabCursor: true,
        parallax: true,
        speed: 700
      });
    });
  };
  const doHeroesSlider = () => {
    const heroesSlider = document.querySelector('.heroes-slider');
    const heroesSwiper = new Swiper(heroesSlider, {
      slidesPerView: 1,
      pagination: {
        el: '.heroes-slider__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: 'pagination-bullet',
        bulletActiveClass: 'pagination-bullet_active',
      },
      breakpoints: {
        660: {
          slidesPerView: 2,
        }
      }
    });
  };
  const doReviewsSlider = () => {
    const reviewsSlider = document.querySelector('.reviews-slider');
    const reviewsSwiper = new Swiper(reviewsSlider, {
      spaceBetween: 50,
      slideActiveClass: 'reviews-slider__slide_active',
      pagination: {
        el: '.reviews-slider__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: 'pagination-bullet',
        bulletActiveClass: 'pagination-bullet_active',
      }
    });
    if (window.matchMedia('(min-width: 880px)').matches) {
      reviewsSwiper.destroy();
    }
  };

  doWelcomeSlider();
  doActionsSlider();
  doHeroesSlider();
  doReviewsSlider();
}

// Ленивая загрузка
function setCorrectLazyLoad() {
  const lazy = new LazyLoad({
    threshold: 450, // Значение по умолчанию: 300
  });
}

// Попапы с формой
function setCorrectFormPopup() {
  const triggers = document.querySelectorAll('.trigger');
  const wrapper = document.querySelector('.wrapper');
  const preventFocus = () => {
    document.documentElement.classList.add('unscroll');
    wrapper.inert = true;
  };
  const resumeFocus = () => {
    document.documentElement.classList.remove('unscroll');
    wrapper.inert = false;
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const popupSelector = trigger.dataset.popupSelector;
      const popup = document.querySelector(popupSelector);
      const popupRow = popup.querySelector('.popup__row');
      const popupInput = popup.querySelector('input');
      const popupForm = popup.querySelector('form');
      const hidePopup = (event) => {
        const escKeyId = 27;
        if (event.target !== popupRow && event.keyCode !== escKeyId) return;

        popup.classList.remove('active');
        document.removeEventListener('click', hidePopup);
        resumeFocus(); // Возобновляем возможность выделять фокусом элементы на странице        
        trigger.focus();
      };
      
      const outerTriggerForm = trigger.closest('form');
      // Обрываем функцию если триггер находится в форме и она не валидна
      if (outerTriggerForm && outerTriggerForm.dataset.isValid !== 'true') {
        return;
      }
      
      preventFocus(); // Запрещаем выделять фокусом элементы сзади
      popup.classList.add('active');

      // Если в попапе есть форма - ставим на неё обработчик
      if (popupForm) {
        popupForm.addEventListener('submit', (event) => {
          event.preventDefault();
          // ... Отправка данных формы куда-либо
          popup.classList.remove('active');
        });
      }

      // Если в попапе есть инпут - фокусируемся на нём
      if (popupInput) {
        setTimeout(() => {
          popupInput.focus();
        }, 100);
      }

      document.addEventListener('click', hidePopup);
      document.addEventListener('keydown', hidePopup);
    });
  });
}

// Проверка валидности формы
function setCorrectFormValidity() {
  const forms = document.querySelectorAll('form');
  const enterKeyId = 13;
  
  forms.forEach((form) => {
    const formSubmit = form.querySelector('[type="submit"]');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.dataset.isValid = false;
      const formData = new FormData(form);
      fetch('/wp-admin/admin.php', {
        body: formData,
        method: 'POST'
      });
      form.reset();
    });
    
    Array.from(form.children).forEach((child) => {
      child.addEventListener('input', (event) => {
        form.dataset.isValid = false;
        const isValid = form.reportValidity();
        form.dataset.isValid = isValid;
        child.focus();
      });

      child.addEventListener('keypress', (event) => {      
        if (event.keyCode === enterKeyId) {
          event.preventDefault();

          // Грубое сравнение со строкой - потому что в data-атрибутах всё является строками
          if (form.dataset.isValid === "true") {
            formSubmit.click();
          }
        }
      });
    });
  });
}

// Международные номера в поле ввода телефона
function setCorrectIntlInputs() {
  var inputs = document.querySelectorAll("input[type='tel']");

  inputs.forEach((input) => {
    window.intlTelInput(input, {
      initialCountry: "ru",
      autoPlaceholder: 'aggressive',
      customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
        return 'например: ' + selectedCountryPlaceholder;
      },
    });
  });
}

// Всплывающие окна с видео
function setCorrectVideoPopups() {
  for (let i = 1; i < 6; i++) {
    const videoKey = `video-${i}`;

    fsLightboxInstances[videoKey].props.onOpen = function() {
      const video = fsLightboxInstances[videoKey].elements.container.querySelector('video');
      video.volume = 0.5;
      video.play();
    }
  }
}

console.log = {};
console.error = {};
console.warn = {};
