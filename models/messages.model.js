const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: new mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    receiver:{
        type: new mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("Message", messageSchema);
module.exports = messageModel;