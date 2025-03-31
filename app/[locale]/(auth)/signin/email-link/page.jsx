import { redirect } from 'next/navigation';

// internal imports
import { auth } from '@/auth';
import PageLayout from '@/components/layout/PageLayout';
import EmailAuthForm from '@/app/(features)/authentication/EmailAuthForm';
import { ACTIONS } from '@/constants/common';

export const metadata = {
  title: 'Sign In',
};

export default async function SignInEmailLinkPage() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <PageLayout marginY={10}>
      <EmailAuthForm action={ACTIONS.SIGNIN} />
    </PageLayout>
  );
}
