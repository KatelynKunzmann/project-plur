import React from "react";

export default function Post({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleString();

  return (
    <div className="bg-[#2e2e48] p-4 rounded shadow text-white">
      <div className="flex justify-between items-center mb-2">
        <p className="text-neonYellow font-bold">
          {post.username || "Anonymous"}
        </p>
        <span className="text-xs text-gray-400">{formattedDate}</span>
      </div>
      <p>{post.content}</p>
    </div>
  );
}
