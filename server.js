const express = require('express');
const path = require('path');
const mysql = require('mysql');
const { scrapeWebsite } = require('./public/verse');
const app = express();

const port = 3000;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'juan',
    password: 'password',
    database: 'church',
    port: '8889',
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/verse-of-the-day', async (req, res) => {
    const verseData = await scrapeWebsite('https://www.bible.com/verse-of-the-day');
    res.json(verseData);
});

app.get('/api/verse-of-the-day-es', async (req, res) => {
    const verseData = await scrapeWebsite('https://www.bible.com/es/verse-of-the-day');
    res.json(verseData);
});

app.get('/events', (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    let query = 'SELECT * FROM events WHERE start_datetime > ?';

    const limit = req.query.limit;

    if (limit && !isNaN(parseInt(limit))) {
        query += ' ORDER BY start_datetime ASC LIMIT ?';
    } else {
        query += ' ORDER BY start_datetime ASC';
    }

    const values = limit ? [currentDate, parseInt(limit)] : [currentDate];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error retrieving events: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
