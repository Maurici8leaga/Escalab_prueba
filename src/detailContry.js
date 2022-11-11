const infoDetails = document.getElementById("infoDetails");

window.addEventListener("load", () => {
	catchingQuery();
});

const catchingQuery = async () => {
	// document.location.search va a ser el params del URL y replace es un metodo de regular expression lo que hace es buscar la coincidencia con el primero parametro de la funcion
	// y lo remplazara con el 2do parametro en este caso ""
	let query = document.location.search.replace(/^.*?\=/, "");
	// esto -> /^.*?\=/ <- es un regular expression el cual este en specifico buscara el valor que coincida despues de un ? seguido de un =

	let res;

	try {
		res = await fetch(`https://restcountries.com/v3.1/name/${query}`);

		let result = await res.json();

		const dataCountry = () => {
			const {
				name,
				flags,
				region,
				subregion,
				capital,
				capitalInfo,
				population,
				continents,
				currencies,
				demonyms,
				fifa,
				gini,
				latlng,
				area,
				idd,
				independent,
				landlocked,
				languages,
				timezones,
				startOfWeek,
				tld,
				coatOfArms,
				car,
				maps,
				postalCode,
			} = result[0];

			// dandole nombre a la propieda de currency ya que varia esta propiedad varia por pais hacemos esto para poder hacerlo de forma generica
			// y por acceder a la propiedad en todos los paises
			const keysOfCurrency = Object.keys(currencies);
			const arrayOfCurrency = keysOfCurrency.map((keysOfCurrency) => ({
				// creamos un array de objetos con estas propiedades
				abbreviation: keysOfCurrency,
				currency: currencies[keysOfCurrency],
			}));

			// functions for check if exist the object before return to the html
			const coatArmsExist = () => {
				if (coatOfArms != undefined) {
					return `<img src="${coatOfArms.png}" alt="CoatOfArms" />`;
				} else {
					return `<img src="https://cloupyblob.blob.core.windows.net/cloupy/image-not-found.png" alt="NOFOUND"/>`;
				}
			};

			const frenchExist = () => {
				if (demonyms.fra) {
					return `<p>French Female: ${demonyms.fra.f}, French Masculine: ${demonyms.fra.m}</p>`;
				} else {
					return "";
				}
			};

			const giniExist = () => {
				if (gini != undefined) {
					const keyOfGini = Object.keys(gini);
					const arrayOfGini = keyOfGini.map((keyOfGini) => ({
						year: keyOfGini,
						value: gini[keyOfGini],
					}));

					return `${arrayOfGini[0].year} - ${arrayOfGini[0].value}`;
				} else {
					return "information not found";
				}
			};

			const fifaExist = () => {
				if (fifa != undefined) {
					return `${fifa}`;
				} else {
					return "does not apply";
				}
			};

			const postalCodeExist = () => {
				if (postalCode != undefined) {
					return `${postalCode.format}`;
				} else {
					return "";
				}
			};

			// functions for sort the items before return to htmlya
			const sortCapital = () => {
				const liElement = capital.map((item) => {
					return `${item}`;
				});

				return liElement.join(" - ");
			};

			const sortLanguages = () => {
				const keyLanguages = Object.values(languages);
				const arrayLanguages = keyLanguages.map((keyLanguages) => ({
					language: keyLanguages,
				}));

				const liElement = arrayLanguages.map((item) => {
					return `${item.language}`;
				});

				return liElement.join(", ");
				//usamos join() para quitar el separador de commas y lo reemplace por espacios en blanco
			};

			const sortTimezones = () => {
				const liElement = timezones.map((item) => {
					return `${item}`;
				});

				return liElement.join(", ");
				//usamos join() para quitar el separador de commas y lo reemplace por espacios en blanco
			};

			// function true or false for independet value and landlocked
			const truOrFalse = (element) => {
				if (element == true) {
					return "Yes";
				} else {
					return "No";
				}
			};

			const div = `		<div class="infoDetails">
				<div id="nav">
						<button class="inputSubmit" >
							<a href="index.html">Back to menu</a>
						</button>
						<div class="title">
								${name.common}
						</div>
				</div>			
				<div id="info1">
					<div class="infoData border-radius-top div-color-bright">
						<p>Official name :</p>
						<p>${name.official}</p>
					</div>
				<div class="infoData div-color-dark  ">
					<p>Latitude and Longitude :</p>
					<p>lat ${latlng[0]}  long ${latlng[1]}</p>
				</div>
				<div class="infoData div-color-bright">
					<p>Capital :</p>
					<p>${sortCapital()}</p>
				</div>
				<div class="infoData div-color-dark">
				<p>Latitude and Longitude of the capital:</p>
				<p>lat ${capitalInfo.latlng[0]}  long ${capitalInfo.latlng[1]}</p>
				</div>
				<div class="infoData div-color-bright">
					<p>Continent :</p>
					<p>${continents}</p>
				</div>
				<div class="infoData div-color-dark">
					<p>Area :</p>
					<p>${area} km²</p>
				</div>
				<div class="infoData div-color-bright">
					<p>Population :</p>
					<p>${population}</p>
				</div>
				<div class="infoData div-color-dark">
					<p>Region :</p>
					<p>${region}</p>
				</div>
				<div class="infoData div-color-bright">
				<p>Sub Region :</p>
				<p>${subregion}</p>
				</div>
				<div class="infoData div-color-dark">
					<div class="infoPropertyData">Language :</div>
					<div class="infoLisData">${sortLanguages()}</div>
				</div>
				<div class="infoData border-radius-bottom div-color-bright">
					<div class="infoPropertyData">Demonym :</div>
					<div class="infoLisData">
						<p>English Female: ${demonyms.eng.f}, English Masculine ${demonyms.eng.m}</p>
						${frenchExist()}
					</div>
				</div>
				</div>
				<div id="flag">
					<div class="container-img-flag">
						<img src="${flags.png}" alt="Flag" />
					</div>
				</div>
				<div id="coatOfArms">
					<div class="container-img-coatOfArms">${coatArmsExist()}</div>
				</div>
				<div id="info2">
					<div class="infoData border-radius-top div-color-bright">
						<p>Currency :</p>
						<p>${arrayOfCurrency[0].currency.name}, Symbol : ${
				arrayOfCurrency[0].currency.symbol
			}</p>
					</div>
					<div class="infoData div-color-dark">
					<p>Gini Coefficient by Country :</p>
					<p>${giniExist()}</p>
					</div>
					<div class="infoData div-color-bright">
						<div class="infoPropertyData">Time zones :</div>
						<div class="infoLisData">${sortTimezones()}</div>
					</div>
					<div class="infoData div-color-dark">
					<p>Postal :</p>
					<p>${postalCodeExist()}</p>
				</div>
				<div class="infoData div-color-bright">
					<p>International Prefix :</p>
					<p>Root: ${idd.root} , Suffixes: ${idd.suffixes[0]}</p>
				</div>
				<div class="infoData div-color-dark">
					<p>Country code Top Level Domain :</p>
					<p>${tld[0]}</p>
				</div>
				<div class="infoData div-color-bright">
					<p>Independent :</p>
					<p>${truOrFalse(independent)}</p>
				</div>
				<div class="infoData div-color-dark">
					<p>Landlocked :</p>
					<p>${truOrFalse(landlocked)}</p>
				</div>
				<div class="infoData div-color-bright">
					<p>Google maps :</p>
					<a class="a-color" href="${maps.googleMaps}">${maps.googleMaps}</a>
				</div>
				<div class="infoData div-color-dark">
				<p>Start Of Week :</p>
				<p>${startOfWeek}</p>
				</div>
				<div class="infoData div-color-bright">
					<p>Driving side of cars :</p>
					<p>${car.side}</p>
				</div>
				<div class="infoData  border-radius-bottom div-color-dark">
					<p>FIFA :</p>
					<p>${fifaExist()}</p>
				</div>
				</div>
				</div>`;

			return div;
		};

		let div = document.createElement("div");
		div.innerHTML = dataCountry();
		infoDetails.appendChild(div);
	} catch (error) {
		console.log(error);
	}
};
