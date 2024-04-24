const axios = require('axios')
const cheerio = require('cheerio')
const pretty = require('pretty')

const EN_URL = 'https://www.bible.com/verse-of-the-day';
const SP_URL = 'https://www.bible.com/es/verse-of-the-day';

const scrapeWebsite = async(url) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const date = $('p').eq(0).text();
        const citation = $('p').eq(1).text();
        const content = $('a').eq(8).text();

        // console.log(date);
        // console.log(content);
        // console.log(citation);

        return {
            date: date,
            content: content,
            citation: citation
        };

    } catch(err) {
        console.log('Error encountered while scraping the webpage.\nError: ' + err);
        throw err;
    }
}

module.exports = { scrapeWebsite };

/** Testing */

// scrapeWebsite(EN_URL);
// scrapeWebsite(SP_URL);