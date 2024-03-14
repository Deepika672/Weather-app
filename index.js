const apiKey = "77652c5df0d1c3bcb7766690f075cf1b";

async function fetchWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );

  if (response.status === 404) {
    showToast('City not found');
    document.querySelector(".weather").style.display = "none";
  } 
  else {
    const data = await response.json();
    console.log(data);
    Weather(data);
  }
}

function Weather(data) {
  const cityName = document.querySelector(".city");
  const temperature = document.querySelector(".temp");
  const windSpeed = document.querySelector(".wind");
  const humidity = document.querySelector(".humidity");
  const descriptionContent = document.querySelector(".description-text");
  const degreess=document.querySelector(".degree")

  cityName.innerText = data.name;
  temperature.innerText = Math.round(data.main.temp) + "°C";
  windSpeed.innerText = data.wind.speed + "km/h";
  humidity.innerText = data.main.humidity + "%";
  descriptionContent.innerText = data.weather[0].description;
  degreess.innerText=data.wind.deg+"Degrees";

  document.querySelector(".weather").style.display = "block";
}

const searchButton = document.querySelector(".search button");

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  const searchInput = document.querySelector(".search input");
  const city = searchInput.value;
  fetchWeatherData(city);
});
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.style.display = 'block';
  setTimeout(function() {
    toast.style.display = 'none';
  }, 7000); 
}
