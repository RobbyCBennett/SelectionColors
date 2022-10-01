function resetColors() {
	chrome.storage.sync.set({
		// Reset all values to their defaults
		bg: true,
		bgHue: 165,
		bgSat: 100,
		bgBri: 50,
		bgOpa: 25,

		tx: false,
		txHue: 0,
		txSat: 0,
		txBri: 0,
		txOpa: 100
	});
	load();
}

function load() {
	chrome.storage.sync.get(null,
	function (values) {
		if (values.bg == undefined) {
			resetColors();
		}

		document.getElementById("bg").checked = values.bg;
		document.getElementById("bgHue").value = values.bgHue;
		document.getElementById("bgSat").value = values.bgSat;
		document.getElementById("bgBri").value = values.bgBri;
		document.getElementById("bgOpa").value = values.bgOpa;

		document.getElementById("tx").checked = values.tx;
		document.getElementById("txHue").value = values.txHue;
		document.getElementById("txSat").value = values.txSat;
		document.getElementById("txBri").value = values.txBri;
		document.getElementById("txOpa").value = values.txOpa;

		liveFeedback();
	});
};

function save() {
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

	chrome.storage.sync.set({
		bg: bg,
		bgHue: bgHue,
		bgSat: bgSat,
		bgBri: bgBri,
		bgOpa: bgOpa,

		tx: tx,
		txHue: txHue,
		txSat: txSat,
		txBri: txBri,
		txOpa: txOpa
	}, animateSaved());
};

// Load options
document.addEventListener("DOMContentLoaded", load);

// Reset colors
document.getElementById("resetColors").addEventListener("click", resetColors);

// Wait to avoid flashing
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
async function wait() {
	await sleep(1);
	document.styleSheets[0].addRule(".hidden", "opacity: 1");
}
wait();
