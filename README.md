# Node.js Meme Scraper

A meme scraper, that scrapes the first ten memes of a webside
and saves the first 10 images into a folder called "memes" within the directory of the new project.
The image files should be named with a number with a leading zero, eg. 01.jpg, 02.jpg, etc.

# TODO

Scrape the images urls

- [x] install Axios and Cheerio
- [x] import axios and cheerio
- [x] get HTML data with axios.request
- [x] parse the axiosResponse.data with cheerio
- [x] make an array, where you can insert the scraped urls

Download the images urls

- [x] save the first ten images in a folder called "memes"
- [x] create a downloadImage function to download and save the images
- [x] include errorhandling into the function
- [x] iterate over the array of memes to get the first 10 urls and integrate the downloadImage function into the loop
- [x] the images should be saved with a leading zero, e.g. 01.jpg
- [x] scraped memes shouldn't show up in git, use gitignore

Strech goals

- [ ] make the application create your own costum memes
- [ ] add a cli-progress bar to indicate download status
