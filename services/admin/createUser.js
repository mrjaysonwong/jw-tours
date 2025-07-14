// third-party imports
import { hash } from 'bcryptjs';

// internal imports
import { findUserEmail } from '../users/userQueries';
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import User from '@/models/userModel';

export async function createUser(data) {
  try {
    const userEmailExists = await findUserEmail({ email: data.email });

    if (userEmailExists) {
      throw new HttpError({
        message: 'This email is already in use. Please choose another.',
        status: STATUS_CODES.CONFLICT,
      });
    }

    const hashedPassword = await hash(data.password, 12);

    await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: [
        {
          email: data.email,
          isPrimary: true,
          isVerified: true,
        },
      ],
      password: hashedPassword,
      role: data.role,
      status: 'active',
    });
  } catch (error) {
    throw error;
  }
}
