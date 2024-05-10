const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    participants: {
      type: Array,
      required: true,
    },
    messages: {
      type: new mongoose.Schema.Types.ObjectId(),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("Chat", chatSchema);
module.exports = chatModel;