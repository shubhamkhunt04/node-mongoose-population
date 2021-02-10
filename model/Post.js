var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
