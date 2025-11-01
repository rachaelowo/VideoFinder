const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

const API_KEY = "AIzaSyDjzWmQDu7AdXBYuv167DTdbs61Gr1MbRM";


app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/api/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Search query missing" });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(query)}&key=${API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data.items);
  } catch (error) {
    console.error("Error fetching YouTube data:", error.message);
    res.status(500).json({ error: "Failed to fetch from YouTube API" });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
