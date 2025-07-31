import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
const PORT = 3001;

// Middleware to parse JSON
app.use(express.json());

// Open SQLite database
const db = await open({
  filename: "./plur.db",
  driver: sqlite3.Database,
});

// Create the posts table if it doesn't exist
await db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT,
    content TEXT,
    created_at TEXT
  )
`);

// GET all posts
app.get("/api/posts", async (req, res) => {
  const posts = await db.all("SELECT * FROM posts ORDER BY created_at DESC");

  // Rename fields for frontend consistency
  const mappedPosts = posts.map((post) => ({
    id: post.id,
    username: post.author,
    content: post.content,
    createdAt: post.created_at
  }));

  res.json(mappedPosts);
});


// POST a new post
app.post("/api/posts", async (req, res) => {
  const { author, content } = req.body;
  const created_at = new Date().toISOString();

  const result = await db.run(
    "INSERT INTO posts (author, content, created_at) VALUES (?, ?, ?)",
    author || "Anonymous",
    content,
    created_at
  );

  const newPost = await db.get("SELECT * FROM posts WHERE id = ?", result.lastID);
  res.status(201).json(newPost);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
