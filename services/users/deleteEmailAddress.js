// internal imports
import { findUserEmailWithId } from './userQueries';
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common.js';
import User from '@/models/userModel';

export async function deleteEmailAddress(email, userId) {
  try {
    const emailExists = await findUserEmailWithId({ userId, email });

    if (!emailExists) {
      throw new HttpError({
        message: 'Email not found.',
        status: STATUS_CODES.NOT_FOUND,
      });
    }

    await User.updateOne(
      { _id: userId },
      {
        $pull: {
          email: { email },
        },
      }
    );
  } catch (error) {
    throw error;
  }
}
