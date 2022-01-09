const Mongoose = require("mongoose");
//connect to mongoose port
Mongoose.connect("mongodb://localhost:27017/blogDB",{
    useNewUrlParser:true
});
//post-schema
const PostSchema = new Mongoose.Schema({
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
//user-schema
const UserSchema = new Mongoose.Schema({
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
//functions
exports.GetPostModel= function(){
    const Post = Mongoose.model("Post", PostSchema);
    return Post;
}
exports.GetPendingPostModel=function(){
    const PendingPost = Mongoose.model("PendingPost", PostSchema);
    return PendingPost;
}
exports.GetUserModel=function(){
    const User = Mongoose.model("User", UserSchema);
    return User; 
}
