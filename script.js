document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("Search-button");
  const cityInput = document.getElementById("inputCity");
  searchButton.addEventListener("click", function () {
    const city = cityInput.value;
    searchButton.style.fontSize = "9px";
    searchButton.innerHTML = "Searching..";
    searchButton.disabled = true;
    if (city == "") {
      alert("City should not be empty");
      searchButton.innerHTML = "Track";
      searchButton.style.fontSize = "16px";
      return false;
    }
    console.log(city);
    cityCoordinates(city);
  });

  async function cityCoordinates(city) {
    const URL = `https://nominatim.openstreetmap.org/search?city=${city}&format=json`;
    const cordnitae = await fetch(URL);
    const cordinateData = await cordnitae.json();
    console.log(cordinateData);
    if (cordinateData.length === 0) {
      alert("No cordinates found for this city");
      return;
    }
    const longitude = cordinateData[0].lon;
    const latitude = cordinateData[0].lat;
    fetchWeatherDetails(longitude, latitude, city);
  }

  async function fetchWeatherDetails(longitude, latitude, city) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weather_code`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const currentTemperature = data.hourly.temperature_2m[0];
    const temperature = document.querySelector(".temprature-container");
    temperature.innerHTML = "";
    temperature.innerHTML = `${currentTemperature} \u00B0C`;
    if(temperature!=""){
        searchButton.innerHTML = "Track";
        searchButton.style.fontSize = "16px";
        searchButton.disabled = false;
        document.getElementById("inputCity").value = "";
    }
  }
});
