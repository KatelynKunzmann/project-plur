import React, { useState } from "react";

export default function PostForm({ addPost }) {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ username, content: input });
    setInput("");
    setUsername("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col">
      <input
        type="text"
        placeholder="Your name or alias"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 rounded-md bg-[#2e2e48] text-white placeholder-neonYellow focus:outline-none focus:ring-2 focus:ring-neonGreen"
      />

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
