// internal imports
import { findUserPhoneNumberWithId } from './userQueries';
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/api';
import User from '@/models/userModel';

export async function updatePrimaryNumber(phone, userId) {
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

    const isPrimary = phoneNumberExists.phone[0].isPrimary;

    if (isPrimary) {
      throw new HttpError({
        message: 'Phone number has already been set to primary.',
        status: STATUS_CODES.CONFLICT,
      });
    }

    await User.updateOne(
      { _id: userId },
      {
        $set: {
          'phone.$[current].isPrimary': false, // Target identifier current from arrayFilters
          'phone.$[new].isPrimary': true, // Target identifier new from arrayFilters
        },
      },
      {
        arrayFilters: [
          { 'current.isPrimary': true },
          { 'new.dialCode': dialCode, 'new.phoneNumber': phoneNumber },
        ],
      }
    );

    // Fetch the updated user to return the new primary number
    const updatedUser = await User.findOne({ _id: userId }).select('phone');
    
    const newPrimaryNumber = updatedUser.phone.find((p) => p.isPrimary);

    return `${newPrimaryNumber.dialCode} ${newPrimaryNumber.phoneNumber}`;
  } catch (error) {
    throw error;
  }
}
