const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    participants: {
      type: Array,
      required: true,
    },
    messages: {
      ref: "message",
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("Chat", chatSchema);
module.exports = chatModel;
