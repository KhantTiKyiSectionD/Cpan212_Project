import AppError from '../utils/AppError.js';

const errorHandler = (err, req, res, next) => {
  // Create a safe error object
  let error = { ...err };
  error.message = err.message || 'Something went wrong';
  error.statusCode = err.statusCode || 500;

  // Log detailed errors in development only
  if (process.env.NODE_ENV !== 'production') {
    console.error('🔥 Error Stack:', err.stack);
    console.error('🧩 Error Details:', err);
  }

  // -------------------------
  // Specific error handlers
  // -------------------------

  // Mongoose invalid ObjectId
  if (err.name === 'CastError') {
    error = new AppError('Resource not found', 404);
  }

  // Duplicate key
  if (err.code === 11000) {
    error = new AppError('Duplicate field value entered', 400);
  }

  // Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
    error = new AppError(message, 400);
  }

  // Invalid JSON
  if (err.type === 'entity.parse.failed') {
    error = new AppError('Invalid JSON in request body', 400);
  }

  // -------------------------
  // Response
  // -------------------------
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      error: {
        name: err.name,
        code: err.code,
        details: err.errors || null
      }
    })
  });
};

export default errorHandler;
