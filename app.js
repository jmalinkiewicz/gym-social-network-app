require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db } = require("./database/firestore");
const PostsManager = require("./database/posts/posts");

const app = express();
const port = 3000;

app.locals.postsManager = new PostsManager(db);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.get("/posts", async (req, res) => {
  const posts = await app.locals.postsManager.getPosts();
  res.json(posts);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
