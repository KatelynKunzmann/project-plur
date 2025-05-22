import React, { useState } from "react";
import PostForm from "./components/PostForm";
import Post from "./components/Post";

export default function App() {
  const [posts, setPosts] = useState([]);

  const addPost = ({ username, content }) => {
    const newPost = {
      id: Date.now(),
      username: username || "Anonymous",
      content,
      createdAt: new Date().toISOString()
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-darkBg font-sans p-8 max-w-3xl mx-auto">
      <h1 className="text-5xl font-extrabold text-edmPurple drop-shadow-lg text-center">
        Welcome to Project PLUR
      </h1>

      <PostForm addPost={addPost} />

      <div className="mt-8 space-y-6">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
