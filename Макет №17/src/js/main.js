document.addEventListener('DOMContentLoaded', () => {

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
    const burgerBtn = document.querySelector('.burger-btn');
    const headerTop = document.querySelector('.header-top');
    const menu = document.querySelector('.nav');

    burgerBtn.addEventListener('click', () => {
      headerTop.classList.toggle('active-nav');
    });
  }

  // Настройка поведения попапа
  function setCorrectPopup() {
    const loginBtn = document.querySelector('.login-btn');
    const loginPopup = document.querySelector('.login-popup');
    const loginClose = loginPopup.querySelector('.popup-content__close');

    loginBtn.addEventListener('click', () => {
      loginPopup.classList.add('active');
    });

    loginClose.addEventListener('click', () => {
      loginPopup.classList.remove('active');
    });

    loginPopup.addEventListener('click', event => {
      if (event.target.closest('.popup-content')) return;
      loginPopup.classList.remove('active');
    });
  }

  // Настройка поведения видео
  function setCorrectVideo() {
    // const video = '<iframe class="video-content_vidoe.video" width="1220" height="675" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    const videoHtml = `<video class="video" controls>
                         <source src="./videos/video.mp4">
                       </video>`;
    const videoBlock = document.querySelector('.video-block');
    const videoInfo = videoBlock.querySelector('.video-content');
    const videoPlayBtn = videoBlock.querySelector('.play-video');

    videoPlayBtn.addEventListener('click', () => {
      videoBlock.style.background = '#000';
      videoInfo.style.display = 'none';
      videoBlock.insertAdjacentHTML('afterbegin', videoHtml);

      const video = document.querySelector('.video');
      video.volume = 0.5;
      video.play();
    });
  }

  // Настройка поведения аккордеона
  function setCorrectAccordeon() {
    const accordeon = document.querySelector('.accordeon');
    const accordeonItems = Array.from(accordeon.querySelectorAll('.accordeon-item'));
    const unActiveAllExceptOne = (exceptItem) => {
      accordeonItems.forEach(accordeonItem => {
        if (accordeonItem === exceptItem) return;

        const accordeonItemBottom = accordeonItem.querySelector('.accordeon-item__bottom');
        if (!accordeonItemBottom) return;
        
        accordeonItem.classList.remove('active');
        accordeonItemBottom.style.maxHeight = '0px';
      });
    };
    const unActive = accordeonItem => {
      const accordeonItemBottom = accordeonItem.querySelector('.accordeon-item__bottom');
      accordeonItem.classList.remove('active');
      accordeonItemBottom.style.maxHeight = '0px';
    };

    accordeon.addEventListener('click', event => {
      const accordeonItemTop = event.target.closest('.accordeon-item__top');
      if (!accordeonItemTop) return;

      const accordeonItem = event.target.closest('.accordeon-item');
      const accordeonItemRow = accordeonItem.querySelector('.accordeon-item__row');
      const accordeonItemBottom = accordeonItem.querySelector('.accordeon-item__bottom');
      
      unActiveAllExceptOne(accordeonItem);

      if (!accordeonItem.classList.contains('active')) {
        accordeonItem.classList.add('active');
        accordeonItemBottom.style.maxHeight = accordeonItemRow.scrollHeight + 'px';
      } else unActive(accordeonItem);
    });
  }

  // Настройка слайдеров
  function setCorrectSliders() {
    const setPhotosSlider = () => {
      const photosSlider = document.querySelector('.photos-slider');
      const photosSwiper = new Swiper(photosSlider, {
        slidesPerView: 1.2,
        slidesOffsetBefore: 35,
        loop: true,
        grabCursor: true,
        mousewheel: {
          releaseOnEdges: true,
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },

        breakpoints: {
          1280: {
            slidesPerView: 5,
            slidesOffsetBefore: 0,
          },

          1200: {
            slidesOffsetBefore: 70,
          },

          1120: {
            slidesPerView: 4.3,
            slidesOffsetBefore: 50,
          },

          1070: {
            slidesPerView: 3.3,
            slidesOffsetBefore: 75,
          },
          
          945: {
            slidesPerView: 3.3,
            slidesOffsetBefore: 65,
          },
          
          860: {
            slidesPerView: 3.3,
            slidesOffsetBefore: 55,
          },

          840: {
            slidesPerView: 3.1,
            slidesOffsetBefore: 25,
          },

          790: {
            slidesPerView: 3.1,
            slidesOffsetBefore: 20,
          },
          
          775: {
            slidesPerView: 3,
            slidesOffsetBefore: 7,
          },

          765: {
            slidesPerView: 3,
            slidesOffsetBefore: 4,
          },

          710: {
            slidesPerView: 2.6,
            slidesOffsetBefore: 100,
          },

          675: {
            slidesPerView: 2.6,
            slidesOffsetBefore: 90,
          },

          650: {
            slidesPerView: 2.3,
            slidesOffsetBefore: 60,
          },

          620: {
            slidesPerView: 2.3,
            slidesOffsetBefore: 55,
          },

          600: {
            slidesPerView: 2.3,
            slidesOffsetBefore: 45,
          },

          580: {
            slidesPerView: 2.1,
            slidesOffsetBefore: 30,
          },

          560: {
            slidesPerView: 2.1,
            slidesOffsetBefore: 20,
          },

          530: {
            slidesPerView: 2,
            slidesOffsetBefore: 10
          },

          500: {
            slidesPerView: 1.7,
            slidesOffsetBefore: 120,
          },

          460: {
            slidesPerView: 1.7,
            slidesOffsetBefore: 100,
          },

          430: {
            slidesPerView: 1.5,
            slidesOffsetBefore: 90,
          },

          400: {
            slidesPerView: 1.5,
            slidesOffsetBefore: 70,
          },

          380: {
            slidesPerView: 1.3,
            slidesOffsetBefore: 55,
          },

          355: {
            slidesPerView: 1.3,
            slidesOffsetBefore: 45,
          }
        }
      });
      photosSwiper.slideNext(0);
      photosSwiper.slidePrev(0);
    };
    const setExpertsSlider = () => {
      const expertsSlider = document.querySelector('.experts-slider');
      const expertsSwiper = new Swiper(expertsSlider, {
        spaceBetween: 35,
        slidesPerView: 1.5,
        grabCursor: true,
        navigation: {
          nextEl: '.experts-slider__nav_next.arrow',
          prevEl: '.experts-slider__nav_prev.arrow'
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
  
        breakpoints: {
          1350: {
            slidesPerView: 4,
  
            navigation: {
              nextEl: '.experts-slider__nav_next.circle',
              prevEl: '.experts-slider__nav_prev.circle'
            },
          },
  
          860: {
            slidesPerView: 3,
          },
  
          650: {
            slidesPerView: 2.5,
          },
  
          515: {
            slidesPerView: 2,
          }
        }
      });
    };

    setPhotosSlider();
    setExpertsSlider();
  }

  // Настройка инпута для ввода телефона
  function setCorrectInputTel() {
    const form = document.querySelector('.feedback-form');
    const telInput = document.querySelector('input#phone');
    const updatePlaceholder = () => {
      const flag = document.querySelector('.iti__selected-flag');
      const placeholder = flag.title.split(':')[1];

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
    const tabs = document.querySelectorAll('.markets-tabs__tab');
    const unActiveAll = () => tabs.forEach(tab => tab.classList.remove('active'));

    const nearEastTab = document.querySelector('#near-east');
    const asiaTab = document.querySelector('#asia');
    const latinAmericaTab = document.querySelector('#latin-america');
    const africaTab = document.querySelector('#africa');

    const countriesText = document.querySelector('.markets-about__countries');
    const investmentsText = document.querySelector('.markets-blocks__card.investments .card__count b');
    const accelerators = document.querySelector('.markets-blocks__card.accelerators .card__count b');
    const fondsText = document.querySelector('.markets-blocks__card.fonds .card__count b');

    const writeInfo = (objInfo) => {
      countriesText.textContent = objInfo.countries.join(', ');
      investmentsText.textContent = objInfo.investments;
      accelerators.textContent = objInfo.accelerators;
      fondsText.textContent = objInfo.fonds;
    };

    const marketsMap = new Map([
      [nearEastTab, { 
        countries: ['ОАЭ', 'Саудовская Аравия', 'Израиль', 'Оман', 'Бахрейн', 'Катар', 'Тунис', 'Йемен', 'Египет', 'Алжир'],
        investments: '5,5',
        accelerators: '300',
        fonds: '73'
       }],
      [asiaTab, { 
        countries: ['Казахстан', 'Монголия', 'Иран', 'Китай', 'Афганистан', 'Индия', 'Пакистан', 'Вьетнам'],
        investments: '3,9',
        accelerators: '230',
        fonds: '60'
       }],
      [latinAmericaTab, { 
        countries: ['Бразилия', 'Аргентина', 'Уругвай', 'Парагвай', 'Боливия', 'Эквадор', 'Колумбия', 'Чили'],
        investments: '2,7',
        accelerators: '170',
        fonds: '43'
       }],
      [africaTab, { 
        countries: ['Египет', 'Ливия', 'Алжир', 'Тунис', 'Марокко', 'Мадагаскар'],
        investments: '1,3',
        accelerators: '90',
        fonds: '39'
       }]
    ]);

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        unActiveAll();
        tab.classList.add('active');

        const objInfo = marketsMap.get(tab);
        writeInfo(objInfo);
      });
    });
  }
});
