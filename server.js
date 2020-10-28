const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const message = require('./models/message');
const chatRoutes = require('./routes');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => console.log("Connected with database"))
.catch((err) => console.log(err))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(chatRoutes);

app.listen(process.env.PORT || 8000, () => console.log('Listening on port 8000...'));
