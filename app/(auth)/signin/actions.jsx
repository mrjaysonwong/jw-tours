'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

export async function authenticate(formData, callbackUrl) {
  try {
    const data = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (data) {
      redirect(callbackUrl ?? '/');
    }
  } catch (error) {
    // can access error.cause when importing from '@/auth';
    const authError = error?.cause?.err;

    if (authError) {
      if (authError.message.includes('sign-in method')) {
        return {
          error: {
            message: authError.message,
          },
        };
      }

      switch (authError.message) {
        case 'Invalid Credentials':
          return {
            error: {
              message: authError.message,
            },
          };
        case 'Verify Email First':
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
