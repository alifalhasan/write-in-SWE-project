const Mongoose = require("mongoose");

const { PostSchema, UserSchema } = require("./dbschema");
const PendingPost = Mongoose.model("PendingPost", PostSchema);

exports.PublishPost = () => {
  const id = req.body.publishBtn; //id of the selected blog
  /**
   * find method returns an array of elements whose id equals the selected id
   */
  PendingPost.find(
    {
      _id: id,
    },
    (err, posts) => {
      if (!err) {
        const post = posts[0];
        PendingPost.deleteOne(
          {
            _id: post._id,
          },
          /**
           * call back function if there is any error
           */
          (err) => {
            if (err) {
              console.log("not deleted!!", err);
            } else console.log("successful deletion");
          }
        );

        /**
         * crating a published post from the pending post
         */
        Post.create(
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
      } else console.log(err);
    }
  );
};
