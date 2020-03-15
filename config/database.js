'use strict';

const getURL = function() {
  const {DB_URL, DB_USER, DB_PASS} = process.env;
  if (DB_URL && DB_USER && DB_PASS) {
    return `${DB_URL}`;
  } 
  else {
    return 'cluster0-shard-00-01-p9fnw.mongodb.net:27017';
  }
};

module.exports = {
  'url': getURL(),
  'testUrl': 'mongodb://127.0.0.1:27017/shadowverseUsers-test'
};

// const getURL = function() {
//   const {DB_URL, DB_USER, DB_PASS} = process.env;
//   if (DB_URL && DB_USER && DB_PASS) {
//     return `mongodb://${DB_USER}:${DB_PASS}@${DB_URL}`;
//   } 
//   else {
//     return 'mongodb://127.0.0.1:27017/shadowverseUsers';
//   }
// };

// module.exports = {
//   'url': getURL(),
//   'testUrl': 'mongodb://127.0.0.1:27017/shadowverseUsers-test'
// };