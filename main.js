// get all necessary elements from the dom

const app = document.querySelector(".WeatherApp");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameoutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const search = document.querySelector(".search");
const form = document.getElementById("locationInput");
const cities = document.querySelectorAll(".city");
const btn = document.querySelector(".submit");

// Defalt city when the page loads

let cityInput = "Algiers";

// add click event to each city in the panel
cities.forEach((city) => {
	city.addEventListener("click", (e) => {
		// change from default city to the clicked one
		cityInput = e.target.innerHTML;

		// function that fetches and displays all the data from the weather aAPI

		fetchWeatherData();
		//app.style.opacity = "0";
	});
});
// add submit event to the form

form.addEventListener("submit", (e) => {
	// if the input field of search is empty throw an alert
	e.preventDefault();
	if (search.value.length == 0) {
		alert("Please type in a city name ");
	}
	// change from the default city to the one written
	else {
		cityInput = search.value;
		// the function that fetches the data form the weather api
		fetchWeatherData();
		// remove all text from the search
		search.value = "";
		// fade up the app (animation)
		//app.style.opacity = 0;
	}
});

// fu,ction that returns days of the week

function dayOfTheWeek(day, month, year) {
	const weekday = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const dayIndex = new Date().getDay();
	console.log(dayIndex);
	return weekday[dayIndex];
}

// function that fetches the data from teh weather api

function fetchWeatherData() {
	fetch(
		`https://api.weatherapi.com/v1/current.json?key=9b309e5bc7b44704b5c124114222112&q=${cityInput}`
	)
		// take the data which is in json and convert it to a js object

		.then((response) => response.json())
		.then((data) => {
			console.log(data);

			// add temperature
			temp.innerHTML = data.current.temp_c + "&#176;";
			conditionOutput.innerHTML = data.current.condition.text;
			// get date and time from the city and extract the day , month , year and time into indiv variables

			const date = data.location.localtime;
			const y = parseInt(date.substr(0, 4));
			const m = parseInt(date.substr(5, 2));
			const d = parseInt(date.substr(8, 2));

			const time = date.substr(11);
			// reformat the date from the format yy-mm-dd 00:00
			// to 00:00 - Friday dd, mm yy
			dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d},${m} ${y}`;
			timeOutput.innerHTML = time;
			// add the name of the city into the Page
			nameoutput.innerHTML = data.location.name;

			// get the appropriet icon
			const iconid = data.current.condition.icon.substr(
				"//cdn.weatherapi.com/weather/64x64/".length
			);
			// Reformat the icon url to the local folder path and add it to the page

			icon.src = "./icons/" + iconid;
			console.log(icon.src);
			// add the weather details

			cloudOutput.innerHTML = data.current.cloud + "%";
			humidityOutput.innerHTML = data.current.humidity + "%";
			windOutput.innerHTML = data.current.wind_kph + "km/h";

			// set default itme of the day
			let timeOfTheDay = "day";
			const code = data.current.condition.code;
			// change to night if its night

			if (!data.current.is_day) {
				timeOfTheDay = "night";
			}
			if (code == 1000) {
				// set the background image to clear if the weather is clear
				app.style.backgroundImage = `url(./images/${timeOfTheDay}/clear.jpg)`;
				// change the btn bg color
				btn.style.background = "#e5ba92";
			} else if (
				code == 1003 ||
				code == 1006 ||
				code == 1009 ||
				code == 1030 ||
				code == 1069 ||
				code == 1087 ||
				code == 1135 ||
				code == 1273 ||
				code == 1276 ||
				code == 1279 ||
				code == 1282
			) {
				app.style.backgroundImage = `url(./images/${timeOfTheDay}/cloudy.jpg)`;
				btn.style.background = "#fa6d1b";
				if (timeOfTheDay == "night") {
					btn.style.background = "#181e27";
				} else if (
					code == 1063 ||
					code == 1069 ||
					code == 1072 ||
					code == 1150 ||
					code == 1153 ||
					code == 1180 ||
					code == 1183 ||
					code == 1186 ||
					code == 1189 ||
					code == 1192 ||
					code == 1195 ||
					code == 1204 ||
					code == 1207 ||
					code == 1240 ||
					code == 1243 ||
					code == 1246 ||
					code == 1249 ||
					code == 1252
				) {
					app.style.backgroundImage = `url(./images/${timeOfTheDay}/rainy.jpg)`;
					btn.style.background = "#647d75";
					if (timeOfTheDay == "night") {
						btn.style.background = "#325c80";
					}
				} else {
					// set the background image to clear if the weather is clear
					app.style.backgroundImage = `url(./images/${timeOfTheDay}/snowy.jpg)`;
					// change the btn bg color
					btn.style.background = "#4d72aa";

					if (timeOfTheDay == "night") {
						btn.style.background = "#1b1b1b";
					}
				}
				app.style.opacity = "1";
			}
		})
		.catch(() => {
			alert("city not found , please try again");
			app.style.opacity = "1";
		});
}
// fetch weather data
fetchWeatherData();
app.style.opacity = "1";
