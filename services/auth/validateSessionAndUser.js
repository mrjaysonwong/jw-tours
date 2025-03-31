import { auth } from '@/auth';
import connectMongo from '@/services/db/connectMongo';
import { findUserById } from '@/services/user/userQueries';
import { STATUS_CODES, ERROR_MESSAGES } from '@/constants/common';
import { HttpError } from '@/helpers/errorHelpers';

export async function validateSessionAndUser(userId, projection) {
  try {
    const session = await auth();

    if (!session) {
      throw new HttpError({
        message: ERROR_MESSAGES.UNAUTHORIZED,
        status: STATUS_CODES.UNAUTHORIZED,
      });
    }

    const isMatchId = session.user.id === userId;
    const isAdminRole = session.user.role === 'admin';

    // connect to database
    await connectMongo();
    const userExists = await findUserById(userId, projection);

    if (!isMatchId && !isAdminRole) {
      throw new HttpError({
        message: ERROR_MESSAGES.FORBIDDEN_ACTION,
        status: STATUS_CODES.FORBIDDEN,
      });
    }
    return { userExists, session };
  } catch (error) {
    throw error;
  }
}
