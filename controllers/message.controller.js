const messageModel = require("../models/message.model");

module.exports.newMessage = async (req, res) => {
  try {
    const { message, sender, receiver } = req.body;
    const newMessage = new messageModel({
      message,
      sender,
      receiver,
    });
    await newMessage.save();
    res.status(200).json(newMessage);
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
