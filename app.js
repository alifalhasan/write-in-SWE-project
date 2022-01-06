const Express = require("express");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const express = require("express");
const SwaggerJSDoc = require("swagger-jsdoc");
const SwaggerUI = require("swagger-ui-express");
const { PostSchema, UserSchema } = require("./model/dbschema");
const swaggerJSDoc = require("swagger-jsdoc");
const SwaggerSpec = {
    swaggerDefinition: {
        info: {
            title: "Admin API",
            description: "Admin API Interface",
            contact: {
                name: "Alif Al Hasan"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["app.js"]
};

const App = Express();

App.set("view-engine", "ejs");

App.use(express.static("public"));
App.use(BodyParser.urlencoded({extended:true}));

App.use(express.json());
App.use("/api-doc", SwaggerUI.serve, SwaggerUI.setup(SwaggerJSDoc(SwaggerSpec)));

Mongoose.connect('mongodb+srv://write-in:write-in88@cluster0.vchqj.mongodb.net/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const PostSchema_ = PostSchema();
const UserSchema_ = UserSchema();
const Post = Mongoose.model("Post", PostSchema_);
const User = Mongoose.model("User", UserSchema_);
const PendingPost = Mongoose.model("PendingPost", PostSchema_);

let adminid = "admin@gmail.com";
let loggedIn = adminid;

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
App.listen(port, function () {
    console.log("server started successfully");
});


/**
 * @swagger
 * /admin:
 *  get:
 *   description: Used to request accessing the admin panel
 *   responses:
 *    '200':
 *      description: A successful request and redirect to PendingBlogs Panel
*/
App.get("/admin", function (req, res) {
    if (loggedIn == adminid) res.redirect("/admin/PendingBlogs");
});


/**
 * @swagger
 * /admin/PendingBlogs:
 *  get:
 *   description: Used to Show all the pending blogs
 *   responses:
 *    '200':
 *      description: A successful request and view all the pending blogs
 *      parameters:
 *          name: data
 *          type: array
*/
App.get("/admin/:type", function (req, res) {
    let panel = "PendingBlogs";
    if (loggedIn == adminid) {
            PendingPost.find({}, function (err, posts) {
                if (!err) {
                    res.render("admin", {
                        selectedPanel: panel,
                        data: posts
                    });
                }
            });
    }
});

/**
 * @swagger
 * /admin/PendingBlogsPublish:
 *  post:
 *   description: Used to Publish pending blogs
*/
App.post("/admin/PendingBlogsPublish", function (req, res) {
    const id = req.body.publishBtn;
    PendingPost.find({
        _id: id
    }, function (err, posts) {
        if (!err) {
            const post = posts[0];
            PendingPost.deleteOne({
                _id: post._id
            }, function (err) {
                if (err) {
                    console.log("not deleted!!", err);
                } else console.log("successful deletion");
            });
            Post.create({
                title: post.title,
                content: post.content,
                tag: post.tag,
                time: post.time,
                author: post.author
            }, function (err, data) {
                if (!err) {
                    console.log("saved to post", data);
                } else console.log("not saved!!", err);
            });
        } else console.log(err);
    });
    res.redirect("/admin");
});

/**
 * @swagger
 * /admin/PendingBlogsReject:
 *  post:
 *   description: Used to Reject a pending blog
*/
App.post("/admin/PendingBlogsReject", function (req, res) {
    const id = req.body.rejectBtn;
    PendingPost.deleteOne({
        _id: id
    }, function (err) {
        if (!err) console.log("deleted");
        else console.log(err);
    });
    res.redirect("/admin");

});

/**
 * @swagger
 * /admin/PendingBlogsOpen:
 *  post:
 *   description: Used to Open a pending blog
*/
App.post("/admin/PendingBlogsOpen", function (req, res) {
    const id = req.body.openBtn;
    PendingPost.find({
        _id: id
    }, function (err, posts) {
        if (!err) {
            const post = posts[0];
            res.render("open_pending_blog", {
                post: post
            });
        }
    });
});