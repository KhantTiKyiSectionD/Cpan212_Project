import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

// Basic middlewares
app.use(cors());
app.use(express.json());

// Simple request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Test route
app.get('/test', (req, res) => {
  console.log('✅ TEST ROUTE CALLED!');
  res.json({ 
    success: true, 
    message: 'Server is working!' 
  });
});

// Import menu routes
try {
  const menuItemRoutes = await import('./modules/menu-items/routes/menuItemRoutes.js');
  app.use('/api/menu-items', menuItemRoutes.default);
  console.log('✅ Menu routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading menu routes:', error.message);
}
try {
  const reservationRoutes = await import('./modules/reservations/routes/reservationRoutes.js');
  app.use('/api/reservations', reservationRoutes.default);
  console.log('✅ Reservation routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading reservation routes:', error.message);
}
// Root route
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Boho Bistro API is running!' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
  console.log('📍 Test endpoints:');
  console.log('   - http://localhost:3002/test');
  console.log('   - http://localhost:3002/api/menu-items');
  console.log('   - http://localhost:3002/api/menu-items/category/starters');
});