import { Schema } from 'mongoose';
import { EMAIL_REGEX } from '@/lib/regex';

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

export default emailSchema;
