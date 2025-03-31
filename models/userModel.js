import { Schema, model, models } from 'mongoose';
import { EMAIL_REGEX } from '@/constants/regex';

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
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

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

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      match: [/^[A-Za-z0-9 ]*$/, 'Please enter valid name.'],
    },
    lastName: {
      type: String,
      required: true,
      match: [/^[A-Za-z0-9 ]*$/, 'Please enter valid name.'],
    },
    email: {
      type: [emailSchema],
    },
    phone: {
      type: [phoneSchema],
      default: undefined,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'guide', 'agent', 'admin'],
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

    dateOfBirth: {
      type: String,
    },
    address: {
      name: { type: String, lowercase: true },
      neighbourhood: { type: String, lowercase: true },
      city: { type: String, lowercase: true },
      state: { type: String, required: true, lowercase: true },
      postcode: { type: String, lowercase: true },
      country: { type: String, required: true, lowercase: true },
    },
    subscription: {
      isSubscribed: {
        type: Boolean,
        default: false,
      },
      subscriberId: {
        type: String,
        default: null,
      },
    },
    languages: {
      type: [String],
    },
    specialReq: {
      type: String,
    },
    langCode: {
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
    status: {
      type: String,
      enum: ['pending', 'active', 'suspended', 'inactive'],
      default: 'pending',
    },
    guideCustomId: { type: String, unique: true },
    partnerCustomId: { type: String, unique: true },
    agentCustomId: { type: String, unique: true },
  },
  { timestamps: true }
);

/* 
$text index optional best use case for full-text search
blog, articles, descriptions, product listing
comments, reviews,
*/

// userSchema.index({
// 'email.email': 'text',
//   firstName: 'text',
//   lastName: 'text',
//   role: 'text',
//   status: 'text',
// });

userSchema.index({
  'email.email': 1,
  firstName: 1,
  lastName: 1,
  role: 1,
  status: 1,
});

userSchema.index({ 'phone.dialCode': 1, 'phone.phoneNumber': 1 });

const User = models?.User || model('User', userSchema);

export default User;
