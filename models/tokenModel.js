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

tokenSchema.index({
  userId: 1,
  'email.email': 1,
  'email.token': 1,
  'email.expireTimestamp': 1,
  'phone.dialCode': 1,
  'phone.phoneNumber': 1,
  'phone.token': 1,
  'phone.expireTimestamp': 1,
});

const Token = models?.token || model('token', tokenSchema);

export default Token;
