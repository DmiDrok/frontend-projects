"use strict";

// Изменение CSS-переменной для эффекта параллакса
function setCorrectParallax() {  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 2500) return;
    // document.body.style = `--scrollTop: ${window.scrollY}px`;
    document.documentElement.style.setProperty('--scrollTop', `${window.scrollY}px`);
  });
}


// Настройка слайдеров
function setCorrectSlider() {
  $('.basics__slider').slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    touchThreshold: 10,
    arrows: false,

    responsive: [
      {
        breakpoint: 1010,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },

      {
        breakpoint: 540,
        settings: {
          variableWidth: true
        }
      },
    ]
  });

  $('.basics .prev').on('click', () => {
    $('.slider').slick('slickPrev');
  });

  $('.basics  .next').on('click', () => {
    $('.slider').slick('slickNext');
  });
}


// Настройка якорей
function setCorrectAnchors() {
  const anchors = document.querySelectorAll('.nav__list [href^="#"]');

  anchors.forEach(anchor => {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();

      const toScroll = document.querySelector(anchor.getAttribute('href'));
      if (toScroll) {
        const y = toScroll.getBoundingClientRect().y;
        window.scrollTo({
          top: y-35,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Показ фотографий на некоторых постах поочерёдно
function setCorrectReciepesPhotos() {
  const recipes = document.querySelectorAll('.recipes__column .recipe');
  const stepUp = index => index === (recipes.length-1) ? 0 : ++index;
  let index = 0;

  recipes[0].classList.add('active');

  setInterval(() => {
    recipes.forEach(recipe => recipe.classList.remove('active'));
    recipes[index].classList.add('active');
    index = stepUp(index);
  }, 3000);
}


// Настройка кастомных скроллбаров
function setCorrectScrollBars() {
  document.querySelectorAll('.item__scroll-block.post').forEach(elem => {
    new SimpleBar(elem, { autoHide: false });
  });
}


// Активация Wow.js
function setCorrectWow() {
  new WOW().init();
}


// Настройка плавного скролла по странице
function setCorrectSmoothScroll() {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.wrapper__container'
  });
}



// Запуск всех функций
function applyAll() {
  if (window.matchMedia('(min-height: 600px)').matches) setCorrectParallax();
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-height: 600px)').matches) 
      setCorrectParallax();
  });
    
  setCorrectSlider();
  setCorrectAnchors();
  setCorrectReciepesPhotos();
  setCorrectScrollBars();
  setCorrectWow();
  setCorrectSmoothScroll();
}


try {
  applyAll();
} catch(err) {
  console.error(err);
}