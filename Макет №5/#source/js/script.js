// @prepros-append slider.js

function welcomeBlockOnFullScreen() {
	let welcomeContainer = document.querySelector(".welcome > .container");
	let welcome = document.querySelector(".welcome");
	welcomeContainer.style.marginTop = "0px";
	if (window.innerHeight < 800) {
		while (welcome.clientHeight < window.innerHeight) {
			welcomeContainer.style.marginTop = parseFloat(welcomeContainer.style.marginTop) + 1 + "px";
		}
	}
}

function anchorUpSettings() {
	let anchorUp = document.querySelector(".anchor-up");
	let html = document.documentElement;

	anchorUp.addEventListener("click", function(event) {
		window.scrollTo({
		  top: 0,
		  left: 0,
		  behavior: 'smooth'
		});
	});
}

try {
	welcomeBlockOnFullScreen();
	anchorUpSettings();
} catch(err) {
	console.error(err);
}
