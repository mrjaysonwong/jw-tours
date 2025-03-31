import { auth } from '@/auth';
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES, ERROR_MESSAGES } from '@/constants/common';

export async function validateSessionAdminRole(method) {
  try {
    const session = await auth();

    if (!session) {
      throw new HttpError({
        message: ERROR_MESSAGES.UNAUTHORIZED,
        status: STATUS_CODES.UNAUTHORIZED,
      });
    }

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

    return session;
  } catch (error) {
    throw error;
  }
}
