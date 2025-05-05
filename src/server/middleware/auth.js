const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No authentication token, access denied' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Token is invalid' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      success: false,
      message: 'Token is invalid' 
    });
  }
};

// Check if user is admin middleware
const isAdmin = async (req, res, next) => {
  try {
    // First run the auth middleware
    await auth(req, res, async () => {
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          success: false,
          message: 'Access denied. Admin privileges required.' 
        });
      }
      next();
    });
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(403).json({ 
      success: false,
      message: 'Access denied' 
    });
  }
};

module.exports = { auth, isAdmin }; 