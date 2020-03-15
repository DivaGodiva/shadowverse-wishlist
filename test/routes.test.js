'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const User = require('../app/models/user');
const Card = require('../app/models/cards');

const seedCards = require('../db/seed/cards');
const seedUsers = require('../db/seed/users');
// const configDB = require('../config/database.js');
const { app, runServer, closeServer } = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('SV Wishlist', function () {

  const username = 'exampleUser';
  const password = 'examplePass';

  before(function () {
    return runServer(process.env.DB_URL);
  });

  beforeEach(function () {
    return User.insertMany(seedUsers)
      .then(() => {
        return Card.insertMany(seedCards);
      });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function () {
    return closeServer();
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
      const agent = chai.request.agent(app);
      return agent.post('/login')
        .send({username: 'admin', password: 'admin'})
        .then(function () {
          return agent.get('/cardSearch')
            .then(function (res) {
              expect(res).to.have.status(200);
            });
        });
    });
  });

  describe('Wishlist', function () {
    it('Should get wishlist', function () {
      const agent = chai.request.agent(app);
      return agent.post('/login')
        .send({username: 'admin', password: 'admin'})
        .then(function () {
          return agent.get('/wishList')
            .then(function (res) {
              expect(res).to.have.status(200);
            });
        });
    });
    it('Should edit wishlist', function () {
      const agent = chai.request.agent(app);
      const updateItem = {
        dbId: '000000000000000000000000',
        pri: 'high'
      };
      return agent.post('/login')
        .send({username: 'admin', password: 'admin'})
        .then(function () {
          return agent.put('/wishList')
            .send(updateItem)
            .then(function (res) {   
              expect(res).to.have.status(200);
              expect(res).to.be.json;
            });
        });
    });
    it('Should delete item in wishlist', function () {
      const agent = chai.request.agent(app);
      return agent.post('/login')
        .send({username: 'admin', password: 'admin'})
        .then(function () {
          return agent.delete('/wishList')
            .send({dbId: '000000000000000000000001'})
            .then(function (res) {
              expect(res).to.have.status(204);
            });
        });
    });
  });

});