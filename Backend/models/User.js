const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: String,
  avatar: String, // profile photo URL
  skillsOffered: [String],
  skillsWanted: [String],
  availability: String, // e.g., "Weekends", "Evenings"
  isPublic: {
    type: Boolean,
    default: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports=mongoose.model('User', userSchema);
