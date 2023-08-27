const axios = require('axios');
const EventEmitter = require('events');

const apiUrl = 'http://api.weatherapi.com/v1/current.json?key={KEY}&q=izmir';

const weatherEventEmitter = new EventEmitter();

function fetchWeatherData() {
  axios.get(apiUrl)
    .then((response) => {
      const jsonData = response.data;
      const city = jsonData.location.name;
      const temp = jsonData.current.temp_c;
      const tempF = jsonData.current.temp_f;
      const img  = jsonData.current.condition.icon;
      const weatherInfo = { city, temp,tempF,img };
      weatherEventEmitter.emit('weatherInfo', weatherInfo);
    })
    .catch((error) => {
      console.error('API isteği başarısız:', error);
      weatherEventEmitter.emit('error', error);
    })
    .finally(() => {
      setTimeout(fetchWeatherData, 300000); // 1 saat (3600000 milisaniye)
    });
}

fetchWeatherData(); 
module.exports = weatherEventEmitter;
