import { body, param, validationResult } from 'express-validator';

// Validation rules for creating a menu item
export const validateCreateMenuItem = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  
  body('price')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a positive number'),
  
  body('category')
    .isIn(['starters', 'appetizers', 'foods', 'drinks'])
    .withMessage('Category must be one of: starters, appetizers, foods, drinks'),
  
  body('isVegetarian')
    .optional()
    .isBoolean()
    .withMessage('isVegetarian must be a boolean'),
  
  body('isVegan')
    .optional()
    .isBoolean()
    .withMessage('isVegan must be a boolean'),
  
  body('isGlutenFree')
    .optional()
    .isBoolean()
    .withMessage('isGlutenFree must be a boolean')
];

// Validation rules for updating a menu item
export const validateUpdateMenuItem = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),
  
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('description')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  
  body('price')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a positive number'),
  
  body('category')
    .optional()
    .isIn(['starters', 'appetizers', 'foods', 'drinks'])
    .withMessage('Category must be one of: starters, appetizers, foods, drinks')
];

// Validation rules for ID parameter
export const validateID = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer')
];

// Check for validation errors
export const handleValidationErrors = (req, res, next) => {
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