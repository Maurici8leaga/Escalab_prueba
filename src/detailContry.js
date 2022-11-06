window.addEventListener("load", () => {
	catchingQuery();
});

const catchingQuery = () => {
	// document.location.search va a ser el params del URL y replace es un metodo de regular expression lo que hace es buscar la coincidencia con el primero parametro de la funcion
	// y lo remplazara con el 2do parametro en este caso ""
	let query = document.location.search.replace(/^.*?\=/, "");
	// esto -> /^.*?\=/ <- es un regular expression el cual este en specifico buscara el valor que coincida despues de un ? seguido de un =
	console.log(query);
};
