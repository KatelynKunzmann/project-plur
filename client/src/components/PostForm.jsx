import React, { useState, useEffect } from "react";
import getRandomUsername from "../utils/username";

export default function PostForm({ addPost }) {
  const [username, setUsername] = useState(getRandomUsername());
  const [input, setInput] = useState("");
  const [isLocked, setIsLocked] = useState(false);

useEffect(() => {
  const locked = !!localStorage.getItem("plur-username");
  setIsLocked(locked);
}, []);


  const handleRegenerate = () => {
    if (isLocked) return;
    const newName = getRandomUsername(true); // request a fresh name
    setUsername(newName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLocked) {
      localStorage.setItem("plur-username", username);
      setIsLocked(true);
    }
    addPost({ username, content: input });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col">
      <div className="w-full flex flex-col sm:flex-row gap-2 items-stretch">
        <div className="flex-1">
          <input
            type="text"
            value={username}
            readOnly
            disabled
            className="w-full p-2 rounded-md bg-[#2e2e48] text-white placeholder-neonYellow 
                      focus:outline-none focus:ring-2 focus:ring-neonGreen 
                      pointer-events-none select-none"
          />
        </div>
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

      <textarea
        rows="3"
        placeholder="What's your Kandi story?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 mt-3 rounded-md bg-[#2e2e48] text-white placeholder-neonYellow focus:outline-none focus:ring-2 focus:ring-neonGreen"
      />

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
