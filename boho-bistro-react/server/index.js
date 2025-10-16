import express from 'express';
import cors from 'cors';
import menuItemRoutes from './modules/menu-items/routes/menuItemRoutes.js';

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/menu-items', menuItemRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Boho Bistro API is running!',
    endpoints: {
      menu: {
        allItems: 'GET /api/menu-items',
        byCategory: 'GET /api/menu-items/category/:category',
        byId: 'GET /api/menu-items/:id',
        create: 'POST /api/menu-items',
        update: 'PUT /api/menu-items/:id', 
        delete: 'DELETE /api/menu-items/:id'
      }
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Boho Bistro API running on http://localhost:${PORT}`);
});
