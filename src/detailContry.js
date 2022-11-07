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

		console.log(result[0]);

		const dataCountry = () => {
			const {
				name,
				flags,
				region,
				subregion,
				capital,
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
			} = result[0];

			// dandole nombre a la propieda de currency ya que varia esta propiedad varia por pais hacemos esto para poder hacerlo de forma generica
			// y por acceder a la propiedad en todos los paises
			const keysOfCurrency = Object.keys(currencies);
			const arrayOfCurrency = keysOfCurrency.map((keysOfCurrency) => ({
				abbreviation: keysOfCurrency,
				currency: currencies[keysOfCurrency],
			}));

			function frenchExist() {
				if (demonyms.fra) {
					return `<li>
                    <p>French: Female: ${demonyms.fra.f}, Masculine: ${demonyms.fra.m}</p>
                </li>`;
				} else {
					return "";
				}
			}

			function giniExist() {
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
			}

			// function sortLanguages() {
			// 	const keyLanguages = Object.values(languages);
			// 	const arrayLanguages = keyLanguages.map((keyLanguages) => ({
			// 		idioma: keyLanguages,
			// 	}));

			// 	console.log(languages);
			// 	console.log(keyLanguages);

			// 	// for (let i = 0; i < arrayLanguages.length; i++) {
			// 	// 	console.log(arrayLanguages[i].idioma);
			// 	// 	return arrayLanguages[i].idioma;
			// 	// }

			// 	arrayLanguages.map((zu) => {
			// 		console.log(zu.idioma);
			// 		return zu.idioma;
			// 	});
			// }

			const div = `		<div class="card">
			<img src="${flags.png}" alt="Avatar" style="width: 100%" />
			<div class="container">
				<h4><b>${name.official}</b></h4>
                <p>Area: ${area} km²</p>
				<p>Capital : ${capital}</p>
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
                <p>FIFA: ${fifa}</p>
                <div>
                    ${giniExist()}
                </div>
                <p>International Prefix: Root: ${idd.root} , Suffixes: ${
				idd.suffixes[0]
			}</p>
                <p>Independent: ${independent}</p>
                <p>Latitude: ${latlng[0]} -  Longitude: ${latlng[1]}</p>
                <p>Landlocked: ${landlocked}</p>
                <div>
                    <p>Languages: </p>
                    <ul>
                       <li>
                           FALTA POR AGREGAR
                       </li> 
                    </ul>
                </div>
				<p>Population : ${population} </p>
				<p>Region : ${region}</p>
                <p>StartOfWeek: ${startOfWeek}</p>
                <p>Subregion: ${subregion}</p>
                <div>

                    <p>Time zones: </p>
                    <ul>
                        <li>FALTA POR AGREGAR</li>
                    </ul>
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
