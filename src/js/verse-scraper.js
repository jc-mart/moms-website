const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

const URL = 'https://www.bible.com/verse-of-the-day';

async function getVerse() {
    try {
        // Fetch HTML from target website.
        const {data} = await axios.get(URL);
        console.log("accessing url")
        // Load HTML fetched to parse.
        const $ = cheerio.load(data);
        const citation = $(".dark\\:text-text-dark.font-aktiv-grotesk.text-gray-50");
        const verse = $(".dark\\:text-text-dark.font-aktiv-grotesk.uppercase.text-xs.font-bold.mbs-2.text-gray-25");
        console.log(citation);
    } catch (err) {
        console.log(err);
    }
}

getVerse();
