const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { scrapeWebsite } = require('./public/js/common/verse');
const app = express();
const port = 3000;
const mongoUri = 'mongodb+srv://church-test:churchtest123@church-announcements.cpowek6.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(mongoUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
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

app.get('/events', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('church');
        const collection = db.collection('events');

        const currentDate = new Date();
        const dateFilter = { datetime: { $gte: currentDate.toISOString() } };

        let query = collection.find(dateFilter);
        query = query.sort({ datetime: 1 });

        const limit = req.query.limit;

        if (limit && !isNaN(parseInt(limit))) {
            query = query.limit(parseInt(limit));
        }

        const eventsCursor = await query;
        const events = await eventsCursor.toArray();

        res.json(events);
    } catch (error) {
        console.error('Error retrieving events: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'en', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
