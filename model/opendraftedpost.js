const Mongoose = require("mongoose");

const { PostSchema, UserSchema } = require("./dbschema");
const DraftedPost = Mongoose.model("DraftedPost", PostSchema);

exports.OpenDraftedPost = () => {
  const id = req.body.editBtn; //id of the selected blog
  /**
   * find method returns an array of elements whose id equals the selected id
   */
  DraftedPost.find(
    {
      _id: id,
    },
    (err, posts) => {
      if (!err) {
        const post = posts[0];
        DraftedPost.deleteOne(
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
         * Sending the post to Create Post method
         */
        CreatePost(post);
      } else console.log(err);
    }
  );
};
