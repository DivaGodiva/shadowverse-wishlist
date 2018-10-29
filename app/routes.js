'use strict';

module.exports = function(app, passport) {

  const Card = require('./models/cards');
  const request = require('request');

  //home
  app.get('/', function(req, res) {
    res.render('index')
      .catch(function(error) {
        console.log(error);
      });
  });

  //login
  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') })
      .catch(function(error) {
        console.log(error);
      });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/cardSearch', 
    failureRedirect : '/login',
    failureFlash : true // allow flash messages
  })
    .catch(function(error) {
      console.log(error);
    })
  );

  //signup
  app.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') })
      .catch(function(error) {
        console.log(error);
      });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/cardSearch', 
    failureRedirect : '/signup',
    failureFlash : true // allow flash messages
  })
    .catch(function(error) {
      console.log(error);
    })
  );

  //cardsearch
  app.get('/cardSearch', isLoggedIn, function(req, res) {
    res.render('cardSearch', {
      user : req.user 
    })
      .catch(function(error) {
        console.log(error);
      });
  });

  app.post('/cardSearch', function(req, res) {
    const {cardId, priority} = req.body;
    const userId = req.user.id;
    const newCard = {userId, cardId, priority};
    Card.create(newCard)
      .then(result => {
        console.log(result);
        res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  app.get('/api/cards/:clanId', function(req, res) {
    const URL = `https://shadowverse-portal.com/api/v1/cards?lang=en&format=json&clan=${req.params.clanId}`;
    request({ url: URL }, function(error, response, body) {
      if (error) {
        console.log(error);
      }
      res.json(body);
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

  app.delete('/wishList', function(req, res) {
    const {dbId} = req.body;
    Card.findOneAndDelete({ _id: dbId})
      .then(() => {
        res.sendStatus(204);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  app.put('/wishList', function(req, res) {
    const {dbId, pri} = req.body;
    Card.findOneAndUpdate({_id: dbId}, {priority: pri}, {new: true})
      .then(result => {
        res.json(result);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  app.get('/api/card/:cardId', function(req, res) {
    let url = `https://shadowverse-portal.com/api/v1/card?lang=en&format=json&card_id=${req.params.cardId}`;
    request({ url: url}, function(error, response, body) {
      if (error) {
        console.log(error);
      } 
      res.json(body);
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
  console.log(req.isAuthenticated());
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}