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

// function for send the query to the next page and change to next page
const sendQuery = (value) => {
	// window.document.location es la direccion completa de donde se encuentra la pag el cual retorna el actual URL
	window.document.location = "detailContry.html" + "?pais=" + value;
	// aca estamos estamos haciendo 2 cosas, 1) al igualar el location del document a "detailContry.html" estamos renderizando manualmente la pag a esa direccion
	// 2) adicional al renderizar la pag estamos agregando un query a ese URL de esa pag donde es "?pais=" es el nombre del query y value el valor a pasar de esta pag a la otra
};

// fetchs data

const fetchData = async () => {
	//query va a hacer el texto que el usuario coloque en el input
	let res;

	try {
		res = await fetch("https://restcountries.com/v3.1/all");

		let result = await res.json();

		// setting the default value
		infoCountry.innerHTML = "";

		result.map((result) => {
			const contenido = () => {
				// destructurizamos
				let { name, flags, region, capital, population } = result;

				const div = `<div class="card">
				<img src="${flags.png}" alt="Avatar" style="width: 100%" />
				<div class="container">
				<h4><b>${name.common}</b></h4>
				<p>Population : ${population}</p>
				<p>Region : ${region}</p>
				<p>Capital : ${capital}</p>
				<button class="button button-color-card" onclick="sendQuery('${name.common}')">
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
			const contenido = () => {
				// destructurizamos
				let { name, flags, region, capital, population } = result;

				const div = `<div class="card">
				<img src="${flags.png}" alt="Avatar" style="width: 100%" />
				<div class="container">
				<h4><b>${name.common}</b></h4>
				<p>Population : ${population}</p>
				<p>Region : ${region}</p>
				<p>Capital : ${capital}</p>
				<button class="button button-color-card" onclick="sendQuery('${name.common}')">
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
			const contenido = () => {
				// destructurizamos
				let { name, flags, region, capital, population } = result;

				const div = `<div class="card">
				<img src="${flags.png}" alt="Avatar" style="width: 100%" />
				<div class="container">
				<h4><b>${name.common}</b></h4>
				<p>Population : ${population}</p>
				<p>Region : ${region}</p>
				<p>Capital : ${capital}</p>
				<button class="button button-color-card" onclick="sendQuery('${name.common}')">
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
