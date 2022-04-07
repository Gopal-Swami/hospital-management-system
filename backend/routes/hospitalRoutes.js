import express from 'express';
const router = express.Router();
import {
  createHospital,
  getHospital,
  createBooking,
  resetRooms,
  getBookings,
} from '../controllers/hospitalControllers.js';

router.route('/').post(createHospital).get(getHospital);
router.route('/booking').put(createBooking).get(getBookings);
router.route('/resetrooms').put(resetRooms);

export default router;
