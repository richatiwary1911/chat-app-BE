const express = require('express');
const router = express.Router();
const chat = require('./controllers/chat');

router.get('/api/chat', chat.getChat);
router.post('/api/chat', chat.postChat);

module.exports = router;