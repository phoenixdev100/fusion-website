const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, isAdmin } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// Get all users (admin only)
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// Create new user
router.post('/users', isAdmin, async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists' 
      });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
      role: role || 'user'
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json({
      success: true,
      user: userResponse
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating user' 
    });
  }
});

// Update user
router.put('/users/:id', isAdmin, async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({
      success: true,
      user: userResponse
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error updating user' 
    });
  }
});

// Delete user
router.delete('/users/:id', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    await User.deleteOne({ _id: req.params.id });
    res.json({ 
      success: true,
      message: 'User deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error deleting user' 
    });
  }
});

// Server controls
router.post('/server/:action', isAdmin, async (req, res) => {
  const { action } = req.params;
  
  try {
    switch (action) {
      case 'start':
        // Add your server start logic here
        res.json({ 
          success: true,
          message: 'Server started successfully' 
        });
        break;
      case 'stop':
        // Add your server stop logic here
        res.json({ 
          success: true,
          message: 'Server stopped successfully' 
        });
        break;
      case 'restart':
        // Add your server restart logic here
        res.json({ 
          success: true,
          message: 'Server restarted successfully' 
        });
        break;
      case 'backup':
        // Add your backup logic here
        res.json({ 
          success: true,
          message: 'Backup initiated successfully' 
        });
        break;
      default:
        res.status(400).json({ 
          success: false,
          message: 'Invalid action' 
        });
    }
  } catch (error) {
    console.error('Error performing server action:', error);
    res.status(500).json({ 
      success: false,
      message: `Error performing server ${action}` 
    });
  }
});

module.exports = router; 