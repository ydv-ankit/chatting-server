const { newMessage, getMessages } = require('../controllers/message.controller');

const router = require('express').Router();

router.post('/new', newMessage);

router.get('/:sender/:receiver', getMessages);

module.exports = router;