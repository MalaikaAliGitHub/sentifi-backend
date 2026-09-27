const express = require('express');
const router = express.Router();
const {
  analyzeSentiment,
  getHistory,
  deleteHistoryItem,
  exportHistoryCSV,
  exportDatasetCSV,
} = require('../controllers/sentimentController');

router.post('/', analyzeSentiment);
router.get('/', getHistory);
router.delete('/:id', deleteHistoryItem);
router.get('/export/history', exportHistoryCSV);
router.get('/export/dataset', exportDatasetCSV);

module.exports = router;