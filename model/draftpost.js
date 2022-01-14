const Mongoose = require("mongoose");

const { PostSchema, UserSchema } = require("./dbschema");
const DraftedPost = Mongoose.model("DraftedPost", PostSchema);

exports.DraftPost = () => {
  const id = req.body.addBtn; //id of the selected blog
  /**
   * crating a drafted post from the pending post
   */
  DraftedPost.create(
    {
      title: post.title,
      content: post.content,
      tag: post.tag,
      time: post.time,
      author: post.author,
    },
    (err, data) => {
      if (!err) {
        console.log("saved to post", data);
      } else console.log("not saved!!", err);
    }
  );
};
