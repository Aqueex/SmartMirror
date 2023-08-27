const axios = require('axios');
const xml2js = require('xml2js');
const xmlUrl = 'https://www.sozcu.com.tr/rss/spor.xml';

async function getDataFromXml() {
  try {
    const response = await axios.get(xmlUrl);
    const xmlData = response.data;

    const result = await xml2js.parseStringPromise(xmlData);
    const channel = result.rss.channel[0];
    const items = channel.item;

    const data = items.map(item => ({
      title: item.title[0],
      description: item.description[0]
    }));

    return data;
  } catch (error) {
    console.error('XML veri alma hatası:', error);
    throw error;
  }
}

module.exports = getDataFromXml;
