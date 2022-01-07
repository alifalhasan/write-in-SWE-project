/* All the required modules are here */

const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const SwaggerJSDoc = require("swagger-jsdoc");
const SwaggerUI = require("swagger-ui-express");

/* Required modules end here */




/**
 * Requiring Database Schema from model part
 */
const { PostSchema, UserSchema } = require("./model/dbschema");






/**
 * Swagger Specification is defined here
 */
const SwaggerSpec = {
    swaggerDefinition: {
        info: {
            title: "Admin Post Approval API",
            description: "Admin Post Approval API Interface",
            contact: {
                name: "Alif Al Hasan"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["app.js"]
};






/**
 * App is an object where Express() method puts new Express application (to start a new Express application)
 */
const App = Express();





/**
 * Setting EJS(Embedded JS) as default view engine so that ejs files can be rendered
 */
App.set("view-engine", "ejs");






/**
 * Telling App to use express.json() which is a method inbuilt in express to recognize the incoming Request Object as a JSON Object
 */
App.use(Express.json());







/**
 * Telling App that static files reside in public folder
 */
App.use(Express.static("public"));







/**
 *  Telling to use Body-Parser to convert text-based JSON input into JS based variable from URL-encoded requests. The "extended:true" precises that the req.body object will contain values of any type instead of just strings.
 */
App.use(BodyParser.urlencoded({extended:true}));








/**
 * "localhost:9000/api-doc" will contain the api documentation
 */
App.use("/api-doc", SwaggerUI.serve, SwaggerUI.setup(SwaggerJSDoc(SwaggerSpec)));








/**
 * Connectiong to database using mongoose
 */
Mongoose.connect('mongodb+srv://write-in:write-in88@cluster0.vchqj.mongodb.net/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});





/**
 * Database schemas stored in constants
 */
const Post = Mongoose.model("Post", PostSchema);
const User = Mongoose.model("User", UserSchema);
const PendingPost = Mongoose.model("PendingPost", PostSchema);




let adminid = "admin@gmail.com"; //adminid variable stores admin's email
let loggedIn = adminid; //loggedIn variable stores which type of user(** I have initialized it with adminid)





let port = process.env.PORT;
if (port == null || port == "") {
    port = 9000;
}
App.listen(port, () => {
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