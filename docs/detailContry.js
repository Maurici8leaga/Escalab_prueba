const infoDetails = document.getElementById("infoDetails");

// function spinner for loading page
const loading = () => {
	infoDetails.innerHTML = `<div class="loading"></div>`;
};

// fetch function for get the data of the country and return it to the UI
const catchingQuery = async () => {
	const query = document.location.search.replace(/^.*?\=/, "");

	try {
		const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);

		const result = await res.json();

		//  setting the default value and stop the loading spinner
		infoDetails.innerHTML = "";

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

			// functions for check if exist the object before return to the html

			const currenciesExist = () => {
				if (currencies != undefined) {
					const keysOfCurrency = Object.keys(currencies);
					const arrayOfCurrency = keysOfCurrency.map((keysOfCurrency) => ({
						abbreviation: keysOfCurrency,
						currency: currencies[keysOfCurrency],
					}));

					return `${arrayOfCurrency[0].currency.name}, Symbol : ${arrayOfCurrency[0].currency.symbol}`;
				} else {
					return "N/A";
				}
			};

			const coatArmsExist = () => {
				if (coatOfArms.png != undefined) {
					return `<img src="${coatOfArms.png}" alt="CoatOfArms" />`;
				} else {
					return `<img src="https://i.scdn.co/image/ab67616d00001e02717d713bd791d0cf115611ab" alt="NOFOUND"/>`;
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
					return "N/A";
				}
			};

			const fifaExist = () => {
				if (fifa != undefined) {
					return `${fifa}`;
				} else {
					return "N/A";
				}
			};

			const postalCodeExist = () => {
				if (postalCode != undefined) {
					return `${postalCode.format}`;
				} else {
					return "N/A";
				}
			};

			// functions for sort the items before return to html

			const sortElement = (element) => {
				const liElement = element.map((item) => {
					return `${item}`;
				});

				return liElement.join(", ");
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
					<div class="title">
					${name.common}
					</div>
					<button class="inputSubmit" >
						<a href="../index.html">Back to menu</a>
					</button>
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
					<p>${sortElement(capital)}</p>
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
						<p>${currenciesExist()}</p>
					</div>
					<div class="infoData div-color-dark">
					<p>Gini Coefficient by Country :</p>
					<p>${giniExist()}</p>
					</div>
					<div class="infoData div-color-bright">
						<div class="infoPropertyData">Time zones :</div>
						<div class="infoLisData">${sortElement(timezones)}</div>
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

		const div = document.createElement("div");
		div.innerHTML = dataCountry();
		infoDetails.appendChild(div);
	} catch (error) {
		const notFound = `		<div class="container-notFound">
			<div class="notFound">
				<h1>404!</h1>
				<h2>NOT FOUND</h2>
				<p>Sorry there are not country found in the data base</p>
				<button class="inputBack" >
					<a href="../index.html">Back to menu</a>
				</button>
			</div>
			</div>`;
		const div = document.createElement("div");
		div.innerHTML = notFound;
		infoDetails.appendChild(div);
		console.log(error);
	}
};

// event listener when the page get started
window.addEventListener("load", () => {
	catchingQuery();
	loading();
});
