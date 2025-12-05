import express from 'express';
import Contact from '../models/contactModel.js';
import {
  validateCreateContact,
  validateContactID,
  handleContactValidationErrors
} from '../middlewares/contactValidation.js';
import { optionalAuthenticate } from '../../../middlewares/optionalAuth.js'; // ADD THIS

const router = express.Router();

// GET /api/contacts - Get all contacts (PUBLIC - with optional auth)
router.get('/', optionalAuthenticate, async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json({
      success: true,
      data: contacts,
      count: contacts.length,
      // Optional: include user info if logged in
      user: req.user ? { id: req.user._id, role: req.user.role } : null
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
});

// GET /api/contacts/status/:status - Get contacts by status (PUBLIC - with optional auth)
router.get('/status/:status', optionalAuthenticate, async (req, res) => {
  try {
    const { status } = req.params;
    const contacts = await Contact.find({ status });

    res.status(200).json({
      success: true,
      data: contacts,
      count: contacts.length,
      status: status
    });
  } catch (error) {
    console.error('Error fetching contacts by status:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts by status',
      error: error.message
    });
  }
});

// GET /api/contacts/:id - Get contact by ID (PUBLIC - with optional auth)
router.get('/:id', optionalAuthenticate, validateContactID, handleContactValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: error.message
    });
  }
});

// POST /api/contacts - Create new contact (PUBLIC - tracks user if logged in)
router.post('/', optionalAuthenticate, validateCreateContact, handleContactValidationErrors, async (req, res) => {
  try {
    // Build contact data - include user info if logged in
    const contactData = {
      ...req.body,
      // Add user info if authenticated
      ...(req.user && {
        userId: req.user._id,
        userEmail: req.user.email,
        userName: req.user.name
      })
    };

    const newContact = await Contact.create(contactData);

    res.status(201).json({
      success: true,
      message: 'Contact message sent successfully',
      data: newContact,
      // Optional: include user info in response
      user: req.user ? { id: req.user._id, name: req.user.name } : null
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating contact',
      error: error.message
    });
  }
});

// PUT /api/contacts/:id - Update contact (ADMIN ONLY - protect later)
router.put('/:id', optionalAuthenticate, validateContactID, handleContactValidationErrors, async (req, res) => {
  try {
    // TODO: Add admin authorization when ready
    // if (!req.user || req.user.role !== 'admin') {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Admin access required'
    //   });
    // }
    
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: updatedContact
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact',
      error: error.message
    });
  }
});

// DELETE /api/contacts/:id - Delete contact (ADMIN ONLY - protect later)
router.delete('/:id', optionalAuthenticate, validateContactID, handleContactValidationErrors, async (req, res) => {
  try {
    // TODO: Add admin authorization when ready
    // if (!req.user || req.user.role !== 'admin') {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Admin access required'
    //   });
    // }
    
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: error.message
    });
  }
});

export default router;