const api = {
    key: APIKEY,
    base: "https://api.openweathermap.org/data/2.5/"
}

const input = document.getElementById("weather-input")
const timeDisplay = document.getElementById("time")
const dateDisplay = document.getElementById("date")
const city = document.getElementById("city")
const mainTemp = document.getElementById("main-temp")
const tempSpan = document.getElementById("temp-span")
const currentWeather = document.getElementById("current-weather")
const searchImg = document.getElementById("search-img")

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getWeather()
    }
})

searchImg.addEventListener("click", getWeather)


function getWeather() {
    fetch(`${api.base}weather?q=${input.value}&units=metric&appid=${api.key}`)
    .then(res => res.json())
    .then(data => {
        displayWeather(data)
    }).catch(() => {
        city.textContent = "Enter valid city"
        mainTemp.textContent = ""
        tempSpan.textContent = ""
        currentWeather.textContent = ""
        input.value = ""
    })
}

function displayWeather(data) {
    city.textContent = data.name + ", " + data.sys.country
    mainTemp.textContent = data.main.temp.toFixed(1) + "°C"
    tempSpan.textContent = Math.round(data.main.temp_min) + "°C / " + Math.round(data.main.temp_max) + "°C"
    currentWeather.textContent = data.weather[0].main
    input.value = ""
}

function getDate(){
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    timeDisplay.textContent = `${hours}:${minutes}` 
    dateDisplay.textContent = `${day}/${month}/${year}`
}

setInterval(getDate, 1000)