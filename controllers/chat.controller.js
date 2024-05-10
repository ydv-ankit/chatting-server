const chatModel = require("../models/chat.model");

module.exports.getUserChats = async (req, res) => {
  try {
    const { id } = req.params;
    const chats = await chatModel.find().where("participants").in([id]);
    res.status(200).json({ chats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.newChat = async (req, res) => {
  try {
    const { participants } = req.body;
    const chat = await chatModel.create({ participants });
    res.status(201).json({ chat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await chatModel.findById(chatId);
    res.status(200).json({ chat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
