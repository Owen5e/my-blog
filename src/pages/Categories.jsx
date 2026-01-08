import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArticleButtons } from "../components/ArticleButtons";

export function Categories({ darkMode }) {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [categoryNews, setCategoryNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'general', name: 'General', icon: '📰' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'health', name: 'Health', icon: '🏥' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬' }
  ];

  const fetchCategoryNews = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
      );
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      const articles = data.articles.slice(0, 12).map((article, index) => ({
        id: `cat-${category}-${index}`,
        title: article.title,
        content: article.description || 'No content available',
        author: article.author || article.source.name || 'Unknown',
        date: article.publishedAt,
        image: article.urlToImage,
        url: article.url
      }));
      setCategoryNews(articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryNews(selectedCategory);
  }, [selectedCategory]);

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="w-full">
      <h1 className={`text-3xl font-extrabold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        News Categories
      </h1>

      {/* Category Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedCategory === category.id
                ? darkMode
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-500 text-white shadow-lg'
                : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${darkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Loading {categories.find(c => c.id === selectedCategory)?.name} news...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12 text-red-500">
          <p className="text-lg mb-2">Failed to load news</p>
          <p>{error}</p>
        </div>
      )}

      {/* News Grid */}
      {!loading && !error && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryNews.map((post) => (
            <div
              key={post.id}
              className={`${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              } p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
              <Link
                to={`/post/${post.id}`}
                className={`block text-lg font-semibold hover:underline mb-3 ${
                  darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                {post.title}
              </Link>
              <p className={`text-sm mb-4 line-clamp-3 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {post.content.slice(0, 100)}...
              </p>
              <div className={`text-xs mb-3 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                By {post.author || 'Unknown'} • {post.date ? new Date(post.date).toLocaleDateString() : 'Recent'} • {calculateReadingTime(post.content)}
              </div>
              <div className="mb-3">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                }`}>
                  {post.url ? new URL(post.url).hostname.replace('www.', '') : 'Unknown Source'}
                </span>
              </div>
              <ArticleButtons article={post} darkMode={darkMode} />
            </div>
          ))}
        </div>
      )}

      {categoryNews.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No news available for this category.</p>
        </div>
      )}
    </div>
  );
}
