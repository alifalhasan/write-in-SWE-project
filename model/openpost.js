const Mongoose = require("mongoose");

const { PostSchema, UserSchema } = require("./dbschema");
const PendingPost = Mongoose.model("PendingPost", PostSchema);

exports.OpenPost = () => {
  const id = req.body.rejectBtn; //id of the rejected blog
  PendingPost.find(
    {
      _id: id,
    },
    (err, posts) => {
      if (!err) {
        const post = posts[0];
        res.render("open_pending_blog", {
          post: post,
        });
      }
    }
  );
};
