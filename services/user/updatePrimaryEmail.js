// internal imports
import { findUserEmailWithId } from './userQueries';
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import User from '@/models/userModel';

export async function updatePrimaryEmail(email, userId) {
  try {
    const emailExists = await findUserEmailWithId({ userId, email });

    if (!emailExists) {
      throw new HttpError({
        message: 'Email not found.',
        status: STATUS_CODES.NOT_FOUND,
      });
    }

    const isPrimary = emailExists.email[0].isPrimary;

    if (isPrimary) {
      throw new HttpError({
        message: 'Email has already been set to primary.',
        status: STATUS_CODES.CONFLICT,
      });
    }

    await User.updateOne(
      { _id: userId },
      {
        $set: {
          'email.$[current].isPrimary': false, // Target identifier current from arrayFilters
          'email.$[new].isPrimary': true, // Target identifier new from arrayFilters
        },
      },
      {
        arrayFilters: [{ 'current.isPrimary': true }, { 'new.email': email }],
      }
    );

    // Fetch the updated user to return the new primary email
    const updatedUser = await User.findOne({ _id: userId }).select('email');

    const newPrimaryEmail = updatedUser.email.find((e) => e.isPrimary === true);

    return newPrimaryEmail.email;
  } catch (error) {
    throw error;
  }
}
