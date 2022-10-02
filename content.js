function makeColor(hue, sat, bri, opa) {
	return `hsla(${hue}, ${sat}%, ${bri}%, ${opa / 100})`;
}

async function addStyle() {
	// Get options
	const options = await chrome.storage.sync.get();

	// Get colors
	const tx = options.tx ? makeColor(options.txHue, options.txSat, options.txBri, options.txOpa) : 'inherit';
	const bg = options.bg ? makeColor(options.bgHue, options.bgSat, options.bgBri, options.bgOpa) : 'inherit';

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
			color: ${tx} !important;
			background-color: ${bg} !important;
		}
	`;

	// Append stylesheet to body
	const style = document.createElement('style');
	document.head.appendChild(style);
	style.sheet.insertRule(rule);
}
addStyle();
