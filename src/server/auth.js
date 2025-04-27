const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register (only users)
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password, role: 'user' });
    res.status(201).json({ success: true, message: 'User registered' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Login (user or admin)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ success: false, error: 'Invalid credentials' });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    token,
    role: user.role
  });
});

module.exports = router; 