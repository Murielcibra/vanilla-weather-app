function formDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day}, ${hours}: ${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="weather-forecast-item">
                <div class="day">${formatDay(forecastDay.dt)}</div>
                
                <img
                     src="http://openweathermap.org/img/wn/${
                       forecastDay.weather[0].icon
                     }@2x.png""
                  alt="weatherIcon"
                  class="w-icon"
                  width="100"
                />
                <div class="temp">Night ${Math.round(
                  forecastDay.temp.min
                )}°;</div>
                <div class="temp">Day ${Math.round(
                  forecastDay.temp.max
                )}°;</div>
              </div>
                  </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f6f001d26151b94d121b17eb30bad8c0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windspeed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let weatherMain = response.data.weather[0].main;
  changeBackgroundImage(weatherMain);

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function changeBackgroundImage(weatherMain) {
  if (weatherMain === "Clear") {
    document.body.style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/027/552/original/sunny.jpg?1645303424')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  } else if (weatherMain === "Rain") {
    document.body.style.backgroundImage =
      "url('https://images.pexels.com/photos/1077536/pexels-photo-1077536.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  } else if (weatherMain === "Clouds") {
    document.body.style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/027/554/original/clouds2.jpg?1645303795')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  } else if (weatherMain === "Thunderstorm") {
    document.body.style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/027/556/original/pexels-johannes-plenio-1118869.jpg?1645303914')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  } else if (weatherMain === "Haze") {
    document.body.style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/027/558/original/pexels-eberhard-grossgasteiger-4406662.jpg?1645303946')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  } else if (weatherMain === "Snow") {
    document.body.style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/027/559/original/snow.jpg?1645304043')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }
}
function search(city) {
  let apiKey = "f6f001d26151b94d121b17eb30bad8c0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handlesubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Dominican Republic");
