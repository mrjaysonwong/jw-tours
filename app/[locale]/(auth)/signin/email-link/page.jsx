import { auth } from '@/auth';
import { redirect } from '@/navigation';
import EmailLink from '@/app/(features)/authentication/components/EmailLink';

export const metadata = {
  title: 'Sign In',
};

export default async function SignInEmailLinkPage() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return <EmailLink />;
}
