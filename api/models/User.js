const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
    profilePic: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true } //time (update, create time)
);

module.exports = mongoose.model("User", UserSchema);
