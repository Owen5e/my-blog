import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArticleButtons } from "../components/ArticleButtons";
import { ROUTES } from "../routes";

export function Saved({ darkMode }) {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setSavedArticles(bookmarks);
  }, []);

  const removeBookmark = (articleId) => {
    const updatedBookmarks = savedArticles.filter(article => article.id !== articleId);
    setSavedArticles(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="w-full">
      <h1 className={`text-3xl font-extrabold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Saved Articles
      </h1>

      {savedArticles.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📚</div>
          <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            No saved articles yet
          </h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Bookmark articles you want to read later by clicking the save button on any article.
          </p>
          <Link
            to={ROUTES.HOME}
            className={`inline-block px-6 py-3 rounded-lg font-medium transition-colors ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Browse Articles
          </Link>
        </div>
      ) : (
        <div className="mb-6">
          <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {savedArticles.length} saved article{savedArticles.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Saved Articles Grid */}
      {savedArticles.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {savedArticles.map((article) => (
            <div
              key={article.id}
              className={`${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              } p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative`}
            >
              {/* Remove Bookmark Button */}
              <button
                onClick={() => removeBookmark(article.id)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  darkMode
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title="Remove from saved"
              >
                🗑️
              </button>

              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
              <Link
                to={`/post/${article.id}`}
                className={`block text-lg font-semibold hover:underline mb-3 ${
                  darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                {article.title}
              </Link>
              <p className={`text-sm mb-4 line-clamp-3 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {article.content.slice(0, 100)}...
              </p>
              <div className={`text-xs mb-3 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                By {article.author || 'Unknown'} • {article.date ? new Date(article.date).toLocaleDateString() : 'Recent'} • {calculateReadingTime(article.content)}
              </div>
              <div className="mb-3">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                }`}>
                  {article.url ? new URL(article.url).hostname.replace('www.', '') : 'Unknown Source'}
                </span>
              </div>
              <ArticleButtons article={article} darkMode={darkMode} showSave={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
