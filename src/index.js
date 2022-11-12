const searchCountry = document.getElementById("searchCountry");
const searchRegion = document.getElementById("searchRegion");
const infoCountry = document.getElementById("infoCountry");

window.addEventListener("load", () => {
	// este event listener sirve para ejecutar funciones y cargen apenas corra la app, lleva 2 parametros "load"
	// un string para identificar para que es el event y el 2do debe ser un function
	fetchData();
	loading();
});

// creamos un function para el buscar el pais deseado
const searchBar = () => {
	// esto sera el valor que tenga el input
	let searchQuery = searchCountry.value;

	loading();

	// llamos otra vez la funcion de busqueda pero con el query
	fetchCountry(searchQuery);
};

// creamos un functio para filtrar los paises por region
const filterRegion = () => {
	const region = document.getElementById("searchRegion").value;
	loading();
	fetchRegion(region);
	reset();
};

// creamos un loading para cuando la data este cargando
const loading = () => {
	infoCountry.innerHTML = `<div class="loading"></div>`;
};

// reset function for select region element
const reset = () => {
	// de esta forma hacemos un reset de las options del select element
	// selectedIndex contiene el numero de opcion del element al igualarlo a 0 lo obligamos a que su valor sea el por defecto
	document.getElementById("searchRegion").selectedIndex = 0;
};

// function for send the query to the next page and change to next page
const sendQuery = (value) => {
	// window.document.location es la direccion completa de donde se encuentra la pag el cual retorna el actual URL
	window.document.location = "detailContry.html" + "?pais=" + value;
	// aca estamos estamos haciendo 2 cosas, 1) al igualar el location del document a "detailContry.html" estamos renderizando manualmente la pag a esa direccion
	// 2) adicional al renderizar la pag estamos agregando un query a ese URL de esa pag donde es "?pais=" es el nombre del query y value el valor a pasar de esta pag a la otra
};

// helpers function

const dataHandler = (element) => {
	if (element == 0 || element == undefined) {
		return "N/A";
	} else {
		return `${element}`;
	}
};

const sortCapital = (element) => {
	if (element != undefined) {
		const liElement = element.map((item) => {
			return `${item}`;
		});

		return liElement.join(" - ");
	} else {
		return "N/A";
	}
};

const contenido = (element) => {
	let { name, flags, region, capital, population } = element;

	const div = `<div class="card">
	<div class="card-flag">
		<img src="${flags.png}" alt="Avatar" />
	</div>
	<div class="card-body">
		<span class="tag">${name.common}</span>
		<h3>Population : ${dataHandler(population)}</h3>
		<h3>Region : ${region}</h3>
		<h3>Capital : ${sortCapital(capital)}</h3>
	</div>

	<button class="button-card" onclick="sendQuery('${name.common}')">
		Read more
	</button>
	</div>`;

	return div;
};

const notFound = () => {
	const divNotFound = `<div class="container-notFound">
		<div class="notFound">
			<h1>404!</h1>
			<h2>NOT FOUND</h2>
			<p>Sorry there are not country found in the data base</p>
		</div>
		</div>`;

	return divNotFound;
};

// fetchs data

const fetchData = async () => {
	//query va a hacer el texto que el usuario coloque en el input
	let res;

	try {
		res = await fetch("https://restcountries.com/v3.1/all");

		let result = await res.json();

		// setting the default value and stop the loading spinner
		infoCountry.innerHTML = "";

		result.map((result) => {
			let div = document.createElement("div");
			//de esta forma se le adjunta el contenido al new div
			div.innerHTML = contenido(result);
			// infoCountry es el id del div de donde queremos que se coloque la nueva info y appendChild lo que permite es poder adjuntar
			// este nuevo div con la nueva informacion y la adjunta en el HTML
			infoCountry.appendChild(div);
		});
	} catch (error) {
		let div = document.createElement("div");
		div.innerHTML = notFound();
		infoCountry.appendChild(div);
		console.log(error);
	}
};

const fetchCountry = async (query) => {
	//query va a hacer el texto que el usuario coloque en el input
	let res;

	try {
		res = await fetch(`https://restcountries.com/v3.1/name/${query}`);

		let result = await res.json();

		// setting the default value
		infoCountry.innerHTML = "";
		searchCountry.value = "";

		result.map((result) => {
			let div = document.createElement("div");
			//de esta forma se le adjunta el contenido al new div
			div.innerHTML = contenido(result);
			// infoCountry es el id del div de donde queremos que se coloque la nueva info y appendChild lo que permite es poder adjuntar
			// este nuevo div con la nueva informacion y la adjunta en el HTML
			infoCountry.appendChild(div);
		});
	} catch (error) {
		let div = document.createElement("div");
		div.innerHTML = notFound();
		infoCountry.appendChild(div);
		console.log(error);
	}
};

const fetchRegion = async (query) => {
	let res;

	try {
		res = await fetch(`https://restcountries.com/v3.1/region/${query}`);

		let result = await res.json();

		// setting the default value
		infoCountry.innerHTML = "";

		result.map((result) => {
			let div = document.createElement("div");
			//de esta forma se le adjunta el contenido al new div
			div.innerHTML = contenido(result);
			// infoCountry es el id del div de donde queremos que se coloque la nueva info y appendChild lo que permite es poder adjuntar
			// este nuevo div con la nueva informacion y la adjunta en el HTML
			infoCountry.appendChild(div);
		});
	} catch (error) {
		let div = document.createElement("div");
		div.innerHTML = notFound();
		infoCountry.appendChild(div);
		console.log(error);
	}
};
