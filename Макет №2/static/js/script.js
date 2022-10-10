// // Становление приветственного первого блока во весь экран пользователя
function toFullScreenWelcome() {
	if (window.innerWidth > 500) {
		const topAttention = document.querySelector(".attention");
		const welcomeBlock = document.querySelector(".welcome-block");
		const contentBlock = document.querySelector(".welcome-block .content-block");

		let resultHeight = window.innerHeight - topAttention.clientHeight;
		if (resultHeight < contentBlock.clientHeight+contentBlock.clientHeight || resultHeight >= 1000) {
			resultHeight = contentBlock.clientHeight + (contentBlock.clientHeight/2) + 100 + topAttention.clientHeight;
		}

		welcomeBlock.style.height = resultHeight + "px";
	}
}
toFullScreenWelcome();

