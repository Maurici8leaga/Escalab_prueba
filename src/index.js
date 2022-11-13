const searchCountry = document.getElementById("searchCountry");
const searchRegion = document.getElementById("searchRegion");
const infoCountry = document.getElementById("infoCountry");

window.addEventListener("load", () => {
	fetchData();
	loading();
});

const searchBar = () => {
	let searchQuery = searchCountry.value;

	loading();

	fetchCountry(searchQuery);
};

const filterRegion = () => {
	const region = searchRegion.value;
	loading();
	fetchRegion(region);
	reset();
};

const loading = () => {
	infoCountry.innerHTML = `<div class="loading"></div>`;
};

// reset function for select region element
const reset = () => {
	document.getElementById("searchRegion").selectedIndex = 0;
};

// function for send the query to the next page and change to next page
const sendQuery = (value) => {
	window.document.location = "detailContry.html" + "?country=" + value;
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

const content = (element) => {
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
	let res;

	try {
		res = await fetch("https://restcountries.com/v3.1/all");

		let result = await res.json();

		// setting the default value and stop the loading spinner
		infoCountry.innerHTML = "";

		result.map((result) => {
			let div = document.createElement("div");
			div.innerHTML = content(result);
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
	let res;

	try {
		res = await fetch(`https://restcountries.com/v3.1/name/${query}`);

		let result = await res.json();

		// setting the default value
		infoCountry.innerHTML = "";
		searchCountry.value = "";

		result.map((result) => {
			let div = document.createElement("div");
			div.innerHTML = content(result);
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
			div.innerHTML = content(result);
			infoCountry.appendChild(div);
		});
	} catch (error) {
		let div = document.createElement("div");
		div.innerHTML = notFound();
		infoCountry.appendChild(div);
		console.log(error);
	}
};
