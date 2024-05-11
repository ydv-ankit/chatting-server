const { newMessage, getMessages, getMessage } = require('../controllers/message.controller');

const router = require('express').Router();

router.post('/new', newMessage);

router.get('/get/:id', getMessage);

router.get('/:sender/:receiver', getMessages);

module.exports = router;