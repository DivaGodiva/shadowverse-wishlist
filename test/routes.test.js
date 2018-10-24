'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const configDB = require('../config/database.js');

const User = require('../app/models/user');
const Card = require('../app/models/cards');

const seedCards = require('../db/seed/cards');
const seedUsers = require('../db/seed/users');

const expect = chai.expect;
chai.use(chaiHttp);

describe('SV Wishlist', function () {
  const username = 'exampleUser';
  const password = 'examplePass';
  let user = {};

  before(function () {
    return mongoose.connect(configDB.testUrl)
      .then(() => mongoose.connection.db.dropDatabase());
  });

  beforeEach(function () {
    return Promise.all([
      User.insertMany(seedUsers),
      User.createIndexes(),
      Card.insertMany(seedCards),
    ]);
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function () {
    return mongoose.disconnect();
  });

  describe('Signup', function () {
    it('Should create a new user with valid info', function () {
      return chai.request(app)
        .post('/signup')
        .send({username, password})
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
        });
    });
  });

  describe('Login', function () {
    it('Should login with correct credentials', function () {
      return chai.request(app)
        .post('/login')
        .send({username, password})
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
        });
    });
  });

  describe('Cardsearch', function () {
    it('Should get cardsearch', function () {
      return chai.request(app)
        .get('/cardSearch')
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
        });
    });
    it('Should post to cardsearch', function () {
      const newItem = {
        cardId: '101211030',
        priority: 'low'
      };
      return chai.request(app)
        .post('/cardSearch')
        .send(newItem)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
        });
    });
  });

  describe('Wishlist', function () {
    it('Should get wishlist', function () {
      return chai.request(app)
        .get('/wishLIst')
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
        });
    });
    it('Should remove item from wishlist', function () {
      const newItem = {
        cardId: '101211030',
        priority: 'low'
      };
      return chai.request(app)
        .post('/wishList')
        .send(newItem)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
        });
    });
    it('Should remove item from wishlist 2', function () {
      let data;
      return Card.findOne({ userId: user.id })
        .then(_data => {
          data = _data;
          return chai.request(app)
            .delete(`/api/notes/${data.id}`);
        })
        .then(res => {
          expect(res).to.have.status(204);
        });
    });
    // it('Should switch item from wishlist', function () {
    //   const newItem = {
    //     cardId: '101211030',
    //     priority: 'low'
    //   };
    //   return chai.request(app)
    //     .post('/wishList')
    //     .send(newItem)
    //     .then(res => {
    //       expect(res).to.have.status(200);
    //       expect(res).to.be.json;
    //     });
    // });
  });

});