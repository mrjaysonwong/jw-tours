import SignUp from '@/app/(auth)/signup/components/SignUp';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Sign Up',
};

export default async function SignUpPage() {
  const session = await auth();

  if (session) {
    redirect('/');
  }
  return (
    <>
      <SignUp />
    </>
  );
}
