import { Link } from "react-router-dom";

export function Home({ posts }) {
  return (
    <div className="w-full h-vh">
      <h1 className="text-3xl font-extrabold mb-6 text-center">Latest Posts</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
          >
            <Link
              to={`/post/${post.id}`}
              className="block text-2xl font-semibold text-blue-600 hover:underline mb-2"
            >
              {post.title}
            </Link>
            <p className="text-gray-600 line-clamp-3">
              {post.content.slice(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
