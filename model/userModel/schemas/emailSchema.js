import { Schema } from 'mongoose';
import { EMAIL_REGEX } from '@/lib/regex';

const emailSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, 'Email address is required'],
      match: [EMAIL_REGEX, 'Invalid email'],
    },
    isPrimary: {
      type: Boolean,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: null,
    },
  },
  { _id: false }
);

export default emailSchema;
