const express = require("express");
const methodOverride = require('method-override');
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Dummy posts
let posts = [
    {
        id: uuidv4(),
        username: "HritikaSharan",
        content: "Just finished a great chess match! 🧠♟️"
    },
    {
        id: uuidv4(),
        username: "RitaGupta",
        content: "Spending a cozy Sunday with my little one 💕"
    },
    {
        id: uuidv4(),
        username: "SunilKumarGupta",
        content: "Proud of my journey in the world of finance and banking."
    },
];

// Redirect root route to /posts
app.get("/", (req, res) => {
    res.redirect("/posts");
});

// Routes
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    if (post) {
        post.content = newContent;
    }
    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
