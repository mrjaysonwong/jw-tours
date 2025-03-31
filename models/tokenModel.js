import { Schema, model, models } from 'mongoose';
import { EMAIL_REGEX } from '@/constants/regex';

const emailSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      match: [EMAIL_REGEX, 'Invalid email address'],
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

const tokenSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: [emailSchema],
    default: undefined,
  },
  phone: {
    type: [phoneSchema],
    default: undefined,
  },
});

const Token = models?.Token || model('Token', tokenSchema);

export default Token;
