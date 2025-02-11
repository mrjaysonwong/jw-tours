'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { STATUS_CODES, ERROR_MESSAGES } from '@/constants/api';

export async function authenticate(token, email, action) {
  try {
    await signIn('email', {
      redirect: false,
      token: token,
      email: email,
      action: action,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      // can access error.cause if instanceof AuthError
      const err = error.cause.err;

      switch (err.message) {
        case 'Invalid or expired sign-in link.':
          return {
            error: {
              message: err.message,
              status: STATUS_CODES.UNAUTHORIZED,
            },
          };

        default:
          return {
            error: {
              message: ERROR_MESSAGES.SERVER_ERROR,
              status: STATUS_CODES.SERVER_ERROR,
            },
          };
      }
    }

    throw error;
  }
}
