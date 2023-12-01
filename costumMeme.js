import axios, { isCancel, AxiosError } from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import client from 'https';

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

  const randomMemeCount = getRandomMeme();

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
  let iterationCount = 0;
  let imagecount = 0;

  console.log(`${Object.values(htmlMemes[randomMemeCount])[0]}`);

  const topMemeCaption = process.argv[2];
  const bottomMemeCaption = process.argv[3];

  let captionedRandomMemeUrl = '';

  function generateAndCaptionRandomMeme(string, subString, index) {
    const splittedUrl = string.split(subString, index).join(subString);

    const captionedUrl = `${splittedUrl}/${topMemeCaption}/${bottomMemeCaption}.png?width=300&frames=10`;
    captionedRandomMemeUrl = captionedUrl;
    return captionedUrl;
  }

  generateAndCaptionRandomMeme(
    `${Object.values(htmlMemes[randomMemeCount])[0]}`,
    '/',
    5,
  );

  downloadImage(`${captionedRandomMemeUrl}`, `memes/costumMeme.png`)
    .then(console.log)
    .catch(console.error);
}
performScrapingAndDownloading();
