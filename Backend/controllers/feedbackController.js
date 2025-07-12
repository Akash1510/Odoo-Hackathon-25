const Feedback = require('../models/Feedback');
const User = require('../models/User');

// @desc    Create new feedback
// @route   POST /api/feedbacks
// @access  Private
const createFeedback = async (req, res) => {
  try {
    const { toUser, rating, comment } = req.body;

    // Validate input
    if (!toUser || !rating) {
      return res.status(400).json({ message: 'Receiver and rating are required.' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    // Prevent user from giving feedback to themselves
    if (toUser === req.user.id) {
      return res.status(400).json({ message: 'You cannot leave feedback for yourself.' });
    }

    // Check if the receiver exists
    const receiver = await User.findById(toUser);
    if (!receiver) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Create feedback
    const feedback = await Feedback.create({
      fromUser: req.user.id,
      toUser,
      rating,
      comment,
    });

    res.status(201).json({
      message: 'Feedback submitted successfully.',
      feedback,
    });
  } catch (error) {
    console.error('Error creating feedback:', error.message);
    res.status(500).json({ message: 'Server error while creating feedback.' });
  }
};

// @desc    Get feedback for a specific user
// @route   GET /api/feedbacks/:userId
// @access  Public
const getFeedbackForUser = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ toUser: req.params.userId })
      .populate('fromUser', 'fullName avatar')
      .sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error.message);
    res.status(500).json({ message: 'Error retrieving feedback.' });
  }
};

module.exports = {
  createFeedback,
  getFeedbackForUser,
};
