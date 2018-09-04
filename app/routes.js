'use strict';

module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('index'); 
  });

  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') }); 
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/cardSearch', 
    failureRedirect : '/login',
    failureFlash : true // allow flash messages
  }));

  app.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/cardSearch', 
    failureRedirect : '/signup',
    failureFlash : true // allow flash messages
  }));

  app.get('/cardSearch', isLoggedIn, function(req, res) {
    res.render('cardSearch', {
      user : req.user 
    });
  });

  app.get('/wishList', isLoggedIn, function(req, res) {
    res.render('wishList', {
      user : req.user 
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}