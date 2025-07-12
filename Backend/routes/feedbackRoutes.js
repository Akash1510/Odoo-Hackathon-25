const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbackForUser } = require('../controllers/feedbackController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createFeedback);
router.get('/:userId', getFeedbackForUser);

module.exports = router;
