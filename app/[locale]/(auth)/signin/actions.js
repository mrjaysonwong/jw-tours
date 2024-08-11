'use server';

import { signIn } from '@/auth';
import { redirect } from '@/navigation';
import { getTranslations } from 'next-intl/server';

export async function authenticate(formData, callbackUrl) {
  const t = await getTranslations('signin_page');
  const t1 = await getTranslations('common');

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
      if (authError.message.includes('google' || 'github' || 'facebook')) {
        return {
          error: {
            message: authError.message,
          },
        };
      }

      switch (authError.message) {
        case t('errors.invalid_credentials'):
          return {
            error: {
              message: authError.message,
            },
          };
        case t('errors.email_must_verified'):
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
