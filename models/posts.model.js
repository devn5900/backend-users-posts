const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true, unique: true },
    device: {
      type: String,
      required: true,
      enum: ["Mobile", "Tablet", "Laptop"],
    },
    no_of_comments: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const postsModel = mongoose.model("posts", postSchema);

module.exports = { postsModel };
