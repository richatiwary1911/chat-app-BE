const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const message = require('./models/message');
const chatRoutes = require('./routes');
const Message = require('./models/message');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => console.log("Connected with database"))
.catch((err) => console.log(err))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, '../dist')));

// app.get('*', (req, res, next) => {
//     res.sendFile(path.join(__dirname,'../dist/index.html'));
// })

io.on('connection', (socket) => {
    let user = '';

    socket.on('new message', (data) => {
        const newMessage = new Message({
            _id: mongoose.Types.ObjectId(),
            message: data,
            user: user
        })
    
        newMessage.save().then((msg) => {
            if(msg) {
                io.emit('message received', msg)
            }
            else {
            }
        })
    })

    socket.on('new user', (data) => {
        user = data;
        console.log("New User Connected");
        socket.broadcast.emit('user connected', data);
        Message.find().then((msg) => {
            if(msg) {
                socket.emit('all messages', msg)
            }
            else {
               
            }
        })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user disconnected', user)
    })
})

app.use(chatRoutes);

server.listen(process.env.PORT || 8000, () => console.log('Listening on port 8000...'));
