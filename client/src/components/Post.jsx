import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { formatDistanceToNow } from "date-fns";
import ImageUploader from "./ImageUploader";

export default function Post({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [setExpanded] = useState(false);
  const [commentImage, setCommentImage] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", post.id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching comments:", error);
      } else {
        setComments(data);
      }
    };

    fetchComments();
  }, [post.id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (newComment.trim().length === 0) return; // Prevent empty comments
    if (newComment.length > 1000) {
      alert("Comment is too long! Please keep it under 1000 characters.");
      return;
    }

    const username = localStorage.getItem("plur-username") || "Anonymous";

    const { error } = await supabase.from("comments").insert([
      {
        post_id: post.id,
        author: username,
        content: newComment,
        image_url: commentImage
      }
    ]);

    if (error) {
      console.error("Error posting comment:", error);
    } else {
      setNewComment("");
      setCommentImage(null);
      const { data } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", post.id)
        .order("created_at", { ascending: true });
      setComments(data);
    }
  };

  const displayedComments = showComments ? comments : [];

  return (
    <div className="bg-[#2e2e48] p-4 rounded shadow text-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
        <p className="text-neonYellow font-bold text-base">
          {post.username || "Anonymous"}
        </p>
        <span className="text-xs text-gray-400">{formattedDate}</span>
      </div>

      <p className="mb-3">{post.content}</p>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post attachment"
          className="mt-3 max-w-full rounded-lg border border-neonGreen"
        />
      )}

      <button
        onClick={() => {
          setShowComments(!showComments);
          if (showComments) setExpanded(false); // reset expanded when hiding
        }}
        className="text-sm text-neonGreen border border-neonGreen px-3 py-1 rounded transition hover:bg-neonGreen hover:text-darkBg hover:shadow-md"
      >
        💬 Comments ({comments.length})
      </button>

      {showComments && (
        <div className="mt-3">
          <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2">
            <textarea
              rows="2"
              maxLength={1000}
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 rounded-md bg-[#1f1f39] text-white placeholder-neonYellow focus:outline-none focus:ring-2 focus:ring-neonGreen"
            />
            <div
              className={`text-xs text-right ${
                newComment.length > 950 ? "text-red-400" : "text-gray-400"
              }`}
            >
              {newComment.length}/1000
            </div>

            <ImageUploader setImage={setCommentImage} />
            <button
              type="submit"
              className="self-end bg-darkBg text-neonYellow font-bold py-1 px-4 rounded border border-neonYellow transition hover:bg-[#9b4dff] hover:text-neonGreen hover:shadow-md"
            >
              Comment
            </button>
          </form>

          <div className="mt-4 space-y-2">
            {displayedComments.map((comment) => {
              return (
                <div
                  key={comment.id}
                  className="bg-[#38385a] p-2 rounded text-sm border-l-4 border-neonYellow"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                    <p className="font-semibold text-neonYellow">
                      {comment.author || "Anonymous"}
                    </p>
                    <span className="text-xs text-gray-400 sm:text-right sm:ml-2">
                      {formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true
                      })}
                    </span>
                  </div>
                  <p>{comment.content}</p>
                  {comment.image_url && (
                    <img
                      src={comment.image_url}
                      alt="Comment attachment"
                      className="mt-2 max-w-full rounded border border-neonGreen"
                    />
                  )}
                </div>
              );
            })}
            <button
              onClick={() => setShowComments((prev) => !prev)}
              className="mt-2 text-sm text-edmPurple font-medium border border-edmPurple px-2 py-1 rounded hover:bg-edmPurple hover:text-darkBg"
            >
              {showComments
                ? "⬆ Hide comments"
                : `⬇ Show all comments (${comments.length})`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
