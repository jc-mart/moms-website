// Allows access to the verse API.
const API_KEY = '210f7a3689451c5a88d5f8a040413e86'; // TODO create account and paste API key here.
// Retrieves the element in the webpage where the verse will be inserted.
const verse = document.querySelector('#verse-content');
// Retrieves the element in the webpage where the verse information will be inserted.
const verseRef = document.querySelector('#verse');
// Uses a specific bible version.
const BIBLE_ID = '61fd76eafa1577c2-02'; // TODO ensure that there is also a spanish version
// List of verses.
const VERSES = [ // TODO ensure that there is access to a wider array of verses.
    `JER.29.11`,
    `PSA.23`,
    `1COR.4.4-8`,
    `PHP.4.13`,
    `JHN.3.16`,
    `ROM.8.28`,
    `ISA.41.10`,
    `PSA.46.1`,
    `GAL.5.22-23`,
    `HEB.11.1`,
    `2TI.1.7`,
    `1COR.10.13`,
    `PRO.22.6`,
    `ISA.40.31`,
    `JOS.1.9`,
    `HEB.12.2`,
    `MAT.11.28`,
    `ROM.10.9-10`,
    `PHP.2.3-4`,
    `MAT.5.43-44`,
];
// Gets the day number, stays constant during the day, and so will the verse.
const verseIndex = Math.floor(Math.random() * VERSES.length);
// Retrieves verse from list.
const verseID = VERSES[verseIndex];

// Function updates HTML with verse retrieved from the API.
function getResults(verseID) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener(`readystatechange`, function () {
            if (this.readyState === this.DONE) {
                const { data, meta } = JSON.parse(this.responseText);

                _BAPI.t(meta.fumsId);
                resolve(data);
            }
        });

        xhr.open(
            `GET`,
            `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/search?query=${verseID}`
        );
        xhr.setRequestHeader(`api-key`, API_KEY);

        xhr.onerror = () => reject(xhr.statusText);

        xhr.send();
    });
}

getResults(verseID).then((data) => {
    const passage = data.passages[0];
    verseRef.innerHTML = `<span><i>${passage.reference}input is being passed on</i></span>`;
    verse.innerHTML = `<div class="text eb-container">${passage.content}</div>`;
});
