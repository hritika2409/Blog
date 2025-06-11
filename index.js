const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); // Optional: for CSS/images

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Dummy posts
let posts = [
  {
    id: uuidv4(),
    username: "HritikaSharan",
    content: "Just finished a great chess match! 🧠♟️",
  },
  {
    id: uuidv4(),
    username: "RitaGupta",
    content: "Spending a cozy Sunday with my little one 💕",
  },
  {
    id: uuidv4(),
    username: "SunilKumarGupta",
    content: "Proud of my journey in the world of finance and banking.",
  },
];

// Redirect root `/` to `/posts`
app.get("/", (req, res) => {
  res.redirect("/posts");
});

// Routes
app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  posts.push({ id: uuidv4(), username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("show", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("edit", { post });
});

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const post = posts.find((p) => p.id === id);
  if (post) {
    post.content = content;
  }
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
