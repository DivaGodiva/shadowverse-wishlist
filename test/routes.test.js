'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const configDB = require('./config/database.js');

const User = require('../app/models/user');

const expect = chai.expect;
chai.use(chaiHttp);