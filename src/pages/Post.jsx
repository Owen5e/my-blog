import { useParams, Link } from "react-router-dom";

export function Post({ posts, darkMode }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id.toString() === id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.slice(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (!bookmarks.find(b => b.id === post.id)) {
      bookmarks.push(post);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      alert('Article bookmarked!');
    } else {
      alert('Article already bookmarked!');
    }
  };

  if (!post)
    return (
      <div className="text-center text-red-500">
        <p className="text-lg mb-4">Article not found.</p>
        <Link to="/" className={`hover:underline ${darkMode ? 'text-orange-400' : 'text-blue-600'}`}>Back to News</Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className={`inline-block mb-4 hover:underline font-medium ${darkMode ? 'text-orange-400' : 'text-blue-600'}`}>
        ← Back to News
      </Link>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg`}>
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
            onError={(e) => e.target.style.display = 'none'}
          />
        )}
        <h1 className={`text-4xl font-bold mb-6 leading-tight ${darkMode ? 'text-white' : 'text-blue-700'}`}>{post.title}</h1>
        <div className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          By {post.author || 'Unknown'} • {post.date ? new Date(post.date).toLocaleDateString() : 'Recent'} • {Math.ceil(post.content.split(/\s+/).length / 200)} min read
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={handleBookmark}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Bookmark
          </button>
          <button
            onClick={handleShare}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Share
          </button>
        </div>

        <p className={`text-lg leading-relaxed whitespace-pre-wrap mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {post.content}
        </p>
        {post.url && (
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block px-4 py-2 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
              darkMode
                ? 'bg-blue-400 hover:bg-blue-500 text-white'
                : 'bg-blue-400 hover:bg-blue-500 text-white'
            }`}
          >
            Read Full Article →
          </a>
        )}
      </div>
    </div>
  );
}
