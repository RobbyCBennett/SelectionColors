function animateSaved() {
	var saved = document.getElementById("saved");
	saved.style.opacity = 1;
	setTimeout(function() {
		saved.style.opacity = 0;
	}, 2000);
}
