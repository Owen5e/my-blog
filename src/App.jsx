import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Post } from "./pages/Post";
import { About } from "./pages/About";
import { CreatePost } from "./pages/CreatePost";
import { useState, useEffect } from "react";
import Logo from "./assets/logoblack.png";

const getStoredPosts = () => {
  const stored = localStorage.getItem("posts");
  return stored
    ? JSON.parse(stored)
    : [
        {
          id: 1,
          title: "Getting Started with React",
          content:
            "React is a JavaScript library for building user interfaces...",
        },
        {
          id: 2,
          title: "Understanding Tailwind CSS",
          content: "Tailwind CSS is a utility-first CSS framework...",
        },
      ];
};

export default function App() {
  const [posts, setPosts] = useState(getStoredPosts);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = (newPost) => {
    setPosts((prev) => [{ id: Date.now(), ...newPost }, ...prev]);
  };

  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-50 text-gray-900 font-sans flex flex-col">
        <header className="bg-white shadow-md">
          <div className="w-full mx-auto px-4 py-4 flex items-center">
            <div className="w-full flex items-center">
              <img src={Logo} alt="logo" className="w-12 pt-1 " />
              <h1 className="text-2xl font-bold text-blue-600">Blog</h1>
              <span className="text-2xl text-black font-bold flex items-end">
                .
              </span>
            </div>
            <div className="flex justify-end w-full">
              <nav className="space-x-6">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  About
                </Link>
                <Link
                  to="/create"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Create
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="w-full mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<Home posts={posts} />} />
            <Route path="/post/:id" element={<Post posts={posts} />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/create"
              element={<CreatePost onAddPost={handleAddPost} />}
            />
          </Routes>
        </main>

        <footer className="bg-white border-t mt-12 py-6 text-center text-sm text-gray-500">
          <p>&copy; 2025 Wendev. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}
