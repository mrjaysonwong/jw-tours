import { Schema, model, models } from 'mongoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890', 10);

const bookingSchema = new Schema(
  {
    bookingId: {
      type: String,
      default: () => nanoid(),
      unique: true,
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now(),
    },
    tourDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = models?.Booking || model('Booking', bookingSchema);

export default Booking;
