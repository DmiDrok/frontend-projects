// адаптация отзывов для корректной работы кнопки 'ещё отзывы'
// let sliceValue = 4
// if (document.body.clientWidth <= 1060) sliceValue = 3
// if (document.body.clientWidth <= 850 ) sliceValue = 2


// при клике на кнопку расширенных настроек - показать их
function showMoreOptions() {
  const moreButtons = document.querySelectorAll(".more-button")
  const moreBlock = document.querySelector(".form__more")

  moreButtons.forEach(item => {
    item.addEventListener("click", () => {
      moreBlock.classList.toggle("active")
      item.classList.toggle("active")  
    })
  })
}


// при клике на кнопку 'еще отзывы' - показать их
function showMoreReviews() {
  const more = document.querySelector(".reviews__show-more")
  const hiddenBlocks = document.getElementsByClassName("reviews__item_hide")

  if (!more || !hiddenBlocks) return

  more.addEventListener("click", () => {
    if (!more.classList.contains("hide")) {
      Array.from(hiddenBlocks).slice(0, sliceValue)
        .forEach(block => block.classList.remove("reviews__item_hide"))
    } else {
      const reviews = document.querySelectorAll(".reviews__item")
      Array.from(reviews).slice(sliceValue)
        .forEach(block => block.classList.add("reviews__item_hide")
        )
    }

    if (hiddenBlocks.length === 0) { 
      more.classList.add("hide")
      more.innerHTML = "Скрыть отзывы"
    } else { 
      more.classList.remove("hide")
      more.innerHTML = "Еще отзывы"
    }
  })
}

// вешаем нужный класс для скрытия отзывов
// function setHideOnReviews() {
//   const reviews = document.querySelectorAll(".reviews__item")

//   Array.from(reviews).slice(sliceValue)
//     .forEach(elem => elem.classList.add("reviews__item_hide"))
// }

// настройка меню - бургера
function setCorrectBurger() {
  const burger = document.querySelector(".burger")
  const darkScreen = document.querySelector(".wrapper__dark-fullscreen")
  const sidebarMobile = document.querySelector(".sidebar-mobile")
  const sidebarMobileClose = sidebarMobile.querySelector(".sidebar-mobile__close")

  let startX = null
  let endX = null

  // клик на любое место сайта при активном мобильном сайдбаре - закрываем его
  document.addEventListener("click", (event) => {
    if (event.target.closest(".sidebar-mobile") !== sidebarMobile && sidebarMobile.classList.contains("active")) 
      closeSidebar()
  })

  document.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX
  })

  document.addEventListener("touchend", (event) => {
    endX = event.changedTouches[0].clientX

    if (endX > startX)
      closeSidebar()
  })

  burger.addEventListener("click", (event) => {
    event.stopPropagation()
    toggleSidebar()
  })

  sidebarMobileClose.addEventListener("click", () => {
    closeSidebar()
  })


  function toggleSidebar() {
    sidebarMobile.classList.add("active")
    darkScreen.classList.add("active")
  }

  function closeSidebar() {
    sidebarMobile.classList.remove("active")
    darkScreen.classList.remove("active")
  }
}

// настройка переключателей на странице машины
function setCorrectSelectorsOnCarPage() {
  const selectors = document.querySelectorAll(".selectors__selector")
  const contents = document.querySelectorAll(".info__block")

  selectors.forEach((item, index) => {
    item.onclick = () => {
      removeAllSelectors(item)
      removeAllContents(contents[index])
    }
  })

  // убрать все активные кнопки, но оставить ту, на которую нажали
  function removeAllSelectors(safe) {
    selectors.forEach(item => item !== safe ? item.classList.remove("active") : item.classList.add("active"))
  }

  // убрать активные контентные части, но оставить привязанную к кнопке
  function removeAllContents(safe) {
    contents.forEach(item => item !== safe ? removeActiveClass(item) : addActiveClass(item))
  }

  // функция которая добавит 'активный' класс и сделает анимацию
  function addActiveClass(block) {
    block.classList.add("active")
    block.style.opacity = 0
    setTimeout(() => {
      block.style.opacity = 1
    }, 300)
  }

  // функция которая уберет 'активный' класс и сделает анимацию
  function removeActiveClass(block) {
    block.style.opacity = 0
    setTimeout(() => {
      block.classList.remove("active")
      block.style.opacity = 1
    }, 300)
  }
}


// функция для вызова всех настроек
function applySettings() {
  showMoreOptions()
  showMoreReviews()
  setCorrectBurger()
  // setHideOnReviews()
  setCorrectSelectorsOnCarPage()
}

try {
  applySettings()
  window.addEventListener("resize", applySettings)
} catch(err) {
  console.error(err)
}