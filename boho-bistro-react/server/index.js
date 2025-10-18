import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

// ======================
// MIDDLEWARES
// ======================
app.use(cors());
app.use(express.json());

// Enhanced request logger
app.use((req, res, next) => {
  console.log(${new Date().toISOString()} - ${req.method} ${req.path});
  next();
});

// ======================
// ROUTES
// ======================

// Test route
app.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is working!' 
  });
});

// Import and use menu routes
try {
  const menuItemRoutes = await import('./modules/menu-items/routes/menuItemRoutes.js');
  app.use('/api/menu-items', menuItemRoutes.default);
  console.log('✅ Menu routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading menu routes:', error.message);
}

// Import and use reservation routes
try {
  const reservationRoutes = await import('./modules/reservations/routes/reservationRoutes.js');
  app.use('/api/reservations', reservationRoutes.default);
  console.log('✅ Reservation routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading reservation routes:', error.message);
}

// Import and use contact routes
try {
  const contactRoutes = await import('./modules/contacts/routes/contactRoutes.js');
  app.use('/api/contacts', contactRoutes.default);
  console.log('✅ Contact routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading contact routes:', error.message);
}

// Root route
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Boho Bistro API is running!',
    endpoints: {
      menu: '/api/menu-items',
      reservations: '/api/reservations', 
      contacts: '/api/contacts'
    }
  });
});

// ======================
// ERROR HANDLING
// ======================

// 404 Handler - Catch all undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: Route not found: ${req.method} ${req.originalUrl}
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);

  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message: message
  });
});

// ======================
// SERVER START
// ======================
app.listen(PORT, () => {
  console.log(🚀 Boho Bistro API Server Started);
  console.log(📍 Port: ${PORT});
  console.log(🌐 URL: http://localhost:${PORT});
  console.log('');
  console.log('📋 Available Endpoints:');
  console.log('   GET  /api/menu-items');
  console.log('   GET  /api/menu-items/category/:category');
  console.log('   GET  /api/menu-items/:id');
  console.log('');
  console.log('   GET  /api/reservations');
  console.log('   POST /api/reservations');
  console.log('   GET  /api/reservations/:id');
  console.log('');
  console.log('   GET  /api/contacts');
  console.log('   POST /api/contacts');
  console.log('   GET  /api/contacts/:id');
  console.log('');
  console.log('⏰ Server ready!');
});

export default app;