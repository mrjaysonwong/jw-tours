import { Schema } from 'mongoose';

const phoneSchema = new Schema(
  {
    dialCode: {
      type: String,
      trim: true,
      match: [
        /^[0-9+-]*$/,
        'Please enter a valid dial code (only numbers, +, -)',
      ],
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^[0-9]*$/, 'Please enter valid number'],
      validate: {
        validator: function (v) {
          return v.length <= 10;
        },
        message: 'Phone number must be maximum of 10 digits',
      },
    },
    token: {
      type: String,
    },
    expireTimestamp: {
      type: Number,
    },
    requestCount: {
      type: Number,
    },
    rateLimit: {
      type: Boolean,
    },
  },
  { _id: false }
);

export default phoneSchema;
