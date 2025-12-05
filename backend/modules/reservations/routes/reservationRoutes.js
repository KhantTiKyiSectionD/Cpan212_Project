import express from 'express';
import Reservation from '../models/reservationModel.js';
import {
  validateCreateReservation,
  validateReservationID,
  handleReservationValidationErrors
} from '../middlewares/reservationValidation.js';
import {
  sendReservationConfirmation,
  sendNewReservationNotification
} from '../../../utils/emailService.js';

const router = express.Router();

// POST /api/reservations - Create new reservation
router.post('/', validateCreateReservation, handleReservationValidationErrors, async (req, res) => {
  try {
    const newReservation = await Reservation.create(req.body);

    // Send emails asynchronously (don't wait for them to complete)
    Promise.all([
      sendReservationConfirmation(newReservation),
      sendNewReservationNotification(newReservation)
    ]).catch(emailError => {
      console.error('Email sending error (non-blocking):', emailError);
      // Don't throw - reservation was created successfully
    });

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully. Confirmation email sent.',
      data: newReservation
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    
    // Check if it's a duplicate error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A reservation with similar details already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating reservation',
      error: error.message
    });
  }
});

// GET /api/reservations - Get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find({});
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
router.get('/date/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const reservations = await Reservation.find({ date });

    res.status(200).json({
      success: true,
      data: reservations,
      count: reservations.length,
      date
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
router.get('/:id', validateReservationID, handleReservationValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);

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
router.post('/', validateCreateReservation, handleReservationValidationErrors, async (req, res) => {
  try {
    const newReservation = await Reservation.create(req.body);

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
router.put('/:id', validateReservationID, handleReservationValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );

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
router.delete('/:id', validateReservationID, handleReservationValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Reservation.findByIdAndDelete(id);

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