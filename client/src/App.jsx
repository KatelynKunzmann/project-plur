import React, { useState, useEffect} from "react";
import PostForm from "./components/PostForm";
import Post from "./components/Post";

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  fetchPosts();
}, []);

const addPost = async ({ username, content }) => {
  try {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author: username, content }),
    });

    const newPost = await res.json();
    setPosts((prev) => [{
      ...newPost,
      createdAt: newPost.created_at,
      username: newPost.author
    }, ...prev]);

  } catch (err) {
    console.error('Failed to add post:', err);
  }
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
