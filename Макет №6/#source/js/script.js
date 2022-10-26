function setWelcomeBlockOnFullScreen() {
	var welcomeBlock = document.querySelector(".welcome");
	var welcomeRight = document.querySelector(".welcome__right");
	var header = document.querySelector(".header");

	var correct = window.innerHeight - parseFloat(getComputedStyle(header).height) - parseFloat(getComputedStyle(welcomeBlock).paddingTop) * 2;
	welcomeRight.style.height = correct + "px";
	
}

try {
	setWelcomeBlockOnFullScreen();
} catch(err) {
	console.error(err)
}