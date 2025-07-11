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
}

function searchCity(event) {
  event.preventDefault();

  let cityElement = document.querySelector("#city-input");
  let city = cityElement.value;

  let apiKey = "47eabbdoa59a30e77860a672c54ft3ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

let search = document.querySelector("#search");
search.addEventListener("submit", searchCity);
