import mongoose from 'mongoose';

const hospitalSchema = mongoose.Schema(
  {
    normal_rooms: {
      total: { type: Number, default: 50 },
      available: { type: Number, required: true, default: 50 },
      booked: { type: Number, required: true, default: 0 },
      flat_beds: { type: Number, required: true, default: 50 },
      normal_masks: { type: Number, required: true, default: 100 },
    },
    oxygen_rooms: {
      total: { type: Number, default: 50 },
      available: { type: Number, required: true, default: 50 },
      booked: { type: Number, required: true, default: 0 },
      oxygen_cylinders: { type: Number, required: true, default: 100 },
      recliner_beds: { type: Number, required: true, default: 50 },
      non_rebreather_masks: { type: Number, required: true, default: 100 },
    },
    icu_rooms: {
      total: { type: Number, default: 16 },
      available: { type: Number, required: true, default: 16 },
      booked: { type: Number, required: true, default: 0 },
      oxygen_cylinders: { type: Number, required: true, default: 16 },
      recliner_beds: { type: Number, required: true, default: 16 },
      ventilators: { type: Number, required: true, default: 16 },
    },
  },
  {
    timestamps: true,
  }
);

const Hospital = mongoose.model('Hospital', hospitalSchema);

export default Hospital;
