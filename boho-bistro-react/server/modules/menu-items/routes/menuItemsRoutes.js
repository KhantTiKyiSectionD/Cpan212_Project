import express from 'express';
import {
  getAllMenuItems,
  getMenuItemsByCategory,
  getMenuItemByID,
  addNewMenuItem,
  updateExistingMenuItem,
  deleteMenuItem,
  getFilteredMenuItems
} from '../models/menuItemModel.js';
import {
  validateCreateMenuItem,
  validateUpdateMenuItem,
  validateID,
  handleValidationErrors
} from '../middlewares/menuItemValidation.js';

const router = express.Router();

// GET /api/menu-items - Get all menu items
router.get('/', (req, res) => {
  try {
    // Check if any filters are provided
    const { category, vegetarian, vegan, glutenFree } = req.query;
    
    let items;
    if (category || vegetarian !== undefined || vegan !== undefined || glutenFree !== undefined) {
      const filters = {};
      if (category) filters.category = category;
      if (vegetarian !== undefined) filters.isVegetarian = vegetarian === 'true';
      if (vegan !== undefined) filters.isVegan = vegan === 'true';
      if (glutenFree !== undefined) filters.isGlutenFree = glutenFree === 'true';
      
      items = getFilteredMenuItems(filters);
    } else {
      items = getAllMenuItems();
    }
    
    res.status(200).json({
      success: true,
      data: items,
      count: items.length
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
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const items = getMenuItemsByCategory(category);
    
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
router.get('/:id', validateID, handleValidationErrors, (req, res) => {
  try {
    const { id } = req.params;
    const item = getMenuItemByID(id);
    
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
router.post('/', validateCreateMenuItem, handleValidationErrors, (req, res) => {
  try {
    const newItem = addNewMenuItem(req.body);
    
    if (!newItem) {
      return res.status(500).json({
        success: false,
        message: 'Error creating menu item'
      });
    }
    
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
router.put('/:id', validateUpdateMenuItem, handleValidationErrors, (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = updateExistingMenuItem(id, req.body);
    
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
router.delete('/:id', validateID, handleValidationErrors, (req, res) => {
  try {
    const { id } = req.params;
    const deleted = deleteMenuItem(id);
    
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