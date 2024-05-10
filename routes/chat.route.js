const { getChat, newChat, getUserChats } = require('../controllers/chat.controller');

const router = require('express').Router();

// get user chats
router.get('/all/:id', getUserChats);

// create new chat
router.post('/new', newChat);

// get chat by id
router.get('/chat/:id', getChat);

module.exports = router;