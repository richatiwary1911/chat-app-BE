const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.json());

app.listen(3000, () => console.log('Listening on port 3000...'));