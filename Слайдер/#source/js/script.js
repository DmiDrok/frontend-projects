let slider = document.querySelector(".slider");
let sliderBlocks =  document.querySelectorAll(".slider__block")
let sliderNavs = document.querySelectorAll(".slider__nav .nav")

let nowActive = [document.querySelector(".slider__block.active"), document.querySelector(".slider__nav .nav.active")]


for (let i = 0; i < sliderBlocks.length; i++) {
	sliderBlocks[i].addEventListener("click", function() {
		setActive(sliderBlocks[i], sliderNavs[i])
	})
}

for (let i = 0; i < sliderNavs.length; i++) {
	sliderNavs[i].addEventListener("click", function() {
		setActive(sliderBlocks[i], sliderNavs[i])
	})
}

window.addEventListener("resize", setSliderHeight)
document.addEventListener("DOMContentLoaded", setVisibilityAll)

function setVisibilityAll() {
	let loadingScreen = document.querySelector(".loading")
	loadingScreen.remove()
	setSliderHeight()
}

function setSliderHeight() {
	slider.style.height = slider.clientHeight + "px"
}

function setActive(block, nav) {
	if (nowActive)
		nowActive.forEach(item => item.classList.remove("active"))

	nowActive[0] = block
	nowActive[1] = nav
	nowActive.forEach(item => item.classList.add("active"))
}