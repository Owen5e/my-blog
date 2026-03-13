// netlify/functions/news.js
/* global process */
const handler = async (event) => {
  // Handle preflight OPTIONS request for CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: "",
    };
  }

  try {
    const apiKey = process.env.NEWS_API_KEY; // Note: No VITE_ prefix here—server-side env var
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API key not configured" }),
      };
    }

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`,
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `NewsAPI error: ${response.statusText}`,
        }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow CORS for your client
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export default handler;
