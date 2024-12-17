const express = require('express');
const { createLog, getLogs, getSummary, getUserAnalytics } = require('../controllers/logController');
const rateLimiter = require('../middleware/rateLimiter');
const router = express.Router();

// Define Routes
router.post('/logs',rateLimiter, createLog); // Create a new log

router.get('/logs', getLogs); // Retrieve logs (with filtering/pagination)
router.get('/analytics/summary', getSummary); // Usage summary analytics
router.get('/analytics/user/:userId', getUserAnalytics); // User-specific analytics

module.exports = router;
