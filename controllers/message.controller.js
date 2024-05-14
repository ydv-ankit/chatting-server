const messageModel = require("../models/message.model");
const chatModel = require("../models/chat.model");
const { newChat } = require("./chat.controller");
const { getOnlineUserSocketId, io} = require("../socket/socket");

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
    }else{
      req.body.participants = [sender, receiver];
      await newChat(req, res);
    }
    // send message to receiver
    const receiverSocketId = getOnlineUserSocketId(receiver);
    console.log("receiverSocketId:", receiverSocketId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new message", newMessage);
      console.log("message sent to receiver");
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
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await chatModel.findById(chatId);
    let messages = [];
    for (let i = 0; i < chat.messages.length; i++) {
      const message = await messageModel.findById(chat.messages[i]);
      messages.push(message);
    }

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error });
  }
};
