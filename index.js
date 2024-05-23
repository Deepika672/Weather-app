const apiKey = "77652c5df0d1c3bcb7766690f075cf1b";

async function fetchWeatherData(city) {
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );

  if (weatherResponse.status === 404) {
    showToast('City not found');
    document.querySelector(".weather").style.display = "none";
  } else {
    const weatherData = await weatherResponse.json();
    Weather(weatherData);
    fetchAirQualityData(weatherData.coord.lat, weatherData.coord.lon);
  }
}

async function fetchAirQualityData(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );

  if (response.ok) {
    const data = await response.json();
    updateAirQuality(data);
  } else {
    console.error('Failed to fetch air quality data');
  }
}

function updateAirQuality(data) {
  const aqiElement = document.querySelector('.aqi');
  const aqi = data.list[0].main.aqi;
  aqiElement.innerText = `AQI: ${aqi} (${getAQIDescription(aqi)})`;
}

function getAQIDescription(aqi) {
  if (aqi === 1) return 'Good';
  if (aqi === 2) return 'Fair';
  if (aqi === 3) return 'Moderate';
  if (aqi === 4) return 'Poor';
  if (aqi === 5) return 'Very Poor';
  return 'Unknown';
}

function Weather(data) {
  const cityName = document.querySelector(".city");
  const temperature = document.querySelector(".temp");
  const windSpeed = document.querySelector(".wind p");
  const humidity = document.querySelector(".humidity p");
  const descriptionContent = document.querySelector(".description-text");
  const degrees = document.querySelector(".degree");

  cityName.innerText = data.name;
  temperature.innerText = Math.round(data.main.temp) + "°C";
  windSpeed.innerText = data.wind.speed + "km/h";
  humidity.innerText = data.main.humidity + "%";
  descriptionContent.innerText = data.weather[0].description;
  degrees.innerText = "Wind Direction: " + data.wind.deg + "°";

  document.querySelector(".weather").style.display = "block";
}

const searchButton = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  const city = searchInput.value;
  fetchWeatherData(city);
});

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const city = searchInput.value;
    fetchWeatherData(city);
  }
});

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.style.display = 'block';
  setTimeout(function () {
    toast.style.display = 'none';
  }, 7000);
}
