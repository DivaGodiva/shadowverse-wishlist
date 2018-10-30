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

  before(function () {
    return mongoose.connect(configDB.testUrl)
      .then(() => mongoose.connection.db.dropDatabase());
  });

  beforeEach(function () {
    return Promise.all([
      User.insertMany(seedUsers),
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
      const agent = chai.request.agent(app);
      agent.post('/login')
        .send({username: 'admin', password: 'admin'})
        .then(function () {
          return agent.get('/cardSearch')
            .then(function (res) {
              expect(res).to.have.status(200);
            });
        });
    });
    // it('Should post to cardsearch', function () {
    //   const agent = chai.request.agent(app);
    //   const newItem = {
    //     cardId: '101211030',
    //     priority: 'low'
    //   };
    //   agent.post('/login')
    //     .send({username: 'admin', password: 'admin'})
    //     .then(function () {
    //       return agent.post('/cardSearch')
    //         .send(newItem)
    //         .then(function (res) {   
    //           expect(res).to.have.status(201);
    //           expect(res).to.be.json;
    //           expect(res.body).to.be.a('object');
    //         });
    //     });
    // });
  });

  describe('Wishlist', function () {
    it('Should get wishlist', function () {
      const agent = chai.request.agent(app);
      agent.post('/login')
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
      agent.post('/login')
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
      agent.post('/login')
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