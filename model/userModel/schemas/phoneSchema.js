import { Schema } from 'mongoose';

const phoneSchema = new Schema(
  {
    dialCode: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    isPrimary: {
      type: Boolean,
    },
    isVerified: {
      type: Boolean,
    },
  },
  { _id: false }
);

export default phoneSchema;
