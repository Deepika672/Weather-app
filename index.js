const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

document.addEventListener('DOMContentLoaded', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
      },
      error => {
        console.error('Error occurred. Error code: ' + error.code);
        handleLocationError(error);
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
});

search.addEventListener('click', () => {
  const city = document.querySelector(".search-box input").value;
  if (city === '') return;
  fetchWeatherByCity(city);
});

function fetchWeatherByCoordinates(lat, lon) {
  const APIKEY = "77652c5df0d1c3bcb7766690f075cf1b";
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`)
    .then(response => response.json())
    .then(json => displayWeather(json));
}

function fetchWeatherByCity(city) {
  const APIKEY = "77652c5df0d1c3bcb7766690f075cf1b";
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)
    .then(response => response.json())
    .then(json => displayWeather(json, city));
}

function displayWeather(json, city = null) {
  console.log(json);

  if (json.cod === '404') {
    if (city) cityHide.textContent = city;
    container.style.height = "400px";
    weatherBox.classList.remove('active');
    weatherDetails.classList.remove('active');
    error404.classList.add('active');
    return;
  }

  const image = document.querySelector('.weather-box img');
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");
  const weatherCondition = json.weather[0].main;

  if (city && cityHide.textContent === city) return;

  if (city) cityHide.textContent = city;
  container.style.height = "555px";
  container.classList.add('active');
  weatherBox.classList.add('active');
  weatherDetails.classList.add('active');
  error404.classList.remove('active');
  setTimeout(() => {
    container.classList.remove('active');
  }, 2000);

  switch (weatherCondition) {
    case 'Clear':
      image.src = "./images/clear.png";
      break;
    case 'Rain':
      image.src = "./images/rain.png";
      break;
    case 'Snow':
      image.src = "./images/snow.png";
      break;
    case 'Clouds':
      image.src = "./images/cloud.png";
      break;
    case 'Mist':
      image.src = "./images/mist.png";
      break;
    case 'Haze':
      image.src = "./images/mist.png";
      break;
    default:
      image.src = "./images/cloud.png";
      break;
  }
  temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
  description.innerHTML = `${json.weather[0].description}`;
  humidity.innerHTML = `${json.main.humidity}%`;
  wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

  const infoWeather = document.querySelector('.info-weather');
  const infoHumidity = document.querySelector('.info-humidity');
  const infoWind = document.querySelector('.info-wind');

  const elCloneInfoWeather = infoWeather.cloneNode(true);
  const elCloneInfoHumidity = infoHumidity.cloneNode(true);
  const elCloneInfoWind = infoWind.cloneNode(true);

  elCloneInfoWeather.id = 'clone-info-weather';
  elCloneInfoWeather.classList.add('active-clone')

  elCloneInfoHumidity.id = 'clone-info-humidity';
  elCloneInfoHumidity.classList.add('active-clone')

  elCloneInfoWind.id = 'clone-info-wind';
  elCloneInfoWind.classList.add('active-clone')

  setTimeout(() => {
    infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
    infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
    infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
  }, 2000);

  const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
  const totalCloneInfoWeather = cloneInfoWeather.length;
  const cloneInfoWeatherFirst = cloneInfoWeather[0];

  const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
  const cloneInfoHumidityFirst = cloneInfoHumidity[0];

  const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
  const cloneInfoWindFirst = cloneInfoWind[0];

  if (totalCloneInfoWeather > 0) {
    cloneInfoWeatherFirst.classList.remove('active-clone');
    cloneInfoHumidityFirst.classList.remove('active-clone');
    cloneInfoWindFirst.classList.remove('active-clone');

    setTimeout(() => {
      cloneInfoWeatherFirst.remove();
      cloneInfoHumidityFirst.remove();
      cloneInfoWindFirst.remove();
    }, 2200);
  }
}

function handleLocationError(error) {
  if (error.code === error.PERMISSION_DENIED) {
    alert('Location access denied. Please enter your location manually.');
  } else {
    alert('Unable to retrieve your location. Please enter your location manually.');
  }
}
