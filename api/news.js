// api/news.js
export default async function handler(req, res) {
  console.log("News function called");

  // Handle preflight OPTIONS request for CORS
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.status(200).end();
    return;
  }

  try {
    console.log("Checking API key");
    const apiKey = process.env.NEWS_API_KEY; // Server-side env var
    if (!apiKey) {
      console.log("API key not configured");
      res.status(500).json({ error: "API key not configured" });
      return;
    }
    console.log("API key found, fetching news");

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`,
    );
    console.log("Fetch response status:", response.status);

    if (!response.ok) {
      console.log("NewsAPI error:", response.status, response.statusText);
      res.status(response.status).json({
        error: `NewsAPI error: ${response.statusText}`,
      });
      return;
    }

    const data = await response.json();
    console.log("Fetched data successfully");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.status(200).json(data);
  } catch (error) {
    console.log("Error in function:", error.message);
    res.status(500).json({ error: error.message });
  }
}
