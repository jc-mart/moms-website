async function updateVerseOfTheDay() {
    try {
        let date;
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        if (language == 'en') {
            response = await fetch('/api/verse-of-the-day');
            date = new Date().toLocaleDateString('en-US', options);
        } else {
            response = await fetch('api/verse-of-the-day-es');
            date = new Date().toLocaleDateString('es-US', options);
        }
        const verseData = await response.json();

        // Update the content on the webpage
        $('#verse-date h3').text(date);
        $('#verse-content p').text(verseData.content);
        $('#verse-citation h3').text(verseData.citation);
    } catch (error) {
        console.error('Error fetching verse of the day:', error);
    }
}

$(document).ready(() => {
    updateVerseOfTheDay();
});