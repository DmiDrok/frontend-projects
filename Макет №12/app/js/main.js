// устанавливаем корректное взаимодействие с поиском в шапке
function setCorrectSearch() {
  const search = document.querySelector(".search__content");
  const searchInputBlock = document.querySelector(".search__input");
  const searchInput = searchInputBlock.querySelector('input');
  const searchArrow = document.querySelector(".search__arrow");

  search.addEventListener('click', showElems);
  // search.addEventListener('click', showElems);
  searchInput.addEventListener('blur', hideElems);

  searchInputBlock.addEventListener('mouseout', function(event) {
    if (document.activeElement !== searchInput && event.toElement !== searchArrow) {
      hideElems();
    }
  });

  // манипуляция с классами
  function setClass(_class, add=true, ...elems) {
    elems.forEach(elem => {
      add ? elem.classList.add(_class) : elem.classList.remove(_class);
    });
  }

  function showElems() {
    setClass('hide', true, search);
    setClass('active', true, searchInputBlock);
    searchInput.focus();
  }

  function hideElems() {
    setClass('active', false, searchInputBlock);
    setClass('hide', false, search);
  }
}

// настраиваем плагин Choices
function setCorrectSelect() {
  const selectLanguage = document.querySelector(".language-select");
  const select = document.querySelector(".invite-select");
  const choices = new Choices(select, {
    searchEnabled: false,
    shouldSort: false,
  });
  const choicesLanguage = new Choices(selectLanguage, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
  });
}

// настраиваем плагин Fancybox
function setCorrectFancybox() {
  Fancybox.bind("[data-fancybox='video']", {
    l10n: {
      CLOSE: 'Close video?',
    }
  });

  // мут видео
  const startPlay = document.querySelector('.video__play');
  startPlay.onclick = () => {
    setTimeout(() => {
      const video = document.querySelector('.fancybox__html5video');
      video.muted = true;
    }, 10);
  }
}

// табы
function setCorrectTabs() {
  const buttons = document.querySelectorAll('.categories__cat-block');
  const firstButton = buttons[0];
  const secondButton = buttons[1];
  const categoriesGroups = document.querySelectorAll('.categories__group-block');
  const pointsBlocks = document.querySelectorAll('.point-block');
  const pointsInfo = document.querySelectorAll('.point-info')

  setCorrectOffsetAndWidthOnDrop(pointsInfo);

  // установка действий по нажатию на переключатели категорий
  firstButton.onclick = function() {
    this.classList.add('active');
    secondButton.classList.remove('active');
    
    categoriesGroups[0].style.display = 'block'
    setTimeout(() => categoriesGroups[0].classList.remove('hide'), 0);
    categoriesGroups[1].classList.add('hide');
    setTimeout(() => categoriesGroups[1].style.display = 'none', 0);
  }
  secondButton.onclick = function() {
    this.classList.add('active');
    firstButton.classList.remove('active');
    
    categoriesGroups[1].style.display = 'block'
    setTimeout(() => categoriesGroups[1].classList.remove('hide'), 0);
    categoriesGroups[0].classList.add('hide');
    setTimeout(() => categoriesGroups[0].style.display = 'none', 0);
  }

  // установка действий по нажатию на каждый таб
  pointsBlocks.forEach(function(pointBlock, index) {
    const point = pointBlock.querySelector('.point');
    setCorrectHeight(pointBlock, point, index);

    pointBlock.onclick = function() {
      pointBlock.classList.toggle('active');
      unsetActiveFromAll(pointBlock);
      setCorrectHeightAll();
    }
  });

  // корректировка высоты для определенного блока
  function setCorrectHeight(pointBlock, point, index) {
    pointBlock.style.height = parseFloat(getComputedStyle(point).height) + parseFloat(getComputedStyle(pointsInfo[index]).height) + "px";
  }

  // корректировка высоты для всех блоков
  function setCorrectHeightAll() {
    pointsBlocks.forEach(function(pointBlock, index) {
      const point = pointBlock.querySelector('.point');
      setCorrectHeight(pointBlock, point, index);
    });
  }

  // корректировка отступа и ширины у выпадающего списка
  function setCorrectOffsetAndWidthOnDrop(pointsInfo) {
    pointsInfo.forEach(function(drop) {
      const parentPointBlock = drop.closest('.point-block');
      let addActiveAgain = false;
      // если по умолчанию стоял active - то и оставим потом active
      if (parentPointBlock.classList.contains('active'))
        addActiveAgain = true;

      parentPointBlock.classList.add('active');
      const dropOffset = -parseFloat(getComputedStyle(drop).height) + "px";
      const dropWidth = parentPointBlock.offsetWidth + "px";
      drop.style.bottom = dropOffset;
      drop.style.width = dropWidth;
      
      if (!addActiveAgain) 
        parentPointBlock.classList.remove('active');
    });
  }
  
  // удалить класс active со всех табов кроме одного
  function unsetActiveFromAll(safe=null) {
    pointsBlocks.forEach(function(pointBlock) {
      // если имеется класс hide - то не убираем класс active у блока группы
      const parentGroupBlock = pointBlock.closest('.categories__group-block');
      if (!parentGroupBlock.classList.contains('hide') && pointBlock !== safe) {
        pointBlock.classList.remove('active');
      }
    });
  }
}

// настройка шапки
function setCorrectHeader() {
  const header = document.querySelector('.header');
  const headerBottom = header.querySelector('.header__bottom');
  const headerHeight = parseFloat(header.style.height);

  document.addEventListener('scroll', () => {
    if (window.pageYOffset > 0) headerBottom.classList.add('active');
    else headerBottom.classList.remove('active');
  })
}

// настройки мобильного меню
function setCorrectMenu() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.mobile-menu');
  const wrapper = document.querySelector('.wrapper');
  const close = menu.querySelector('.close');

  // клик на бургер - показываем меню
  burger.onclick = function(event) {
    event.stopPropagation();
    showMenu();
  }

  // клик на крестик - закрываем меню
  close.onclick = function() {
    hideMenu();
  }

  // клик по пустому месту на документе - закрываем меню
  document.onclick = function(event) {
    if (event.target.closest('.mobile-nav')) return 
    hideMenu();
  }

  // по перетаскиваниям определям - будем открывать меню или нет
  let [x1, x2] = [null, null];
  let [y1, y2] = [null, null];
  document.addEventListener('touchstart', function(event) {
    x1 = event.touches[0].clientX;
    y1 = event.touches[0].clientY;
  });
  document.addEventListener('touchend', function(event) {
    x2 = event.changedTouches[0].clientX;
    y2 = event.changedTouches[0].clientY;

    console.log(x1, x2);
    console.log(y1, y2);

    if (Math.abs(x1 - x2) > 120 && Math.abs(y1 - y2) < 100) {
      if (x1 < x2) showMenu();
      else if (x1 > x2) hideMenu();
    }
  });

  // показать меню
  function showMenu() {
    menu.classList.add('active');
    wrapper.classList.add('blur');
    document.body.classList.add('unscroll');
  }

  // скрыть меню
  function hideMenu() {
    menu.classList.remove('active');
    wrapper.classList.remove('blur');
    document.body.classList.remove('unscroll');
  }
}

// применяем настраивающие функции
function setAll() {
  setCorrectSearch();
  setCorrectSelect();
  setCorrectFancybox();
  setCorrectTabs();
  setCorrectHeader();
  setCorrectMenu();
}

try {
  document.addEventListener('DOMContentLoaded', setAll);
  window.addEventListener('resize', setAll);
} catch(err) {
  console.error(err);
}