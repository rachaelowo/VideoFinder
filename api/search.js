import axios from "axios";

export default async function handler(req, res) {
  const query = req.query.q;
  const API_KEY = process.env.YT_API_KEY;

  if (!query) {
    res.status(400).json({ error: "Search query missing" });
    return;
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(query)}&key=${API_KEY}`;
    const response = await axios.get(url);
    res.status(200).json(response.data.items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from YouTube API" });
  }
}
