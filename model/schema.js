const mongoose = require("mongoose");
//connect to mongoose port
mongoose.connect("mongodb://localhost:27017/blogDB",{
    useNewUrlParser:true
});
//post-schema
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
//user-schema
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
//functions
exports.getPostModel= function(){
    const Post = mongoose.model("Post", postSchema);
    return Post;
}
exports.getPendingPostModel=function(){
    const PendingPost = mongoose.model("PendingPost", postSchema);
    return PendingPost;
}
exports.getUserModel=function(){
    const User = mongoose.model("User", userSchema);
    return User; 
}