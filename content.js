// Default options
async function setDefaults() {
	// Get options
	const defaultOptions = {
		bg: true,
		bgHue: 165,
		bgSat: 100,
		bgBri: 50,
		bgOpa: 50,

		tx: false,
		txHue: 0,
		txSat: 0,
		txBri: 0,
		txOpa: 100,
	};
	const currentOptions = await chrome.storage.sync.get();

	// Get keys & values of unsaved options
	const unsavedOptions = {};
	for (const [key, value] of Object.entries(defaultOptions)) {
		if (currentOptions[key] === undefined) {
			unsavedOptions[key] = value;
		}
	}

	// Save unsaved options
	if (Object.keys(unsavedOptions).length) {
		chrome.storage.sync.set(unsavedOptions);
	}
}
setDefaults();



// Set selection colors
function makeColor(hue, sat, bri, opa) {
	return `hsla(${hue}, ${sat}%, ${bri}%, ${opa / 100})`;
}
async function setColorsFromOptions() {
	// Get options
	const options = await chrome.storage.sync.get();

	// Get colors
	const bg = options.bg ? makeColor(options.bgHue, options.bgSat, options.bgBri, options.bgOpa) : 'inherit';
	const tx = options.tx ? makeColor(options.txHue, options.txSat, options.txBri, options.txOpa) : 'inherit';

	// Create css rule
	const rule = `
		::selection,
		body ::selection,
		input::-webkit-datetime-edit-ampm-field:focus,
		input::-webkit-datetime-edit-day-field:focus,
		input::-webkit-datetime-edit-hour-field:focus,
		input::-webkit-datetime-edit-millisecond-field:focus,
		input::-webkit-datetime-edit-minute-field:focus,
		input::-webkit-datetime-edit-month-field:focus,
		input::-webkit-datetime-edit-second-field:focus,
		input::-webkit-datetime-edit-week-field:focus,
		input::-webkit-datetime-edit-year-field:focus {
			background-color: ${bg} !important;
			color: ${tx} !important;
		}
	`;

	// Append stylesheet to body
	const style = document.createElement('style');
	document.head.appendChild(style);
	style.sheet.insertRule(rule);
}
setColorsFromOptions();
