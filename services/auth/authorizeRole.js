import { findUserById } from '@/services/users/userQueries';
import { STATUS_CODES, ERROR_MESSAGES } from '@/constants/common';
import { HttpError } from '@/helpers/errorHelpers';

export async function authorizeUser({ session, userId, projection }) {
  try {
    const userExists = await findUserById(userId, projection);
    const isMatchId = session.user.id === userId;
    const isAdminRole = session.user.role === 'admin';

    if (!isMatchId && !isAdminRole) {
      throw new HttpError({
        message: ERROR_MESSAGES.FORBIDDEN_ACTION,
        status: STATUS_CODES.FORBIDDEN,
      });
    }

    return userExists;
  } catch (error) {
    throw error;
  }
}

export async function authorizeAdmin(session, method) {
  try {
    const isAdminRole = session.user.role === 'admin';

    if (!isAdminRole) {
      if (method === 'GET') {
        throw new HttpError({
          message: ERROR_MESSAGES.ADMIN_ONLY,
          status: STATUS_CODES.UNAUTHORIZED,
        });
      } else {
        throw new HttpError({
          message: ERROR_MESSAGES.ADMIN_ONLY_ACTION,
          status: STATUS_CODES.FORBIDDEN,
        });
      }
    }

    return;
  } catch (error) {
    throw error;
  }
}
