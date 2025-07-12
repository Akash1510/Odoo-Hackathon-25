const SwapRequest = require('../models/SwapRequest');
const User = require('../models/User');

// @desc    Create a swap request
// @route   POST /api/swaps
const createSwap = async (req, res) => {
  try {
    const { toUser, message } = req.body;
    const fromUser = req.user.id;

    if (!toUser) {
      return res.status(400).json({ message: 'Recipient (toUser) is required.' });
    }

    if (toUser === fromUser) {
      return res.status(400).json({ message: 'You cannot send a request to yourself.' });
    }

    // Check if receiver exists
    const receiver = await User.findById(toUser);
    if (!receiver) {
      return res.status(404).json({ message: 'Recipient user not found.' });
    }

    // Prevent duplicate pending requests
    const alreadyRequested = await SwapRequest.findOne({
      fromUser,
      toUser,
      status: 'pending',
    });

    if (alreadyRequested) {
      return res.status(409).json({ message: 'You already sent a pending request to this user.' });
    }

    const newSwap = await SwapRequest.create({
      fromUser,
      toUser,
      message: message || '',
    });

    res.status(201).json({
      message: 'Swap request sent successfully.',
      swap: newSwap,
    });
  } catch (error) {
    console.error('Error creating swap request:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// @desc    Get all swaps for current user
// @route   GET /api/swaps
const getSwapsForUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const swaps = await SwapRequest.find({
      $or: [{ fromUser: userId }, { toUser: userId }],
    })
      .populate('fromUser', 'fullName avatar')
      .populate('toUser', 'fullName avatar')
      .sort({ createdAt: -1 });

    res.status(200).json(swaps);
  } catch (error) {
    console.error('Error fetching swap requests:', error.message);
    res.status(500).json({ message: 'Failed to fetch swap requests.' });
  }
};

// @desc    Update status (accept/reject/cancel) of a swap
// @route   PUT /api/swaps/:id
const updateSwapStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.user.id;

    if (!['accepted', 'rejected', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const swap = await SwapRequest.findById(req.params.id);
    if (!swap) {
      return res.status(404).json({ message: 'Swap request not found.' });
    }

    // Only sender can cancel; only receiver can accept/reject
    if (
      (status === 'cancelled' && swap.fromUser.toString() !== userId) ||
      (['accepted', 'rejected'].includes(status) && swap.toUser.toString() !== userId)
    ) {
      return res.status(403).json({ message: 'Not authorized to update this swap.' });
    }

    swap.status = status;
    await swap.save();

    res.status(200).json({ message: `Swap ${status}.`, swap });
  } catch (error) {
    console.error('Error updating swap status:', error.message);
    res.status(500).json({ message: 'Failed to update swap request.' });
  }
};

// @desc    Delete a swap (only sender can delete)
// @route   DELETE /api/swaps/:id
const deleteSwap = async (req, res) => {
  try {
    const userId = req.user.id;
    const swap = await SwapRequest.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ message: 'Swap request not found.' });
    }

    if (swap.fromUser.toString() !== userId) {
      return res.status(403).json({ message: 'Only the sender can delete the swap.' });
    }

    await swap.deleteOne();
    res.status(200).json({ message: 'Swap request deleted.' });
  } catch (error) {
    console.error('Error deleting swap request:', error.message);
    res.status(500).json({ message: 'Failed to delete swap request.' });
  }
};

module.exports = {
  createSwap,
  getSwapsForUser,
  updateSwapStatus,
  deleteSwap,
};
