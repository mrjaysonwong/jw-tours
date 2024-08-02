import User from '@/model/userModel/userModel';
import { HttpError } from '@/utils/helper/errorHandler';

export async function deleteMobileNumber(Request, userId) {
  try {
    const { phone: phoneToDelete } = await Request.json();
    const [dialCode, phoneNumber] = phoneToDelete.split(' ');

    const userExists = await User.findOne({ _id: userId });

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
    console.error(error);
    throw error;
  }
}

export async function updatePrimaryMobileNumber(Request, userId) {
  try {
    const { phone: phoneToSetPrimary } = await Request.json();
    const [dialCode, phoneNumber] = phoneToSetPrimary.split(' ');

    const userExists = await User.findOne({
      _id: userId,
      phone: {
        $elemMatch: {
          dialCode: dialCode,
          phoneNumber: phoneNumber,
        },
      },
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
    const updatedUser = await User.findOne({ _id: userId });
    const primaryNumber = updatedUser.phone.find((p) => p.isPrimary);

    return `${primaryNumber.dialCode} ${primaryNumber.phoneNumber}`;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
