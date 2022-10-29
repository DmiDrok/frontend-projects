let observer = new IntersectionObserver(removeOpacity, {"threshold": 0.4});

function removeOpacity(item) {
    item.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.classList.remove("hide");
        }
    })
}

Array.from(document.body.children).forEach(item => observer.observe(item));
