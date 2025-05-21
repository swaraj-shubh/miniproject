// models/Food.js
import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    quantity: {
      type: Number,
      required: true
    },
    preparationDate: {
      type: Date,
      required: true
    },
    expiryDate: Date,
    images: [String],
    price: {
      type: Number,
      default: 0
    },
    isFree: {
      type: Boolean,
      default: true
    },
    status: {
      type: String,
      enum: ['available', 'reserved', 'claimed'],
      default: 'available'
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    address: String
  },
  { timestamps: true }
);

// Enable geospatial indexing for location
foodSchema.index({ location: '2dsphere' });

const Food = mongoose.model('Food', foodSchema);
export default Food;
