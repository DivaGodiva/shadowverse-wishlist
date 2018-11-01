'use strict';

module.exports = {
  'url': getURL(),
  'testUrl': 'mongodb://127.0.0.1:27017/shadowverseUsers-test'
};

const getURL = function() {
  const {DB_URL, DB_USER, DB_PASS} = process.env;
  if (DB_URL && DB_USER && DB_PASS) {
    return `mongodb://${DB_USER}:${DB_PASS}@${DB_URL}`;
  } 
  else {
    return 'mongodb://127.0.0.1:27017/shadowverseUsers';
  }
};