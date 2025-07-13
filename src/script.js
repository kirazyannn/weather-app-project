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

//search feature
function showWeather(response) {
  let cityData = response.data.city;
  let temperatureData = Math.round(response.data.temperature.current);
  let humidityData = response.data.temperature.humidity;
  let windData = response.data.wind.speed;
  let descriptionData = response.data.condition.description;
  let iconData = response.data.condition.icon_url;
  let dateData = new Date(response.data.time * 1000);

  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date");

  cityElement.innerHTML = cityData;
  temperatureElement.innerHTML = temperatureData;
  humidityElement.innerHTML = humidityData;
  windElement.innerHTML = windData;
  descriptionElement.innerHTML = descriptionData;
  iconElement.setAttribute("src", iconData);
  dateElement.innerHTML = formatDate(dateData);
}

function formatDate(dateData) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dateData.getDay()];
  let hour = dateData.getHours();
  let minute = dateData.getMinutes();

  return `${day} ${hour}:${minute}`;
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
