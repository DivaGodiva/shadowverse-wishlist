'use strict';

// app/routes.js
module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('index'); 
  });

  app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login', { message: req.flash('loginMessage') }); 
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/cardSearch', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/cardSearch', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/cardSearch', isLoggedIn, function(req, res) {
    res.render('cardSearch', {
      user : req.user // get the user out of session and pass to template
    });
  });

  app.get('/wishList', isLoggedIn, function(req, res) {
    res.render('wishList', {
      user : req.user // get the user out of session and pass to template
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}