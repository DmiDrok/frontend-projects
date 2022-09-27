// Установка значения по умолчанию в поле ввода для поиска
function setDefaultToSearchField() {
    const defaultValue = "how Brella's plan works";
    const inputField = document.querySelector(".search-field input");

    inputField.value = defaultValue;
}


// Настройка адаптивного слайдера
function constructSliderCompanies() {
    function next() {
        offset += -blockWidth;
        if (offset < -blockWidth * (sliderBlocks.length-1)) offset = 0;
        sliderLine.style.left = offset + "px";
    }

    function prev() {
        offset += blockWidth;
        if (offset > 0) offset = -blockWidth * (sliderBlocks.length-1);
        sliderLine.style.left = offset + "px";
    }

    const sliderBlock = document.querySelector(".slider");
    const sliderLine = document.querySelector(".slider-line");
    const sliderBlocks = document.querySelectorAll(".slider-block");
    const prevController = document.querySelector(".prev");
    const nextController = document.querySelector(".next");

    const blockWidth = sliderBlocks[0].clientWidth;
    let offset = 0;

    sliderBlock.style.width = blockWidth + "px"; // Устанавливаем ширину блока слайдера равному ширине одного блока

    // Раз в 4 секунды автоматический свайп слайдера  
    setInterval(() => {
        next();
    }, 4000);

    // По нажатию на "вперёд"
    nextController.addEventListener("click", () => {
        next();
    })

    // По нажатию на "назад"
    prevController.addEventListener("click", () => {
        prev();
    })
}


// Настройка пролистывания новостей
function constructNewsSlider() {
    const container = document.querySelector(".main-content__info-new");
    const containerLine = document.querySelector(".news-line");
    const news = document.querySelectorAll(".main-content__info-new .block-new");
    const newHeight = news[0].clientHeight;

    container.style.maxHeight = newHeight + "px"; // Установка высоты контейнера равной высоте одной новости

    const links = document.querySelectorAll(".main-content__last-new .new");
    let offset = 0;

    for (let i=0; i<links.length; ++i) {
        links[i].addEventListener("click", () => {
            if (i == 0) offset = 0;
            else offset = newHeight * i;
            containerLine.style.top = -offset + "px";

            news.forEach((item) => item.classList.remove("active"));
            links.forEach((item) => item.classList.remove("active"));
            news[i].classList.add("active");
            links[i].classList.add("active");
        })
    }
}

// Запуск
try {
    setDefaultToSearchField();
    constructSliderCompanies();
    constructNewsSlider();
} catch(err) {
    console.log(err);
}