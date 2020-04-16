const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const errors = require('./middleware/error');
const morgan = require('morgan');
const fs = require('fs');
const config = require('./config');

console.log(config.env);

// setup the logger
if (config.env === "dev") app.use(morgan('tiny'));
else app.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname+"/logs/", 'access.log'), { flags: 'a' }) }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errors);

app.use(helmet());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

require('./db/connect');

require('./route')(app);

module.exports = app;
