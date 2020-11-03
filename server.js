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

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => console.log("Connected with database"))
.catch((err) => console.log(err))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname,'../dist/index.html'));
})

io.on('connection', (socket) => {
    console.log("New User Connected");
})

app.use(chatRoutes);

server.listen(process.env.PORT || 8000, () => console.log('Listening on port 8000...'));
