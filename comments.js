// Create web server 

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

// use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// create server
app.listen(port, function () {
    console.log("Server is running...")
});

// read file
let comments = JSON.parse(fs.readFileSync("./data/comments.json", "utf8"));

// get comments
app.get("/api/comments", function (req, res) {
    res.json(comments);
});

// get comment by id
app.get("/api/comments/:id", function (req, res) {
    let id = req.params.id;
    let comment = comments.find(comment => comment.id == id);
    res.json(comment);
});

// create comment
app.post("/api/comments", function (req, res) {
    let comment = {
        id: comments.length + 1,
        name: req.body.name,
        message: req.body.message,
        date: req.body.date
    };
    comments.push(comment);
    fs.writeFileSync("./data/comments.json", JSON.stringify(comments));
    res.json(comment);
});

// update comment
app.put("/api/comments/:id", function (req, res) {
    let id = req.params.id;
    let comment = comments.find(comment => comment.id == id);
    comment.name = req.body.name;
    comment.message = req.body.message;
    comment.date = req.body.date;
    fs.writeFileSync("./data/comments.json", JSON.stringify(comments));
    res.json(comment);
});

// delete comment
app.delete("/api/comments/:id", function (req, res) {
    let id = req.params.id;
    comments = comments.filter(comment => comment.id != id);
    fs.writeFileSync("./data/comments.json", JSON.stringify(comments));
    res.json(comments);
});