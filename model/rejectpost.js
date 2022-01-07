const Mongoose = require("mongoose");

const { PostSchema, UserSchema } = require("./dbschema");
const PendingPost = Mongoose.model("PendingPost", PostSchema);

exports.RejectPost = () => {
    const id = req.body.openBtn; //id of the selected blog to open
  /**
   * deleteOne method deletes first element whose id equals the selected id
   */
  PendingPost.deleteOne(
    {
      _id: id,
    },
    (err) => {
      if (!err) console.log("deleted");
      else console.log(err);
    }
  );
};
