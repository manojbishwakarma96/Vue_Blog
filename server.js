import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Path to posts.json
const postsPath = path.join(__dirname, "src", "data", "posts.json");

// Get all posts
app.get("/api/posts", async (req, res) => {
  try {
    const postsData = await fs.readFile(postsPath, "utf8");
    const posts = JSON.parse(postsData);
    res.json(posts);
  } catch (error) {
    console.error("Error reading posts:", error);
    res.status(500).json({ error: "Error reading posts" });
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const postsData = await fs.readFile(postsPath, "utf8");
    const posts = JSON.parse(postsData);

    const { title, content, category, subcategory, author } = req.body;

    const newPost = {
      id: Date.now().toString(),
      title,
      content,
      category,
      subcategory,
      author,
      date: new Date().toISOString(),
    };

    posts.posts.unshift(newPost);

    await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
});

// Get a single post by ID
app.get("/api/posts/:id", async (req, res) => {
  try {
    const postsData = await fs.readFile(postsPath, "utf8");
    const posts = JSON.parse(postsData);
    const post = posts.posts.find((p) => p.id === req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error reading post:", error);
    res.status(500).json({ error: "Error reading post" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
