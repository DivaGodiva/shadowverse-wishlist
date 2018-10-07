'use strict';

var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
  cardId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Number, default: Date.now } 
});

cardSchema.index({ cardId: 1, userId: 1 }, { unique: true });

cardSchema.methods.serialize = function() {
  return {
    cardId: this.cardId,
    id: this._id,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model('Card', cardSchema);