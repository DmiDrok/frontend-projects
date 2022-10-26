"use strict";

var slider = document.querySelector(".slider");
var sliderBlocks = document.querySelectorAll(".slider__block");
var sliderNavs = document.querySelectorAll(".slider__nav .nav");
var nowActive = [document.querySelector(".slider__block.active"), document.querySelector(".slider__nav .nav.active")];

var _loop = function _loop(i) {
  sliderBlocks[i].addEventListener("click", function () {
    setActive(sliderBlocks[i], sliderNavs[i]);
  });
};

for (var i = 0; i < sliderBlocks.length; i++) {
  _loop(i);
}

var _loop2 = function _loop2(_i) {
  sliderNavs[_i].addEventListener("click", function () {
    setActive(sliderBlocks[_i], sliderNavs[_i]);
  });
};

for (var _i = 0; _i < sliderNavs.length; _i++) {
  _loop2(_i);
}

window.addEventListener("resize", setSliderHeight);
document.addEventListener("DOMContentLoaded", setVisibilityAll);

function setVisibilityAll() {
  var loadingScreen = document.querySelector(".loading");
  loadingScreen.remove();
  setSliderHeight();
}

function setSliderHeight() {
  slider.style.height = slider.clientHeight + "px";
}

function setActive(block, nav) {
  if (nowActive) nowActive.forEach(function (item) {
    return item.classList.remove("active");
  });
  nowActive[0] = block;
  nowActive[1] = nav;
  nowActive.forEach(function (item) {
    return item.classList.add("active");
  });
}