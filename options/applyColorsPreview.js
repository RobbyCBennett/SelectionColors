function applyColorsPreview() {
	var bg = document.getElementById("bg").checked;
	var bgHue = document.getElementById("bgHue").value;
	var bgSat = document.getElementById("bgSat").value;
	var bgBri = document.getElementById("bgBri").value;
	var bgOpa = document.getElementById("bgOpa").value;

	var tx = document.getElementById("tx").checked;
	var txHue = document.getElementById("txHue").value;
	var txSat = document.getElementById("txSat").value;
	var txBri = document.getElementById("txBri").value;
	var txOpa = document.getElementById("txOpa").value;

	var len = document.styleSheets[0].cssRules.length;

	// Delete all previous rules
	for (i = 0; i < len; i++) {
		if (document.styleSheets[0].cssRules[i].selectorText == "::selection") {
			document.styleSheets[0].deleteRule(i);
			// Go back 1 and also adjust len to avoid skipping
			if (i > 0) {
				i -= 1;
			}
			len = document.styleSheets[0].cssRules.length;
		}
	}

	if (bg) {
		document.styleSheets[0].addRule("::selection", "background: hsla(" + bgHue.toString() + ", " + bgSat.toString() + "%, " + bgBri.toString() + "%, " + (bgOpa / 100) + ");");
	}

	if (tx) {
		document.styleSheets[0].addRule("::selection", "color: hsla(" + txHue.toString() + ", " + txSat.toString() + "%, " + txBri.toString() + "%, " + (txOpa / 100) + ");");
	}
};
