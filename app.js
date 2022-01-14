
const Express = require("express");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const Ejs = require("ejs");


//Schema module contains database definitions
const Schema = require(__dirname+"/model/schema.js");


//Date module is utility module that contains date formatting
const Date = require(__dirname+"/utility/date.js");

//DataBase Module contains database related functions
const DataBase = require(__dirname+"/model/dataBase.js");


//For Documentation Purpose
const SwaggerJsDoc=require("swagger-jsdoc");
const SwaggerUI=require("swagger-ui-express");


//For my Part Implementation only
const LoggedIn ="mehedi@gmail.com"; //"admin@gmail.com";//"mehedi@gmail.com";
const AdminId = "admin@gmail.com",AdminPass = "admin123321";




const App = Express();

App.set('view engine', 'ejs');

App.use(BodyParser.urlencoded({
    extended: true
}));


// give express access of the folder named "public"
App.use(Express.static("public"));


//for using swagger doc tools
const SwaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Write-In",
      version: '1.0.0',
    },
  },
  apis: ["app.js"],
};
const SwaggerDocs = SwaggerJsDoc(SwaggerOptions);
App.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerDocs));


//databse and model
const PendingPost=Schema.GetPendingPostModel();
const Post=Schema.GetPostModel();
const User=Schema.GetUserModel();
const ReviewedPost=Schema.GetReviewedPostModel();


/**
 * @swagger
 * /compose:
 *   get:
 *     description: if user is loggedin, a blog compose page for writing blog will appear otherwise login page will apperar
 *     responses:
 *       200:
 *         description: Success
 * 
 */
App.get("/compose",function (req, res) {
    if (LoggedIn != "none") res.render("compose", {
        sentToAdminSuccess : "none",
    });
    else res.redirect("/login");
});



/**
 * @swagger
 * /compose:
 *   post:
 *     description: User written blog post will be sent to database for admin approval
 *     responses:
 *       200:
 *         description: sent to admin
 */
App.post("/compose", function (req, res) {
    let userPost={
        title: req.body.title,
        content: req.body.content,
        tag: req.body.tag,
        time : Date.GetDate(),
        sendToAdmin : false
    }
    if(req.body.sendAdmin=="done") userPost.sendToAdmin=true;
    if (LoggedIn != "none") {
        DataBase.SendPostToAdmin(LoggedIn,userPost);
        res.render("compose", {
            sentToAdminSuccess : "block"
        });
    } else {
        res.redirect("/login");
    }

});





/**
 * @swagger
 * /admin/PendingBlogsOpen:
 *   get:
 *     description: Opens a blog from admin panel's pending posts list
 *     responses:
 *       200:
 *         description: Success
 * 
 */
App.get("/admin/PendingBlogsOpen", function (req, res) {
    const Id = "61e0c4b4e985063e1cad07bc"; // Demo pending post
    PendingPost.find({
        _id: Id
    }, function (err, posts) {
        if (!err) {
            const Post = posts[0];
            res.render("open_pending_blog", {
                post: Post,
                alertSuccess : "none",
                alertFailed : "none",
                postId : Id
            });
        }
    });
});



/**
 * @swagger
 * /admin/PendingBlogsOpen:
 *    post:
 *     description: Admin written review will be sent to database 
 *     responses:
 *       200:
 *         description: Success
 * 
 */
App.post("/admin/PendingBlogsOpen", function (req, res) {
    const Review = req.body.review;
    const PostId = req.body.send.toString();
    PendingPost.findById(PostId,function(error,post){
        if(!error) {
            const Post=post;
            var alertFailed = "none",alertSuccess = "none";
            if(Post.length==0) alertFailed="block";
            else alertSuccess = "block";
            const ReviewPost = new ReviewedPost( {
                title : Post.title,
                content : Post.content,
                tag : Post.tag,
                time : Post.time,
                author : Post.author,
                review : Review
            });
            ReviewPost.save(function(error){
                if(!error){
                    res.render("open_pending_blog",{
                        post : Post,
                        alertSuccess : alertSuccess,
                        alertFailed : alertFailed,
                        postId : Post.id
                    });
                } else {
                    console.log(error);
                }
            });
            
        }
        else console.log(error);
    });
    
});


//server port
App.listen(3000, function () {
    console.log("server started successfully");
});
