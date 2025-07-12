const express = require('express');
const router = express.Router();
const swapController = require('../controllers/swapController');
const { protect } = require('../middlewares/authMiddleware');

// Create a new swap request
router.post('/', protect, swapController.createSwap);

// Get all swaps for the current user
router.get('/', protect, swapController.getSwapsForUser);

// Accept or reject a swap
router.put('/:id', protect, swapController.updateSwapStatus);

// Delete a swap (only sender can delete)
router.delete('/:id', protect, swapController.deleteSwap);

module.exports = router;
