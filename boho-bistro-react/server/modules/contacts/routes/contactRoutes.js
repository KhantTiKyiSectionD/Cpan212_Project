import express from 'express';
import Contact from '../models/contactModel.js';
import {
  validateCreateContact,
  validateID,
  handleValidationErrors
} from '../middlewares/contactValidation.js';

const router = express.Router();

// GET /api/contacts - Get all contacts
router.get('/',async (req, res) => {
  try {
    const contacts = await Contact.find({});
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
router.get('/status/:status',  async (req, res) => {
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

// GET /api/contacts/:id - Get contact by ID
router.get('/:id', validateID, handleValidationErrors, async (req, res) => {
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

// POST /api/contacts - Create new contact
router.post('/', validateCreateContact, handleValidationErrors,  async (req, res) => {
  try {
     const newContact = await Contact.create(req.body);

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
router.put('/:id', validateID, handleValidationErrors,  async (req, res) => {
  try {
    const { id } = req.params;
     const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

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
router.delete('/:id', validateID, handleValidationErrors,  async (req, res) => {
  try {
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
