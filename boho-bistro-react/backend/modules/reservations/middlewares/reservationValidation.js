import { body, param, validationResult } from 'express-validator';

// Validation for creating a reservation
export const validateCreateReservation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Valid email is required'),
  
  body('phone')
    .notEmpty()
    .withMessage('Phone is required')
    .isLength({ min: 10, max: 20 })
    .withMessage('Phone must be between 10 and 20 characters'),
  
  body('date')
    .isDate()
    .withMessage('Valid date is required'),
  
  body('time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Valid time is required (HH:MM format)'),
  
  body('people')
    .isInt({ min: 1, max: 20 })
    .withMessage('Number of people must be between 1 and 20'),
  
  body('specialRequests')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Special requests cannot exceed 500 characters'),
  
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'cancelled'])
    .withMessage('Status must be one of: pending, confirmed, cancelled')
];

// Validation for ID parameter
export const validateReservationID = [
  param('id')
    .isMongoId()
    .withMessage('Invalid reservation ID format')
];

// Check for validation errors
export const handleReservationValidationErrors = (req, res, next) => {
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