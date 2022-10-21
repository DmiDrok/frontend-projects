function setCorrectSlider() {
	function prev() {
		offset += sliderWidth;
		if (offset > 0) offset = maxRightOffset;
		sliderLine.style.left = offset + "px";
	}

	function next() {
		offset -= sliderWidth;
		if (offset < maxRightOffset) offset = 0;
		sliderLine.style.left = offset + "px";
	}

	function setHandlers() {
		prevBtn.addEventListener("click", prev);
		nextBtn.addEventListener("click", next);
	}

	function removeHandlers() {
		prevBtn.removeEventListener("click", prev);
		nextBtn.removeEventListener("click", next);
	}

	let slider = document.querySelector(".slider");
	let sliderLine = slider.querySelector(".slider__line");
	let sliderObjects = slider.querySelectorAll(".slider__block");
	const sliderWidth = parseFloat(getComputedStyle(slider).width);

	let prevBtn = document.querySelector(".prev");
	let nextBtn = document.querySelector(".next");
	let offset = 0;
	const maxRightOffset = -sliderWidth * (sliderObjects.length-1);

	sliderObjects.forEach(item => {item.style.width = sliderWidth + "px";});
	sliderLine.style.width = sliderWidth * sliderObjects.length + "px";

	// Вешаем обработчики для смещения по клику на разные стрелки
	setHandlers();
	sliderLine.addEventListener("transitionstart", function() {
		removeHandlers();
	});
	sliderLine.addEventListener("transitionend", function() {
		setHandlers();
	});

	// Реализация тачей
	let [x1, x2] = [null, null];
	sliderLine.addEventListener("touchstart", function(event) {
		x1 = event.touches[0].clientX;
	});
	sliderLine.addEventListener("touchmove", function(event) {
		x2 = event.touches[0].clientX;
	});
	sliderLine.addEventListener("touchend", function() {
		if (x2 > x1) prev();
		else next();
	});
}

try {
	setCorrectSlider();
} catch(err) {
	console.error(err);
}