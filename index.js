const express = require("express");
const methodOverride = require('method-override')
const app = express();
const port = process.env.PORT || 3000;

const path = require("path");
const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({ extended:  true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set(express.static(path.join(__dirname, "public")));


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


app.get("/posts" , (req, res) => {
    res.render("index.ejs", { posts })
});

app.get("/posts/new" , (req, res) => {
    res.render("new.ejs")
});

app.get("/posts/:id" , (req, res) => {
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

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post }); // pass the post to the template
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("listening to port : 8080");
})
