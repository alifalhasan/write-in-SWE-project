//---------//
//includes//
//--------//
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//const _ = require("lodash");
const mongoose = require("mongoose");
const date = require("dateformat");
const validator = require("validator");
const schema = require(__dirname+"/model/schema.js");//*
let loggedIn = "mehedi@gmail.com";
const adminid = "admin@gmail.com",
    adminpass = "admin123321";


//-----------------//
//uses of includes//
//----------------//
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public")); // give express access of the folder named "public"

//mongoose.connect("mongodb://localhost:27017/blogDB",{
//    useNewUrlParser:true
//});


//-------------------//
//User defined method//
//-------------------//
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
//databse and model
const PendingPost=schema.getPendingPostModel();
const Post=schema.getPostModel();
const User=schema.getUserModel();

//back-end
app.get("/compose", function (req, res) {
    if (loggedIn != "none") res.render("compose");
    else res.redirect("/login");
});
app.post("/compose", function (req, res) {
    if (loggedIn != "none") {
        let user;
        User.find({
            email: loggedIn
        }, function (err, users) {
            if (!err) {
                user = users[0];
                const post = new PendingPost({
                    title: req.body.title,
                    content: req.body.content,
                    tag: req.body.tag,
                    time: getdate(),
                    author: user.name
                });
                if (req.body.sendAdmin == "") {
                    post.save(function (err1) {
                        if (!err1) {
                            console.log(post);
                            console.log("sent to admin");
                            res.redirect("/compose");
                        }else{
                            console.log("Not sent to admin");
                        }
                    });
                }
            } else {
                console.log(err);
            }
        })

    } else {
        res.redirect("/login");
    }

});


//port
app.listen(3000, function () {
    console.log("server started successfully");
});