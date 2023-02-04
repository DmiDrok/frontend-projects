// Установщик корректного поведения элементов
const pagesCorrector = {
  // При фокусировке на поиске - менять класс картинке рядом
  searchImagesColors: function() {
    const searchInput = document.querySelector('.search input');
    const firstImage = document.querySelector('.search__image:first-child');

    searchInput.onfocus = () => {
      firstImage.classList.add('active');
    };

    searchInput.onblur = () => {
      firstImage.classList.remove('active');
    };
  },

  // Живой поиск
  liveSearch: function() {
    const searchInput = document.querySelector('.search input');
    const geoImage = document.querySelector('.search__image.location');
    const liveSearchContainer = document.querySelector('.search__live-container');
    const liveList = liveSearchContainer.querySelector('.search .live-list');


    // Делегируем событие клика по подсказке на сам список
    liveList.onclick = (event) => {
      let address = event.target.dataset.address;
      if (!address) return;
      
      searchInput.value = event.target.dataset.address;
      searchInput.classList.add('green-paste');
      disableActive();

      setTimeout(() => {
        searchInput.classList.remove('green-paste');
      }, 750);
    };

    searchInput.oninput = getList;
    searchInput.onfocus = getList;

    // Получить список с адресами
    function getList() {
      let userValue = searchInput.value.trim().toLowerCase().replace('[@#$%^&*().]', '');
      // Проверка введенной строки с адресами
      let results = addresses.filter(address => address.toLowerCase().includes(userValue));
      liveList.innerHTML = "";
      
      geoImage.classList.add('active');

      if (userValue) { 
        setToActive();
        results.forEach(result => {
          let searchElem = document.createElement('li');
          searchElem.classList.add('live-list__item');
          searchElem.textContent = result;
          searchElem.dataset.address = result;
          
          // Записываем в список подсказок адрес из отфильтрованного массива
          liveList.insertAdjacentElement('beforeend', searchElem);
        });
      }
      else disableActive();
    }

    // Добавить используемым элементам класс 'active'
    function setToActive() {
      searchInput.classList.add('active');
      liveSearchContainer.classList.add('active');
    }

    // Убрать с элементов класс 'active'
    function disableActive() {
      searchInput.classList.remove('active');
      liveSearchContainer.classList.remove('active');
    }
  },

  // Кастомные скроллы
  customScrollbars: function() {
    const liveSearchContainer = document.querySelector('.search__live-container');
    new SimpleBar(liveSearchContainer);
  },

  // Слайдеры
  sliders: function() {

    setMenuSlider();
    setDishesSlider();

    // Линию блюд сделать слайдером
    function setDishesSlider() {
      const dishesSliders = document.querySelectorAll('.dishes__line');
      dishesSliders.forEach(slider => {
        const swiper = new Swiper(slider, {
          slidesPerView: 1.1,
          spaceBetween: 20,
          slidesOffsetBefore: 15,
          grabCursor: true,
          loop: true,
          allowTouchMove: true,
          autoHeight: false,
          preloadImages: false,
          watchSlidesProgress: true,
          // slideToClickedSlide: true,
          observer: true,
          observeSlideChildren: true,
          observeParents: true,
          lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true,
          },
          breakpoints: {          
            410: {
              slidesPerView: 1.3,
              slidesOffsetBefore: 45,
            },
            
            480: {
              slidesPerView: 1.4,
              slidesOffsetBefore: 65,
            },

            515: {
              slidesPerView: 1.7,
              slidesOffsetBefore: 85,
            },
            
            620: {  
              slidesPerView: 2.1,
              slidesOffsetBefore: 15,
            },
            
            760: {
              slidesPerView: 2.3,
              slidesOffsetBefore: 45,
            },
            
            820: {
              slidesPerView: 2.4,
              slidesOffsetBefore: 65,
            },

            860: {
              slidesPerView: 2.7,
              slidesOffsetBefore: 95,
            },
            
            965: {
              slidesPerView: 3.1,
              slidesOffsetBefore: 15,
            },
            
            1110: {
              slidesPerView: 3.3,
              slidesOffsetBefore: 45,
            },
            
            1170: {
              slidesPerView: 3.7,
              slidesOffsetBefore: 95,
            },

            1310: {
              slidesPerView: 4.3,
              slidesOffsetBefore: 45,
            }
          },

          on: {
            slideChange: function() {              
              this.slides.forEach(slide => {
                if (slide.classList.contains('in-basket')) {
                  this.slides.forEach(item => {
                    if (item.dataset.dish === slide.dataset.dish) {
                      item.classList.add('in-basket');
                      item.innerHTML = slide.innerHTML;
                    }
                  });
                }
              });
            }
          }
        });

        if (slider.classList.contains('no-loop') && window.matchMedia('(min-width: 1310px)').matches) {
          swiper.loopDestroy();
        }
      });
    }

    // Меню для блюд сделать слайдером
    function setMenuSlider() {
      const menuSlider = document.querySelector('.menu__slider');
      new Swiper(menuSlider, {
        slidesPerView: 'auto',
        watchOverflow: true,
        spaceBetween: 25,

        // breakpoints: {
        //   960: {
        //     slidesPerView: 'auto',
        //     spaceBetween: 0,
        //   },

        //   715: {
        //     slidesPerView: 5,
        //   },

        //   560: {
        //     slidesPerView: 4,
        //   },

        //   350: {
        //     slidesPerView: 2.5
        //   }
        // }
      });
    }
  },

  // Параллакс
  parallax: function() {
    window.onscroll = () => {
      document.documentElement.style.setProperty('--scrollTop', window.scrollY + 'px');
    }
  },

  // Якори
  anchors: function() {
    const anchorsNav = document.querySelector('.menu');
    const anchors = document.querySelectorAll('.anchor');

    anchors.forEach(anchor => {
      anchor.onclick = (event) => {
        event.preventDefault();
        let toScroll = document.querySelector(anchor.getAttribute('href'));
        let top = toScroll.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: top-anchorsNav.clientHeight,
          behavior: 'smooth'
        });
      };
    });
  },

  // Липкое меню при скролле
  stickyMenu: function() {
    // Элементы, связанные с меню
    const menu = document.querySelector('.menu');
    const menuRow = menu.querySelector('.menu__row');
    const menuY = menu.getBoundingClientRect().top + window.scrollY;
    
    // Элементы корзины
    const basketBtn = document.querySelector('.header__basket');
    const clonedBasketBtn = basketBtn.cloneNode(true);
    
    // Шапка сайта
    const header = document.querySelector('.header');

    // Маленький ли девайс
    const isSmallDevice = window.matchMedia('(max-width: 410px)').matches;
    
    removeSticky();
    scrollLogic();
    window.addEventListener('scroll', scrollLogic);

    // Алгоритм, отрабатывающий при скроле
    function scrollLogic() {
      if (window.scrollY >= menuY) setSticky();
      else if (isSmallDevice && window.scrollY+header.offsetHeight >= menuY) setSticky();
      else removeSticky();
    }

    // Сделать меню липким
    function setSticky() {
      if (menu.classList.contains('sticky')) return;

      menu.classList.add('sticky');
      document.body.style.marginTop = getComputedStyle(menu).height;
      
      if (window.matchMedia('(max-width: 410px)').matches)
        setOffsetByHeaderHeight();
      // Если мы не на мобильном устройстве - крепим ссылку на корзину в меню
      else {
        insertBasketToMenu();
        menu.style.top = "";
      };
    }
    
    // Вернуть обычное меню
    function removeSticky() {
      menu.classList.remove('sticky');
      header.classList.remove('hide-address');
      document.body.style.marginTop = "";

      removeBasketFromMenu();
    }

    // Вставить ссылку на корзину в блок с меню
    function insertBasketToMenu() {
      if (menu.querySelector('.basket')) return;

      menu.classList.add('with-basket');
      menuRow.insertAdjacentElement('beforeend', clonedBasketBtn);
    }
    
    // Удалить ссылку на корзину из блока с меню
    function removeBasketFromMenu() {
      menu.classList.remove('with-basket');
      
      let menuBasket = menuRow.querySelector('.basket');
      if (menuBasket) menuBasket.remove();
    }

    // Задать меню отступ в высоту шапки сайта (только при фиксированной шапке)
    function setOffsetByHeaderHeight() {
      // if (getComputedStyle(header).position !== 'fixed') return

      header.classList.add('hide-address');
      let headerHeight = getComputedStyle(header).height
      menu.style.top = headerHeight; 
    }
  },

  // "Добавление в корзину"
  addToBasketIllusion: function() {
    let totalCount = 0;
    let count = {};
    const maxCount = 10;

    document.addEventListener('click', event => {
      const dish = event.target.closest('.dish-card');
      if (!dish) return;
      const dishAddBtn = event.target.closest('.dish-add');
      const addBtn = event.target.closest('.dish-plus');
      const removeBtn = event.target.closest('.dish-minus');
      const deleteBtn = event.target.closest('.dish-delete');
      const counter = dish.querySelector('.dish-count');
      const globalCounters = document.getElementsByClassName('basket__count');
      const dishKey = dish.dataset.dish;

      
      if (dishAddBtn) {
        event.preventDefault();

        totalCount++;

        // Начальное положение "блюда в корзине"
        showInBasketCard(dish, counter);
        updateGlobalCounters(globalCounters, 1);

      } else if (addBtn || removeBtn || deleteBtn) {
        if (!count[dishKey]) {
          count[dishKey] = 1;
        }

        // Действия при клике на кнопки добавление/удаления
        if (addBtn && count[dishKey] + 1 <= maxCount) {
          count[dishKey]++;
          totalCount++;
        } else if (removeBtn) {
          count[dishKey]--;
          totalCount--;

          if (count[dishKey] <= 0) updateOnZeroCount(dish, dishKey);
        } else if (deleteBtn) {
          deleteBasketDish(dish, dishKey);
        }

        counter.textContent = count[dishKey];
        updateGlobalCounters(globalCounters, count[dishKey]);
      }
    });

    // Показать только-только добавленное блюдо в корзину
    function showInBasketCard(dish, counter) {
      dish.classList.add('in-basket');
      counter.textContent = 1;
    }

    // Обновить глобальные счётчики корзины
    function updateGlobalCounters(globalCounters) {
      Array.from(globalCounters).forEach(counter => counter.textContent = totalCount);
    }

    // Действия при нулевом количестве товара
    function updateOnZeroCount(dish, dishKey) {
      dish.classList.remove('in-basket');
      delete count[dishKey];

      if (dish.classList.contains('basket-item')) {
        dish.remove();
      }
    }

    // Удаление товара из корзины (страница корзины)
    function deleteBasketDish(dish, dishKey) {
      delete count[dishKey];
      dish.remove();
    }
  },

  // Выделение нужных элементов меню при скролле
  observeMenuSections: function() {
    const observer = new IntersectionObserver(inDishSectionEntry, {
      threshold: 0.5
    });
    const sections = document.querySelectorAll('.dishes');
    const menuAnchors = document.querySelectorAll('.menu .anchor');

    sections.forEach(section => observer.observe(section));

    // Функция, выполняющаяся при появлении секции блюд в viewport
    function inDishSectionEntry(entries) {
      entries.forEach(item => {
        const element = item.target;
        if (item.isIntersecting) changeActiveFromAnchor({ element, addActive: true });
        else changeActiveFromAnchor({element, addActive: false});
      });
    }

    // Добавить активный класс с якорю, связанному с секцией блюд
    function changeActiveFromAnchor({ element, addActive }) {
      menuAnchors.forEach(anchor => {
        const anchorParent = anchor.closest('.menu-list__item');

        addActive ? anchorParent.classList.remove('active') : {};
        if (anchor.getAttribute('href').replace('#', '').trim() === element.id) {
          addActive ? 
            anchorParent.classList.add('active')
            :
            anchorParent.classList.remove('active')
        }
      });
    }
  },

  // Настройка бургер-меню
  burgerMenu: function() {
    const headerRow = document.querySelector('.header__row');
    const burger = headerRow.querySelector('.burger');
    const menu = document.querySelector('.footer__links');

    burger.addEventListener('click', onclickBurger);
    document.addEventListener('click', (event) => {
      if (event.target.closest('.footer__links')) return;
      toggleBurger({ remove: true });
    });
    
    
    // Функция при клике на бургер
    function onclickBurger(event) {
      event.stopPropagation();
      toggleBurger({ toggle: true });
    }
    
    // Переключение классов бургера
    function toggleBurger({ toggle, remove }) {
      if (toggle) {
        menu.classList.toggle('active');
        burger.classList.toggle('active');
      } else if (remove) {
        menu.classList.remove('active');
        burger.classList.remove('active');
      }
      
      if (burger.classList.contains('active'))
        menu.insertAdjacentElement('beforeend', burger);
      else 
        headerRow.insertAdjacentElement('afterbegin', burger);
    }
  },

  // При клике на товары
  byClickOnDishes: function() {
    document.addEventListener('click', event => {
      const targetParent = event.target.closest('.dish');
      if (targetParent) window.location = targetParent.dataset.href;
    })
  },

  // Обработка кликов на кнопки внутри ссылок (чтобы не срабатывал переход по ссылке)
  byClickLinkButtons: function() {
    document.addEventListener('click', event => {
      if (event.target.closest('.ignore-link'))
        event.preventDefault();
    });
  },

  // Настройка аккордеона (клики)
  accordeonClicks: function() {
    const answers = document.querySelectorAll('.answer');
    const answerOffset = 20;

    answers.forEach(answer => {
      answer.onclick = () => {
        closeAllSaveOne(answer);
        if (!answer.classList.contains('active')) showAnswer(answer);
        else closeAnswer(answer);
      };
    });

    // Развернуть ответ
    function showAnswer(answer) {
      answer.classList.add('active');
      answer.style.height = answer.scrollHeight-answerOffset + 'px';
    }

    // Свернуть ответ
    function closeAnswer(answer) {
      answer.classList.remove('active');
      answer.style.height = '';

      pagesCorrector.accordeon.setHeight(answer);
    }

    // Свернуть все ответы кроме нажатого
    function closeAllSaveOne(answer) {
      answers.forEach(elem => {
        if (answer !== elem) {
          elem.classList.remove('active');
          closeAnswer(elem);
        }
      });
    }
  },

  // Настройка аккордеона (высота)
  accordeonHeight: function() {
    const answers = document.querySelectorAll('.answer');

    answers.forEach(answer => {
      this.accordeon.setHeight(answer);
    });
  },

  // Общие функции для аккордеона (потом стоит бы объединить)
  accordeon: {
    setHeight: function(answer) {
      const answerVisible = answer.querySelector('.answer__visible');
      answer.style.height = getComputedStyle(answerVisible).height;
    }
  },

  // Модалка "Пустая корзина"
  modalEmptyBasket: function() {
    const modal = document.querySelector('.empty');
    if (!modal) return;

    const modalClose = modal.querySelector('.empty__close');
    const basket = document.querySelector('.basket');

    basket.addEventListener('click', event => {
      if (basket.classList.contains('empty-basket')) {
        event.stopPropagation();
        event.preventDefault();
        showModal();
      }
    });
    modalClose.onclick = hideModal;

    document.addEventListener('click', event => {
      if (modal.classList.contains('active') && event.target === modal) {
        hideModal();
      }
    });

    // Показать модальное окно
    function showModal() {
      modal.classList.add('active');
    }

    // Скрыть модальное окно
    function hideModal() {
      modal.classList.remove('active');
    }
  },

  // Настройка масок для полей ввода
  inputMasks: function() {
    const inputTel = document.querySelector('.order-form__tel');
    const inputTime = document.querySelector('.order-form__time');
    if (!inputTel && !inputTime) return;

    const maskTel = new Inputmask('+7-(999)-999-99-99');
    const maskTime = new Inputmask({ regex: "[0-2][0-9]:[0-9][0-9]" });

    maskTel.mask(inputTel);
    maskTime.mask(inputTime)
  },

  // Настройка ввода времени
  setTimeInput: function() {
    const timeInput = document.querySelector('.order-form__when-info input[name="when-time"]'); 
    if (!timeInput) return;

    timeInput.addEventListener('keydown', event => {
      const inputValueLength = parseFloat(timeInput.value);

      if (Number.isNaN(inputValueLength)) {
        const firstPressedButton = event.key;
        if (firstPressedButton > 2)
          timeInput.value = `0${firstPressedButton}`;
      }
    });
  },

  // Настройка счётчика персон в оформлении заказа
  personCounter: function() {
    const counter = document.querySelector('.counter');
    if (!counter) return;
    const counterCount = document.querySelector('.counter__count');
    const counterMinus = document.querySelector('.counter__minus');
    const counterPlus = document.querySelector('.counter__plus');
    const maxPersons = 99;
    const minPersons = 1;

    let count = 1;

    counterMinus.addEventListener('click', () => {
      minusOnePerson();
      counterCount.textContent = count;
    });
    counterPlus.addEventListener('click', () => {
      plusOnePerson();
      counterCount.textContent = count;
    });

    function minusOnePerson() {
      return isValid(count-1) ? --count : count;
    }

    function plusOnePerson() {
      return isValid(count+1) ? ++count : count;
    }

    // Проверка на валидность количества персон
    function isValid(count) {
      return minPersons <= count && count <= maxPersons;
    }
  },

  // Подставить другие текста на мобильных устройствах
  replaceTextsOnMobile: function() {
    setAnotherOnRadioLabel();

    // Другой текст на лейбле к радио-кнопке
    function setAnotherOnRadioLabel() {
      const label = document.querySelector('.order-form__pay-info .order-form__label_radio_2');
      if (!label) return;

      if (window.matchMedia('(max-width: 620px)').matches) 
        label.textContent = 'Карта';
    }
  },

  // Показать выпадающий список или инпуты в зависимости от выбранного
  formFields: function() {
    const deliveryRadios = document.querySelectorAll('.order-form__delivery-info input[type="radio"]');
    const youArea = document.querySelector('.order-form__you-radio-area');
    const meArea = document.querySelector('.order-form__me-radio-area');
    
    const payRadios = document.querySelectorAll('.order-form__pay-info input[type="radio"]');
    const moneyArea = document.querySelector('.order-form__odd-money');

    // Коллекции действий при клике на разные кнопки
    const mapDeliveryActions = new Map([
      [deliveryRadios[0], () => {
        youArea.classList.add('active');
        meArea.classList.remove('active');
      }],
      [deliveryRadios[1], () => {
        youArea.classList.remove('active');
        meArea.classList.add('active');
      }]
    ]);
    const mapPayActions = new Map([
      [payRadios[0], () => {
        if (moneyArea.style.display !== 'block')
          moneyArea.style.display = 'block';
      }],
      [payRadios[1], () => {
        if (moneyArea.style.display !== 'none')
          moneyArea.style.display = 'none';
      }],
      [payRadios[2], () => {
        if (moneyArea.style.display !== 'block')
          moneyArea.style.display = 'block';
      }],
    ]);

    deliveryRadios.forEach((radio, index) => {
      radio.addEventListener('input', mapDeliveryActions.get(deliveryRadios[index]))
    });
    payRadios.forEach((radio, index) => {
      radio.addEventListener('input', mapPayActions.get(payRadios[index]));
    });
  },

  // Настройка выпадающих списков
  setChoices: function() {
    const restaurantChoice = document.querySelector('.order-form__select');
    if (!restaurantChoice) return;
    new Choices(restaurantChoice, {
      searchEnabled: false,
      shouldSort: false,
      itemSelectText: '',
      placeholder: true,
      placeholderValue: 'Выбирай ресторан'
    });
  },

  // Вставка iframe в зависимости от десктопа / мобилки
  adaptiveIframes: function() {
    const contacts = document.querySelector('.contacts__map');
    if (!contacts) return;
    const mapsOpts = {
      sources: {
        desktop: 'https://yandex.ru/map-widget/v1/?um=constructor%3Aa49278fee8b4fc92e5fdb8aff3b9cb847ed4e4b7b3df97de61dfa7352ebc9939&amp;source=constructor',
        mobile: 'https://yandex.ru/map-widget/v1/?um=constructor%3A20a242187ac28497c533123bf0c9676debfdac38781d17af870af0e3d16f4134&amp;source=constructor'
      },

      classNames: {
        desktop: 'desktop-iframe',
        mobile: 'mobile-iframe'
      }
    };

    let map = null;
    if (window.matchMedia('(max-width: 910px)').matches && !isExistsMaps().mobile) {
      map = getMap(mapsOpts.sources.mobile, mapsOpts.classNames.mobile);
    } else if (!isExistsMaps().desktop) {
      map = getMap(mapsOpts.sources.desktop, mapsOpts.classNames.desktop);
    }
    map ? setMapOnPage(map) : {};

    // Фабрика для карт
    function getMap(src, className) {
      const map = document.createElement('iframe');
      map.classList.add(className);
      map.src = src;
      map.width = '100%';
      map.height = '600px';

      return map;
    }

    // Разместить карту на странице
    function setMapOnPage(mapObj) {
      contacts.insertAdjacentElement('afterbegin', mapObj);
    }

    // Существование карт на странице
    function isExistsMaps() {
      return {
        desktop: Boolean(document.querySelector('.' + mapsOpts.classNames.desktop)),
        mobile: Boolean(document.querySelector('.' + mapsOpts.classNames.mobile))
      };
    }
  },

  // Убрать placeholder'ы в инпутах при вводе
  hideOrderInputsPlaceholders: function() {
    const orderBlocks = document.querySelectorAll('.order-form__input-block');

    orderBlocks.forEach(block => {
      const input = block.querySelector('input');
      const inputPlaceholder = block.querySelector('.input-text');

      // Поначалу показывает все placeholder'ы
      showPlaceholder(inputPlaceholder);

      input.addEventListener('change', () => {
        if (input.value.length > 0) hidePlaceholder(inputPlaceholder);
        else showPlaceholder(inputPlaceholder);
      });

      function hidePlaceholder(inputPlaceholder) {
        inputPlaceholder.classList.remove('active');
        inputPlaceholder.classList.add('hide');
      }

      function showPlaceholder(inputPlaceholder) {
        inputPlaceholder.classList.remove('hide');
        inputPlaceholder.classList.add('active');
      }
    });
  }
};

// Применить все настраивающие скрипты
function applyAll() {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      pagesCorrector.searchImagesColors();
      pagesCorrector.liveSearch();
      pagesCorrector.customScrollbars();
      pagesCorrector.sliders();
      // corrector.parallax();
      pagesCorrector.anchors();
      pagesCorrector.addToBasketIllusion();
      pagesCorrector.stickyMenu();
      pagesCorrector.observeMenuSections();
      pagesCorrector.burgerMenu();
      // corrector.byClickOnDishes();
      pagesCorrector.byClickLinkButtons();
      pagesCorrector.accordeonClicks();
      pagesCorrector.accordeonHeight();
      pagesCorrector.modalEmptyBasket();
      pagesCorrector.inputMasks();
      pagesCorrector.personCounter();
      pagesCorrector.replaceTextsOnMobile();
      pagesCorrector.formFields();
      pagesCorrector.setChoices();
      pagesCorrector.setTimeInput();
      pagesCorrector.adaptiveIframes();
      pagesCorrector.hideOrderInputsPlaceholders();
    } catch(err) {
      console.error(err);
    }
  });

  // const banner = document.querySelector('.banner img');
  // banner.onload = corrector.stickyMenu;
}
applyAll();


// Функции, которые должны срабатывать при изменении размеров экрана
function applyAdaptive() {
  pagesCorrector.stickyMenu();
  pagesCorrector.accordeonHeight();
  pagesCorrector.replaceTextsOnMobile();
  pagesCorrector.adaptiveIframes();
}

// При изменении размеров экрана - применяем ф-ии, зависящие от него
window.addEventListener('resize', applyAdaptive);

