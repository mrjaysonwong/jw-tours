import { compare, hash } from 'bcryptjs';

// internal imports
import { HttpError } from '@/helpers/errorHelpers';
import User from '@/models/userModel';

export async function updatePassword(formData, userId, userExists) {
  try {
    const passwordsMatch = await compare(
      formData.currentPassword,
      userExists.password
    );

    if (!passwordsMatch) {
      throw new HttpError({
        message: 'The current password you entered is incorrect.',
        status: 400,
      });
    }

    const isNewPasswordSameAsOld = await compare(
      formData.newPassword,
      userExists.password
    );

    if (isNewPasswordSameAsOld) {
      throw new HttpError({
        message: 'The new password cannot be the same as the current password.',
        status: 400,
      });
    }

    const hashpassword = await hash(formData.newPassword, 12);

    await User.updateOne(
      { _id: userId },
      {
        $set: { password: hashpassword },
      }
    );
  } catch (error) {
    throw error;
  }
}
