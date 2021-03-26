// ############################################### Click Events ##############################################
let time, timer;
let worlds;

function parseClicked() {
	if (parseData.getAttribute("disabled") == "false") {
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
			// color timer if above specified interval
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
	}
}

// document.querySelector(".delete-world").addEventListener("click", deleteWorldClicked);
// function deleteWorldClicked(e) {
// 	e.target.parentElement.remove();
// }

// document.querySelector(".copy-world").addEventListener("click", copyCommandClicked);
// function copyCommandClicked(e) {
// 	console.log(e.target.parentElement);
// 	navigator.clipboard.writeText(`.cw ${e.target.parentElement.parentElement.getAttribute("wc")}`);
// }

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

function listWorlds() {
	for (let i in worlds) {
		if (worlds[i].up) {
			worlds[i].createWorldElement(worldList);
		}
	}
}

function incrementTime(time) {
	if (time[2] < 59) {
		time[2] += 1;
	}
	else {
		time[2] = 0;
		time[1] += 1;
		if (time[1] < 59) {
			time[1] += 1;
		}
		else {
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
}