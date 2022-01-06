const Mongoose = require("mongoose");

exports.PostSchema = function() {
    return new Mongoose.Schema({
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
}

exports.UserSchema = function() {
    return new Mongoose.Schema({
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
}