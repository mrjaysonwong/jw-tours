import User from '@/model/userModel/userModel';
import { HttpError } from '@/utils/helper/errorHandler';
import { findUserByEmail } from '@/utils/helper/query/User';

export async function deleteEmailAddress(Request, userId) {
  try {
    const { email: emailToDelete } = await Request.json();

    const userExists = await findUserByEmail(emailToDelete);

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
          email: { email: emailToDelete },
        },
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updatePrimaryEmail(Request, userId) {
  try {
    const { email: emailToSetPrimary } = await Request.json();

    const userExists = await findUserByEmail(emailToSetPrimary);

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
        arrayFilters: [
          { 'current.isPrimary': true },
          { 'new.email': emailToSetPrimary },
        ],
      }
    );

    // Fetch the updated user to return the new primary email
    const updatedUser = await User.findOne({ _id: userId });
    const newPrimaryEmail = updatedUser.email.find((e) => e.isPrimary === true);

    return newPrimaryEmail.email;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
