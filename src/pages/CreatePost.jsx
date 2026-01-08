import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreatePost({ onAddPost, darkMode }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onAddPost({ title, content });
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg`}>
        <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-blue-700'}`}>
          Create New Article
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
            <input
              type="text"
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-orange-400'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your article title..."
              required
            />
          </div>
          <div>
            <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Content</label>
            <textarea
              className={`w-full border rounded-lg px-4 py-3 h-48 focus:outline-none focus:ring-2 focus:border-transparent resize-vertical transition-colors ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-orange-400'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article content here..."
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
              darkMode
                ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            Publish Article
          </button>
        </form>
      </div>
    </div>
  );
}
