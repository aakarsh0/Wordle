const size = document.querySelector("#size");
size.value = window.outerWidth + " × " + window.outerHeight
window.addEventListener("resize", () => {
	size.value = window.outerWidth + " × " + window.outerHeight
});