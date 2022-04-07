import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema(
  {
    patient_id: {
      type: String,
      required: true,
    },
    patient_name: {
      type: String,
      required: true,
    },
    room_type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
