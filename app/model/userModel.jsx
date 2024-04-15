import { Schema, model, models } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { EMAIL_REGEX } from '@/lib/regex';

const userSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
    },
    firstName: {
      type: String,
      required: true,
      match: [/^[A-Za-z ]*$/, 'Please enter valid name'],
    },
    lastName: {
      type: String,
      required: true,
      match: [/^[A-Za-z ]*$/, 'Please enter valid name'],
    },

    email: [
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
        _id: false,
      },
    ],
    gender: {
      type: String,
      enum: ['', 'male', 'female', 'other'],
      default: '',
    },
    password: {
      type: String,
      // only type: String for providers login passwordless default to empty string & not required
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'guide', 'admin'],
      default: 'user',
    },
    image: {
      public_id: {
        type: String,
        default: '',
      },
      url: {
        type: String,
        default: '',
      },
    },
    accountProvider: {
      type: String,
      default: 'credentials',
    },
    phone: {
      dialCode: {
        type: String,
        default: '',
      },
      phoneNumber: {
        type: String,
        default: '',
      },
    },
    dateOfBirth: {
      type: String,
      default: '',
    },
    address: {
      street: {
        type: String,
        default: '',
      },
      homeTown: {
        type: String,
        default: '',
      },
      postalCode: {
        type: String,
        default: '',
      },
    },
    paymentCards: {
      type: String,
      default: '',
    },
    subscribe: {
      type: Boolean,
      default: false,
    },
    tourLanguage: {
      type: String,
      default: '',
    },
    specialReq: {
      type: String,
      default: '',
    },
    languageCountry: {
      type: String,
      default: 'English (US)',
    },
    currency: {
      type: String,
      default: '$ - USD',
    },
    banned: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = models?.user || model('user', userSchema);

export default User;
