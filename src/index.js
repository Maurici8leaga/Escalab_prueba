const searchCountry = document.getElementById("searchCountry");
const searchRegion = document.getElementById("searchRegion");
const infoCountry = document.getElementById("infoCountry");

window.addEventListener("load", () => {
	// este event listener sirve para ejecutar funciones y cargen apenas corra la app, lleva 2 parametros "load"
	// un string para identificar para que es el event y el 2do debe ser un function
	// statusPage();
	fetchData();
	loading();
});

// const statusPage = () => {
// 	let page = document.body.id;

// 	switch (page) {
// 		case "page1":
// 			fetchData();
// 			loading();
// 			break;
// 		// case "page2":
// 		// 	getQueryUrl();
// 		// 	return console.log("estoy en pag2");
// 		// 	break;
// 		default:
// 			return console.log("no se trajo nada");
// 	}
// };

// creamos un function para el buscar el pais deseado
const searchBar = () => {
	// esto sera el valor que tenga el input
	let searchQuery = searchCountry.value;

	loading();

	// llamos otra vez la funcion de busqueda pero con el query
	fetchCountries(searchQuery);
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
	infoCountry.innerHTML = `<div>
    <p>Loading ....</p>
</div>`;
};

// reset function for select region element
const reset = () => {
	// de esta forma hacemos un reset de las options del select element
	// selectedIndex contiene el numero de opcion del element al igualarlo a 0 lo obligamos a que su valor sea el por defecto
	document.getElementById("searchRegion").selectedIndex = 0;
};

// function addUrlParameter(name, value) {
// 	var searchParams = new URLSearchParams(window.location.search);
// 	searchParams.set(name, value);
// 	window.location.search = searchParams.toString();

// 	console.log(name, value);
// }

const sendQuery = (value) => {
	window.document.location = "detailContry.html" + "?pais=" + value;
};

const fetchData = async () => {
	let res;

	try {
		res = await fetch("https://restcountries.com/v3.1/all");

		let result = await res.json();

		// setting the default value
		infoCountry.innerHTML = "";

		result.map((result) => {
			const contenido = () => {
				// destructurizamos
				let { name, flags, region, capital, population, cca2 } = result;

				const div = `<div class="card">
			<img src="${flags.png}" alt="Avatar" style="width: 100%" />
			<div class="container">
				<h4><b>${name.official}</b></h4>
				<p>Population : ${population}</p>
				<p>Region : ${region}</p>
				<p>Capital : ${capital}</p>
				<button class="button button-color-card" onclick="sendQuery('KEY')">
					ver mas
				</button>
			</div>
			</div>`;

				return div;
			};

			let div = document.createElement("div");
			//de esta forma se le adjunta el contenido al new div
			div.innerHTML = contenido();
			// infoCountry es el id del div de donde queremos que se coloque la nueva info y appendChild lo que permite es poder adjuntar
			// este nuevo div con la nueva informacion y la adjunta en el HTML
			infoCountry.appendChild(div);
		});
	} catch (error) {
		console.log(error);
	}
};

const fetchCountries = async (query) => {
	//query va a hacer el texto que el usuario coloque en el input
	let res;

	try {
		res = await fetch(`https://restcountries.com/v3.1/name/${query}`);

		let result = await res.json();

		// setting the default value
		infoCountry.innerHTML = "";
		searchCountry.value = "";

		result.map((result) => {
			// destructurizamos
			const { name, flags, region, capital, population } = result;

			// en este const se va a contener la data que esta llegando del fetch y organizada como se espera añadir en el html
			const contenido = `<div class="card">
			<img src="${flags.png}" alt="Avatar" style="width: 100%" />
			<div class="container">
			<h4><b>${name.official}</b></h4>
			<p>Population : ${population}</p>
			<p>Region : ${region}</p>
			<p>Capital : ${capital[0]}</p>
			<button class="button button-color-card">
			<a href="detailContry.html" >Ver mas</a>
			</button>
			</div>
			</div>`;

			let div = document.createElement("div");
			//de esta forma se le adjunta el contenido al new div
			div.innerHTML = contenido;
			// infoCountry es el id del div de donde queremos que se coloque la nueva info y appendChild lo que permite es poder adjuntar
			// este nuevo div con la nueva informacion y la adjunta en el HTML
			infoCountry.appendChild(div);
		});
	} catch (error) {
		const noFound = "Lo siento no se encontro el pais";
		let div = document.createElement("div");
		div.innerHTML = noFound;
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
			// destructurizamos
			const { name, flags, region, capital, population } = result;

			// en este const se va a contener la data que esta llegando del fetch y organizada como se espera añadir en el html
			const contenido = `<div class="card">
			<img src="${flags.png}" alt="Avatar" style="width: 100%" />
			<div class="container">
			<h4><b>${name.official}</b></h4>
			<p>Population : ${population}</p>
			<p>Region : ${region}</p>
			<p>Capital : ${capital[0]}</p>
			<button class="button button-color-card">
			<a href="detailContry.html">Ver mas</a>
			</button>		
			</div>
			</div>`;

			let div = document.createElement("div");
			//de esta forma se le adjunta el contenido al new div
			div.innerHTML = contenido;
			// infoCountry es el id del div de donde queremos que se coloque la nueva info y appendChild lo que permite es poder adjuntar
			// este nuevo div con la nueva informacion y la adjunta en el HTML
			infoCountry.appendChild(div);
		});
	} catch (error) {
		console.log(error);
	}
};
