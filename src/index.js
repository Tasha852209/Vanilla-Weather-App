function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="80"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey2 = "ce144f0cf51fa43f03431f0488a36728";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey2}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
let dateElement = document.querySelector("#current-day");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

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
  document.querySelector("#city-change").innerHTML = response.data.name;
  let cityDescription = document.querySelector("#city-description");
  let description = response.data.weather[0].description;
  cityDescription.innerHTML = `${description}`;
  let cityTemperature = document.querySelector("#current-unit-temp");
  let cityTemp = Math.round(response.data.main.temp);
  cityTemperature.innerHTML = `${cityTemp}`;
  let cityHumidity = document.querySelector("#city-humidity");
  let humidity = response.data.main.humidity;
  cityHumidity.innerHTML = `Humidity: ${humidity}%`;
  let cityWind = document.querySelector("#city-wind");
  let windy = Math.round(response.data.wind.speed);
  cityWind.innerHTML = `Wind: ${windy} km/h`;
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-unit-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-unit-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayForecast();
