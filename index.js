const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');
const express = require('express');

const PORT = 5050;

const app = express();

const urlMma = 'https://www.mmanytt.se/';

axios(urlMma)
  .then((response) => {
    const html = response.data; // get the html as data with axios
    const $ = cheerio.load(html);

    const articles = [];

    $('.jeg_post_title', html) // look for a specific class in the html variable
      .each(function () {
        const title = $(this).text(); // for each element with the specific class get the text
        const link = $(this).find('a').attr('href'); // find the a tag and get the href attribute from it

        articles.push({
          title,
          link,
        });
      });

    console.log('There are the articles: ', articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
