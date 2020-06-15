/**
 * Generate a random integer between two values.
 * @param {number} lower - The lower bound, inclusive
 * @param {dumber} upper - The upper bound, exclusive
 */
function randInt(lower, upper) {
	return Math.round(Math.random() * ((upper-1) - lower) + lower);
}

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
	seed.addEventListener("mouseover", function(e) {
		let emoji = emojis[randInt(0, emojis.length)];
		this.textContent = emoji;
		setIcon(emoji);
	});
	return seed;
}

function createRow(seedSize, pageWidth) {
	let row = document.createElement("div");
	row.classList.add("row");
	console.log(`pageWidth: ${pageWidth}\nseedWidth: ${seedSize}`)
	for (let i = 0; i < Math.floor(pageWidth / seedSize); ++i) {
		row.appendChild(createSeed());
	}
	return row;
}

const emojis = ["🐍", "🦎", "🐜", "🐝", "🦗", "🐛", "🐞", "🐌", "🦋", "🌱", "🌲", "🌹", "🌸", "💐",
 "🥕", "🍓", "🍅", "🍒", "🍄", "🌺", "🌻", "🌼", "🌷", "🥀", "🌳", "🌴", "🌵", "🌾", "🌿", "🍀",
 "🍁", "🍃", "🐀", "🦔", "🐇", "🕷"];

const bodyPadding = 30;
const seedSize = 45;
const {width, height} = document.body.getBoundingClientRect();
const main = document.querySelector("main");

setIcon(emojis[randInt(0, emojis.length)]);


for (let i = 0; i < Math.floor((height - 2*bodyPadding) / seedSize); ++i) {
	main.appendChild(createRow(seedSize, width - 3*bodyPadding));
}