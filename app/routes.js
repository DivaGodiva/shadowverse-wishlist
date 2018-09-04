'use strict';

module.exports = function(app, passport) {

  //home
  app.get('/', function(req, res) {
    res.render('index'); 
  });

  //login
  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') }); 
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/cardSearch', 
    failureRedirect : '/login',
    failureFlash : true // allow flash messages
  }));

  //signup
  app.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/cardSearch', 
    failureRedirect : '/signup',
    failureFlash : true // allow flash messages
  }));

  //cardsearch
  app.get('/cardSearch', isLoggedIn, function(req, res) {
    res.render('cardSearch', {
      user : req.user 
    });
  });

  //wishlist
  app.get('/wishList', isLoggedIn, function(req, res) {
    res.render('wishList', {
      user : req.user 
    });
  });

  //logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

//login-check
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}