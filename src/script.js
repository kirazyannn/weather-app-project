//search feature
function showWeather(response) {
  let cityData = response.data.city;
  let temperatureData = Math.round(response.data.temperature.current);
  let humidityData = response.data.temperature.humidity;
  let windData = response.data.wind.speed;
  let descriptionData = response.data.condition.description;
  let iconData = response.data.condition.icon_url;

  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  city.innerHTML = cityData;
  temperature.innerHTML = temperatureData;
  humidity.innerHTML = humidityData;
  wind.innerHTML = windData;
  description.innerHTML = descriptionData;
  icon.setAttribute("src", iconData);

  getForecast(response.data.city);
}

//date feature
let now = new Date();

function formatDate(newDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[newDate.getDay()];
  let hour = newDate.getHours().toString().padStart(2, "0");
  let minute = newDate.getMinutes().toString().padStart(2, "0");

  let formattedDate = `${day} ${hour}:${minute}`;

  return formattedDate;
}

let date = document.querySelector("#date");
date.innerHTML = formatDate(now);

function searchCity(city) {
  let apiKey = "47eabbdoa59a30e77860a672c54ft3ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");

  searchCity(cityElement.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

// forecast
function getForecast(city) {
  let apiKey = "47eabbdoa59a30e77860a672c54ft3ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div class="weather-forecast-icon">
        <img src="${day.condition.icon_url}" alt="" />
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let search = document.querySelector("#search");
search.addEventListener("submit", handleSearchSubmit);

searchCity("Kuala Lumpur");
