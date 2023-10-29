// Get dependencies
const axios = require('axios');
const cheerio = require('cheerio');

// Target website
const URL = 'https://www.bible.com/verse-of-the-day';

async function scrapeWebsite() {
    // Attempt to access and extract webpage information
    try {
        // Get access to the target webpage
        const response = await axios.get(URL);
        // Gather webpage information
        const html = response.data;
        // Load webpage information to cheerio for parsing
        const $ = cheerio.load(html);

        // Array to store paragraph elements
        const paragraphs = [];

        // Extract paragraph elements using cheerio
        //$('p').each((index, element) => {
        //    // Store in array
        //    paragraphs.push($(element).text());
        //});
        for (let i = 0; i < 3; i++) {
            const content = $('p').eq(i).text();
            if (content) {
                paragraphs.push(content);
            } else {
                break;
            }
        }

        // Return findings for further parsing
        return paragraphs;
    // Log if target webpage could not be reached
    } catch(err) {
        console.log('An error was encountered while attempting to scrape the verse.\nError: ' + err);
    }
}

// Testing for correctness
scrapeWebsite()
    .then(paragraphs => {
        console.log('Extracted Paragraphs: ', paragraphs);
    })
    .catch(error => {
        console.log(error.message);
    });