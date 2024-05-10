const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  gender: {
    type: String,
    required: true,
    enum: ["M", "F", "O"],
  },
  avatar: {
    type: String,
    default: `https://avatar.iran.liara.run/public/`,
  },
  role: {
    type: Array,
    required: true,
    default: ["user"],
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
