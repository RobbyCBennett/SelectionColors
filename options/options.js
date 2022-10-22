// Links

// Main click, other click, and keypress
function clickAndKeypress(el, fn) {
	el.onclick = fn;
	el.onauxclick = fn;
	el.onkeypress = fn;
}

// Link: Big options page
function bigOptions(e) {
	// Skip other keys or right click
	if ((e.code && e.code != 'Enter') || e.button == 2) {
		return;
	}

	// Create tab
	chrome.runtime.openOptionsPage();
}
const bigOptionsLink = document.getElementById('bigOptions');
clickAndKeypress(bigOptionsLink, bigOptions);
if (location.hash != '#popup') {
	bigOptionsLink.className = 'hidden';
}



// Colors

// Make color string from numbers
function makeColor(hue, sat, bri, opa) {
	return `hsla(${hue}, ${sat}%, ${bri}%, ${opa / 100})`;
}

// Set colors of page
function setColors() {
	const style = document.querySelector(':root').style;

	// Selected text
	const bg = options.bg ? makeColor(options.bgHue, options.bgSat, options.bgBri, options.bgOpa) : 'inherit';
	const tx = options.tx ? makeColor(options.txHue, options.txSat, options.txBri, options.txOpa) : 'inherit';
	style.setProperty('--bgSelected', bg);
	style.setProperty('--txSelected', tx);

	// Range thumb
	const bgNoAlpha = options.bg ? makeColor(options.bgHue, options.bgSat, options.bgBri, 100) : 'inherit';
	const txNoAlpha = options.tx ? makeColor(options.txHue, options.txSat, options.txBri, 100) : 'inherit';
	style.setProperty('--bgNoAlpha', bgNoAlpha);
	style.setProperty('--txNoAlpha', txNoAlpha);

	// Range background
	style.setProperty('--bgHue', options.bgHue);
	style.setProperty('--txHue', options.txHue);
}



// Options

// Load all options
const options = {};
async function loadOptions() {
	// Set options locally
	Object.assign(options, await chrome.storage.sync.get());

	// View options on inputs
	for (const [key, value] of Object.entries(options)) {
		const field = document.getElementById(key);
		if (! field) continue;

		if (field.type == 'checkbox') {
			field.checked = value;
		}
		else if (field.type = 'range') {
			field.value = value;
			const id = field.id + 'Number';
			document.getElementById(id).value = value;
		}
	}

	// Preview colors
	setColorsFromOptions();
}
loadOptions();

// Save changed option
let autoSaveTimestamp = 0;
function saveOption(key, value, autoSaveDelay=0) {
	autoSaveTimestamp = Date.now();

	setTimeout(() => {
		// Wait a bit until the user stops
		if (autoSaveTimestamp + autoSaveDelay > Date.now())
			return;

		// Save data
		chrome.storage.sync.set({ [key]: value });

		// Remove close warning
		window.onbeforeunload = null;

	}, autoSaveDelay);
}



// Colors
function setColorsFromOptions() {
	// Hide disabled options
	for (const option of document.getElementsByClassName('bg')) {
		if (options.bg) {
			option.classList.remove('hidden');
		}
		else {
			option.classList.add('hidden');
		}
	}
	for (const option of document.getElementsByClassName('tx')) {
		if (options.tx) {
			option.classList.remove('hidden');
		}
		else {
			option.classList.add('hidden');
		}
	}

	// Set colors to preview
	setColors();
}



// Inputs

// Checkbox
function checkboxChanged(e) {
	const key = e.target.id;
	const value = e.target.checked;

	// Set option locally and preview colors
	options[key] = value;
	setColorsFromOptions();

	// Set option with storage sync immediately
	saveOption(key, value);
}
for (const checkbox of document.querySelectorAll('input[type="checkbox"]')) {
	checkbox.oninput = checkboxChanged;
}

// Range
function rangeChanged(e) {
	const target = e.target;
	let value = parseInt(target.value);

	// Sync range & input
	let otherId, key;
	if (target.type == 'range') {
		// Get key
		key = target.id;

		// Get id of number input
		otherId = key + 'Number';
	}
	else {
		// Get key
		key = target.id.slice(0, -6)

		// Make number input stay in range
		const min = parseInt(target.min);
		const max = parseInt(target.max);
		if (value < min)
			value = target.value = min;
		else if (value > max)
			value = target.value = max;

		// Get id of range input
		otherId = key;
	}
	document.getElementById(otherId).value = value;

	// Set option locally and preview colors
	options[key] = value;
	setColorsFromOptions();

	// Set option with storage sync after the user stops using the slider
	saveOption(key, value, 250);
}
const BACKSPACE = 8;
const DELETE = 46;
const ZERO = 48;
const NINE = 57;
function rangeNumber(e) {
	if (e.keyCode == BACKSPACE || e.keyCode == DELETE || (e.keyCode >= ZERO && e.keyCode <= NINE)) {
		const id = e.target.id + 'Number';
		const number = document.getElementById(id);
		number.value = '';
		number.focus();
	}
}
for (const range of document.querySelectorAll('input[type="range"]')) {
	// Go to number input on key down
	range.onkeydown = rangeNumber;

	// Make container for range, number, & unit
	const containerAll = document.createElement('div');
	containerAll.className = 'flex'
	range.parentNode.appendChild(containerAll);
	containerAll.appendChild(range);

	// Make container for number & unit
	const container = document.createElement('div');
	container.className = 'rangeNumberAndUnit flex'
	containerAll.appendChild(container);

	// Make number input
	const number = document.createElement('input');
	number.type = 'number';
	number.className = 'rangeNumber';
	number.min = range.min;
	number.max = range.max;
	number.id = range.id + 'Number';
	number.tabIndex = -1;
	container.appendChild(number);

	// Make number input unit
	const unit = range.dataset.unitSup || range.dataset.unit;
	if (unit) {
		const unitTagName = range.dataset.unitSup ? 'sup' : 'small';

		const unitContainer = document.createElement('div');
		unitContainer.className = 'rangeNumberUnit flex';
		container.appendChild(unitContainer);

		const unitElement = document.createElement(unitTagName);
		unitElement.innerHTML = unit;
		unitContainer.appendChild(unitElement);
	}

	// Sync both inputs
	range.oninput = rangeChanged;
	number.oninput = rangeChanged;
}
