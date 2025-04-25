import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreatePost({ onAddPost }) {
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
    <div className=" bg-gray-50 flex items-center justify-center overflow-auto">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Create New Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Content</label>
            <textarea
              className="w-full border rounded px-3 py-2 h-40"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}
