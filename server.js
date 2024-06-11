// server.js
const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');


dotenv.config();

const app = express();

// Use the PORT provided by Railway or default to 3000
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/movie', async (req, res) => {
    try {
        const genreId = 27; // genre ID for Horror
        const initialResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${genreId}&with_keywords=12339-slasher&page=1`);
        const initialData = await initialResponse.json();
        const totalPages = initialData.total_pages;

        const randomPage = Math.floor(Math.random() * totalPages) + 1;

        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${genreId}&with_keywords=12339-slasher&page=${randomPage}`);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie data." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
