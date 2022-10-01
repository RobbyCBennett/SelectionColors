var bgHue = document.getElementById("bgHue");
var bgSat = document.getElementById("bgSat");
var bgBri = document.getElementById("bgBri");
var bgOpa = document.getElementById("bgOpa");

var txHue = document.getElementById("txHue");
var txSat = document.getElementById("txSat");
var txBri = document.getElementById("txBri");
var txOpa = document.getElementById("txOpa");

bg.addEventListener("change", liveFeedback);
bgHue.addEventListener("change", liveFeedback);
bgSat.addEventListener("change", liveFeedback);
bgBri.addEventListener("change", liveFeedback);
bgOpa.addEventListener("change", liveFeedback);

tx.addEventListener("change", liveFeedback);
txHue.addEventListener("change", liveFeedback);
txSat.addEventListener("change", liveFeedback);
txBri.addEventListener("change", liveFeedback);
txOpa.addEventListener("change", liveFeedback);

function liveFeedback() {
	document.getElementById("bgHueVal").innerHTML = bgHue.value + " <sup>o</sup>";
	document.getElementById("bgSatVal").innerHTML = bgSat.value + " %";
	document.getElementById("bgBriVal").innerHTML = bgBri.value + " %";
	document.getElementById("bgOpaVal").innerHTML = bgOpa.value + " %";

	document.getElementById("txHueVal").innerHTML = txHue.value + " <sup>o</sup>";
	document.getElementById("txSatVal").innerHTML = txSat.value + " %";
	document.getElementById("txBriVal").innerHTML = txBri.value + " %";
	document.getElementById("txOpaVal").innerHTML = txOpa.value + " %";

	var len = document.styleSheets[0].cssRules.length;

	// Delete all previous rules
	for (i = 0; i < len; i++) {
		if ((document.styleSheets[0].cssRules[i].selectorText == "input.bg[type='range']::-webkit-slider-thumb")
		|| (document.styleSheets[0].cssRules[i].selectorText == "#bgSat::-webkit-slider-runnable-track")
		|| (document.styleSheets[0].cssRules[i].selectorText == "#bgOpa::-webkit-slider-runnable-track")
		|| (document.styleSheets[0].cssRules[i].selectorText == "#txSat::-webkit-slider-runnable-track")
		|| (document.styleSheets[0].cssRules[i].selectorText == "#txOpa::-webkit-slider-runnable-track")) {
			document.styleSheets[0].deleteRule(i);
			// Go back 1 and also adjust len to avoid skipping
			if (i > 0) {
				i -= 1;
			}
			len = document.styleSheets[0].cssRules.length;
		}
	}

	if (bg.checked) {
		// Enable the sliders
		document.getElementById("bgHue").disabled = false;
		document.getElementById("bgSat").disabled = false;
		document.getElementById("bgBri").disabled = false;
		document.getElementById("bgOpa").disabled = false;

		// Color the slider thumbs
		document.styleSheets[0].addRule("input.bg[type='range']::-webkit-slider-thumb", "background: hsl(" + bgHue.value.toString() + ", " + bgSat.value.toString() + "%, " + bgBri.value.toString() + "%);");

		// Color the slider tracks
		document.styleSheets[0].addRule("#bgHue::-webkit-slider-runnable-track", "background: linear-gradient(to right, #FF0000, #FFBF00, #80FF00, #00FF40, #00FFFF, #0040FF, #8000FF, #FF00BF, #FF0000);");
		document.styleSheets[0].addRule("#bgSat::-webkit-slider-runnable-track", "background: linear-gradient(to right, #7F7F7F, hsl(" + bgHue.value.toString() + ", 100%, 50%));");
		document.styleSheets[0].addRule("#bgBri::-webkit-slider-runnable-track", "background: linear-gradient(to right, #000000, hsl(" + bgHue.value.toString() + ", 100%, 50%), #FFFFFF);");
		document.styleSheets[0].addRule("#bgOpa::-webkit-slider-runnable-track", "background: linear-gradient(to right, hsla(0, 100%, 100%, 0), hsl(" + bgHue.value.toString() + ", 100%, 50%));");
	} else {
		// Disable the sliders
		document.getElementById("bgHue").disabled = true;
		document.getElementById("bgSat").disabled = true;
		document.getElementById("bgBri").disabled = true;
		document.getElementById("bgOpa").disabled = true;

		// Gray the slider thumbs
		document.styleSheets[0].addRule("input.bg[type='range']::-webkit-slider-thumb", "background: #DDD;");

		// Gray the slider tracks
		document.styleSheets[0].addRule("#bgHue::-webkit-slider-runnable-track", "background: #DDD;");
		document.styleSheets[0].addRule("#bgSat::-webkit-slider-runnable-track", "background: #DDD;");
		document.styleSheets[0].addRule("#bgBri::-webkit-slider-runnable-track", "background: #DDD;");
		document.styleSheets[0].addRule("#bgOpa::-webkit-slider-runnable-track", "background: #DDD;");
	}

	if (tx.checked) {
		// Enable the sliders
		document.getElementById("txHue").disabled = false;
		document.getElementById("txSat").disabled = false;
		document.getElementById("txBri").disabled = false;
		document.getElementById("txOpa").disabled = false;

		// Color the slider thumbs
		document.styleSheets[0].addRule("input.tx[type='range']::-webkit-slider-thumb", "background: hsl(" + txHue.value.toString() + ", " + txSat.value.toString() + "%, " + txBri.value.toString() + "%);");

		// Color the slider tracks
		document.styleSheets[0].addRule("#txHue::-webkit-slider-runnable-track", "background: linear-gradient(to right, #FF0000, #FFBF00, #80FF00, #00FF40, #00FFFF, #0040FF, #8000FF, #FF00BF, #FF0000);");
		document.styleSheets[0].addRule("#txSat::-webkit-slider-runnable-track", "background: linear-gradient(to right, #7F7F7F, hsl(" + txHue.value.toString() + ", 100%, 50%));");
		document.styleSheets[0].addRule("#txBri::-webkit-slider-runnable-track", "background: linear-gradient(to right, #000000, hsl(" + txHue.value.toString() + ", 100%, 50%), #FFFFFF);");
		document.styleSheets[0].addRule("#txOpa::-webkit-slider-runnable-track", "background: linear-gradient(to right, hsla(0, 100%, 100%, 0), hsl(" + txHue.value.toString() + ", 100%, 50%));");
	} else {
		// Disable the sliders
		document.getElementById("txHue").disabled = true;
		document.getElementById("txSat").disabled = true;
		document.getElementById("txBri").disabled = true;
		document.getElementById("txOpa").disabled = true;

		// Gray the slider thumbs
		document.styleSheets[0].addRule("input.tx[type='range']::-webkit-slider-thumb", "background: #DDD;");

		// Gray the slider tracks
		document.styleSheets[0].addRule("#txHue::-webkit-slider-runnable-track", "background: #DDD;");
		document.styleSheets[0].addRule("#txSat::-webkit-slider-runnable-track", "background: #DDD;");
		document.styleSheets[0].addRule("#txBri::-webkit-slider-runnable-track", "background: #DDD;");
		document.styleSheets[0].addRule("#txOpa::-webkit-slider-runnable-track", "background: #DDD;");
	}

	applyColorsPreview();
	save();
}
