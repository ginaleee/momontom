const weather = document.querySelector(".js-weather");
const COORDS = 'coords';
const API_KEY = '966d310e48bc1fa4ebf542aaa6bf9c9e';

var loadedCoords = null;
function getWeather(lat, lon){
    fetch(
        'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + API_KEY
    )
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            const tempurature = json.main.temp;
            const place = json.name;
            weather.innerText = tempurature + '@' + place;
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}
function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    loadedCoords = localStorage.getItem(COORDS);
}

if (loadedCoords === null) {
    askForCoords();
} else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude)
}

function init(){
    loadCoords();
}

init();