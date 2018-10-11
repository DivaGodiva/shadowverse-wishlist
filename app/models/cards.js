'use strict';

const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  cardId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Number, default: Date.now },
  priority: {type: String, required: true}
});

cardSchema.index({ cardId: 1, userId: 1 }, { unique: true });

cardSchema.methods.serialize = function() {
  return {
    cardId: this.cardId,
    id: this._id,
    createdAt: this.createdAt,
    priority: this.priority
  };
};

module.exports = mongoose.model('Card', cardSchema);