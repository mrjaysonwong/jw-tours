import User from '@/models/userModel/userModel';
import { HttpError } from '@/helpers/errorHelpers';
import { findUserEmail } from '@/helpers/query/User';

export async function deleteEmailAddress(email, userId) {
  try {
    const userExists = await findUserEmail({ email });

    if (!userExists) {
      throw new HttpError({
        message: 'User not found.',
        status: 404,
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
    console.error('Error while deleting email.', error.message);
    throw error;
  }
}

export async function updatePrimaryEmail(email, userId) {
  try {
    const userExists = await findUserEmail({ email });

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
    console.error('Error while setting primary email', error.message);
    throw error;
  }
}
