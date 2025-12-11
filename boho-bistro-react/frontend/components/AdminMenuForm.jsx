// frontend/src/components/AdminMenuForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AdminMenuForm = ({ onItemAdded }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'starters', // Default category
    image: '',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    allergens: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Prepare data - convert price to number
    const dataToSend = {
      ...formData,
      price: parseFloat(formData.price)
    };

    try {
      // TODO: Uncomment and use the line below for the live backend after deployment
      // const response = await axios.post('https://your-backend.onrender.com/api/menu-items', dataToSend);
      
      // For now, use your local backend
      const response = await axios.post('http://localhost:5000/api/menu-items', dataToSend);
      
      setSuccess('Menu item added successfully!');
      setFormData({
        name: '', description: '', price: '', category: 'starters',
        image: '', isVegetarian: false, isVegan: false, isGlutenFree: false, allergens: []
      });
      
      // Notify parent component to refresh the menu list
      if (onItemAdded) onItemAdded(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add menu item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form">
      <h2>Add New Menu Item (Admin)</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Price ($) *</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Category *</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="starters">Starters</option>
            <option value="mains">Main Courses</option>
            <option value="desserts">Desserts</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>
        
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/images/item-name.jpg"
          />
        </div>
        
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isVegetarian"
              checked={formData.isVegetarian}
              onChange={handleChange}
            />
            Vegetarian
          </label>
          
          <label>
            <input
              type="checkbox"
              name="isVegan"
              checked={formData.isVegan}
              onChange={handleChange}
            />
            Vegan
          </label>
          
          <label>
            <input
              type="checkbox"
              name="isGlutenFree"
              checked={formData.isGlutenFree}
              onChange={handleChange}
            />
            Gluten Free
          </label>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Menu Item'}
        </button>
      </form>
    </div>
  );
};

export default AdminMenuForm;