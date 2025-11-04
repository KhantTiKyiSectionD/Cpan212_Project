import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { connectDb } from './middlewares/connect-db.js';



const app = express();
const PORT = process.env.PORT || 3002;


// ======================
// MIDDLEWARES
// ======================
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
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

// 404 Handler - NO WILDCARD
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
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
connectDb().then(() => {
app.listen(PORT, () => {
  console.log('Server started on http://localhost:3002');
  console.log('✅ MongoDB connected');

  console.log('All routes loaded successfully!');
});
});

export default app;