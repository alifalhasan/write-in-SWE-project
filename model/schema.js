const Mongoose = require("mongoose");


//connect to mongoose port
Mongoose.connect("mongodb://localhost:27017/blogDB",{
    useNewUrlParser:true
});


//Definition of PostSchema
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

//Definiion of reveiwedPost schema
const ReviewedPostSchema = new Mongoose.Schema({
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
},
review: {
    type: String,
    required : true
    
}
});



//Definition of user-schema
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



//This function returns Post Model
exports.GetPostModel= function(){
    const Post = Mongoose.model("Post", PostSchema);
    return Post;
}


//This function return Pending Post Model
exports.GetPendingPostModel=function(){
    const PendingPost = Mongoose.model("PendingPost", PostSchema);
    return PendingPost;
}


//This function returns User model
exports.GetUserModel=function(){
    const User = Mongoose.model("User", UserSchema);
    return User; 
}

//this function returns Reviewd Post model
exports.GetReviewedPostModel=function(){
    const Post = Mongoose.model("ReviewedPost", ReviewedPostSchema);
    return Post;
}
