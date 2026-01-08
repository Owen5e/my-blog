import { Link } from "react-router-dom";

export function ArticleButtons({ article, darkMode, showSave = true, showShare = false }) {
  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (!bookmarks.find(b => b.id === article.id)) {
      bookmarks.push(article);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      alert('Article bookmarked!');
    } else {
      alert('Article already bookmarked!');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content.slice(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex justify-between">
      <Link
        to={`/post/${article.id}`}
        className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-md ${
          darkMode
            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/25 hover:shadow-blue-500/40'
            : 'bg-blue-400 hover:bg-blue-500 text-white shadow-blue-400/25 hover:shadow-blue-400/40'
        }`}
      >
        Read
      </Link>
      {showSave && (
        <button
          onClick={handleBookmark}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-md ${
            darkMode
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40'
              : 'bg-emerald-400 hover:bg-emerald-500 text-white shadow-emerald-400/25 hover:shadow-emerald-400/40'
          }`}
        >
          Save
        </button>
      )}
      {showShare && (
        <button
          onClick={handleShare}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-md ${
            darkMode
              ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-purple-500/25 hover:shadow-purple-500/40'
              : 'bg-purple-400 hover:bg-purple-500 text-white shadow-purple-400/25 hover:shadow-purple-400/40'
          }`}
        >
          Share
        </button>
      )}
    </div>
  );
}
