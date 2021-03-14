// fetch("https://athena.wynntils.com/cache/get/serverList")
// 	.then(res => res.json())
// 	.then(data => console.log(data));

const uptimes = document.querySelector("#uptimes");
const looted = document.querySelector("#looted");
const wc = document.querySelector("#world-number");
const unlooted = document.querySelector("#unlooted");

let uptimesValue = "";
let lootedValue = "";

let worlds = {};
let lootedWorlds = {};

function check() {
	let reparsed = false;
	if (uptimesValue !== uptimes.value) {
		parseUptimes();
		reparsed = true;
		console.log("reparsed uptimes");
	}
	
	if (lootedValue !== looted.value) {
		parseLooted();
		reparsed = true;
		console.log("reparsed looted worlds");
	}

	if (reparsed) {
		findUnlooted();
	}

	console.log(`Uptime: ${worlds[wc.value]}`);
	console.log(`Last Looted: ${lootedWorlds[wc.value]}`);
}

function parseUptimes() {
	worlds = {};
	let lines = uptimes.value.split("\n");
	let world, num, wc, uptime;
	for (let i of lines) {
		world = i.split("|");
		num = world[0].trim();
		// check that it is not one of the header lines
		if (num[num.length-1] === ".") {
			wc = world[1].trim();
			worlds[wc.substr(2)] = world[3].trim();
		}
	}
	uptimesValue = uptimes.value;
}

function parseLooted() {
	lootedWorlds = {};
	let lines = looted.value.split("\n");
	let result = {}, wc, lastLooted;
	for (let i of lines) {
		// check that it is not one of the header lines
		if (i.substr(0, 2) === "WC") {
			wc = i.substr(2, i.indexOf(" ")).trim();
			lastLooted = i.substr(i.indexOf(" "), i.indexOf("m")).trim();
			lootedWorlds[wc] = lastLooted;
		}
	}
	lootedValue = looted.value;
}

function findUnlooted() {
	unlooted.textContent = "";
	let text = ""
	for (let i of Object.keys(worlds)) {
		if (lootedWorlds[i] === undefined) {
			text += `WC${i}, Uptime: ${worlds[i]}<br>`;
		}
	}
	unlooted.innerHTML = text;
}