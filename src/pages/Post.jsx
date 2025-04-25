import { useParams } from "react-router-dom";

export function Post({ posts }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id.toString() === id);

  if (!post)
    return <div className="text-center text-red-500">Post not found.</div>;

  return (
    <div className=" bg-white p-8 rounded-xl shadow max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">{post.title}</h1>
      <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </p>
    </div>
  );
}
