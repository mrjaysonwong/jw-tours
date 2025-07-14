import { auth } from '@/auth';
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES, ERROR_MESSAGES } from '@/constants/common';

export async function validateSession() {
  const session = await auth();

  if (!session) {
    throw new HttpError({
      message: ERROR_MESSAGES.UNAUTHORIZED,
      status: STATUS_CODES.UNAUTHORIZED,
    });
  }

  return session;
}
