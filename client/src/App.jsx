import React, { useState, useEffect } from "react";
import PostForm from "./components/PostForm";
import Post from "./components/Post";
import { supabase } from "./supabase";

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        // Normalize data shape to what our components expect
        const formatted = data.map((post) => ({
          id: post.id,
          username: post.author,
          content: post.content,
          createdAt: post.created_at,
        }));
        setPosts(formatted);
      }
    };

    fetchPosts();
  }, []);
  
  const addPost = async ({ content }) => {
    const username = localStorage.getItem("plur-username") || "Anonymous";

    const { data, error } = await supabase
      .from("posts")
      .insert([{ author: username, content }])
      .select()
      .single();

    if (error) {
      console.error("Error adding post:", error);
    } else {
      const newPost = {
        id: data.id,
        username: data.author,
        content: data.content,
        createdAt: data.created_at,
      };
      setPosts((prev) => [newPost, ...prev]);
    }
  };

  // Fetch comments for a specific post
const fetchComments = async (postId) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
  return data;
};

// Add a new comment
const addComment = async (postId, content) => {
  const username = localStorage.getItem('plur-username') || 'Anonymous';
  const { error } = await supabase.from('comments').insert([
    {
      post_id: postId,
      author: username,
      content,
    },
  ]);

  if (error) {
    console.error('Error adding comment:', error);
  }
};

  return (
    <div className="min-h-screen bg-darkBg font-sans px-4 max-w-4xl mx-auto">
      <div className="flex flex-col items-center text-center space-y-2 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl sm:text-5xl text-edmPurple drop-shadow-lg">✨</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_#9b4dff] animate-pulse">
            Welcome to Project PLUR
          </h1>
          <span className="text-4xl sm:text-5xl text-edmPurple drop-shadow-lg">✨</span>
        </div>
      </div>


      <PostForm addPost={addPost} />

      <div className="mt-8 space-y-6">
        {posts.map((post) => (
          <Post key={post.id} post={post} addcomment={addComment} fetchComments={fetchComments} />
        ))}
      </div>
    </div>
  );
}
