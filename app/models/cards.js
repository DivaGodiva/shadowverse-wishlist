'use strict';

var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
  cardId: {type: String, required: true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

cardSchema.set('timestamps', true);

module.exports = mongoose.model('Card', cardSchema);