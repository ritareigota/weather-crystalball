function aboveText (day) {
    if (day === 1) {
        return "st";
    }
    if (day === 2) {
        return "nd";
    }
    if (day === 3) {
        return "rd";
    }  
    return "th";
}

function realMinutes () {

    let currentMinute = new Date().getMinutes();
    if (currentMinute <10) {
        return `0${currentMinute}`
    } else {
        return `${currentMinute}`
    }
}

function showWeather (response) {
    let degrees = document.querySelector(".degrees-value");
    degrees.innerHTML = Math.round(response.data.main.temp);
    let windSeepd = document.querySelector(".wind-speed");
    windSeepd.innerHTML = response.data.wind.speed.toFixed(1);
    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = response.data.main.humidity;
    let description = document.querySelector(".weather-container");
    description.innerHTML = response.data.weather[0].description;
    let cityName = document.querySelector(".city-container");
    cityName.innerHTML = response.data.name;
    let icon = document.querySelector(".icon");
    icon.setAttribute("src", `images/${response.data.weather[0].icon}.html`);
    icon.setAttribute("alt", response.data.weather[0].main);
    }

function search (city){
        let apiKey = "1e7e5bb02603e6a4966c4d7f735bd85f";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
        axios.get(apiUrl).then(showWeather);
    }
function changeCity (event) {
    event.preventDefault();
    let cityInput = document.querySelector(".city-form");
    search(cityInput.value.trim());

}
function getCurrentCity (event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;


        let apiKey = "1e7e5bb02603e6a4966c4d7f735bd85f";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(showWeather);
    }           
}   

function highlightCelsius () {
    document.querySelector(".celsius").classList.add("highlight");
    document.querySelector(".fahrenheit").classList.remove("highlight");
}

currentDate = new Date();

let currentWeekDay = currentDate.getDay();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
currentWeekDay = days[currentWeekDay];

let currentDay = currentDate.getDate();

let currentMonth = currentDate.getMonth();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
currentMonth = months[currentMonth];

let currentHour = currentDate.getHours();
let currentMinute = currentDate.getMinutes();

let currentDateTime = `${currentWeekDay}, ${currentMonth} ${currentDay}<span class="above-text">${aboveText(currentDay)}</span></br>${currentHour}:${realMinutes()}`;

let dateTime = document.querySelector(".date-time");
dateTime.innerHTML = currentDateTime;

let cityForm = document.querySelector(".city-search")
cityForm.addEventListener("submit", changeCity)

highlightCelsius (); 

search ("aveiro");

let currentCity = document.querySelector(".current-city-button");
currentCity.addEventListener("click", getCurrentCity); 