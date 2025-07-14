import { Schema, model, models } from 'mongoose';

// internal imports
import { nanoid } from '@/libs/nanoid';
import {
  bookingRequestSchema,
  contactSchema,
  meetingAndPickupSchema,
} from './sharedSchemas';

const bookingSchema = new Schema(
  {
    bookingId: {
      type: String,
      default: () => `BOOK-${nanoid()}`,
      unique: true,
    },
    transactionId: {
      type: String,
      unique: true,
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    booker: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now(),
    },
    paymentId: {
      type: String,
    },
    paymentIntentId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: 'pending',
    },
    status: {
      type: String,
      default: 'pending',
    },
    reasonForCancellation: {
      type: String,
    },
    paymentSnapshot: {
      currencySymbol: { type: String },
      currencyCode: { type: String },
      convertedAmount: { type: Number },
      paymentMethod: { type: String },
    },
    bookingRequest: bookingRequestSchema,
    contact: contactSchema,
    meetingAndPickup: meetingAndPickupSchema,
  },
  { timestamps: true }
);

bookingSchema.index({
  tour: 1,
  booker: 1,
  'bookingRequest.tourDate': 1,
  paymentIntentId: 1,
  paymentId: 1,
});

const Booking = models?.Booking || model('Booking', bookingSchema);

export default Booking;
