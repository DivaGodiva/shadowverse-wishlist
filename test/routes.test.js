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
  // const userId = '000001111122222333334444';/
  const cardId = '101211030';
  const priority = 'low';

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

  describe('Login', function () {
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

  describe('Signup', function () {
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
    it('Should post to wishlist', function () {
      return chai.request(app)
        .post('/cardSearch')
        .send({cardId, priority})
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
        });
    });
  });
});