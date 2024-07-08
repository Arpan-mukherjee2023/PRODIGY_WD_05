const apiKey = "4817ee0d22cd3a854dfa88699f433972";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const cityInput = document.getElementById("search-input");
const cityButton = document.getElementById("search-btn");

async function checkWeather(city) {
    const  response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
    if(response.status == 404) {
        alert("Data Not Found");
    } else {
        let data = await response.json();
        console.log(data);
        // set city name
        document.getElementById("city-name").textContent = data.name;
        // set temperature
        document.getElementsByClassName("temp")[0].textContent = Math.round(data.main.temp) + "°";
        // set weather
        document.getElementsByClassName("weather")[0].textContent = data.weather[0].main;
        // set feels like
        document.getElementsByClassName("feels")[0].textContent = `Feels like ${data.main.feels_like}°`;
        // set humidity
        document.getElementById("humidity").textContent = data.main.humidity + "%";
        // set wind speed
        document.getElementById("wind").textContent = data.wind.speed + "Km/h";
        // set pressure
        document.getElementById("pressure").textContent = data.main.pressure;
        // set Visibility
        document.getElementById("visibility").textContent = (data.visibility/1000) + "Km";

        // set sunrise and sunset
        let sunsetTime = new Date(data.sys.sunset);
        let sunriseTime = new Date(data.sys.sunrise);
        document.getElementsByClassName("time-rise")[0].textContent = `${String(sunriseTime.getHours()).padStart(2, '0')} : ${String(sunriseTime.getMinutes()).padStart(2,'0')}`;
        document.getElementsByClassName("time-set")[0].textContent = `${String(sunsetTime.getHours()).padStart(2, '0')} : ${String(sunsetTime.getMinutes()).padStart(2, '0')}`;

        const ImageTag = document.getElementsByClassName("card")[0];    
        
        // change image

        if(data.weather[0].main == 'Clouds') {
            ImageTag.style.backgroundImage = "url('Images/cloud.jpeg')";
        } else if(data.weather[0].main == 'Clear') {
            ImageTag.style.backgroundImage = "url('Images/sunny.jpeg')";
        } else if(data.weather[0].main == 'Rain') {
            ImageTag.style.backgroundImage = "url('Images/rain.jpeg')";
        } else if(data.weather[0].main == 'Drizzle') {
            ImageTag.style.backgroundImage = "url('Images/drizzle.jpeg')";
        } else if(data.weather[0].main == 'Mist') {
            ImageTag.style.backgroundImage = "url('Images/mist.jpeg')";
        } else if(data.weather[0].main == 'Haze') {
            ImageTag.style.backgroundImage = "url('Images/haze.jpg')";
        }

        // show all items
        document.getElementById("city-name").style.display = "block";
        document.getElementsByClassName("show-temp")[0].style.display = "flex";
        document.getElementsByClassName("other-data")[0].style.display = "flex";
        document.getElementsByClassName("sun")[0].style.display = "flex";
    }
}

cityButton.addEventListener("click", () => {
    if(cityInput.value === '') {
        alert("Enter the city name Please!!");
        return;
    }

    checkWeather(cityInput.value)
})