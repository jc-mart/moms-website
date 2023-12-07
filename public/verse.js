// js/verseScraper.js
const axios = require('axios');
const cheerio = require('cheerio');

const EN_URL = 'https://www.bible.com/verse-of-the-day';
const SP_URL = 'https://www.bible.com/es/verse-of-the-day';

const scrapeWebsite = async (url) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const paragraphs = [];

        for (let i = 0; i < 3; i++) {
            const content = $('p').eq(i).text();
            if (content) {
                const cleaned = content.replace(/\s+/g, ' ').trim();
                paragraphs.push(cleaned);
            } else {
                break;
            }
        }

        return {
            date: paragraphs[0],
            content: paragraphs[1],
            citation: paragraphs[2]
        };

    } catch (err) {
        console.log('An error was encountered while attempting to scrape the verse.\nError: ' + err);
        throw err;
    }
};

module.exports = { scrapeWebsite };