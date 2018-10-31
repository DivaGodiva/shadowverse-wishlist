'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const configDB = require('./config/database.js');

// mongoose.connect(configDB.url); 
mongoose.set('useFindAndModify', false);

require('./config/passport')(passport); 

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser()); 

app.set('view engine', 'ejs'); 

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

let server;

const runServer = function(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
};

const closeServer = function() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
};

// app.listen(port);
// console.log('STARTINNGGGGGG ' + port);

// app.listen(port, function () {
//   console.info(`Server listening on ${this.address().port}`);
// }).on('error', err => {
//   console.error(err);
// });

// if (process.env.NODE_ENV !== 'test') {
//   mongoose.connect(configDB.url)
//     .then(instance => {
//       const conn = instance.connections[0];
//       console.info(`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`);
//     })
//     .catch(err => {
//       console.error(err);
//     });

//   app.listen(port, function () {
//     console.info(`STARTTTINNGGGGGGG ${this.address().port}`);
//   }).on('error', err => {
//     console.error(err);
//   });
// }

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  console.log(configDB.url);
  runServer(configDB.url).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };



