import KEY from './key.js'

const weatherText = document.querySelector('.weather');

const COORDS = "coords";
const API_KEY = KEY

const getWeather = async(lat,lng) => {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    const weather = await data.json()
    const {name,main:{temp}} = weather;
    weatherText.innerText = `${temp} ℃  @${name}`
}

const saveCoords=(obj)=>{
    localStorage.setItem(COORDS,JSON.stringify(obj))
}

const handelGeoSucces = (position) => {
  const {
    coords: { latitude,longitude },
  } = position;
  const coords = {
    latitude,
    longitude,
  };
  saveCoords(coords)
  getWeather(latitude,longitude)
};

const handelGeoError = () => {
  console.log("can't access geo location");
  alert("Can't access geo location. So sad");
};

const askForCoords = () => {
  navigator.geolocation.getCurrentPosition(handelGeoSucces, handelGeoError);
};

const loadCoords = () => {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
      const parseCoords = JSON.parse(loadedCoords)
      getWeather(parseCoords.latitude,parseCoords.longitude)
  }
};

const weathers = () => {
  loadCoords();
};

weathers();
