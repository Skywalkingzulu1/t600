const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;
const SERPAPI_KEY = "93badb035f7e2c7fefca87a9e4b75c45ec602dd2883c2c66eed91b3bb6939167";

// Serve static files
app.use(express.static('public'));

// Serve index.html as default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route for search
app.get('/serpsearch', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "Missing search query" });
    }

    try {
        const response = await axios.get('https://serpapi.com/search.json?', {
            params: {
                api_key: SERPAPI_KEY,
                q: query,
                engine: "google",
                google_domain: "google.com",
                num: 5
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching search results:", error);
        res.status(500).json({ error: "Failed to fetch search results" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
