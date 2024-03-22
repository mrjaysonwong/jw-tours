import { Schema, model, models } from 'mongoose';
import { EMAIL_REGEX } from '@/lib/regex';

const tokenSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  email: [
    {
      email: {
        type: String,
        trim: true,
        required: [true, 'Email address is required'],
        match: [EMAIL_REGEX, 'Invalid email address'],
      },
      token: {
        type: String,
        default: undefined,
      },
      expireTimestamp: {
        type: Number,
        default: undefined,
      },
      requestCount: {
        type: Number,
        default: undefined,
      },
      rateLimit: {
        type: Boolean,
        default: undefined,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },

      _id: false,
    },
  ],
});

const Token = models?.token || model('token', tokenSchema);

export default Token;
