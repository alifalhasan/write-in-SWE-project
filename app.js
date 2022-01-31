const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const date = require("dateformat");
const validator = require("validator");
let loggedIn = "none";
const adminid = "admin@gmail.com",
    adminpass = "admin123321";
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/blogDB",{
    useNewUrlParser:true
});

function getdate() {
    return date("dd mmmm yyyy");
}

function setCur() {
    const time = [];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const thisMonth = Number(date("m"));
    const thisYear = Number(date("yyyy"));
    for (let i = thisMonth - 1; i >= 0; i--) {
        time.push(months[i] + " " + thisYear);
    }
    return time;
}

function setPast() {
    const time = [];
    const thisYear = Number(date("yyyy"));
    for (let i = thisYear - 1; i > 2016; i--) time.push(i);
    return time;
}
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true

    },
    author: {
        type: String,
        required: true
    }
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [String]
});
const PendingPost = mongoose.model("PendingPost", postSchema);
const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);

app.post("/admin/UsersBan", function (req, res) {
    const id = req.body.banBtn;
    User.deleteOne({
        _id: id
    }, function (err) {
        if (!err) {
            console.log("deleted");
            res.redirect("/admin/Users");
        } else {
            console.log(err);
        }
    })
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 80;
}
app.listen(port, function () {
    console.log("server started successfully");
});
