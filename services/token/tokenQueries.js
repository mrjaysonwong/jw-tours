import Token from '@/models/tokenModel';

const projectedFields = {
  default: 'userId',
  email: 'userId email.email',
  phone: 'userId phone.dialCode phone.phoneNumber ',
};

export async function findTokenEmailWithId({ userId, email }) {
  return await Token.findOne({
    userId,
    'email.email': email,
  }).select(projectedFields.email);
}

export async function findTokenPhoneNumberWithId({
  userId,
  dialCode,
  phoneNumber,
}) {
  return await Token.findOne({
    userId,
    phone: {
      $elemMatch: {
        dialCode,
        phoneNumber,
      },
    },
  }).select(projectedFields.phone);
}
