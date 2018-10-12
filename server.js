'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const configDB = require('./config/database.js');

mongoose.connect(configDB.url); 
mongoose.set('useFindAndModify', false);

require('./config/passport')(passport); 

app.set('view engine', 'ejs'); 

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser()); 

app.use(session({ secret: 'ilikethething' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./app/routes.js')(app, passport); 

app.get('/api/cards/:clanId', function(req, res) {
  const request = require('request');
  const URL = `https://shadowverse-portal.com/api/v1/cards?lang=en&format=json&clan=${req.params.clanId}`;
  request({ url: URL }, function(error, response, body) {
    if (error) {
      //handle error
    }
    res.json(body);
  });
});

app.get('/api/card/:cardId', function(req, res) {
  const request = require('request');
  let url = `https://shadowverse-portal.com/api/v1/card?lang=en&format=json&card_id=${req.params.cardId}`;
  request({ url: url}, function(error, response, body) {
    if (error) {
      //handle error
    } 
    res.json(body);
  });
});

app.use((req, res, next) => {
  const err = new Error('No Route');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
    if (process.env.NODE_ENV !== 'test') {
      console.error(err);
    }
  }
});

app.listen(port);
console.log('STARTINNGGGGGG ' + port);

module.exports = app;
