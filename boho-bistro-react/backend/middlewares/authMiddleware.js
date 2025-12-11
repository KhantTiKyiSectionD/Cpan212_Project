import jwt from 'jsonwebtoken';
import User from '../modules/users/models/User.js';

/**
 * Required Authentication Middleware
 * - MUST have valid JWT token
 * - Returns 401 if no token or invalid
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
        code: 'NO_TOKEN'
      });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token format.',
        code: 'INVALID_TOKEN_FORMAT'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.userId).select('-password -otp -otpExpires');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Token is invalid.',
        code: 'USER_NOT_FOUND'
      });
    }

    // Attach user to request
    req.user = user;
    req.userId = user._id;
    req.userRole = user.role;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please login again.',
        code: 'INVALID_TOKEN'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: error.message,
      code: 'AUTH_ERROR'
    });
  }
};

/**
 * Role-Based Authorization Middleware
 * - Must be used AFTER authenticate middleware
 * - Checks if user has required role(s)
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
        code: 'AUTH_REQUIRED'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role(s): ${allowedRoles.join(', ')}. Your role: ${req.user.role}`,
        code: 'INSUFFICIENT_PERMISSIONS',
        requiredRoles: allowedRoles,
        userRole: req.user.role
      });
    }

    next();
  };
};

/**
 * Check if user account is verified
 * - Must be used AFTER authenticate middleware
 */
export const checkVerified = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
      code: 'AUTH_REQUIRED'
    });
  }

  if (!req.user.isVerified) {
    return res.status(403).json({
      success: false,
      message: 'Account not verified. Please complete email verification.',
      code: 'ACCOUNT_NOT_VERIFIED'
    });
  }

  next();
};

/**
 * Admin-only middleware (convenience wrapper)
 */
export const adminOnly = [authenticate, authorize('admin')];

/**
 * Customer-only middleware (convenience wrapper)
 */
export const customerOnly = [authenticate, authorize('customer')];

/**
 * Authenticated users only (any role)
 */
export const authenticatedOnly = [authenticate];

/**
 * Admin or Customer middleware
 */
export const adminOrCustomer = [authenticate, authorize('admin', 'customer')];