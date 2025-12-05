import express from 'express';
import MenuItem from '../models/menuItemModel.js';
import {
  validateCreateMenuItem,
  validateUpdateMenuItem,
  validateMenuItemID,
  handleMenuItemValidationErrors
} from '../middlewares/menuItemValidation.js';

const router = express.Router();

// GET /api/menu-items - Get all menu items with filtering
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10, sort } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const sortOptions = {};
    if (sort === 'price_asc') sortOptions.price = 1;
    if (sort === 'price_desc') sortOptions.price = -1;
    if (sort === 'name_asc') sortOptions.name = 1;
    if (sort === 'name_desc') sortOptions.name = -1;

    const items = await MenuItem.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await MenuItem.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: items,
      count: items.length,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching menu items',
      error: error.message
    });
  }
});

// GET /api/menu-items/category/:category - Get menu items by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const items = await MenuItem.find({ category });

    res.status(200).json({
      success: true,
      data: items,
      count: items.length,
      category: category
    });
  } catch (error) {
    console.error('Error fetching menu items by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching menu items by category',
      error: error.message
    });
  }
});

// GET /api/menu-items/:id - Get menu item by ID
router.get('/:id', validateMenuItemID, handleMenuItemValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching menu item',
      error: error.message
    });
  }
});

// POST /api/menu-items - Create new menu item
router.post('/', validateCreateMenuItem, handleMenuItemValidationErrors, async (req, res) => {
  try {
    const newItem = await MenuItem.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: newItem
    });
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating menu item',
      error: error.message
    });
  }
});

// PUT /api/menu-items/:id - Update menu item
router.put('/:id', validateUpdateMenuItem, handleMenuItemValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await MenuItem.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      data: updatedItem
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating menu item',
      error: error.message
    });
  }
});

// DELETE /api/menu-items/:id - Delete menu item
router.delete('/:id', validateMenuItemID, handleMenuItemValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MenuItem.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting menu item',
      error: error.message
    });
  }
});

export default router;