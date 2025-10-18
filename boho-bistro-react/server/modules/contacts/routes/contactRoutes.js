import express from 'express';
import {
  getAllContacts,
  getContactByID,
  addNewContact,
  updateContact,
  deleteContact,
  getContactsByStatus
} from '../models/contactModel.js';
import {
  validateCreateContact,
  validateID,
  handleValidationErrors
} from '../middlewares/contactValidation.js';

const router = express.Router();

// GET /api/contacts - Get all contacts
router.get('/', (req, res) => {
  try {
    const contacts = getAllContacts();
    res.status(200).json({
      success: true,
      data: contacts,
      count: contacts.length
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

// GET /api/contacts/status/:status - Get contacts by status
router.get('/status/:status', (req, res) => {
  try {
    const { status } = req.params;
    const contacts = getContactsByStatus(status);
    
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

// GET /api/contacts/:id - Get contact by ID
router.get('/:id', validateID, handleValidationErrors, (req, res) => {
  try {
    const { id } = req.params;
    const contact = getContactByID(id);
    
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

// POST /api/contacts - Create new contact
router.post('/', validateCreateContact, handleValidationErrors, (req, res) => {
  try {
    const newContact = addNewContact(req.body);
    
    if (!newContact) {
      return res.status(500).json({
        success: false,
        message: 'Error creating contact'
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Contact message sent successfully',
      data: newContact
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

// PUT /api/contacts/:id - Update contact
router.put('/:id', validateID, handleValidationErrors, (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = updateContact(id, req.body);
    
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

// DELETE /api/contacts/:id - Delete contact
router.delete('/:id', validateID, handleValidationErrors, (req, res) => {
  try {
    const { id } = req.params;
    const deleted = deleteContact(id);
    
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