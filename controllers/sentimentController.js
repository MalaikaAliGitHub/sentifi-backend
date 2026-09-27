const SentimentModel = require('../models/Sentiment');
const Sentiment = require('sentiment');
const sentimentAnalyzer = new Sentiment();
const { Parser } = require('json2csv');
const { generateDataset } = require('../services/dataset');

// @desc    Analyze Text & Save Result
// @route   POST /api/sentiment
exports.analyzeSentiment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ success: false, message: 'Text input is required.' });
    }

    // AFINN-165 based analysis
   // AFINN-165 based analysis
const result = sentimentAnalyzer.analyze(text);
const score = result.score; // comparative ki jagah result.score use karein

let sentiment = 'Neutral';
if (score > 0) {
  sentiment = 'Positive';
} else if (score < 0) {
  sentiment = 'Negative';
}

    const newRecord = await SentimentModel.create({
      text,
      sentiment,
      score: parseFloat(score.toFixed(2)),
    });

    res.status(201).json({ success: true, data: newRecord });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get All History & Stats
// @route   GET /api/sentiment
exports.getHistory = async (req, res) => {
  try {
    const history = await SentimentModel.find().sort({ createdAt: -1 });
    
    const total = history.length;
    const positive = history.filter(h => h.sentiment === 'Positive').length;
    const negative = history.filter(h => h.sentiment === 'Negative').length;
    const neutral = history.filter(h => h.sentiment === 'Neutral').length;

    res.status(200).json({
      success: true,
      count: total,
      stats: { total, positive, negative, neutral },
      data: history,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete History Item
// @route   DELETE /api/sentiment/:id
exports.deleteHistoryItem = async (req, res) => {
  try {
    const record = await SentimentModel.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    await record.deleteOne();
    res.status(200).json({ success: true, message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Export Analysis History CSV
// @route   GET /api/sentiment/export/history
exports.exportHistoryCSV = async (req, res) => {
  try {
    const records = await SentimentModel.find().lean();
    
    const fields = [
      { label: 'ID', value: '_id' },
      { label: 'Text', value: 'text' },
      { label: 'Sentiment', value: 'sentiment' },
      { label: 'Score', value: 'score' },
      { label: 'Created At', value: 'createdAt' }
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(records);

    res.header('Content-Type', 'text/csv');
    res.attachment('sentiment_history.csv');
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Export 600 Dataset CSV
// @route   GET /api/sentiment/export/dataset
exports.exportDatasetCSV = async (req, res) => {
  try {
    const dataset = generateDataset();
    const fields = ['id', 'text', 'sentiment'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(dataset);

    res.header('Content-Type', 'text/csv');
    res.attachment('sentiment_dataset_600.csv');
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};