const Mongoose = require("mongoose");

const { PostSchema, UserSchema } = require("./dbschema");
const PendingPost = Mongoose.model("PendingPost", PostSchema);

exports.PendingPosts = () => {
  let panel = "PendingBlogs";
  PendingPost.find({}, (err, posts) => {
    if (!err) {
      res.render("admin", {
        selectedPanel: panel,
        data: posts,
      });
    }
  });
};
