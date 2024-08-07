import { auth } from '@/auth';
import EmailLink from '@/app/[locale]/(auth)/signin/components/email/EmailLink';
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
