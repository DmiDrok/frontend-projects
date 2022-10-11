const mediaHideVideoBlock = 1040;
const widthWhenVideoBtnComeLink = 900;

// Делаем первый блок на весь экран пользователя
function welcomeBlockOnFullScreen() {
    const welcomeBlock = document.querySelector(".welcome-block");
    const noticeBlock = document.querySelector(".notice");
    const headerBlock = document.querySelector(".header");
    
    let resultHeight = window.innerHeight - noticeBlock.clientHeight - headerBlock.clientHeight;

    if (resultHeight > welcomeBlock.clientHeight) {
        if (window.innerWidth < mediaHideVideoBlock) resultHeight /= 2;
        welcomeBlock.style.height = resultHeight + "px";
    }
}

// Вешаем запуск видео по клику на определённые кнопки
function onClickPlayVideo() {

    // Если видео есть внутри первого блока
    if (window.innerWidth > mediaHideVideoBlock) {
        const playBtns = document.querySelectorAll(".play-video");
        const video = document.querySelector(".container__block_2 video");
        const containerImg = document.querySelector('.container-img');

        for (btn of playBtns) {
            btn.onclick = () => {
                video.style.display = "block";
                containerImg.hidden = true;
                video.play();
            }
        }

    } else { // Если видео содержится в отдельном попапе
        const body = document.body;
        const playBtn = document.querySelector(".container__block_1 .play-video");
        const popup = document.querySelector(".popup-video");
        const video = popup.querySelector("video");
        const popupContent = popup.querySelector(".content");
        const btnClosePopup = document.querySelector(".popup__close");

        playBtn.onclick = () => {
            if (window.innerWidth < widthWhenVideoBtnComeLink)
                window.location = "https://www.youtube.com/watch?v=zfiP_5XbkKs";
            else {
                popup.classList.add("active");
                body.classList.add("unscroll");
                video.play();
            }
        }

        btnClosePopup.onclick = () => {
            popup.classList.remove("active");
            body.classList.remove("unscroll");
            video.pause();
            video.currentTime = 0;
        }

        popup.onclick = (event) => {
            if (event.target != popupContent) {
                popup.classList.remove("active");
                body.classList.remove("unscroll");
                video.pause();
                video.currentTime = 0;
            }
        }
    }

}

// Раскрытие описания тем программы по клику на стрелку вниз
function onClickShowThemeAboutText() {
    const showBtns = document.querySelectorAll(".on-points .item .show");
    const themes = document.querySelectorAll(".on-points .item");

    // Устанавливаем максимальную ширину
    for (let theme of themes) theme.style.maxHeight = theme.clientHeight + "px";

    // По нажатию на кнопку - показываем описание
    for (let i = 0; i < showBtns.length; ++i) {
        showBtns[i].onclick = () => {
            // Если блок не активен
            if (!themes[i].classList.contains("active")) {
                showBtns[i].classList.add("active");
                themes[i].classList.add("active");

                let themeAbout = themes[i].children[2]; // Блок с описанием темы
                let allHeight = null; // Высота блока темы с описанием
                themeAbout.style.display = "block";
                setTimeout(() => themeAbout.style.opacity = 1, 250);

                allHeight = themes[i].clientHeight + themeAbout.clientHeight + parseInt(getComputedStyle(themes[i]).gridRowGap);
                themes[i].style.maxHeight = allHeight + "px";
            } else {
                showBtns[i].classList.remove("active");
                themes[i].classList.remove("active");

                let themeAbout = themes[i].children[2]; // Блок с описанием темы
                let allHeight = null; // Высота блока темы с описанием
                allHeight = themes[i].clientHeight - themeAbout.clientHeight;
                themeAbout.style.opacity = 0;
                setTimeout(() => themeAbout.style.display = "none", 750);
                themes[i].style.maxHeight = allHeight + "px";
            }
        }
    }
}

// При вхождении элемента полностью в экран
function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add("showing");
        }
    });
}

// Настройка плавного выдвижения
function configureOnEntry() {
    let options = {
        threshold: [0.4],
    };
    let observer = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll("main > *");

    for (let elem of elements) {
        observer.observe(elem);
    }

}


// Запускаем все описанные функции
try {
    welcomeBlockOnFullScreen();
    onClickPlayVideo();
    onClickShowThemeAboutText();
    configureOnEntry();
} catch(err) {
    console.error(err);
}