const date = require('date-and-time');
const tr = require ('date-and-time/locale/tr');
date.locale(tr);  // => "en"

function sendCurrentDate(callback){
    setInterval(() => {
        const now = new Date();
        const currentDate = date.format(now, 'dddd, MMMM DD YYYY');
        callback(currentDate)
    }, 1000);
}

// function sendCurrentDate(callback){
//     setInterval(() => {
//         const now2 = Date();
//         const currentDate = date.format(now2, 'DD/MM/YYYY');
//         callback(currentDate);
//     }, 3600000);
// }
module.exports = sendCurrentDate;

