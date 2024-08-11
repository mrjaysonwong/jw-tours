'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export async function authenticate(token, email, action, callbackUrl) {
  const t = await getTranslations('signin_page');
  const t1 = await getTranslations('common');

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
        case t('errors.email_must_verified'):
          return {
            error: {
              message: authError.message,
            },
          };
        case t('errors.invalid_signin_link'):
          return {
            error: {
              message: authError.message,
            },
          };

        default:
          return {
            error: {
              message: t1('errors.internal_server'),
            },
          };
      }
    }
    throw error;
  }
}
