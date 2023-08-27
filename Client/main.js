const electron = require('electron'); 
const rss = require('./src/Rss/getRss.js')
const sendCurrentTime   = require('./src/Time/getTime.js');
const sendCurrentDate = require('./src/Time/getDate.js');
const jsonEventEmitter = require('./src/JsonApi/jsonApi.js');
const weatherEventEmitter = require('./src/JsonApi/weatherApi.js')
const BrowserWindow = electron.BrowserWindow; 
const Menu = electron.Menu; 
const Notification = electron.Notification; 
const ipcMain = electron.ipcMain; 
const app = electron.app; 
const url = require('url');
const path = require('path');

let titles = "Yükleniyor";
async function fetchData() {
  try {
    const data = await rss();
    
    titles = data.slice(0, 2).map(item => item.title);
    
    
  } catch (error) {
    console.error(error);
  }
}
fetchData()
let mainWindow; 
let currentTime;
let currentDate;

try {
    sendCurrentTime((newTime) => {
        currentTime = newTime; 
    });
    
    sendCurrentDate((newDate) =>{
        currentDate = newDate;
    });
} catch{
    
}



setInterval(fetchData, 30000);
async function createMainWindow() { 
    mainWindow = new BrowserWindow({ 
    width: 800,
    height: 800,
    fullscreen: true,
    titleBarStyle: 'hidden',
    frame: false,
    title: '', 
    webPreferences: {
      webSecurity: false, 
      allowRunningInsecureContent: true,
    }
  }); 

mainWindow.loadFile('./web/main.html') 
////////////////////////////////////////////////////////////
let json;
let temperature = null;
let city = null;
let tempF = null;
let img = null;
try {
    
  
  
  weatherEventEmitter.on('weatherInfo', (weatherInfo) => {
    temperature = weatherInfo.temp;
    city = weatherInfo.city;
    tempF = weatherInfo.tempF;
    img = weatherInfo.img;
  });

  jsonEventEmitter.on('jsonData', (jsonData) => {
    json = jsonData.updatedField;
  
  });
          eventEmitter.on('error', (error) => {
            console.error('Hata:', error);
          });
} catch {
    
}

try {
    function getHaberler() {
        setInterval(() => {
            mainWindow.webContents.executeJavaScript(`
            document.getElementById('title').innerHTML = '<h1 class="text-white">${json.replace(/'/g, "\\'").replace(/\n/g, "\\n")}</h1>';
          `);
          
          mainWindow.webContents.executeJavaScript(`
            document.getElementById('time').innerHTML = '<h1 class="text-white">${currentTime.replace(/'/g, "\\'").replace(/\n/g, "\\n")}</h1>';
          `);
          
          mainWindow.webContents.executeJavaScript(`
            document.getElementById('date').innerHTML = '<h1 class="text-white">${currentDate.replace(/'/g, "\\'").replace(/\n/g, "\\n")}</h1>';
          `);
    
          mainWindow.webContents.executeJavaScript(`
          document.getElementById('weather').innerHTML = ' ${city.replace(/'/g, "\\'").replace(/\n/g, "\\n")} - ${temperature}°C - ${tempF}°F <img src="https:${img}" alt="Weather Icon" class=" inline-block">';
        `);
        
          mainWindow.webContents.executeJavaScript(`
            document.getElementById('news').innerHTML = '<img src="../src/public/img/arrow.png" class="inline-block w-6" alt=""> ${titles[0]}';
          `);

         mainWindow.webContents.executeJavaScript(`
         document.getElementById('news2').innerHTML = '<img src="../src/public/img/arrow.png" class="inline-block w-6" alt=""> ${titles[1]}';`);

        }, 1000);
       }
       mainWindow.webContents.on('dom-ready', getHaberler);
} catch {
    
}
//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
} 

app.on('ready', createMainWindow); 
const mainMenuTemplate = [
    {
       label: ""
    }
]

if(process.env.NODE_ENV !== "production"){
    mainMenuTemplate.push(
        {
            label: "Dev Tools",
            submenu: [
                {
                    label: "Geliştiric Pencere(F12)",
                    click(item,focusWindow){
                        focusWindow.toggleDevTools();
                    },
                    accelerator: process.platform == "darwin" ? "F12" : "F12"
                },
                {
                    label: "Reload",
                    role: "reload",
                    accelerator: process.platform == "darwin" ? "R" : "R"
                }
               
            ]
        }
    )
}
