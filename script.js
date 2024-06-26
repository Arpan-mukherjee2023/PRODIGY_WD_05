const searchIcon = document.getElementById("search-icon");
const cityInput = document.querySelector("#city");
const cityButton = document.getElementById("search-city");
const tempChangeButton = document.getElementById("c-f");
const tempDiv = document.getElementById("temp");
const imageTag = document.getElementById("weather");

const imageDiv = document.getElementById("image");
const hourlyDataDiv = document.getElementById("hourly-data");
let isCentigrade = true;
// API related data
const apiKey = "4817ee0d22cd3a854dfa88699f433972";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function checkWeather(city) {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
    if (response.status == 404) {
        alert('Data not found');
    } else {
        let data = await response.json();

        // gather information
        const infoObj = {
            "cityName": data.name,
            "temp": Math.round(data.main.temp),
            "humidity": data.main.humidity,
            "windSpeed": data.wind.speed
        };
        // show data
        tempDiv.textContent = infoObj.temp;
        document.getElementById("humidity").textContent = infoObj.humidity + "%";
        document.getElementById("wind").innerHTML = infoObj.windSpeed + "<br>Km/h";

        if(data.weather[0].main == 'Clouds') {
            imageTag.src = "Images/clouds.png";
        } else if(data.weather[0].main == "Clear") {
            imageTag.src = "Images/clear.png";
        } else if(data.weather[0].main == "Rain") {
            imageTag.src = "Images/rain.png";
        } else if(data.weather[0].main == "Drizzle") {
            imageTag.src = "Images/drizzle.png";
        } else if(data.weather[0].main == "Mist") {
            imageTag.src = "Images/mist.png";
        }
    }
    cityButton.style.display = "none";
    cityInput.style.display = "none";
    // making small search button visible on typing search
    searchIcon.style.visibility = "visible";

    // make all components visible
    tempDiv.style.display = "flex";
    imageDiv.style.display = "block";
    imageTag.style.display = "block";
    hourlyDataDiv.style.display = "flex";
    tempChangeButton.style.display = "block";

}

cityButton.addEventListener('click', () => {
    if (cityInput.value === '') {
        alert('Empty City Name');
        return;
    }
    // If city value is given then we need

    const heading = document.getElementById('heading');
    heading.innerHTML = cityInput.value.toUpperCase();
    checkWeather(cityInput.value);
})

function toCentigrade(temp) {
    return Math.round((temp - 32) * 5 / 9);
}

function toFahrenheit(temp) {
    return Math.round((temp * 9.0 / 5.0) + 32.0);
}

tempChangeButton.addEventListener('click', () => {
    if(isCentigrade) {
        tempDiv.textContent = toFahrenheit(tempDiv.textContent);
        tempChangeButton.textContent = "°F";
        tempChangeButton.style.backgroundColor = "#15719f";
        isCentigrade = false;
    } else {
        tempDiv.textContent = toCentigrade(tempDiv.textContent);
        tempChangeButton.textContent = "°C";
        tempChangeButton.style.backgroundColor = "#62a1c7";
        isCentigrade = true;
    }
})


searchIcon.addEventListener('click', () => {
    hourlyDataDiv.style.display = "none";
    tempDiv.style.display = "none";
    imageDiv.style.display = "none";
    imageTag.style.display = "none";
    tempChangeButton.style.display = "none";


    cityButton.style.display = "block";
    cityInput.style.display = "block";
    document.getElementById('heading').innerHTML = "Forecast Pro";
    cityInput.value = '';
})