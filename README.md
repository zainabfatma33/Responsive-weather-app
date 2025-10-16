# Responsive-weather-app
real time weather , clean design , responsive layout built using HTML, CSS, and JavaScript
const apiKey = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKeyID = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  const response = await fetch(`${apiKey}${city}&appid=${apiKeyID}&units=metric`);
  const data = await response.json();

  if (data.cod === "404") {
    alert("City not found!");
    return;
  }

  document.getElementById("cityName").textContent = data.name;
  document.getElementById("temperature").textContent = `${data.main.temp} °C`;
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}
