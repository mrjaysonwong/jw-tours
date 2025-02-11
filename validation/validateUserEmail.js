import { auth } from '@/auth';
import { findUserEmailWithId } from '@/services/user/userQueries';
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/api';

export async function validateUserEmail(email, userId) {
  const session = await auth();
  const isAdmin = session.user.role === 'admin';

  const userOwnedThisEmail = await findUserEmailWithId({
    userId,
    email,
  });

  if (!userOwnedThisEmail && !isAdmin) {
    throw new HttpError({
      message: `Email does not belong to the user.`,
      status: STATUS_CODES.FORBIDDEN,
    });
  }
}
