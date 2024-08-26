'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

export async function authenticate(token, email, action, callbackUrl) {
  try {
    const data = await signIn('email', {
      redirect: false,
      token: token,
      email: email,
      action: action,
    });

    if (data) {
      redirect(callbackUrl ?? '/');
    }
  } catch (error) {
    // can access error.cause when importing from '@/auth';
    const authError = error?.cause?.err;

    if (authError) {
      switch (authError.message) {
        case 'Email must be verified.':
          return {
            error: {
              message: authError.message,
            },
          };
        case 'Invalid or expired sign-in link.':
          return {
            error: {
              message: authError.message,
            },
          };

        default:
          return {
            error: {
              message: 'Internal Server Error',
            },
          };
      }
    }
    throw error;
  }
}
