// настройка боковой панели
function setCorrectSidebar() {
  const burger = document.querySelector('.burger');
  const sidebar = document.querySelector('.sidebar');
  const close = sidebar.querySelector('.sidebar__close');

  burger.addEventListener('click', function(event) {
    event.stopPropagation();
    showSidebar();
  });

  close.addEventListener('click', function() {
    closeSidebar();
  });

  document.addEventListener('click', function(event) {
    if (event.target.closest('.sidebar') !== sidebar)
      closeSidebar();
  });

  if (window.matchMedia('(max-width: 900px)').matches) {
    let [x1, x2] = [null, null];
    let [y1, y2] = [null, null];
    const inviteInFooter = document.querySelector('.invite')
    document.addEventListener('touchstart', function(event) {
      if (!(event.target.closest('.slick-slider') || (event.target.closest('.footer') && event.target.parentNode !== inviteInFooter))) {
        x1 = event.changedTouches[0].clientX;
        y1 = event.changedTouches[0].clientY;
      }
    });

    document.addEventListener('touchend', function(event) {
      x2 = event.changedTouches[0].clientX;
      y2 = event.changedTouches[0].clientY;
      
      if (Math.abs(y1 - y2) < Math.abs(x1 - x2)) {
        if (x1 > x2) showSidebar();
        else if (x1 < x2) closeSidebar();
      }
    });
  }

  // показать панель
  function showSidebar() {
    sidebar.classList.add('active');
  }

  // убрать панель
  function closeSidebar() {
    sidebar.classList.remove('active');
  }
}

// настройка аккордеона
function setCorrectAccordeon() {
  const accordeon = document.querySelector('.accordeon');
  const allItems = accordeon.querySelectorAll('.item');
  
  allItems.forEach(item => {
    item.addEventListener('click', () => {
      // скрываем все остальные элементы кроме нажатого
      allItems.forEach(el => {
        if (el !== item) hideItem(el);
      });
      if (item.classList.contains('active')) hideItem(item);
      else showItem(item);
    });
  });
  
  // показать элемент аккордеона
  function showItem(item) {
    const content = item.querySelector('.item__text');
    item.classList.add('active');
    content.style.maxHeight = content.scrollHeight + "px";
  }
  
  // скрыть элемент аккордеона
  function hideItem(item) {
    const content = item.querySelector('.item__text');
    item.classList.remove('active');
    content.style.maxHeight = null;
  }
}

// настройка якорей
function setCorrectAnchors() {
  const allNavs = document.querySelectorAll('.nav');

  // делегируем событие при клике на якори в навигации
  allNavs.forEach(nav => {
    nav.addEventListener('click', (event) => {
      event.preventDefault(); // отменяем стандартное поведение
      const hrefId = event.target.getAttribute('href');
      const scrollTo = document.querySelector(hrefId);
      scrollTo.scrollIntoView({ behavior: 'smooth', inline: 'end' }); // скроллим до элемента
    });
  });
}

// настройка слайдеров
function setCorrectSliders() {
  // слайдер с отзывами
  $('.slider.reviews').slick({
    slidesToShow: 4,
    slidesToScroll: 2,
    infinite: false,
    waitForAnimate: true,
    variableWidth: true,
    touchThreshold: 20,
    responsive: [
      {
        breakpoint: 1510,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },

      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
        }
      },

      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          variableWidth: true
        }
      }
    ]
  });
  
  // слайдер с выполненными работами
  $('.slider.works').slick({
    infinite: false,
    slidesToShow: 3,
    variableWidth: true,
    waitForAnimate: true,
    touchThreshold: 20,
    responsive: [
      {
        breakpoint: 1210,
        settings: {
          slidesToShow: 2,
        }
      },

      {
        breakpoint: 710,
        settings: {
          slidesToShow: 1,
          variableWidth: true
        }
      }
    ]
  });

  // слайдер с сертификатами
  $('.slider.certificates').slick({
    slidesToShow: 4,
    slidesToScroll: 2,
    infinite: false,
    waitForAnimate: true,
    variableWidth: true,
    touchThreshold: 20,
    responsive: [
      {
        breakpoint: 1510,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },

      {
        breakpoint: 860,
        settings: {
          slidesToShow: 2,
        }
      },

      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });
}

// настройка анимаций при скролле
function setCorrectAnimations() {
  new WOW().init();
}

// настройка уведомления при регистрации обратного звонка
function setCorrectAttention() {
  const attention = document.querySelector('.attention');
  const closeAttention = attention.querySelector('.attention__close');
  const acceptAttention = attention.querySelector('.attention__accept');
  const usernameSpan = attention.querySelector('.username');
  const nameInput = document.querySelector('input[name="username"]');
  const telInput = document.querySelector('input[name="usertel"]');
  const getCallbackBtn = document.querySelector('.get-callback');

  getCallbackBtn.addEventListener('click', () => {
    if (nameInput.value.length > 2 && telInput.value.length > 4) {
      const username = nameInput.value;
      usernameSpan.textContent = username;

      showAttention();
      nameInput.value = '';
      telInput.value = '';

      // убираем уведомление через время
      setTimeout(() => {
        if (attention.classList.contains('active'))
          attention.classList.remove('active');
      }, 6000);
    }
  });

  closeAttention.addEventListener('click', () => {
    hideAttention();
  });
  
  acceptAttention.addEventListener('click', () => {
    hideAttention();
  });

  // Показать предупреждение
  function showAttention() {
    attention.classList.add('active');
  }

  // Скрыть предупреждение
  function hideAttention() {
    attention.classList.remove('active');
  }
}

// применение всех настроек
function setAllOptions() {
  document.addEventListener('DOMContentLoaded', () => {
    setCorrectSidebar();
    setCorrectAnchors();
    setCorrectSliders();
    setCorrectAttention();
    setCorrectAccordeon();
    setCorrectAnimations();

    // то что должно меняться от размера экрана
    window.addEventListener('resize', function() {
      setCorrectSidebar();
      // setCorrectSliders();
    });
  });
}

try {
  setAllOptions();
} catch(err) {
  console.error(err.message);
}
