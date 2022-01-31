const Mongoose = require("mongoose");
const Schema = require(__dirname+"/schema.js");

//connect to mongoose port
Mongoose.connect("mongodb://localhost:27017/blogDB",{
    useNewUrlParser:true
});

//databse and model
const PendingPost=Schema.GetPendingPostModel();
const User=Schema.GetUserModel();

//SendPostToAdmin function stores posted blog in the pendingPost collections
exports.SendPostToAdmin = function (userEmail,userPost) {
    let user;
    console.log(userPost);
    User.find({
        email: userEmail
    }, function (err, users) {
        if (!err) {
            user = users[0];
            const post = new PendingPost({
                title: userPost.title,
                content: userPost.content,
                tag: userPost.tag,
                time: userPost.time,
                author: user.name
            });
            if (userPost.sendToAdmin===true) {
                post.save(function (err1) {
                    if (!err1) {
                        console.log("sent to admin");
                    }else{
                        console.log(err1);
                        console.log("Not sent to admin");
                    }
                });
            }
        } else {
            console.log(err);
            console.log("Not sent to admin");
        }
    })
    
}
