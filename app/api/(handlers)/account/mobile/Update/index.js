import User from '@/models/userModel/userModel';
import { HttpError } from '@/helpers/errorHelpers';
import { findUserPhoneNumber } from '@/helpers/query/User';

export async function deleteMobileNumber(phone, userId) {
  try {
    const [dialCode, phoneNumber] = phone.split(' ');

    const userExists = await findUserPhoneNumber({
      userId,
      dialCode,
      phoneNumber,
    });

    if (!userExists) {
      throw new HttpError({
        message: 'User not found.',
        status: 404,
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

export async function updatePrimaryMobileNumber(phone, userId) {
  try {
    const [dialCode, phoneNumber] = phone.split(' ');

    const userExists = await findUserPhoneNumber({
      userId,
      dialCode,
      phoneNumber,
    });

    if (!userExists) {
      throw new HttpError({
        message: 'User not found.',
        status: 404,
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
    const primaryNumber = updatedUser.phone.find((p) => p.isPrimary);

    return `${primaryNumber.dialCode} ${primaryNumber.phoneNumber}`;
  } catch (error) {
    console.error('Error while setting primary number', error.message);
    throw error;
  }
}
