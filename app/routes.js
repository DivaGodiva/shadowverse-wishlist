'use strict';

module.exports = function(app, passport) {

  const Card = require('./models/cards');

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

  app.post('/cardSearch', function(req, res) {
    const {cardId, priority} = req.body;
    const userId = req.user.id;
    const newCard = {userId, cardId, priority};
    Card.create(newCard)
      .then(result => {
        res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  //wishlist
  app.get('/wishList', isLoggedIn, function(req, res) {
    const userId = req.user.id;
    Card.find({userId})
      .then(result => {
        result = result.map(item => item.serialize());
        let datap = JSON.stringify(result);
        res.render('wishList', {user:req.user, data: datap});
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  app.delete('/wishList', isLoggedIn, function(req, res) {
    const {dbId} = req.body;
    Card.findOneAndDelete({ _id: dbId})
      .then(() => {
        res.sendStatus(204);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  app.put('/wishList', isLoggedIn, function(req, res) {
    const {dbId, pri} = req.body;
    Card.findOneAndUpdate({_id: dbId}, {priority: pri}, {new: true})
      .then(result => {
        res.json(result);
      })
      .catch(function(error) {
        console.log(error);
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