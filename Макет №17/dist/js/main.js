"use strict";

document.addEventListener('DOMContentLoaded', function () {
  setCorrectBurger();
  setCorrectPopup();
  setCorrectVideo();
  setCorrectAccordeon();
  setCorrectSliders();
  setCorrectInputTel();
  setCorrectLazyLoad();
  setCorrectAnimsByScroll();
  setCorrectMarketTabs();

  // Настройка поведения бургера
  function setCorrectBurger() {
    var burgerBtn = document.querySelector('.burger-btn');
    var headerTop = document.querySelector('.header-top');
    var menu = document.querySelector('.nav');
    burgerBtn.addEventListener('click', function () {
      headerTop.classList.toggle('active-nav');
    });
  }

  // Настройка поведения попапа
  function setCorrectPopup() {
    var loginBtn = document.querySelector('.login-btn');
    var loginPopup = document.querySelector('.login-popup');
    var loginClose = loginPopup.querySelector('.popup-content__close');
    loginBtn.addEventListener('click', function () {
      loginPopup.classList.add('active');
    });
    loginClose.addEventListener('click', function () {
      loginPopup.classList.remove('active');
    });
    loginPopup.addEventListener('click', function (event) {
      if (event.target.closest('.popup-content')) return;
      loginPopup.classList.remove('active');
    });
  }

  // Настройка поведения видео
  function setCorrectVideo() {
    // const video = '<iframe class="video-content_vidoe.video" width="1220" height="675" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    var videoHtml = "<video class=\"video\" controls>\n                         <source src=\"./videos/video.mp4\">\n                       </video>";
    var videoBlock = document.querySelector('.video-block');
    var videoInfo = videoBlock.querySelector('.video-content');
    var videoPlayBtn = videoBlock.querySelector('.play-video');
    videoPlayBtn.addEventListener('click', function () {
      videoBlock.style.background = '#000';
      videoInfo.style.display = 'none';
      videoBlock.insertAdjacentHTML('afterbegin', videoHtml);
      var video = document.querySelector('.video');
      video.volume = 0.5;
      video.play();
    });
  }

  // Настройка поведения аккордеона
  function setCorrectAccordeon() {
    var accordeon = document.querySelector('.accordeon');
    var accordeonItems = Array.from(accordeon.querySelectorAll('.accordeon-item'));
    var unActiveAllExceptOne = function unActiveAllExceptOne(exceptItem) {
      accordeonItems.forEach(function (accordeonItem) {
        if (accordeonItem === exceptItem) return;
        var accordeonItemBottom = accordeonItem.querySelector('.accordeon-item__bottom');
        if (!accordeonItemBottom) return;
        accordeonItem.classList.remove('active');
        accordeonItemBottom.style.maxHeight = '0px';
      });
    };
    var unActive = function unActive(accordeonItem) {
      var accordeonItemBottom = accordeonItem.querySelector('.accordeon-item__bottom');
      accordeonItem.classList.remove('active');
      accordeonItemBottom.style.maxHeight = '0px';
    };
    accordeon.addEventListener('click', function (event) {
      var accordeonItemTop = event.target.closest('.accordeon-item__top');
      if (!accordeonItemTop) return;
      var accordeonItem = event.target.closest('.accordeon-item');
      var accordeonItemRow = accordeonItem.querySelector('.accordeon-item__row');
      var accordeonItemBottom = accordeonItem.querySelector('.accordeon-item__bottom');
      unActiveAllExceptOne(accordeonItem);
      if (!accordeonItem.classList.contains('active')) {
        accordeonItem.classList.add('active');
        accordeonItemBottom.style.maxHeight = accordeonItemRow.scrollHeight + 'px';
      } else unActive(accordeonItem);
    });
  }

  // Настройка слайдеров
  function setCorrectSliders() {
    var setPhotosSlider = function setPhotosSlider() {
      var photosSlider = document.querySelector('.photos-slider');
      var photosSwiper = new Swiper(photosSlider, {
        slidesPerView: 1.2,
        slidesOffsetBefore: 35,
        loop: true,
        grabCursor: true,
        mousewheel: {
          releaseOnEdges: true
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        breakpoints: {
          1280: {
            slidesPerView: 5,
            slidesOffsetBefore: 0
          },
          1200: {
            slidesOffsetBefore: 70
          },
          1120: {
            slidesPerView: 4.3,
            slidesOffsetBefore: 50
          },
          1070: {
            slidesPerView: 3.3,
            slidesOffsetBefore: 75
          },
          945: {
            slidesPerView: 3.3,
            slidesOffsetBefore: 65
          },
          860: {
            slidesPerView: 3.3,
            slidesOffsetBefore: 55
          },
          840: {
            slidesPerView: 3.1,
            slidesOffsetBefore: 25
          },
          790: {
            slidesPerView: 3.1,
            slidesOffsetBefore: 20
          },
          775: {
            slidesPerView: 3,
            slidesOffsetBefore: 7
          },
          765: {
            slidesPerView: 3,
            slidesOffsetBefore: 4
          },
          710: {
            slidesPerView: 2.6,
            slidesOffsetBefore: 100
          },
          675: {
            slidesPerView: 2.6,
            slidesOffsetBefore: 90
          },
          650: {
            slidesPerView: 2.3,
            slidesOffsetBefore: 60
          },
          620: {
            slidesPerView: 2.3,
            slidesOffsetBefore: 55
          },
          600: {
            slidesPerView: 2.3,
            slidesOffsetBefore: 45
          },
          580: {
            slidesPerView: 2.1,
            slidesOffsetBefore: 30
          },
          560: {
            slidesPerView: 2.1,
            slidesOffsetBefore: 20
          },
          530: {
            slidesPerView: 2,
            slidesOffsetBefore: 10
          },
          500: {
            slidesPerView: 1.7,
            slidesOffsetBefore: 120
          },
          460: {
            slidesPerView: 1.7,
            slidesOffsetBefore: 100
          },
          430: {
            slidesPerView: 1.5,
            slidesOffsetBefore: 90
          },
          400: {
            slidesPerView: 1.5,
            slidesOffsetBefore: 70
          },
          380: {
            slidesPerView: 1.3,
            slidesOffsetBefore: 55
          },
          355: {
            slidesPerView: 1.3,
            slidesOffsetBefore: 45
          }
        }
      });
      photosSwiper.slideNext(0);
      photosSwiper.slidePrev(0);
    };
    var setExpertsSlider = function setExpertsSlider() {
      var expertsSlider = document.querySelector('.experts-slider');
      var expertsSwiper = new Swiper(expertsSlider, {
        spaceBetween: 35,
        slidesPerView: 1.5,
        grabCursor: true,
        navigation: {
          nextEl: '.experts-slider__nav_next.arrow',
          prevEl: '.experts-slider__nav_prev.arrow'
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        breakpoints: {
          1350: {
            slidesPerView: 4,
            navigation: {
              nextEl: '.experts-slider__nav_next.circle',
              prevEl: '.experts-slider__nav_prev.circle'
            }
          },
          860: {
            slidesPerView: 3
          },
          650: {
            slidesPerView: 2.5
          },
          515: {
            slidesPerView: 2
          }
        }
      });
    };
    setPhotosSlider();
    setExpertsSlider();
  }

  // Настройка инпута для ввода телефона
  function setCorrectInputTel() {
    var form = document.querySelector('.feedback-form');
    var telInput = document.querySelector('input#phone');
    var updatePlaceholder = function updatePlaceholder() {
      var flag = document.querySelector('.iti__selected-flag');
      var placeholder = flag.title.split(':')[1];
      telInput.placeholder = placeholder;
    };
    window.intlTelInput(telInput, {
      initialCountry: 'ru'
    });
    form.addEventListener('click', updatePlaceholder);
    updatePlaceholder();
  }

  // Настройка ленивой загрузки
  function setCorrectLazyLoad() {
    new LazyLoad({});
  }

  // Настройка анимаций при скролле
  function setCorrectAnimsByScroll() {
    new WOW().init();
  }

  // Настройка табов для смены рынков и их характеристик
  function setCorrectMarketTabs() {
    var tabs = document.querySelectorAll('.markets-tabs__tab');
    var unActiveAll = function unActiveAll() {
      return tabs.forEach(function (tab) {
        return tab.classList.remove('active');
      });
    };
    var nearEastTab = document.querySelector('#near-east');
    var asiaTab = document.querySelector('#asia');
    var latinAmericaTab = document.querySelector('#latin-america');
    var africaTab = document.querySelector('#africa');
    var countriesText = document.querySelector('.markets-about__countries');
    var investmentsText = document.querySelector('.markets-blocks__card.investments .card__count b');
    var accelerators = document.querySelector('.markets-blocks__card.accelerators .card__count b');
    var fondsText = document.querySelector('.markets-blocks__card.fonds .card__count b');
    var writeInfo = function writeInfo(objInfo) {
      countriesText.textContent = objInfo.countries.join(', ');
      investmentsText.textContent = objInfo.investments;
      accelerators.textContent = objInfo.accelerators;
      fondsText.textContent = objInfo.fonds;
    };
    var marketsMap = new Map([[nearEastTab, {
      countries: ['ОАЭ', 'Саудовская Аравия', 'Израиль', 'Оман', 'Бахрейн', 'Катар', 'Тунис', 'Йемен', 'Египет', 'Алжир'],
      investments: '5,5',
      accelerators: '300',
      fonds: '73'
    }], [asiaTab, {
      countries: ['Казахстан', 'Монголия', 'Иран', 'Китай', 'Афганистан', 'Индия', 'Пакистан', 'Вьетнам'],
      investments: '3,9',
      accelerators: '230',
      fonds: '60'
    }], [latinAmericaTab, {
      countries: ['Бразилия', 'Аргентина', 'Уругвай', 'Парагвай', 'Боливия', 'Эквадор', 'Колумбия', 'Чили'],
      investments: '2,7',
      accelerators: '170',
      fonds: '43'
    }], [africaTab, {
      countries: ['Египет', 'Ливия', 'Алжир', 'Тунис', 'Марокко', 'Мадагаскар'],
      investments: '1,3',
      accelerators: '90',
      fonds: '39'
    }]]);
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        unActiveAll();
        tab.classList.add('active');
        var objInfo = marketsMap.get(tab);
        writeInfo(objInfo);
      });
    });
  }
});