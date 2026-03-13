// netlify/functions/news.js
/* global process */
const handler = async (event) => {
  console.log('News function called');
  // Handle preflight OPTIONS request for CORS
  if (event.httpMethod === "OPTIONS") {
    console.log('Handling OPTIONS request');
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
    console.log('Checking API key');
    const apiKey = process.env.NEWS_API_KEY; // Note: No VITE_ prefix here—server-side env var
    if (!apiKey) {
      console.log('API key not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API key not configured" }),
      };
    }
    console.log('API key found, fetching news');

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`,
    );
    console.log('Fetch response status:', response.status);

    if (!response.ok) {
      console.log('NewsAPI error:', response.status, response.statusText);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `NewsAPI error: ${response.statusText}`,
        }),
      };
    }

    const data = await response.json();
    console.log('Fetched data successfully');
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
    console.log('Error in function:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export default handler;
