const User = require('../models/User');

// GET: /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isPublic: true }).select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('[getAllUsers] Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET: /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isOwner = req.user && user._id.toString() === req.user._id.toString();
    if (!user.isPublic && !isOwner) {
      return res.status(403).json({ message: 'This profile is private.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('[getUserById] Error:', error.message);
    res.status(400).json({ message: 'Invalid user ID' });
  }
};

// PUT: /api/users/:id
const updateUser = async (req, res) => {
  try {
    const { fullName, skillsOffered, skillsWanted, availability, isPublic, location } = req.body;

    if (!req.user || req.user._id.toString() !== req.params.id.toString()) {
      return res.status(401).json({ message: 'Unauthorized to update this user.' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Apply updates
    if (fullName) user.fullName = fullName;
    if (location) user.location = location;
    if (Array.isArray(skillsOffered)) user.skillsOffered = skillsOffered;
    if (Array.isArray(skillsWanted)) user.skillsWanted = skillsWanted;
    if (availability) user.availability = availability;
    if (typeof isPublic === 'boolean') user.isPublic = isPublic;

    const updatedUser = await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        location: updatedUser.location,
        skillsOffered: updatedUser.skillsOffered,
        skillsWanted: updatedUser.skillsWanted,
        availability: updatedUser.availability,
        isPublic: updatedUser.isPublic,
      },
    });
  } catch (error) {
    console.error('[updateUser] Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE: /api/users/:id
const deleteUser = async (req, res) => {
  try {
    if (!req.user || req.user._id.toString() !== req.params.id.toString()) {
      return res.status(401).json({ message: 'Unauthorized to delete this user.' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found or already deleted.' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('[deleteUser] Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
