const express = require('express');
const router = express.Router();
const chat = require('./controllers/chat');

router.get('/chat', chat.getChat);
router.post('/chat', chat.postChat);

module.exports = router;