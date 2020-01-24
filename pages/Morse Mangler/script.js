const codeSheet = document.querySelector("#code-sheet");
const switchBtn = document.querySelector("#switch");

const morseOut = document.querySelector("#output-morse");
const morseIn = document.querySelector("#input-morse");
const engIn = document.querySelector("#input-english");
const engOut = document.querySelector("#output-english");

const slashSep = document.querySelector("#slash-sep");
const unChars = document.querySelector("#unknown-chars");
const extraSpaces = document.querySelector("#extra-spaces");

const morse = {
	"a": ".-",
	"b": "-...",
	"c": "-.-.",
	"d": "-..",
	"e": ".",
	"f": "..-.",
	"g": "--.",
	"h": "....",
	"i": "..",
	"j": ".---",
	"k": "-.-",
	"l": ".-..",
	"m": "--",
	"n": "-.",
	"o": "-.",
	"p": ".--.",
	"q": "--.-",
	"r": ".-.",
	"s": "...",
	"t": "-",
	"u": "..-",
	"v": "...-",
	"w": ".--",
	"x": "-..-",
	"y": "-.--",
	"z": "--..",
	".": ".-.-.-",
	",": "--..--",
	"?": "..--..",
	"/": "-..-.",
	"@": ".--.-.",
	"1": ".----",
	"2": "..---",
	"3": "...--",
	"4": "....-",
	"5": ".....",
	"6": "-....",
	"7": "--...",
	"8": "---..",
	"9": "----.",
	"0": "-----",
}

const chars = (() => {
	let result = {}
	for (let i in morse)
		result[morse[i]] = i;
	return result;
})();

/**
 * Space or strip the spaces from a string
 * @param {string} string - The string to modify
 * @param {boolean} bool - Whether to space the string
 */
function spaced(string, bool) {
	let result = "";
	if (bool) {
		for (let i of string)
			result += i + " "
		return result.slice(0, -1);
	}
	else return string.replace(/\s/g, "");
}

function checked(element) {
	return element.classList.contains("checked");
}

// ################################################################################################
// ######################################## Event Listeners #######################################
// ################################################################################################

switchBtn.addEventListener("click", () => {
	switchBtn.classList.add("switching");
	document.querySelector(".card").classList.toggle("rotated");
	setTimeout(() => {
		switchBtn.classList.remove("switching");
	}, 1000);
});

document.querySelector(".up").addEventListener("click", () => {
	codeSheet.style["top"] = "0";
});

document.querySelector(".close").addEventListener("click", () => {
	codeSheet.style["top"] = "100vh";
})

function check(e) {
	e.target.classList.toggle("checked");
}

for (let c of document.querySelectorAll(".checkbox")) {
	c.addEventListener("click", check);
}

document.querySelector("#copy-morse").addEventListener("click", function() {
	if (morseOut.textContent !== "") {
		morseOut.select();
		morseOut.setSelectionRange(0, 99999);
		document.execCommand("copy");
		this.focus()
		let copied = document.createElement("div");
		copied.classList.add("copied-popup");
		document.body.append(copied);
		setTimeout(() => {
			document.querySelector(".copied-popup").remove();
		}, 500);
	}
});

document.querySelector("#copy-english").addEventListener("click", function() {
	if (engOut.textContent !== "") {
		engOut.select();
		engOut.setSelectionRange(0, 99999);
		document.execCommand("copy");
		this.focus();
		let copied = document.createElement("div");
		copied.classList.add("copied-popup");
		document.body.append(copied);
		setTimeout(() => {
			document.querySelector(".copied-popup").remove();
		}, 500);
	}
});

// ################################################################################################
// ########################################## Translating #########################################
// ################################################################################################

document.querySelector("#translate").addEventListener("click", () => {
	// if the side with English to morse is facing forwards
	if (document.querySelector(".card").classList.contains("rotated")) {
		morseOut.textContent = "";
		for (let i of engIn.value.toLowerCase()) {
			if (i === " ")
				morseOut.textContent += checked(slashSep) ? "/ " : "  ";
			else {
				if (morse[i] === undefined) {
					if (checked(unChars))
						morseOut.textContent += "# ";
					else continue;
				}
				else morseOut.textContent += spaced(morse[i], checked(extraSpaces)) + " ";
			}
		}
	}
	// if the side with morse to english is facing forwards
	else {
		engOut.textContent = "";
		let wordSep = checked(slashSep) ? " / " : "   ";
		let words = morseIn.value.split(wordSep).map((e) => e.split(" "));
		for (let word of words) {
			for (let char of word) {
				engOut.textContent += chars[char] === undefined ? (checked(unChars) ? "# " : "") : chars[char];
			}
			engOut.textContent += " ";
		}
	}
})

// Store settings and rotation in localstorage