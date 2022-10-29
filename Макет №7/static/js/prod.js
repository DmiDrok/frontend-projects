"use strict";

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("resize", function () {
    setWelcomeBlockOnFull();
    getAnswerOnQuestionByClick();
    setCorrectSlider();
  });
  setWelcomeBlockOnFull();
  getAnswerOnQuestionByClick();
  setCorrectSlider();
});

function setWelcomeBlockOnFull() {
  var header = document.querySelector(".header");
  var welcomeBlock = document.querySelector(".welcome");
  var screenHeight = window.innerHeight;
  var pdTop = 0;
  var pdBottom = 0;

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
  var questionsPoints = document.querySelectorAll(".clickable-points__point");
  questionsPoints.forEach(function (item) {
    item.addEventListener("click", function () {
      questionsPoints.forEach(function (value) {
        if (item != value) value.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });
}

function setCorrectSlider() {
  var slider = document.querySelector(".slider");
  var sliderLine = slider.querySelector(".slider__line");
  var sliderBlocks = slider.querySelectorAll(".slider__block");
  var screenWidth = window.outerWidth;
  console.log(screenWidth);
  var blockWidth = sliderBlocks[1].offsetWidth + parseFloat(getComputedStyle(sliderBlocks[1]).marginLeft);

  if (screenWidth <= 1355) {
    blockWidth = slider.clientWidth + parseFloat(getComputedStyle(sliderBlocks[1]).marginLeft);
  }

  goAdaptive();
  var prev = document.querySelector(".prev");
  var next = document.querySelector(".next");
  var offset = 0;
  var count = 0;
  prev.classList.add("hide");
  next.addEventListener("click", function () {
    goNext();
  });
  prev.addEventListener("click", function () {
    goPrev();
  });
  var x1 = null;
  var x2 = null;
  sliderLine.addEventListener("touchstart", function (event) {
    x1 = event.touches[0].clientX;
  });
  sliderLine.addEventListener("touchmove", function (event) {
    x2 = event.touches[0].clientX;
  });
  sliderLine.addEventListener("touchend", function (event) {
    if (x1 > x2) {
      if (!next.classList.contains("hide")) goNext();
    } else if (x1 < x2) {
      if (!prev.classList.contains("hide")) goPrev();
    }
  });

  function getOffset() {
    if (count <= 0) {
      prev.classList.add("hide");
    } else if (count >= sliderBlocks.length - 3 && screenWidth > 1355 || count >= sliderBlocks.length - 1) {
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
    sliderBlocks.forEach(function (item) {
      return item.style.minWidth = slider.clientWidth + "px";
    });
    sliderLine.style.width = slider.clientWidth * sliderBlocks.length + "px";
    blockWidth = slider.clientWidth + parseFloat(getComputedStyle(sliderBlocks[1]).marginLeft);
  }

  function goAdaptive() {
    if (screenWidth <= 1355) {
      setNormalWidthAll();
    }
  }
}

var observer = new IntersectionObserver(removeOpacity, {
  "threshold": 0.4
});

function removeOpacity(item) {
  item.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.classList.remove("hide");
    }
  });
}

Array.from(document.body.children).forEach(function (item) {
  return observer.observe(item);
});