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
