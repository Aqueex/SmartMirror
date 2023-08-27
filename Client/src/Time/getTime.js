const date = require('date-and-time');
const tr = require ('date-and-time/locale/tr');
date.locale(tr);  // => "en"
function sendCurrentTime(callback){

    try {
        setInterval(() => {
            const now = new Date();
            const currentTime = date.format(now, 'HH:mm:ss, A');
            callback(currentTime)
        }, 1000);
    } catch{
        
    }
}

// function sendCurrentDate(callback){
//     setInterval(() => {
//         const now2 = Date();
//         const currentDate = date.format(now2, 'DD/MM/YYYY');
//         callback(currentDate);
//     }, 3600000);
// }
module.exports = sendCurrentTime;

