// New method to test:
	// Dynamically create something called selectionColors.css and add it to document.styleSheets

// Websites to test this out on:
	// YouTube
	// Stack Overflow
	// Plutio

chrome.storage.sync.get(null,
	function (values) {
		// Try to find a local stylesheet
		if (values.bg || values.tx) {
			localStyleSheetFound = -1;
			for (var i = 0; i < document.styleSheets.length; i++) {
				if (document.styleSheets[i].href == null) {
					localStyleSheetFound = i;
					break;
				}
			}
			// if (localStyleSheetFound == -1) {
			// 	console.log("Selection Colors is having trouble adding your style. It may cause issues on this website if the website checks for HTML changes.");
			// }
		}



		// Background color
		if (values.bg) {
			styleString =
				"body ::selection { background-color: hsla(" +
					values.bgHue.toString() + ", " +
					values.bgSat.toString() + "%, " +
					values.bgBri.toString() + "%, " +
					(values.bgOpa / 100) +
				") !important; }";
			styleStringTag = "<style>" + styleString + "</style>";
		}
		else {
			styleString = "body ::selection { background-color: inherit !important; }";
			styleStringTag = "<style>" + styleString + "</style>";
		}

		if (localStyleSheetFound != -1) {
			document.styleSheets[localStyleSheetFound].insertRule(styleString); // The sneaky method
		}
		else {
			// document.body.innerHTML += styleStringTag; // Now all of China knows you're here!
		}



		// Text color
		if (values.tx) {
			styleString =
				"body ::selection { color: hsla(" +
					values.txHue.toString() + ", " +
					values.txSat.toString() + "%, " +
					values.txBri.toString() + "%, " +
					(values.txOpa / 100) +
				") !important; }";
			styleStringTag = "<style>" + styleString + "</style>";
		}
		else {
			styleString = "body ::selection { color: inherit !important; }";
			styleStringTag = "<style>" + styleString + "</style>";
		}

		if (localStyleSheetFound != -1) {
			document.styleSheets[localStyleSheetFound].insertRule(styleString);
		}
		else {
			// document.body.innerHTML += styleStringTag;
		}
	}
);
