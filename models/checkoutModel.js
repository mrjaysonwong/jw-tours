import { Schema, model, models } from 'mongoose';

// internal imports
import {
  bookingRequestSchema,
  contactSchema,
  meetingAndPickupSchema,
} from './sharedSchemas';

const checkoutSchema = new Schema(
  {
    booker: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    bookingRequest: bookingRequestSchema,
    contact: contactSchema,
    meetingAndPickup: meetingAndPickupSchema,
    expireAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Index to remove expired sessions automatically
checkoutSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Checkout = models?.Checkout || model('Checkout', checkoutSchema);

export default Checkout;
