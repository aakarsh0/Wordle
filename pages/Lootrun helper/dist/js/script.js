const form = document.querySelector("#uploads")
const file1 = document.querySelector("#lr_one");
const file2 = document.querySelector("#lr_two");
const compareBtn = document.querySelector("#compare");
const resetBtn = document.querySelector("#reset");

const first = document.querySelector("#first");
const second = document.querySelector("#second");
const chests1 = first.parentNode.querySelector(".chests");
const chests2 = second.parentNode.querySelector(".chests");
const missing1 = first.parentNode.querySelector(".missing");
const missing2 = second.parentNode.querySelector(".missing");

let LR1_chests, LR2_chests;

compareBtn.addEventListener("click", compare);
resetBtn.addEventListener("click", reset);

const makeChest = (() => {
	function makeCoord(axis, coord) {
		axis = axis.toLowerCase();
		let temp = document.createElement("span");
		temp.className = `axis ${axis}axis`;
		temp.textContent = `${axis}: ${coord}`;
		return temp;
	}
	return (chestObject, both) => {
		let chest = document.createElement("div");
		chest.className = "chest";
		if (chestObject == undefined) {
			chest.classList.add("empty");
		} else {
			if (both) {
				chest.classList.add("both");
			}
			let img = document.createElement("img");
			img.src = "img/lootchest.png";
			img.title = "tier unknown";
			chest.appendChild(img);
			chest.appendChild(makeCoord("x", chestObject.x));
			chest.appendChild(makeCoord("y", chestObject.y));
			chest.appendChild(makeCoord("z", chestObject.z));
		}
		return chest;
	}
})()

const sortFn = (a, b) => {
	if (a.x != b.x) {
		return a.x - b.x;
	} else if (a.z != b.z) {
		return a.z - b.z;
	} else {
		return a.y - b.y;
	}
};

function clearChests() {
	// Would be faster to loop through and delete all children
	first.innerHTML = "";
	second.innerHTML = "";

	chests1.textContent = `Chests: 0`;
	chests2.textContent = `Chests: 0`;

	missing1.textContent = `Missing: 0`;
	missing2.textContent = `Missing: 0`;
}

async function compare() {
	// check if files or text
	if (file1.files.length != 0 && file2.length != 0) {
		// clear current list of chests
		clearChests()
		// parse json from file1
		LR1_chests = await file1.files[0].text().then((val) => JSON.parse(val).chests);
		// parse json from file2
		LR2_chests = await file2.files[0].text().then((val) => JSON.parse(val).chests);
		LR1_chests.sort(sortFn);
		LR2_chests.sort(sortFn);
		chests1.textContent = `Chests: ${LR1_chests.length}`;
		chests2.textContent = `Chests: ${LR2_chests.length}`;
		let comp, missing = [0, 0];
		while (LR1_chests.length != 0 || LR2_chests.length != 0) {
			if (LR1_chests.length == 0) {
				second.appendChild(makeChest(LR2_chests.shift(), false));
				first.appendChild(makeChest());
				++missing[0];
			}
			else if (LR2_chests.length == 0) {
				first.appendChild(makeChest(LR1_chests.shift(), false));
				second.appendChild(makeChest());
				++missing[1];
			}
			else {
				comp = sortFn(LR1_chests[0], LR2_chests[0]);
				if (comp == 0) {
					first.appendChild(makeChest(LR1_chests.shift(), true));
					second.appendChild(makeChest(LR2_chests.shift(), true));
				} else if (comp < 0) {
					first.appendChild(makeChest(LR1_chests.shift(), false));
					second.appendChild(makeChest());
					++missing[1];
				} else {
					first.appendChild(makeChest());
					second.appendChild(makeChest(LR2_chests.shift(), false));
					++missing[0];
				}
			}
		}
		missing1.textContent = `Missing: ${missing[0]}`;
		missing2.textContent = `Missing: ${missing[1]}`;
		first.appendChild(makeChest());
		second.appendChild(makeChest());
	}
}

function reset() {
	form.reset();
	clearChests();
	for (let i of document.querySelectorAll(".lr-label")) {
		i.classList.remove("file");
	}
	compareBtn.setAttribute("disabled", "true");
}
// Make scrolling one scroll the other
first.addEventListener("mouseover", function() {
	this.mouse = true;
});

first.addEventListener("mouseout", function() {
	this.mouse = false;
});

second.addEventListener("mouseover", function() {
	this.mouse = true;
});

second.addEventListener("mouseout", function() {
	this.mouse = false;
});

first.addEventListener("scroll", (e) => {
	if (first.mouse == true) {
		second.scrollTop = first.scrollTop;
	}
});

second.addEventListener("scroll", (e) => {
	if (second.mouse == true) {
		first.scrollTop = second.scrollTop;
	}
});

file1.addEventListener("change", uploadChanged);
file2.addEventListener("change", uploadChanged);

function uploadChanged(e) {
	let label = e.target.nextElementSibling;
	label.classList.add("file");
	label.querySelector(".overlay").textContent = e.target.files[0].name;
	if (file1.files.length > 0 && file2.files.length) {
		compareBtn.setAttribute("disabled", "false");
	}
	// When both have a file enable the compare button
	// When a file is chosen

}