import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
import { connectDb } from './middlewares/connect-db.js';
import { testEmailConnection } from './utils/emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  const { default: menuItemRoutes } = await import('./modules/menu-items/routes/menuItemRoutes.js');
  app.use('/api/menu-items', menuItemRoutes);
  console.log('✅ Menu routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading menu routes:', error.message);
}

// Import and use reservation routes
try {
  const { default: reservationRoutes } = await import('./modules/reservations/routes/reservationRoutes.js');
  app.use('/api/reservations', reservationRoutes);
  console.log('✅ Reservation routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading reservation routes:', error.message);
}

// Import and use contact routes
try {
  const { default: contactRoutes } = await import('./modules/contacts/routes/contactRoutes.js');
  app.use('/api/contacts', contactRoutes);
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

// 404 Handler
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
connectDb().then(async () => {
  console.log(`✅ MongoDB Connected to database: ${process.env.DB_NAME || 'BohoBistroRestaurant'}`);
  
  // Test email connection on startup
  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    console.log('🔄 Testing email connection...');
    await testEmailConnection();
  } else {
    console.log('⚠️  Email configuration missing. Emails will not be sent.');
  }
  
  app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
    console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
  });
}).catch((error) => {
  console.error('❌ Failed to connect to database:', error);
  process.exit(1);
});

export default app;