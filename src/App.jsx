import { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Logo from "./assets/logoblack.png";
import { About } from "./pages/About";
import { Categories } from "./pages/Categories";
import { Home } from "./pages/Home";
import { Post } from "./pages/Post";
import { Saved } from "./pages/Saved";
import { ROUTES } from "./routes";

const getStoredPosts = () => {
  const stored = localStorage.getItem("posts");
  return stored ? JSON.parse(stored) : [];
};

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        if (import.meta.env.DEV) {
          // In development, fetch directly from NewsAPI
          const apiKey = import.meta.env.VITE_NEWS_API_KEY;
          response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`,
          );
        } else {
          // In production, use Netlify function
          response = await fetch("/.netlify/functions/news");
        }
        if (!response.ok) {
          throw new Error(
            `Failed to fetch news: ${response.status} ${response.statusText}`,
          );
        }
        const data = await response.json();
        const apiPosts = data.articles.slice(0, 12).map((article, index) => ({
          id: `api-${index}`,
          title: article.title,
          content: article.description || "No content available",
          author: article.author || article.source.name || "Unknown",
          date: article.publishedAt,
          image: article.urlToImage,
          url: article.url,
        }));
        const storedPosts = getStoredPosts();
        setPosts([...storedPosts, ...apiPosts]);
      } catch (err) {
        setError(err.message);
        setPosts(getStoredPosts());
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "posts",
      JSON.stringify(posts.filter((p) => p.id >= 1000 || p.id < 100)),
    ); // Store only user-created posts (assuming API posts have ids < 100, user posts have Date.now() > 1000)
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div
        className={`min-h-screen w-full font-sans flex flex-col transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <header className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg">
          <div className="w-full mx-auto px-4 py-4 flex items-center">
            <Link
              to={ROUTES.HOME}
              className="w-full flex items-center hover:opacity-90 transition-opacity"
            >
              <img src={Logo} alt="logo" className="w-12 pt-1 " />
              <h1 className="text-2xl font-bold text-white">TheWorldToday</h1>
              <span className="text-2xl text-white font-bold flex items-end">
                .
              </span>
            </Link>
            <div className="flex justify-end w-full">
              <nav className="space-x-6">
                <Link
                  to={ROUTES.HOME}
                  className="text-white hover:text-yellow-300 font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  to={ROUTES.CATEGORIES}
                  className="text-white hover:text-yellow-300 font-medium transition-colors"
                >
                  Categories
                </Link>
                <Link
                  to={ROUTES.SAVED}
                  className="text-white hover:text-yellow-300 font-medium transition-colors"
                >
                  Saved
                </Link>
                <Link
                  to={ROUTES.ABOUT}
                  className="text-white hover:text-yellow-300 font-medium transition-colors"
                >
                  About
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="w-full mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route
              path={ROUTES.HOME}
              element={
                <Home
                  posts={posts}
                  loading={loading}
                  error={error}
                  darkMode={darkMode}
                />
              }
            />
            <Route
              path={ROUTES.CATEGORIES}
              element={<Categories darkMode={darkMode} />}
            />
            <Route
              path={ROUTES.SAVED}
              element={<Saved darkMode={darkMode} />}
            />
            <Route
              path={ROUTES.POST}
              element={<Post posts={posts} darkMode={darkMode} />}
            />
            <Route
              path={ROUTES.ABOUT}
              element={<About darkMode={darkMode} />}
            />
          </Routes>
        </main>

        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 text-center text-sm">
          <p>&copy; 2026 TheWorldToday. Built with React & Tailwind CSS.</p>
        </footer>

        {/* Floating Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50 ${
            darkMode
              ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-yellow-400/30"
              : "bg-slate-800 hover:bg-slate-900 text-white shadow-slate-800/30"
          }`}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span className="text-2xl">{darkMode ? "☀️" : "🌙"}</span>
        </button>
      </div>
    </Router>
  );
}
