chrome.storage.sync.get(null,
	function (values) {
		// Create stylesheet
		var sheet = (function() {
			var style = document.createElement('style');
			style.appendChild(document.createTextNode(''));
			document.head.appendChild(style);
			return style.sheet;
		})();

		// Background color
		if (values.bg) {
			styleString =
				"body ::selection { background-color: hsla(" +
					values.bgHue.toString() + ", " +
					values.bgSat.toString() + "%, " +
					values.bgBri.toString() + "%, " +
					(values.bgOpa / 100) +
				") !important; }";
		}
		else {
			styleString = "body ::selection { background-color: inherit !important; }";
		}
		sheet.insertRule(styleString);


		// Text color
		if (values.tx) {
			styleString =
				"body ::selection { color: hsla(" +
					values.txHue.toString() + ", " +
					values.txSat.toString() + "%, " +
					values.txBri.toString() + "%, " +
					(values.txOpa / 100) +
				") !important; }";
		}
		else {
			styleString = "body ::selection { color: inherit !important; }";
		}
		sheet.insertRule(styleString);
	}
);
