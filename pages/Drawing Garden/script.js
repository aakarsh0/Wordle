const emojis = ["🐍", "🦎", "🐜", "🐝", "🦗", "🐛", "🐞", "🐌", "🦋", "🌱", "🌲", "🌹", "🌸", "💐",
 "🥕", "🍓", "🍅", "🍒", "🍄", "🌺", "🌻", "🌼", "🌷", "🥀", "🌳", "🌴", "🌵", "🌾", "🌿", "🍀",
 "🍃", "🐀", "🦔", "🐇", "🕷"];

const time = [0, 0, 0, 0];
const timer = setInterval(() => {
	time[0] = (time[0] + 1) % 100;
	if (time[0] == 0) {
		time[1] = (time[1] + 1) % 60;
		if (time[1] == 0) {
			time[2] = (time[2] + 1) % 60;
			if (time[2] == 0) {
				time[3] = (time[3] + 1) % 60;
			}
		}
	}
}, 10);
const main = document.querySelector("main");
const notice = document.querySelector(".notice");

let remainingSeeds = 0;

/**
 * Generate a random integer between two values.
 * @param {number} lower - The lower bound, inclusive
 * @param {dumber} upper - The upper bound, exclusive
 */
function randInt(lower, upper) {
	return Math.round(Math.random() * ((upper-1) - lower) + lower);
}

/**
 * Retrieve the numeric value from a string containing a value and px
 * @param {string} value - The string containing the value 
 */
function value(value) {
	return Number(value.slice(0, -2));
}

const touched = (function(e) {
	const units = ["milisecond", "second", "minute", "hour"];
	const display = notice.querySelector(".wasted-time");
	return (e) => {
		if (e == "〰") {
			if (--remainingSeeds <= 0) {
				clearInterval(timer);
				let result = "";
				for (let i = 1; i< time.length; ++i) {
					if (time[i] > 0) {
						result += `${time[i]} ${units[i] + ((time[i] > 1) ? "s" : "")} `;
					}
				}
				display.textContent = result;
				notice.style.right = 0;
			}
		}
	}
})();

const setIcon = (() => {
	const favicon = document.querySelector("link[rel='icon']");
	return (newIcon) => {
		favicon.setAttribute("href", `
		data:image/svg+xml,
		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
			<text y='90px' font-size='90'>
			${newIcon}
			</text>
		</svg>
		`);
	};
})();

function createSeed() {
	let seed = document.createElement("span");
	seed.textContent = "〰";
	seed.className = "seed";
	seed.addEventListener("mouseenter", function(e) {
		let emoji = emojis[randInt(0, emojis.length)];
		touched(this.textContent);
		this.textContent = emoji;
		setIcon(emoji);
	});
	++remainingSeeds;
	return seed;
}

function createRow(seedSize, pageWidth) {
	let row = document.createElement("div");
	row.classList.add("row");
	for (let i = 0; i < Math.floor(pageWidth / seedSize); ++i) {
		row.appendChild(createSeed());
	}
	return row;
}

document.querySelector(".close").addEventListener("click", (e) => {
	e.target.parentElement.style.right = "-150%";
});

const seedSize = (() => {
	let temp = createSeed();
	temp.style.opacity = 0;
	document.body.appendChild(temp);
	let result = temp.getBoundingClientRect().width + value(getComputedStyle(temp)["margin-left"])*2;
	--remainingSeeds;
	temp.remove();
	return result;
})();
const bodyPadding = value(getComputedStyle(document.body)["padding-left"]);
const {width, height} = document.body.getBoundingClientRect();

setIcon(emojis[randInt(0, emojis.length)]);

for (let i = 0; i < Math.floor((height - 2*bodyPadding) / seedSize); ++i) {
	main.appendChild(createRow(seedSize, width - 3*bodyPadding));
}