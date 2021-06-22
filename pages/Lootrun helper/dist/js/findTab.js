// ############################################### Click Events ##############################################
let time, timer;
let worlds;

function parseClicked() {
	if (parseData.getAttribute("disabled") == "false") {
		//todo Save filter preferances locally
		// Parse data
		worlds = processUptimes(uptimesText);
		processLooted(lootedText, worlds);

		// listWorlds(minUp, MaxUp)
		listWorlds();

		for (let i of flippers) {
			i.classList.add("flipped");
		}
		reInput.setAttribute("disabled", false);
		parseData.setAttribute("disabled", true);

		time = [0, 0, 0];
		timer = setInterval(() => {
			incrementTime(time);
			updateTimeEl(time, timerEl);
		}, 1000);
	}
}

function reInputClicked() {
	if (reInput.getAttribute("disabled") == "false") {
		for (let i of flippers) {
			i.classList.remove("flipped");
		}
		parseData.setAttribute("disabled", false);
		reInput.setAttribute("disabled", true);

		// Reset timer
		clearInterval(timer);
		time = [0, 0, 0];
		updateTimeEl(time, timerEl);

		// Clear text area data
		uptimesText.value = "";
		lootedText.value = "";
		worldList.innerText = "";
	}
}

// ############################################ Utility Functions ############################################
function processUptimes(uptimes) {
	let result = {};
	let wc;
	for (let i of uptimes.value.split("\n")) {
		wc = World.getUpWC(i);
		if (wc == null) continue;
		result[wc] = new World(wc, i, true);
		result[wc].createUpElement(upList);
	}
	return result;
}

function processLooted(looted, worlds) {
	for (let i of looted.value.split("\n")) {
		let wc = World.getLootedWC(i);
		if (wc == null) continue;
		if (worlds[wc] !== undefined) {
			worlds[wc].loot(i);
		} else {
			worlds[wc] = new World(wc, i, false);
		}
		worlds[wc].createLootedElement(lootedList);
	}
}

const listWorlds = (() => {
	function compareFn(a, b) {
		aUp = a.uptime[0]*60 + a.uptime[1];
		bUp = b.uptime[0]*60 + b.uptime[1]
		if (a.looted !== b.looted) {
			return a.looted - b.looted;
		}
		if (aUp !== bUp) {
			return bUp - aUp;
		}
		// at this stage if a is looted so is b
		else if (a.looted) {
			return (b.lastLooted[0]*60 + b.lastLooted[1]) - (a.lastLooted[0]*60 + a.lastLooted[1]);
		}
		return 0;
	}
	return () => {
		let worldArr = Object.values(worlds).sort(compareFn);
		let upFilter = getUpTimeFilters();
		console.log(upFilter);
		for (let i of worldArr) {
			if (i.up && i.fitsFilter(upFilter)) {
				i.createWorldElement(worldList);
			}
		}
	}
})();

function incrementTime(time) {
	if (time[2] < 59) {
		time[2] += 1;
	}
	else {
		time[2] = 0;
		time[1] += 1;
		if (time[1] === 59) {
			time[1] = 0;
			time[0] += 1;
		}
	}
}

function updateTimeEl(time, el) {
	let result = "";
	for (let i of time) {
		if (i < 10) {
			result += `0${i}:`;
		}
		else {
			result += `${i}:`;
		}
	}
	el.textContent = result.substr(0, result.length-1);
	// Yellow warn when above 3 mins old, red warn when above 5 mins old
	let minsSinceInput = time[0]*60 + time[1]
	if (minsSinceInput >= 3) {
		el.classList.add("warn-1");

		if (minsSinceInput >= 5) {
			el.classList.add("warn-2");
		}
	} else {
		el.classList.remove("warn-1");
		el.classList.remove("warn-2");
	}
}

const getUpTimeFilters = (() => {
	const minUpHours = document.querySelector("#min-up-hours");
	const minUpMinutes = document.querySelector("#min-up-minutes");
	const maxUpHours = document.querySelector("#max-up-hours");
	const maxUpMinutes = document.querySelector("#max-up-minutes");
	return () => {
		let result = {
			minTotalMinutes: 0,
			maxTotalMinutes: 0
		}
		if (!isNaN(minUpHours.value) && minUpHours.value <= 9 && minUpHours.value >= 0) {
			result.minTotalMinutes = Number(minUpHours.value*60);
		}
		if (!isNaN(minUpMinutes.value) && minUpMinutes.value <= 59 && minUpMinutes.value >= 0) {
			result.minTotalMinutes += Number(minUpMinutes.value);
		}
		if (!isNaN(maxUpHours.value) && maxUpHours.value <= 9 && maxUpHours.value >= 0) {
			result.maxTotalMinutes = Number(maxUpHours.value*60);
		}
		if (!isNaN(maxUpMinutes.value) && maxUpMinutes.value <= 59 && maxUpMinutes.value >= 0) {
			result.maxTotalMinutes += Number(maxUpMinutes.value);
		}
		return result;
	}
})();