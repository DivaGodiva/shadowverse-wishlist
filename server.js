'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url); 

require('./config/passport')(passport); // pass passport for configuration

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); 

app.use(session({ secret: 'ilikethething' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(port);
console.log('STARTINNGGGGGG ' + port);
