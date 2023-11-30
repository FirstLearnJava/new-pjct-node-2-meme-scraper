# Node.js Meme Scraper

A meme scraper, that scrapes the first ten memes of a webside
and saves the first 10 images into a folder called "memes" within the directory of the new project.
The image files should be named with a number with a leading zero, eg. 01.jpg, 02.jpg, etc.

# TODO

Scrape the images urls

- [ ] install Axios and Cheerio
- [ ] import axios and cheerio
- [ ] get HTML data with axios.request
- [ ] parse the axiosResponse.data with cheerio
- [ ] make an array, where you can insert the scraped urls
- [ ] transform the array to json

Download the images urls

- [ ] save the first ten images in a folder called "memes"
- [ ] the images should be saved with a leading zero, e.g. 01.jpg

- [ ] scraped memes shouldn't show up in git, use gitignore

Strech goals

- [ ] make the application create your own costum memes
- [ ] add a cli-progress bar to indicate download status
