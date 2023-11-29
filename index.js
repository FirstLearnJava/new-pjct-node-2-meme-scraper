import axios, { isCancel, AxiosError } from 'axios';
import * as cheerio from 'cheerio';

console.log('Hello');

// downloading the target web page
// by performing an HTTP GET request in Axios
async function performScraping() {
  const axiosResponse = await axios.request({
    method: 'GET',
    url: 'https://memegen.link/examples/',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    },
  });
}
performScraping();

// parsing the HTML source of the target web page with Cheerio
const $ = cheerio.load(axiosResponse.data);

const htmlMemes = [];

$('#images').each((index, element) => {
  const memeUrl = $(element).attr('href');
  const htmlMeme = {
    url: memeUrl,
  };
  htmlMemes.push(htmlMeme);
});

const scrapedHtmlMemes = JSON.stringify(htmlMemes);

console.log(scrapedHtmlMemes);
