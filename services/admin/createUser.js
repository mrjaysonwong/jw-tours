// third-party imports
import { hash } from 'bcryptjs';

// internal imports
import { findUserEmail } from '../user/userQueries';
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import User from '@/models/userModel';

export async function createUser(formData) {
  try {
    const userEmailExists = await findUserEmail({ email: formData.email });

    if (userEmailExists) {
      throw new HttpError({
        message: 'This email is already in use. Please choose another.',
        status: STATUS_CODES.CONFLICT,
      });
    }

    const hashedPassword = await hash(formData.password, 12);

    await User.create({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: [
        {
          email: formData.email,
          isPrimary: true,
          isVerified: true,
        },
      ],
      password: hashedPassword,
      role: formData.role,
      status: 'active',
    });
  } catch (error) {
    throw error;
  }
}
