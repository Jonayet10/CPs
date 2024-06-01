/**
 * @author Jonayet Lavin
 * CS132 Spring 2024
 * 
 * This server handles the backend functinoality for my Game Reviews website. It includes endpoints
 * for retriving, searching, and posting game reviews.
 */

"use strict";
const express = require('express');
const cors = require('cors');
// Cite: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS 
const fs = require("fs/promises");
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const PORT = process.env.PORT || 3000;

const REVIEWS_FILE = './reviews.json';

/**
 * Reads reviews from a JSON file and returns them as a JavaScript object.
 */
async function readReviews() {
    const data = await fs.readFile(REVIEWS_FILE, 'utf-8');
    return JSON.parse(data);
}

/**
 * Writes the modified reviews back to the JSON file.
 */
async function writeReviews(reviews) {
    const data = JSON.stringify(reviews, null, 2);
    await fs.writeFile(REVIEWS_FILE, data, 'utf-8');
}

/*
Middleware to set response content type for JSON
*/
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

/**
 * Endpoint to retrieve all reviews.
 */
app.get('/reviews', async (req, res) => {
    try {
        const reviews = await readReviews();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load reviews' });
    }
});

/**
 * Endpoint to search reviews by game title.
 * Can return results in JSON or plain text format.
 */
app.get('/reviews/search/:gameTitle', async (req, res) => {
    try {
        const gameTitle = req.params.gameTitle;
        const format = req.query.format;

        if (!gameTitle) {
            return res.status(400).json({ error: 'Missing required parameter: gameTitle' });
        }

        const reviews = await readReviews();
        const filteredReviews = reviews.filter(review =>
            review.gameTitle.toLowerCase().includes(gameTitle.toLowerCase())
        );

        if (format === 'text') {
            res.type('text');
            const responseText = filteredReviews.map(review =>
                `Title: ${review.gameTitle}\nReview: ${review.content}\nRating: ${review.rating}\n`
            ).join('\n');
            res.status(200).send(responseText);
        } else {
            res.status(200).json(filteredReviews);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to search reviews' });
    }
});


/**
 * Endpoint to get server status in plain text.
 */
app.get('/status', (req, res) => {
    res.type('text');
    res.status(200).send('Server is running correctly.');
});

/**
 * Endpoint to submit a new review to the server.
 */
app.post('/reviews', async (req, res) => {
    try {
        const newReview = req.body;
        if (!newReview.gameTitle || !newReview.content || !newReview.rating) {
            return res.status(400).json({ error: 'Missing required fields: gameTitle, content, or rating' });
        }

        const reviews = await readReviews();
        reviews.push(newReview);
        await writeReviews(reviews);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save review' });
    }
});

// Handle 404 error
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});