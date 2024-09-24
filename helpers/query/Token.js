import Token from '@/models/tokenModel/tokenModel';

export async function findTokenEmail(userId, email) {
  return await Token.findOne({
    userId,
    'email.email': email,
  }).select('userId email.email');
}

export async function findTokenPhoneNumber(userId, dialCode, phoneNumber) {
  const projectedFields = {
    default: 'userId phone.dialCode phone.phoneNumber',
  };

  return await Token.findOne({
    userId,
    'phone.dialCode': dialCode,
    'phone.phoneNumber': phoneNumber,
  }).select(projectedFields.default);
}
