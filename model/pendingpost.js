const Mongoose = require("mongoose");

const { PostSchema, UserSchema } = require("./dbschema");
const PendingPost = Mongoose.model("PendingPost", PostSchema);

exports.PendingPosts = () => {
  PendingPost.find({}, (err, posts) => {
    if (!err) {
      return posts;
    }
  });
};
