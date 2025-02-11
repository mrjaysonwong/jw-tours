'use server';

import { signIn } from '@/auth';
import { redirect } from '@/navigation';
import { AuthError } from 'next-auth';
import connectMongo from '@/services/db/connectMongo';
import { findUser } from '@/services/user/userQueries';
import { ERROR_MESSAGES } from '@/constants/api';

const errorKeyWords = [
  'sign-in method',
  'not allowed to sign in',
  'Email must be verified',
  'Invalid Credentials',
];

export async function authenticate(formData, pathname) {
  try {
    const data = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
      pathname,
    });

    await connectMongo();
    const userExists = await findUser({ email: formData.email });

    const isAdmin = userExists.role === 'admin';
    const isAdminPath = pathname.startsWith('/admin');

    const adminDashboard = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard`;
    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}` ?? '/';

    if (data && isAdmin && isAdminPath) {
      redirect(adminDashboard);
    } else if (data) {
      redirect(callbackUrl);
    }
  } catch (error) {
    if (error instanceof AuthError) {
      // can access error.cause if instanceof AuthError
      const err = error.cause.err;

      if (errorKeyWords.some((message) => err.message.includes(message))) {
        return {
          error: {
            message: err.message,
          },
        };
      }
    }

    throw error;
  }
}
