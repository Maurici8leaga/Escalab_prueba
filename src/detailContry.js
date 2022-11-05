window.addEventListener("load", () => {
	init();
});

const catchingQuery = () => {
	let query = document.location.search.replace(/^.*?\=/, "");
	console.log(query);
};
