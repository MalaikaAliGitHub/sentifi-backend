const mongoose = require('mongoose');

const sentimentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add text for analysis'],
    trim: true,
  },
  sentiment: {
    type: String,
    enum: ['Positive', 'Negative', 'Neutral'],
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Sentiment', sentimentSchema);