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
					return `<img src="${coatOfArms.png}" alt="Avatar" style="width: 100%" />`;
				} else {
					return "";
				}
			};

			const frenchExist = () => {
				if (demonyms.fra) {
					return `<li>
                    <p>French: Female: ${demonyms.fra.f}, Masculine: ${demonyms.fra.m}</p>
                </li>`;
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

					return `<p>Gini Coefficient by Country : ${arrayOfGini[0].year} - ${arrayOfGini[0].value}</p>`;
				} else {
					return "";
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
					return `<p>Zip code format: ${postalCode.format}</p>`;
				} else {
					return "";
				}
			};

			// functions for sort the items before return to htmlya
			const sortCapital = () => {
				const liElement = capital.map((item) => {
					return `<li><p>${item}</p></li>`;
				});

				return liElement.join(" ");
			};

			const sortLanguages = () => {
				const keyLanguages = Object.values(languages);
				const arrayLanguages = keyLanguages.map((keyLanguages) => ({
					language: keyLanguages,
				}));

				const liElement = arrayLanguages.map((item) => {
					return `<li><p>${item.language}</p></li>`;
				});

				return liElement.join(" ");
				//usamos join() para quitar el separador de commas y lo reemplace por espacios en blanco
			};

			const sortTimezones = () => {
				const liElement = timezones.map((item) => {
					return `<li><p>${item}</p></li>`;
				});

				return liElement.join(" ");
				//usamos join() para quitar el separador de commas y lo reemplace por espacios en blanco
			};

			const div = `<div class="card">
			<img src="${flags.png}" alt="Avatar" style="width: 100%" />
            <div>
                ${coatArmsExist()}
            </div>
			<div class="container">
				<h4><b>${name.common}</b></h4>
                <p>Official name: ${name.official}</p>
                <p>Area: ${area} km²</p>
                <div>
                    <p>Capital : </p>
                    <ul>
                        ${sortCapital()}
                    </ul>
                </div>
                <p>Latitude: ${capitalInfo.latlng[0]} and longitude: ${
				capitalInfo.latlng[1]
			} of the capital</p>
				<p>Continent : ${continents}</p>
                <p>Country code Top Level Domain: ${tld[0]}</p>
                <div>
                    <p>Currency : ${
											arrayOfCurrency[0].currency.name
										} -  Simbolo: ${arrayOfCurrency[0].currency.symbol}</p>
                </div>
                <div>
                    Demonym:
                    <ul>
                        <li>
                            <p>English: Female: ${demonyms.eng.f}, Masculine: ${
				demonyms.eng.m
			}</p>
                        </li>
                        ${frenchExist()}
                    </ul>
                </div>
                <p>FIFA: ${fifaExist()}</p>
                <div>
                    ${giniExist()}
                </div>
                <p>International Prefix: Root: ${idd.root} , Suffixes: ${
				idd.suffixes[0]
			}</p>
                <p>Independent: ${independent}</p>
                <p>Latitude: ${latlng[0]} -  Longitude: ${
				latlng[1]
			} of the country</p>
                <p>Landlocked: ${landlocked}</p>
                <div>
                    <p>Languages: </p>
                    <ul>
                           ${sortLanguages()}
                    </ul>
                </div>
				<p>Population : ${population} </p>
				<p>Region : ${region}</p>
                <p>StartOfWeek: ${startOfWeek}</p>
                <p>Subregion: ${subregion}</p>
                <div>

                    <p>Time zones: </p>
                    <ul>
                        ${sortTimezones()}
                    </ul>
                </div>
                <p>Driving side of cars: ${car.side}</p>
                <div>
                                Google maps: <a href="${maps.googleMaps}">${
				maps.googleMaps
			}</a>
                </div>
                <div>                
                    ${postalCodeExist()}
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
