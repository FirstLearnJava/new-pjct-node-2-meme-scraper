import axios, { isCancel, AxiosError } from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import client from 'https';
import cliProgress from 'cli-progress';

// downloading the target web page
// by performing an HTTP GET request in Axios
async function performScrapingAndDownloading() {
  const axiosResponse = await axios.request({
    method: 'GET',
    url: 'https://api.memegen.link/examples',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    },
  });

  // parsing the HTML source of the target web page with Cheerio
  const $ = cheerio.load(axiosResponse.data);
  let memesCount = 0;
  const htmlMemes = [];
  $('#images')
    .find('a')
    .each((index, element) => {
      const memeUrl = $(element).find('img').attr('src');
      const htmlMeme = {
        url: memeUrl,
      };
      htmlMemes.push(htmlMeme);
      memesCount++;
    });

  /* const scrapedHtmlMemes = JSON.stringify(htmlMemes);
   */

  function getRandomMeme() {
    return Math.floor(Math.random() * memesCount);
  }

  function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
      client.get(url, (res) => {
        if (res.statusCode === 200) {
          res
            .pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath));
        } else {
          // Consume response data to free up memory
          res.resume();
          reject(
            new Error(`Request Failed With a Status Code: ${res.statusCode}`),
          );
        }
      });
    });
  }
  const bar1 = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic,
  );
  bar1.start(200, 0);

  let iterationCount = 0;
  let imagecount = 0;
  for (const obj of htmlMemes) {
    if (iterationCount >= 10) {
      bar1.stop();
      break;
    }

    for (const key in obj) {
      const value = obj[key];
      setTimeout(function () {
        downloadImage(`${value}`, `memes/0${imagecount}.png`)
          .then(console.log)
          .catch(console.error);
      }, 300 * imagecount);
      imagecount++;
    }
    iterationCount++;
    bar1.increment(20);
  }
}
performScrapingAndDownloading();
