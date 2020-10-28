const Message = require('../models/message');
const mongoose = require('mongoose');

const getChat = (req, res, next) => {
    Message.find().then((msg) => {
        if(msg) {
            res.send(msg);
        }
        else {
            res.send([]);
        }
    })
}

const postChat = (req, res, next) => {
    const newMessage = new Message({
        _id: mongoose.Types.ObjectId(),
        message: req.body.message,
        user: 'user'
    })

    newMessage.save().then((msg) => {
        if(msg) {
            res.send(msg);
        }
        else {
            res.send([]);
        }
    })
}

module.exports = { getChat, postChat };