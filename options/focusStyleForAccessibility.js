function focusStyleForAccessibility(event) {
	if (event.key === "Tab") { // The tab key
		document.body.classList.add('userIsUsingTab');
		window.removeEventListener('keydown', focusStyleForAccessibility);
	}
}

window.addEventListener('keydown', focusStyleForAccessibility);
