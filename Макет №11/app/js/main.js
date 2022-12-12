// сделать первый блок на весь экран
function setWelcomeFullScreen() {
  return new Promise((resolve) => {
    const welcome = document.querySelector(".welcome")
    welcome.style.minHeight = window.innerHeight + "px"
    resolve()
  })
}

// установка корректного взаимодействия с бургером
function setCorrectBurger() {
  const burger = document.querySelector(".burger")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuNav = mobileMenu.querySelector(".mobile-menu__nav")
  const close = mobileMenu.querySelector(".mobile-menu__close")

  burger.onclick = (event) => {
    event.stopPropagation()
    mobileMenu.classList.add("active")
  }
  close.onclick = () => mobileMenu.classList.remove("active")
  document.onclick = (event) => {
    if (event.target.closest("nav") !== mobileMenuNav && mobileMenu.classList.contains("active"))
      mobileMenu.classList.remove("active")
  }
}

const main = document.querySelector(".main")
const advantages = document.querySelector(".advantages")

// навесить дочерним элементам main класс hide
function addHideAll() {
  Array.from(main.children).forEach(child => child.classList.add("hide"))  
}

// по скроллу - убираем класс hide
function onScrollRemoveHide() {
  const observer = new IntersectionObserver(removeHide, {
    threshold: 0.4,
  })

  Array.from(main.children).forEach(child => observer.observe(child))

  function removeHide(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("hide")
      }
    })
  }
}

// ленивая подгрузка
// function lazyLoad() {
//   const images = document.querySelectorAll("img")
//   const options = {
//     root: null,
//     rootMargin: "0px",
//     threshold: 0.1
//   }
//   const observer = new IntersectionObserver(handleImg, options)

//   images.forEach(image => observer.observe(image))

//   function handleImg(myImg, observer) {
//     myImg.forEach(single => {
//       if (single.isIntersecting) {
//         loadImg(single.target)
//       }
//     })
//   }

//   function loadImg(img) {
//     if (img.dataset.src) {
//       console.log(img.dataset.src)
//       img.src = img.dataset.src
//     }
//   }
// }

// применить все настраивающие функции
function applyAll() {
  setWelcomeFullScreen()
    .then(addHideAll)
    .then(onScrollRemoveHide)
  setCorrectBurger()
  // lazyLoad()
}

try {
  document.addEventListener("DOMContentLoaded", () => {
    applyAll()
  })

  window.addEventListener("resize", () => {
    setWelcomeFullScreen()
  })
} catch(err) {
  console.error(err)
}