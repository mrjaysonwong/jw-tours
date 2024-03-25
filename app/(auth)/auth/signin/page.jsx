import SignIn from '@/app/components/auth/signin/SignIn';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

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
