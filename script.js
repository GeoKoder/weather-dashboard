// OpenWeather API Key 
const API_KEY = "66af9af961fa40fe7888932349c7089b";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const searchHistoryContainer = document.getElementById("search-history");
const loadingEl = document.getElementById("loading");
const errorMessageEl = document.getElementById("error-message");
const errorTextEl = document.getElementById("error-text");
const weatherDisplay = document.getElementById("weather-display");
const cityNameEl = document.getElementById("city-name");
const temperatureEl = document.getElementById("temperature");
const weatherIconEl = document.getElementById("weather-icon");
const descriptionEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const feelsLikeEl = document.getElementById("feels-like");
const forecastCardsEl = document.getElementById("forecast-cards");

async function searchWeather(city) {
    // Shopw loading, hide weather display, hide error
    // Disable search button

    try {
        // Fetch current weather
        // Check response status
        // Parse JSON
        // Display current weather data
        // Fetch 5-day forecast
        // Parse and display forecast
        // Save to search history
    } catch (error) {
        // Show error message
    } finally {
        // Hide loading
        // Re-enable search button
    }
}

function displayCurrentWeather(data) {
    const { name } = data
    const { temp, feels_like, humidity } =  data.main
    const { description, icon } = data.weather[0]
    const { speed } = data.wind

    cityNameEl.textContent = name
    temperatureEl.textContent =  `${Math.round(temp)}°C`
    descriptionEl.textContent = description
    weatherIconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    weatherIconEl.alt = description
    humidityEl.textContent = `${humidity}`
    windEl.textContent = `${speed} m/s`
    feelsLikeEl.textContent = `${Math.round(feels_like)}°C`
}

function displayForecast(data) {
    forecastCardsEl.innerHTML = ""

    // Filter to get one entry per day (at noon or closest to it)
    const dailyData = filterDailyForecast(data.list)

    dailyData.forEach(function(day) {
        const date = new Date(day.dt * 1000)
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
        const { icon, description } = day.weather[0]
        const tempHigh = Math.round(day.main.temp_max)
        const tempLow = Math.round(day.main.temp_min)

        const card = document.createElement("div")
        card.className = "forecast-card"
        card.innerHTML = `
            <div class="day">${dayName}</div>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <div class="temp-high>${tempHigh}°C</div>
            <div class="temp-low>${tempLow}°C</div>
        `

        forecastCardsEl.appendChild(card)
    })
}

function filterDailyForecast(list) {
    const days = {}

    list.forEach(function(item) {
        const date = new Date(item.dt * 1000).toLocaleDateString()

        if (!days[date]) {
            days[date] = item
        }
    })

    // Remove today (we already show current weather) and take next 5 days
    const allDays = Object.values(days)
    return allDays.slice(1, 6)
}

searchBtn.addEventListener("click", function() {
    const city = cityInput.value.trim()
    if (city !== "") {
        searchWeather(city)
    }
})

cityInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const city = cityInput.value.trim()
        if (city !== "") {
            searchWeather(city)
        }
    }
})

function showLoading() {
    loadingEl.classList.remove("hidden")
    weatherDisplay.classList.add("hidden")
    errorMessageEl.classList.add("hidden")
}

function hideLoading() {
    loadingEl.classList.add("hidden")
}

function showError(message) {
    errorTextEl.textContent = message
    errorMessageEl.classList.remove("hidden")
    weatherDisplay.classList.add("hidden")
}

function showWeather() {
    weatherDisplay.classList.remove("hidden")
    errorMessageEl.classList.add("hidden")
}

