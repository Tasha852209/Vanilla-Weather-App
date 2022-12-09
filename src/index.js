let now = new Date();

let currentDayKyiv = document.querySelector("#current-day");
let hours = now.getHours();
if (hours === 0) {
  hours = 12;
}
if (hours > 0 && hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
currentDayKyiv.innerHTML = `${day} ${hours}:${minutes}`;

function showCity(event) {
  let key = "f99a73f91a669f404989b1c8a439ac00";
  event.preventDefault();
  let cityName = document.querySelector("#city-text-input");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", showCity);

function displayWeather(response) {
  console.log(response);
  document.querySelector("#city-change").innerHTML = response.data.name;
  let cityDescription = document.querySelector("#city-description");
  let description = response.data.weather[0].description;
  cityDescription.innerHTML = `${description}`;
  let cityTemperature = document.querySelector("#temp-change");
  let cityTemp = Math.round(response.data.main.temp);
  cityTemperature.innerHTML = `${cityTemp}`;
  let cityHumidity = document.querySelector("#city-humidity");
  let humidity = response.data.main.humidity;
  cityHumidity.innerHTML = `Humidity: ${humidity}%`;
  let cityWind = document.querySelector("#city-wind");
  let windy = Math.round(response.data.wind.speed);
  cityWind.innerHTML = `Wind: ${windy} km/h`;
}

function getCurrentCity(position) {
  let apiKey = "f99a73f91a669f404989b1c8a439ac00";
  let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url2).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentCity);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentLocation);
