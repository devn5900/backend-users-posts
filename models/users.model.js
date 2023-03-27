const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Others"],
    },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
    is_married: { type: Boolean, required: true },
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
