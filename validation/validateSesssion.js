import { auth } from '@/auth';
import { STATUS_CODES, ERROR_MESSAGES } from '@/constants/api.js';
import { HttpError } from '@/helpers/errorHelpers';

export async function validateSession() {
  const session = await auth();

  if (!session) {
    throw new HttpError({
      message: ERROR_MESSAGES.UNAUTHORIZED,
      status: STATUS_CODES.UNAUTHORIZED,
    });
  }
}
