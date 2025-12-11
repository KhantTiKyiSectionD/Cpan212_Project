import jwt from 'jsonwebtoken';
import User from '../modules/users/models/User.js';

/**
 * Optional Authentication Middleware
 * - Attaches user if token exists
 * - Doesn't require authentication (allows public access)
 * - Useful for tracking logged-in users without forcing login
 */
export const optionalAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token provided - continue as public user
      req.user = null;
      return next();
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      req.user = null;
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user without password
    req.user = await User.findById(decoded.userId).select('-password -otp -otpExpires');
    
    // If user not found (deleted account), continue without user
    if (!req.user) {
      req.user = null;
    }
    
    next();
  } catch (error) {
    // Invalid or expired token - continue as public user
    req.user = null;
    next();
  }
};

/**
 * Public route wrapper - explicitly marks route as public
 * No authentication required
 */
export const publicRoute = (req, res, next) => {
  req.isPublic = true;
  next();
};

/**
 * Check if user is logged in (for conditional logic)
 * Sets req.isLoggedIn boolean
 */
export const checkLoginStatus = (req, res, next) => {
  req.isLoggedIn = !!req.user;
  next();
};