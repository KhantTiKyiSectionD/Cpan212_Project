import { body, param, validationResult } from 'express-validator';

// Validation for creating a contact
export const validateCreateContact = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Valid email is required'),
  
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  
  body('subject')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Subject cannot exceed 200 characters'),
  
  body('agreeToTerms')
    .optional()
    .isBoolean()
    .withMessage('agreeToTerms must be a boolean'),
  
  body('status')
    .optional()
    .isIn(['unread', 'read', 'replied'])
    .withMessage('Status must be one of: unread, read, replied')
];

// Validation for ID parameter
export const validateContactID = [
  param('id')
    .isMongoId()
    .withMessage('Invalid contact ID format')
];

// Check for validation errors
export const handleContactValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }
  next();
};