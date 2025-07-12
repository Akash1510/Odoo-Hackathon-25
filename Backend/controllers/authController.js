const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
// Generate JWT token

// @desc    Register a new user
// @route   POST /api/auth/register
const signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      skillsOffered,
      skillsWanted,
      availability,
      isPublic,
    } = req.body;

    // Basic validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      skillsOffered,
      skillsWanted,
      availability,
      isPublic,
    });

    const savedUser = await newUser.save();

    // Return token
    const token = generateToken(savedUser._id);

    res.status(201).json({
      user: {
        id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        skillsOffered: savedUser.skillsOffered,
        skillsWanted: savedUser.skillsWanted,
        availability: savedUser.availability,
        isPublic: savedUser.isPublic,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const login= async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        skillsOffered: user.skillsOffered,
        skillsWanted: user.skillsWanted,
        availability: user.availability,
        isPublic: user.isPublic,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  signup,
  login,
};
