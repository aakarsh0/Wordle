// Check if uptime world line is valid, if so construct
// put uptime world in dict with wc as key and add line to up worlds list
// check that looted world line is valid, if so find relevant world in dict if it exists, and call parseworldstring on it
// if parseworldstring is called add line to looted world list

/**
 * Create a new world object
 * @param {Number} wc The world number
 * @param {String} worldString 
 * @param {boolean} up Whether the world is currently up
 */
class World {
	constructor(wc, worldString, up) {
		this.wc = wc;
		this.up = up;
		this.lastLooted;
		this.lootedAreas;
		// There are only two scenarios. If constructed and up is false then it must have been looted
		if (this.up) {
			this.uptime = World.parseUpString(worldString);
			this.looted = false;
		} else {
			this.loot(worldString);
			// in order for sort function to work words that are not up require an uptime
			this.uptime = [0, 0];
		}
		this.upElement;
		this.lootedElement;
		this.worldElement;
	}

	/**
	 * Get the WC of a looted world or reutrn null if world line is invalid
	 * @param {String} worldString 
	 * @returns {Number} The world number, or null if it is not a valid looted string
	 */
	static getLootedWC(worldString) {
		let wc = worldString.substring(0, worldString.indexOf(" "));
		if (wc.substring(0, 2) == "WC") {
			return Number(wc.substring(2));
		} else {
			return null
		}
	}
	
	/**
	 * Get the WC of an up world
	 * @param {String} worldString 
	 * @returns {Number} The world number, or null if it is not a valid world string
	 */
	static getUpWC(worldString) {
		if (worldString.charAt(worldString.length-1) == "m") {
			let wc = Number(worldString.substring(8, 11));
			if (isNaN(wc)) {
				console.warn(`Irregular world string, WC is: ${wc}`);
				return null;
			}
			return wc;
		} else {
			return null;
		}
	}

	static parseUpString(worldString) {
		let time = worldString.split("|")[3];
		let minutes = Number(time.substring(time.length-4, time.length-1));

		let hours = time.substring(0, time.indexOf("h"));

		return [(isNaN(hours) ? 0 : Number(hours)), minutes];
	}

	loot(lootedString) {
		this.looted = true;
		// get the section of the string that contains the time
		let time = lootedString.substring(8, 20).trim();
		let minutes = Number(time.substring(time.length-4, time.length-1))

		let hours = time.substring(0, time.indexOf("h"));

		this.lastLooted = [(isNaN(hours) ? 0 : Number(hours)), minutes];

		// get the section of the string that contains the looted areas
		this.lootedAreas = lootedString.substring(35);
	}

	fitsFilter(filter) {
		let totalMinutes = this.uptime[0]*60 + this.uptime[1];
		// console.log(filter);
		// console.log(`filter min total minutes: ${filter.minTotalMinutes}\nworld total minutes: ${totalMinutes}\nworld: ${this}`);
		return filter.minTotalMinutes <= totalMinutes && filter.maxTotalMinutes >= totalMinutes;
	}

	createUpElement(parent) {
		let el = document.createElement("div");
		el.classList.add("up-world");

		let temp = document.createElement("span");
		temp.textContent = this.wc;
		el.appendChild(temp);

		temp = document.createElement("span");
		temp.textContent = `${this.uptime[0]} h ${this.uptime[1]} m`;
		el.appendChild(temp);

		parent.appendChild(el);
		this.upElement = el;
	}

	createLootedElement(parent) {
		let el = document.createElement("div");
		el.classList.add("looted-world");
		if (!this.up) {
			el.classList.add("down");
		}

		let temp = document.createElement("span");
		temp.textContent = this.wc;
		el.appendChild(temp);

		temp = document.createElement("span");
		temp.textContent = `${this.lastLooted[0]} h ${this.lastLooted[1]} m`;
		el.appendChild(temp);

		temp = document.createElement("span");
		temp.textContent = this.lootedAreas;
		el.appendChild(temp);

		parent.appendChild(el);
		this.lootedElement = el;
	}

	createWorldElement(parent) {
		let el = document.createElement("div");
		el.classList.add("world");
		el.setAttribute("wc", this.wc);

		el.innerHTML = `
		<span>${this.wc}</span>
		<span>${this.uptime[0] > 0 ? this.uptime[0] + " h " : ""}${this.uptime[1]} m</span>
		<span>${
			this.looted ?
			(this.lastLooted[0] > 0 ? this.lastLooted[0] + " h " : "") + this.lastLooted[1] + " m"
			: "N/A"}</span>
		<span>${this.looted ? this.lootedAreas : ""}</span>
		`
		let temp = document.createElement("span");
		temp.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 100 131" fill="none">
			<path d="M16 49a4 4 0 0 1 4-4h50a4 4 0 1 1 0 8H20a4 4 0 0 1-4-4zm4 15a4 4 0 1 0 0 8h59a4 4 0 1 0 0-8H20zm-4 23a4 4 0 0 1 4-4h30a4 4 0 1 1 0 8H20a4 4 0 0 1-4-4zm4 15a4 4 0 1 0 0 8h50a4 4 0 1 0 0-8H20z"/>
			<path fill-rule="evenodd" d="M25 4a4 4 0 0 1 4-4h41a4 4 0 0 1 4 4v7h16c5.523 0 10 4.477 10 10v100a10 10 0 0 1-10 10H10a10 10 0 0 1-10-10V21c0-5.523 4.477-10 10-10h15V4zm8 18V8h33v14H33zm41-3v7a4 4 0 0 1-4 4H29a4 4 0 0 1-4-4v-7H10a2 2 0 0 0-2 2v100a2 2 0 0 0 2 2h80a2 2 0 0 0 2-2V21a2 2 0 0 0-2-2H74z"/>
		</svg>`
		temp.classList.add("copy-world");
		temp.setAttribute("title", "copy planner bot command");
		temp.addEventListener("click", (e) => {navigator.clipboard.writeText(`.cw ${e.target.parentElement.parentElement.getAttribute("wc")}`)});
		el.appendChild(temp);

		temp = document.createElement("span");
		temp.classList.add("delete-world");
		temp.textContent = "×";
		temp.addEventListener("click", (e) => {e.target.parentElement.remove()});
		el.appendChild(temp);

		parent.appendChild(el);
		this.worldElement = el;
	}
}