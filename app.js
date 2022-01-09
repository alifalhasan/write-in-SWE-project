const Express = require("express");
const BodyParser = require("body-parser");
const Ejs = require("ejs");
const Schema = require(__dirname+"/model/schema.js");//*
const Date = require(__dirname+"/utility/date.js");
const LoggedIn = "mehedi@gmail.com";
const AdminId = "admin@gmail.com",AdminPass = "admin123321";

const App = Express();


App.set('view engine', 'ejs');

App.use(BodyParser.urlencoded({
    extended: true
}));

App.use(Express.static("public")); // give express access of the folder named "public"

//databse and model
const PendingPost=Schema.GetPendingPostModel();
const Post=Schema.GetPostModel();
const User=Schema.GetUserModel();

//back-end
App.get("/compose", function (req, res) {
    if (LoggedIn != "none") res.render("compose");
    else res.redirect("/login");
});
App.post("/compose", function (req, res) {
    if (LoggedIn != "none") {
        let user;
        User.find({
            email: LoggedIn
        }, function (err, users) {
            if (!err) {
                user = users[0];
                const post = new PendingPost({
                    title: req.body.title,
                    content: req.body.content,
                    tag: req.body.tag,
                    time: date.GetDate(),
                    author: user.name
                });
                if (req.body.sendAdmin == "") {
                    post.save(function (err1) {
                        if (!err1) {
                            console.log(post);
                            console.log("sent to admin");
                            res.redirect("/compose");
                        }else{
                            console.log(err1);
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
App.listen(3000, function () {
    console.log("server started successfully");
});
