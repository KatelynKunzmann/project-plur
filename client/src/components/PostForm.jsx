import React, { useState, useEffect } from "react";
import getRandomUsername from "../utils/username";
import ImageUploader from "./ImageUploader";

export default function PostForm({ addPost }) {
  const [username, setUsername] = useState(getRandomUsername());
  const [input, setInput] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const locked = !!localStorage.getItem("plur-username");
    setIsLocked(locked);
  }, []);

  const handleRegenerate = () => {
    if (isLocked) return;
    const newName = getRandomUsername(true);
    setUsername(newName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLocked) {
      localStorage.setItem("plur-username", username);
      setIsLocked(true);
    }
    addPost({ content: input, image: image });
    setInput("");
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col">
      <div className="w-full flex flex-col sm:flex-row gap-2 items-stretch">
        <div className="flex-1 flex flex-col">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLocked}
            className="w-full p-2 rounded-md bg-[#2e2e48] text-white placeholder-neonYellow 
                focus:outline-none focus:ring-2 focus:ring-neonGreen 
                disabled:opacity-70"
          />
          {!isLocked && (
            <p className="text-xs text-gray-400 mt-1">
              ⚠️ This username will be locked in after your first post.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          {!isLocked && (
            <button
              type="button"
              onClick={handleRegenerate}
              className="text-sm font-semibold text-neonYellow border border-neonYellow rounded px-3 py-1 transition hover:bg-neonYellow hover:text-darkBg hover:shadow-[0_0_10px_#ccff33] hover:scale-105 active:scale-95"
            >
              🔁 Randomize Name
            </button>
          )}
        </div>
      </div>
      <textarea
        rows="3"
        placeholder="What's your Kandi story? Or your sidequest story? Or maybe you just wanna chat :)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 mt-3 rounded-md bg-[#2e2e48] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neonGreen"
      />
      <ImageUploader setImage={setImage} />
      <button
        type="submit"
        className="mt-3 bg-darkBg text-neonYellow font-bold py-2 px-4 rounded border border-neonYellow transition duration-300 ease-in-out
                   hover:bg-[#9b4dff] hover:text-neonGreen hover:shadow-[0_0_15px_#ccff33] hover:animate-pulse"
      >
        Post
      </button>
    </form>
  );
}
