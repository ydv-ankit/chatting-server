const messageModel = require("../models/message.model");
const chatModel = require("../models/chat.model");

module.exports.newMessage = async (req, res) => {
  try {
    const { message, sender, receiver } = req.body;
    const newMessage = new messageModel({
      message,
      sender,
      receiver,
    });
    await newMessage.save();
    // update messages in chatModel
    const chat = await chatModel.findOne({
      participants: { $all: [sender, receiver] },
    });
    if (chat) {
      chat.messages.push(newMessage._id);
      await chat.save();
    }
    res.status(200).json({ message: newMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await messageModel.findById(id);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    const messages = await messageModel.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
