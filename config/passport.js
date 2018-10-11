'use strict';

const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //signup

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true 
  },

  function(req, username, password, done) {
    process.nextTick(function() {
      User.findOne({ 'local.username' :  username }, function(err, user) {
        if (err)
          return done(err);
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is taken.'));
        } else {
          let newUser = new User();
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });    
    });
  }));

  //login

  passport.use('local-login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true 
  },

  function(req, username, password, done) {
    User.findOne({ 'local.username' :  username }, function(err, user) {
      if (err)
        return done(err);
      if (!user)
        return done(null, false, req.flash('loginMessage', 'Incorrect user or password.')); 
      if (!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Incorrect user or password.')); 
      return done(null, user);
    });
  }));
};
