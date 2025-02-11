// internal imports
import { findUserPhoneNumberWithId } from './userQueries';
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/api.js';
import User from '@/models/userModel';

export async function deleteMobileNumber(phone, userId) {
  try {
    const { dialCode, phoneNumber } = phone;

    const phoneNumberExists = await findUserPhoneNumberWithId({
      userId,
      dialCode,
      phoneNumber,
    });

    if (!phoneNumberExists) {
      throw new HttpError({
        message: 'Phone number not found.',
        status: STATUS_CODES.NOT_FOUND,
      });
    }

    await User.updateOne(
      { _id: userId, phone: { $elemMatch: { dialCode, phoneNumber } } },
      { $pull: { phone: { dialCode, phoneNumber } } }
    );
  } catch (error) {
    console.error('Error while deleting phone number.', error.message);
    throw error;
  }
}
