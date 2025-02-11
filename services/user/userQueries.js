// internal imports
import User from '@/models/userModel';
import { PROJECTED_FIELDS } from '@/constants/projected_fields';
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES, ERROR_MESSAGES } from '@/constants/api';

// projection email.$ returns only matching array element
export async function findUserEmail({ email }) {
  return await User.findOne({
    'email.email': email,
  }).select('firstName status email.$');
}

export async function findUserEmailWithId({ userId, email }) {
  return await User.findOne({
    _id: userId,
    'email.email': email,
  }).select('firstName email.$');
}

export async function findUserPhoneNumber({ dialCode, phoneNumber }) {
  return await User.findOne({
    phone: {
      $elemMatch: {
        dialCode,
        phoneNumber,
      },
    },
  }).select('phone.$');
}

export async function findUserPhoneNumberWithId({
  userId,
  dialCode,
  phoneNumber,
}) {
  return await User.findOne({
    _id: userId,
    phone: {
      $elemMatch: {
        dialCode,
        phoneNumber,
      },
    },
  }).select('phone.$');
}

export async function findUserVerifiedEmail(email) {
  return await User.findOne({
    email: {
      $elemMatch: { email, isVerified: true },
    },
  }).select('email');
}


export async function findUser({ userId, email, password }) {
  let query;
  let projection;

  if (password) {
    query = { 'email.email': email };
    projection = PROJECTED_FIELDS.WITH_PASSWORD;
  } else if (userId) {
    query = { _id: userId };
    projection = PROJECTED_FIELDS.DEFAULT;
  } else {
    query = { 'email.email': email };
    projection = PROJECTED_FIELDS.DEFAULT;
  }

  const userExists = await User.findOne(query).select(projection);

  return userExists;
}

export async function findUserById(userId, projection = '_id') {
  const userExists = await User.findById(userId).select(projection);

  if (!userExists) {
    throw new HttpError({
      message: ERROR_MESSAGES.USER_NOT_FOUND,
      status: STATUS_CODES.NOT_FOUND,
    });
  }

  return userExists;
}
