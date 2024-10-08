import express from 'express';
import ReservationController from '../controllers/reservationController';

const router = express.Router();

// Create new reservation
router.post('/', ReservationController.createReservation);

// Get all reservations
router.get('/', ReservationController.getAllReservations);

// Get reservation by ID
router.get('/:reservationId', ReservationController.getReservationById);

// Update reservation
router.put('/:reservationId', ReservationController.updateReservation);

// Delete reservation
router.delete('/:reservationId', ReservationController.deleteReservation);

export default router;