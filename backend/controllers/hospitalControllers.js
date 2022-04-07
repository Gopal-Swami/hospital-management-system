import asyncHandler from 'express-async-handler';
import Hospital from '../models/Hospital.js';
import Booking from '../models/Booking.js';

const createHospital = asyncHandler(async (req, res) => {
  const hospital = await Hospital.create({});
  if (hospital) {
    res.status(201).json(hospital);
  } else {
    res.status(400);
    throw new Error('Hospital Not Created');
  }
});

const getHospital = asyncHandler(async (req, res) => {
  const hospital = await Hospital.findById('624eae907bc54e064315f219');
  if (hospital) {
    res.status(200).json(hospital);
  } else {
    res.status(404);
    throw new Error('Hospital Not Found');
  }
});

const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find();
  if (bookings) {
    res.status(200).json(bookings);
  } else {
    res.status(404);
    throw new Error('Bookings Not Found');
  }
});

const createBooking = asyncHandler(async (req, res) => {
  const hospital = await Hospital.findById('624eae907bc54e064315f219');
  if (hospital) {
    if (req.body.roomType === 'normal_rooms') {
      hospital.normal_rooms.available = hospital.normal_rooms.available - 1;
      hospital.normal_rooms.booked = hospital.normal_rooms.booked + 1;
      hospital.normal_rooms.flat_beds = hospital.normal_rooms.flat_beds - 1;
      hospital.normal_rooms.normal_masks =
        hospital.normal_rooms.normal_masks - 2;
    } else if (req.body.roomType === 'oxygen_rooms') {
      hospital.oxygen_rooms.available = hospital.oxygen_rooms.available - 1;
      hospital.oxygen_rooms.booked = hospital.oxygen_rooms.booked + 1;
      hospital.oxygen_rooms.recliner_beds =
        hospital.oxygen_rooms.recliner_beds - 1;
      hospital.oxygen_rooms.oxygen_cylinders =
        hospital.oxygen_rooms.oxygen_cylinders - 2;
      hospital.oxygen_rooms.non_rebreather_masks =
        hospital.oxygen_rooms.non_rebreather_masks - 2;
    } else if (req.body.roomType === 'icu_rooms') {
      hospital.icu_rooms.available = hospital.icu_rooms.available - 1;
      hospital.icu_rooms.booked = hospital.icu_rooms.booked + 1;
      hospital.icu_rooms.recliner_beds = hospital.icu_rooms.recliner_beds - 1;
      hospital.icu_rooms.oxygen_cylinders =
        hospital.icu_rooms.oxygen_cylinders - 1;
      hospital.icu_rooms.ventilators = hospital.icu_rooms.ventilators - 1;
    }
    const createdBooking = await Booking.create({
      patient_id: req.body.patientId,
      patient_name: req.body.patientName,
      room_type: req.body.roomType,
    });
    const updatedHospital = await hospital.save();
    res.status(200).json({ updatedHospital, createdBooking });
  } else {
    res.status(404);
    throw new Error('Hospital Not Found');
  }
});

const resetRooms = asyncHandler(async (req, res) => {
  const hospital = await Hospital.findById('624eae907bc54e064315f219');

  if (hospital) {
    hospital.normal_rooms.available = 50;
    hospital.normal_rooms.booked = 0;
    hospital.normal_rooms.flat_beds = 50;
    hospital.normal_rooms.normal_masks = 100;
    hospital.oxygen_rooms.available = 50;
    hospital.oxygen_rooms.booked = 0;
    hospital.oxygen_rooms.recliner_beds = 50;
    hospital.oxygen_rooms.oxygen_cylinders = 100;
    hospital.oxygen_rooms.non_rebreather_masks = 100;

    hospital.icu_rooms.available = 16;
    hospital.icu_rooms.booked = 0;
    hospital.icu_rooms.recliner_beds = 16;
    hospital.icu_rooms.oxygen_cylinders = 16;
    hospital.icu_rooms.ventilators = 16;
    const updatedHospital = await hospital.save();
    await Booking.deleteMany();
    res.status(200).json(updatedHospital);
  } else {
    res.status(404);
    throw new Error('Hospital Not Found');
  }
});

export { createHospital, getHospital, createBooking, resetRooms, getBookings };
