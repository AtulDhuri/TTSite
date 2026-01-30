const express = require('express');
const rateLimit = require('express-rate-limit');
const { submitInterestForm } = require('../controllers/formController');

const router = express.Router();

// Rate limiting to prevent spam
const formLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Routes
router.post('/submit-interest', formLimiter, submitInterestForm);

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'TicketManager API'
    });
});

module.exports = router;
