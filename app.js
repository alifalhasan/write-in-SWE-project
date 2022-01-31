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

app.post("/search", function (req, res) {
    const key = req.body.searchTopic;
    console.log(key);
    Post.find({
        $or: [{
            content: new RegExp(key)
        }, {
            title: new RegExp(key)
        }]
    }, function (err, posts) {
        if (!err) {
            console.log(218, posts);
            let login, logout, admin, writepanel;
            if (loggedIn == "none") login = "block", logout = "none";
            else login = "none", logout = "block";
            if (loggedIn == adminid) admin = "block", writepanel = "none";
            else admin = "none", writepanel = "block";
            res.render("home", {
                posts: posts,
                current: setCur(),
                past: setPast(),
                login: login,
                logout: logout,
                admin: admin,
                writepanel: writepanel
            });
        } else {
            console.log("archive not found!! ", err);
        }
    });

});
let port = process.env.PORT;
if (port == null || port == "") {
    port = 80;
}
app.listen(port, function () {
    console.log("server started successfully");
});
