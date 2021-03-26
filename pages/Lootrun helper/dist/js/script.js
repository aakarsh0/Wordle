// ################################################ Constants ################################################
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

const flippers = document.querySelectorAll(".flipper");
const uptimesText = document.querySelector("#uptimes-text");
const lootedText = document.querySelector("#looted-text");
const parseData = document.querySelector("#parse");
const reInput = document.querySelector("#re-input");
const timerEl = document.querySelector("#time-since span");
const upList = document.querySelector("#up-list");
const lootedList = document.querySelector("#looted-list");
const worldList = document.querySelector("#world-list");

// ############################################# Tab Clicked code ############################################
for (let i of document.querySelectorAll(".tab")) {
	i.addEventListener("click", selectTab);
}

function selectTab(e) {
	let tabFor = e.target.getAttribute("for");
	if (!e.target.classList.contains("activeTab")) {
		let previous = document.querySelector(".tab.activeTab").getAttribute("for");
		// previous.classList.remove("activeTab");
		// e.target.classList.add("activeTab");
		for (let i of document.querySelectorAll(`.${previous}`)) {
			i.classList.remove("activeTab");
		}
		for (let i of document.querySelectorAll(`.${tabFor}`)) {
			i.classList.add("activeTab");
		}
	}
}