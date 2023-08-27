const axios = require('axios');
const EventEmitter = require('events');

const apiUrl = 'http://localhost:3000/api/json';

const jsonEventEmitter  = new EventEmitter();

setInterval(() => {
  axios.get(apiUrl)
    .then((response) => {
      const jsonData = response.data;
      jsonEventEmitter.emit('jsonData', jsonData);
    })
    .catch((error) => {
      console.error('API isteği başarısız:', error);
      jsonEventEmitter.emit('error', error);
    });
}, 1000);

module.exports = jsonEventEmitter;