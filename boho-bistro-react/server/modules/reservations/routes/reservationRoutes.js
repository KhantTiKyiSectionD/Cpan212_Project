import express from 'express';
import {
  getAllReservations,
  getReservationByID,
  addNewReservation,
  updateReservation,
  deleteReservation,
  getReservationsByDate
} from '../models/reservationModel.js';
import {
  validateCreateReservation,
  validateID,
  handleValidationErrors
} from '../middlewares/reservationValidation.js';

const router = express.Router();

// GET /api/reservations - Get all reservations
router.get('/', (req, res) => {
  try {
    const reservations = getAllReservations();
    res.status(200).json({
      success: true,
      data: reservations,
      count: reservations.length
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reservations',
      error: error.message
    });
  }
});

// GET /api/reservations/date/:date - Get reservations by date
router.get('/date/:date', (req, res) => {
  try {
    const { date } = req.params;
    const reservations = getReservationsByDate(date);
    
    res.status(200).json({
      success: true,
      data: reservations,
      count: reservations.length,
      date: date
    });
  } catch (error) {
    console.error('Error fetching reservations by date:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reservations by date',
      error: error.message
    });
  }
});

// GET /api/reservations/:id - Get reservation by ID
router.get('/:id', validateID, handleValidationErrors, (req, res) => {
  try {
    const { id } = req.params;
    const reservation = getReservationByID(id);
    
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    console.error('Error fetching reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reservation',
      error: error.message
    });
  }
});

// POST /api/reservations - Create new reservation
router.post('/', validateCreateReservation, handleValidationErrors, (req, res) => {
  try {
    const newReservation = addNewReservation(req.body);
    
    if (!newReservation) {
      return res.status(500).json({
        success: false,
        message: 'Error creating reservation'
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: newReservation
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating reservation',
      error: error.message
    });
  }
});

// PUT /api/reservations/:id - Update reservation
router.put('/:id', validateID, handleValidationErrors, (req, res) => {
  try {
    const { id } = req.params;
    const updatedReservation = updateReservation(id, req.body);
    
    if (!updatedReservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Reservation updated successfully',
      data: updatedReservation
    });
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating reservation',
      error: error.message
    });
  }
});

// DELETE /api/reservations/:id - Delete reservation
router.delete('/:id', validateID, handleValidationErrors, (req, res) => {
  try {
    const { id } = req.params;
    const deleted = deleteReservation(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Reservation deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting reservation',
      error: error.message
    });
  }
});

export default router;