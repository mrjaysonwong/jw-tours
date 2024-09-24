import User from '@/models/userModel/userModel';

export async function findUserEmail({ email }) {
  return await User.findOne({
    email: { $elemMatch: { email } },
  }).select('firstName email.$');
}

export async function findUserPhoneNumber({ userId, dialCode, phoneNumber }) {
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

export async function findUserVerifiedEmail({ email }) {
  return await User.findOne({
    email: {
      $elemMatch: { email, isVerified: true },
    },
  }).select('email');
}

// ?
export async function isUserEmailVerified(email) {
  return await User.aggregate([
    { $unwind: '$email' },
    { $match: { 'email.email': email, 'email.isVerified': true } },
    { $project: { _id: 1, email: 1 } },
  ]);
}

export async function fetchUser({ userId, email, password }) {
  const projectedFields = {
    default: 'email firstName lastName role image languageCountry',
    withPassword:
      'email firstName lastName role image languageCountry password',
  };

  let query;
  let projection;

  if (password) {
    query = { 'email.email': email };
    projection = projectedFields.withPassword;
  } else if (userId) {
    query = { _id: userId };
    projection = projectedFields.default;
  } else {
    query = { 'email.email': email };
    projection = projectedFields.default;
  }

  const userExists = await User.findOne(query).select(projection);

  if (!userExists) {
    if (password) {
      throw new Error('Invalid Credentials');
    } else {
      throw new Error('Email must be verified.');
    }
  }

  return userExists;
}
