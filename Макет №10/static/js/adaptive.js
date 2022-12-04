// при достижении определенной ширины - меняем текст в шапке - на логотип
function replaceHeaderText() {
  if (document.body.clientWidth <= 1260) {
    const logo = document.querySelector(".logo")
    const headerText = document.querySelector(".header__note")
    
    if (logo && headerText) headerText.outerHTML = logo.outerHTML
  }
}

// установка ширины слайдера в 100% от родителя
function setCorrectSizeOnSlider() {
  const carRow = document.querySelector(".row-container")
  const carSlider = document.querySelector(".car__slider")
  const sidebar = document.querySelector(".sidebar")

  if (!carRow || !carSlider || !sidebar) return

  if (getComputedStyle(sidebar).display !== "none")
    carSlider.style.width = window.innerWidth - (parseFloat(getComputedStyle(carRow).paddingLeft)*2) - parseFloat(getComputedStyle(sidebar).width) + "px"
  else
    carSlider.style.width = window.innerWidth - (parseFloat(getComputedStyle(carRow).paddingLeft)*2) + "px"
}

// применение всех функций за раз
function applySettings() {
  setCorrectSizeOnSlider()
  replaceHeaderText()
}

try {
  applySettings()
  window.addEventListener("resize", applySettings)
} catch(err) {
  console.error(err)
}