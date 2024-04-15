import EmailLink from '@/app/(auth)/signin/components/email/EmailLink';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Sign In',
};

export default async function SignInLinkPage() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <>
      <EmailLink />
    </>
  );
}
