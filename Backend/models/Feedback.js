
const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  comment: String,
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
