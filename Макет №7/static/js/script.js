document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("resize", () => {
        setWelcomeBlockOnFull();
        getAnswerOnQuestionByClick();
        setCorrectSlider();
    });

    setWelcomeBlockOnFull();
    getAnswerOnQuestionByClick();
    setCorrectSlider();
});

function setWelcomeBlockOnFull() {
    let header = document.querySelector(".header");
    let welcomeBlock = document.querySelector(".welcome");
    let screenHeight = window.innerHeight;

    let pdTop = 0;
    let pdBottom = 0;

    if (screenHeight < 1000) {
        while (welcomeBlock.clientHeight < screenHeight - header.clientHeight - 1) {
            pdTop++;
            pdBottom++;
            welcomeBlock.style.paddingTop = pdTop + "px";
            welcomeBlock.style.paddingBottom = pdBottom + "px";
        }
    }
}

function getAnswerOnQuestionByClick() {
    let questionsPoints = document.querySelectorAll(".clickable-points__point");

    questionsPoints.forEach(item => {
        item.addEventListener("click", function() {
            questionsPoints.forEach(value => {
                if (item != value) value.classList.remove("active");
            });
            item.classList.toggle("active");
        });
    })
}

function setCorrectSlider() {
    let slider = document.querySelector(".slider");
    let sliderLine = slider.querySelector(".slider__line");
    let sliderBlocks = slider.querySelectorAll(".slider__block");

    let screenWidth = window.outerWidth;
    console.log(screenWidth);
    let blockWidth = sliderBlocks[1].offsetWidth + parseFloat(getComputedStyle(sliderBlocks[1]).marginLeft);

    if (screenWidth <= 1355) {
        blockWidth = slider.clientWidth + parseFloat(getComputedStyle(sliderBlocks[1]).marginLeft);
    }

    goAdaptive();

    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");

    let offset = 0;
    let count = 0;

    prev.classList.add("hide");
    next.addEventListener("click", function() {
        goNext();
    });

    prev.addEventListener("click", function() {
        goPrev();
    });

    let x1 = null;
    let x2 = null;

    sliderLine.addEventListener("touchstart", function(event) {
        x1 = event.touches[0].clientX;
    });

    sliderLine.addEventListener("touchmove", function(event) {
        x2 = event.touches[0].clientX;
    });

    sliderLine.addEventListener("touchend", function(event) {
        if (x1 > x2) {
            if (!next.classList.contains("hide"))
                goNext();
        } else if (x1 < x2) {
            if (!prev.classList.contains("hide"))
                goPrev();
        }
    });

    function getOffset() {
        if (count <= 0) {
            prev.classList.add("hide");
        } else if ((count >= sliderBlocks.length - 3 && screenWidth > 1355) || (count >= sliderBlocks.length-1)) {
            next.classList.add("hide");
        } else {
            prev.classList.remove("hide");
            next.classList.remove("hide");
        }

        return blockWidth * count;
    }

    function goPrev() {
        count--;
        offset = getOffset(); 
        sliderLine.style.left = -offset + "px";
    }

    function goNext() {
        count++;
        offset = getOffset();
        sliderLine.style.left = -offset + "px";
    }

    function setNormalWidthAll() {
        sliderBlocks.forEach(item => item.style.minWidth = slider.clientWidth + "px");   
        sliderLine.style.width = slider.clientWidth * sliderBlocks.length + "px";
        blockWidth = slider.clientWidth + parseFloat(getComputedStyle(sliderBlocks[1]).marginLeft);
    }

    function goAdaptive() {
        if (screenWidth <= 1355) {
            setNormalWidthAll();
        }
    }
}
