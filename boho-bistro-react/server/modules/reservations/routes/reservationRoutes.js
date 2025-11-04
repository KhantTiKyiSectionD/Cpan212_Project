import express from 'express';
import Reservation from '../models/reservationModel.js';

import {
  validateCreateReservation,
  validateID,
  handleValidationErrors
} from '../middlewares/reservationValidation.js';

const router = express.Router();

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

// GET /api/reservations/date/:date
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

// GET /api/reservations/:id
router.get('/:id', validateID, handleValidationErrors, async (req, res) => {
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

// POST /api/reservations
router.post('/', validateCreateReservation, handleValidationErrors, async (req, res) => {
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

// PUT /api/reservations/:id
router.put('/:id', validateID, handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReservation = await Reservation.findByIdAndUpdate(id, req.body, { new: true });

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

// DELETE /api/reservations/:id
router.delete('/:id', validateID, handleValidationErrors, async (req, res) => {
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
