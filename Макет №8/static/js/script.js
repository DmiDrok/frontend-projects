// Настройка первой секции
function setWelcomeOnFull() {
  const header = document.querySelector(".header")
  const welcomeBlock = document.querySelector(".welcome")
  const blockText = document.querySelector(".welcome__text")
  const card = document.querySelector(".card")

  let summaryHeight = header.clientHeight + welcomeBlock.clientHeight
  const maxHeight = window.innerHeight > 1000 ? 1000 : window.innerHeight

  while (summaryHeight < maxHeight) {
    summaryHeight % 2 == 0 ?
      blockText.style.marginTop = parseFloat(getComputedStyle(blockText).marginTop) + 1 + "px"
    :
      card.style.marginTop = parseFloat(getComputedStyle(card).marginTop) + 1 + "px"

    summaryHeight++
  }
}

// Настройка слайдера
function setCorrectSlider() {
  const slider = document.querySelector(".slider")
  const sliderLine = slider.querySelector(".slider__line")
  const sliderElements = slider.querySelectorAll(".slider__item")
  const sliderPoints = slider.querySelectorAll(".slider__navs-points .point")
  const elementWidth = (slider.clientWidth / 2) - parseFloat(getComputedStyle(sliderElements[1]).marginLeft)

  // Задаём ширину каждому элементу
  sliderElements.forEach(elem => {
    elem.style.minWidth = elementWidth + "px"
  })

  // Настройка слайдера по умолчанию
  sliderLine.style.width = elementWidth * sliderElements.length + "px"
  sliderElements[0].classList.add("active");
  sliderElements[1].classList.add("active")
  sliderPoints[0].classList.add("active")

  const sliderNext = slider.querySelector(".slider__next")
  const sliderPrev = slider.querySelector(".slider__prev")

  const defaultOffset = (elementWidth * 2) + (parseFloat(getComputedStyle(sliderElements[1]).marginLeft) * 2) // смещение при клике
  const [secondKey, thirdKey] = [defaultOffset, defaultOffset*2]
  const offsetEvents = {
    "0": [sliderElements[0], sliderElements[1]],
    [secondKey]: [sliderElements[2], sliderElements[3]],
    [thirdKey]: [sliderElements[4], sliderElements[5]]
  } // при определенном смещении будут показываться определенные элементы
  
  // показать элементы при нужном смещении
  const showElems = (leftOff) => {
    hideOther()
    const elems = offsetEvents[Math.abs(leftOff)]
    setPointActive(Object.values(offsetEvents).indexOf(elems))
    elems.forEach(item => item.classList.add("active"))
  }
  const hideOther = () => {
    sliderElements.forEach(item => item.classList.remove("active"))
  }
  const setOffset = (offset) => {
    sliderLine.style.left = offset + "px"
  } 
  const setPointActive = (index) => {
    unsetOtherPoins()
    sliderPoints[index].classList.add("active")
  }
  const unsetOtherPoins = () => {
    sliderPoints.forEach(item => item.classList.remove("active"))
  }
  const moveNext = (offset) => {
    leftOff -= defaultOffset
    if (leftOff < maxLeftOff) leftOff = 0
    showElems(leftOff)
    setOffset(leftOff)
  }
  const move = (offset) => {
    leftOff = offset
    if (leftOff < maxLeftOff) leftOff = 0
    showElems(leftOff)
    setOffset(leftOff)
  }
  const movePrev = () => {
    leftOff += defaultOffset
    if (leftOff > 0) leftOff = maxLeftOff
    showElems(leftOff)
    setOffset(leftOff)
  }
  let leftOff = 0
  const maxLeftOff = -defaultOffset * 2 // Максимальное смещение влево

  sliderNext.addEventListener("click", () => {
    moveNext()
  })
  sliderPrev.addEventListener("click", () => {
    movePrev()
  })

  sliderPoints.forEach((item, index) => {
    item.addEventListener("click", () => {
      const offset = -defaultOffset * index
      move(offset)
    })
  })

  // Реализация тачей
  let startX = null
  let endX = null
  sliderLine.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX
  })
  sliderLine.addEventListener("touchend", (event) => {
    endX = event.changedTouches[0].clientX
    startX > endX ? moveNext() : movePrev()
  })
}

// Настройка переключений на вкладке сервисов
function setCorrectServices() {
  const points = document.querySelectorAll(".services__point")
  const title = document.querySelector(".more__title")
  const paragraphs = document.querySelectorAll(".more__p")

  // Установить элемент в активное положение
  const setActive = (point, index) => {
    disableOther()
    changeInfo(index)
    point.classList.add("active")
  }
  // Удалить активное положение с элементов
  const disableOther = () => {
    points.forEach(point => point.classList.remove("active"))
  }
  const removeOpacity = (elem) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        elem.classList.remove("escape")
        resolve()
      }, 300)
    })
  }
  // Изменить содержимое на странице
  const changeInfo = (index) => {
    title.classList.add("escape")
    removeOpacity(title)
      .then(() => title.textContent = texts[index].title)
    paragraphs.forEach((paragraph, pIndex) => {
      paragraph.classList.add("escape")
      removeOpacity(paragraph)
        .then(() => paragraph.textContent = texts[index].paragraphs[pIndex])
    })
  }

  // Текста которые должны ставиться при клике на определённые элементы
  points.forEach((point, index) => {
    point.addEventListener("click", () => {
      setActive(point, index)
    })
  })
}

function setCorrectMenu() {
  const burger = document.querySelector(".burger")
  const menu = document.querySelector(".menu")
  const nav = document.querySelector(".nav")
  const close = menu.querySelector(".close")

  menu.addEventListener("click", (event) => {
    if (event.target === nav) return
    menu.style.opacity = "0"
    setTimeout(() => {
      menu.style.left = "-9999px"
    }, 700)
    document.body.classList.remove("unscroll")
  })

  burger.addEventListener("click", () => {
    menu.style.left = "0"
    menu.style.opacity = "0.9"
    document.body.classList.add("unscroll")
  })

  close.addEventListener("click", () => {
    menu.style.opacity = "0"
    document.body.classList.remove("unscroll")
  })
}

// Корректное отображение блока с командой сотрудников на малых экранах
function setCorrectTeamOnSmall() {
  if (window.innerWidth < 800) {
    const teamElems = document.querySelectorAll(".team__item")
    teamElems.forEach(item => item.classList.add("active"))
  }
}

// Устанавливаем IntersectionObserver для плавного появления элементов на сайте
function setObserver() {
  const removeOpacity = (item) => {
    item.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".services__point").forEach(item => item.classList.add("transition-ok"))
        entry.target.classList.remove("hide")
      }
    })
  }

  const observer = new IntersectionObserver(removeOpacity, {threshold: 0.2})
  Array.from(document.querySelector(".wrapper").children).forEach(child => observer.observe(child))
}

try {
  setWelcomeOnFull()
  setCorrectSlider()
  setCorrectServices() 
  setCorrectTeamOnSmall()
  setObserver()

  window.addEventListener("resize", () => {
    setWelcomeOnFull()
    setCorrectSlider()
    setCorrectServices()
    setCorrectTeamOnSmall()
  })
  setCorrectMenu()
} catch(err) {
  console.log(err)
}