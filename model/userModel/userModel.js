import { Schema, model, models } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import emailSchema from './schemas/emailSchema';
import phoneSchema from './schemas/phoneSchema';

const userSchema = new Schema(
  {
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
    email: {
      type: [emailSchema],
    },
    gender: {
      type: String,
      enum: ['', 'male', 'female', 'other'],
    },
    password: {
      type: String,
      // only type: String for OAuth login/passwordless default to undefined
    },
    role: {
      type: String,
      enum: ['user', 'guide', 'admin'],
      default: 'user',
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    accountProvider: {
      type: String,
    },
    phone: {
      type: [phoneSchema],
      default: undefined,
    },
    dateOfBirth: {
      type: String,
    },
    address: {
      street: {
        type: String,
      },
      homeTown: {
        type: String,
      },
      postalCode: {
        type: String,
      },
    },
    paymentCards: {
      type: String,
    },
    subscribe: {
      type: Boolean,
      default: false,
    },
    tourLanguage: {
      type: String,
    },
    specialReq: {
      type: String,
    },
    languageCountry: {
      type: String,
      default: 'en',
    },
    nationality: {
      type: String,
    },
    // currency: {
    //   type: String,
    //   default: '$ - USD',
    // },
    banned: {
      type: Boolean,
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
