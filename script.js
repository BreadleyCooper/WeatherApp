// API key is 9c9b81ece80393299ecb469587db705b
// {
//     "coord": {
//         "lon": -0.1278,
//         "lat": 51.5074
//     },
//     "weather": [
//         {
//             "id": 804,
//             "main": "Clouds",
//             "description": "overcast clouds",
//             "icon": "04d"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 297.52,
//         "feels_like": 297.34,
//         "temp_min": 296.15,
//         "temp_max": 299.36,
//         "pressure": 1017,
//         "humidity": 51
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 5.14,
//         "deg": 260
//     },
//     "clouds": {
//         "all": 99
//     },
//     "dt": 1659184080,
//     "sys": {
//         "type": 2,
//         "id": 2075535,
//         "country": "GB",
//         "sunrise": 1659154857,
//         "sunset": 1659210766
//     },
//     "timezone": 3600,
//     "id": 2643743,
//     "name": "London",
//     "cod": 200
// }

const button = document.getElementById('button');
const temp = document.querySelector('.temp')
const weatherDescription = document.querySelector('.weatherDescription')
const iconImg = document.querySelector('img')
let latitude
let longditude
let weatherData
let units = "metric"
let icon

getLocation();

async function getLocation() {
    try {
        // grabbing city input
        const city = document.getElementById("Location").value;

        // using Geocoding API to convert city into longditude and latitude
        const coordinatesResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=9c9b81ece80393299ecb469587db705b`, { mode: 'cors' });
        const coordinatesData = await coordinatesResponse.json()
        latitude = coordinatesData[0].lat;
        longditude = coordinatesData[0].lon;
        console.log(coordinatesData, "latiude", latitude, "longditude", longditude)

        // calling openweather API 
        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longditude}&units=${units}&appid=9c9b81ece80393299ecb469587db705b`, { mode: 'cors' })
        weatherData = await weather.json();
        console.log(weatherData)
        displayWeather();

    } catch (err) {
        // error handling logic
        console.log(err)
    }
}

function displayWeather() {
    let temperature = Number(weatherData.main.temp)
    let temperatureRounded = Math.round(temperature * 10) / 10
    temp.textContent = temperatureRounded
    weatherDescription.textContent = weatherData.weather[0].main + ", " + weatherData.weather[0].description
    chooseIcon();
    iconImg.src = icon
}

// function to determine which icon is shown based on the API weather returned ID
function chooseIcon() {
    let weatherID = weatherData.weather[0].id
    let weatherIDNum = Number(weatherID);

    if (weatherIDNum >= 200 && weatherIDNum <= 232) {
        icon = "./icons/200-232Thunderstorms.png"
    } else if (weatherIDNum >= 300 && weatherIDNum <= 321) {
        icon = "./icons/300-321Drizzle.png"
    } else if (weatherIDNum >= 500 && weatherIDNum <= 531) {
        icon = "./icons/500-531Rain.png"
    } else if (weatherIDNum >= 600 && weatherIDNum <= 622) {
        icon = "./icons/600-622Snow.png"
    } else if (weatherIDNum >= 701 && weatherIDNum <= 781) {
        icon = "./icons/701-781Atmosphere.png"
    } else if (weatherIDNum === 800) {
        icon = "./icons/800Clear.png"
    } else if (weatherIDNum >= 801 && weatherIDNum <= 804) {
        icon = "./icons/801-804Clouds.png"
    } else icon = "Unable to provide weather icon"
}


button.addEventListener('click', () => {
    getLocation();
})