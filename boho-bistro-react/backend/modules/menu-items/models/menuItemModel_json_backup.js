import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../../../data/menuItems.json');

// Helper function to read data from JSON file
const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading menu items data:', error);
    return [];
  }
};

// Helper function to write data to JSON file
const writeData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing menu items data:', error);
    return false;
  }
};

// GET all menu items
export const getAllMenuItems = () => {
  return readData();
};

// GET menu items by category
export const getMenuItemsByCategory = (category) => {
  const items = readData();
  return items.filter(item => item.category === category);
};

// GET menu item by ID
export const getMenuItemByID = (id) => {
  const items = readData();
  return items.find(item => item.id === parseInt(id));
};

// POST - Add new menu item
export const addNewMenuItem = (data) => {
  const items = readData();
  const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  
  const newItem = {
    id: newId,
    ...data,
    createdAt: new Date().toISOString()
  };
  
  items.push(newItem);
  
  if (writeData(items)) {
    return newItem;
  }
  return null;
};

// PUT - Update existing menu item
export const updateExistingMenuItem = (id, data) => {
  const items = readData();
  const index = items.findIndex(item => item.id === parseInt(id));
  
  if (index === -1) return null;
  
  items[index] = { 
    ...items[index], 
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  if (writeData(items)) {
    return items[index];
  }
  return null;
};

// DELETE - Delete menu item
export const deleteMenuItem = (id) => {
  const items = readData();
  const index = items.findIndex(item => item.id === parseInt(id));
  
  if (index === -1) return false;
  
  items.splice(index, 1);
  
  return writeData(items);
};

// GET menu items with filters (optional - for future use)
export const getFilteredMenuItems = (filters = {}) => {
  let items = readData();
  
  if (filters.category) {
    items = items.filter(item => item.category === filters.category);
  }
  
  if (filters.isVegetarian !== undefined) {
    items = items.filter(item => item.isVegetarian === filters.isVegetarian);
  }
  
  if (filters.isVegan !== undefined) {
    items = items.filter(item => item.isVegan === filters.isVegan);
  }
  
  if (filters.isGlutenFree !== undefined) {
    items = items.filter(item => item.isGlutenFree === filters.isGlutenFree);
  }
  
  return items;
};