import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SignIn from '@/app/(auth)/signin/components/SignIn';

export const metadata = {
  title: 'Sign In',
};

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <>
      <SignIn />
    </>
  );
}
