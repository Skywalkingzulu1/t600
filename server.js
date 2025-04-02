// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Replace with your actual SerpAPI key or use an environment variable for added security.
const SERP_API_KEY = "93badb035f7e2c7fefca87a9e4b75c45ec602dd2883c2c66eed91b3bb6939167";

// Endpoint to search using SerpAPI
app.get('/serpsearch', async (req, res) => {
  const query = req.query.q || "Coffee";
  const params = {
    engine: 'google',
    q: query,
    api_key: SERP_API_KEY
  };

  try {
    const response = await axios.get("https://serpapi.com/search", { params });
    res.json(response.data);
  } catch (error) {
    console.error("SerpAPI error:", error.message);
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(port, () => console.log(`Node server running on port ${port}`));
