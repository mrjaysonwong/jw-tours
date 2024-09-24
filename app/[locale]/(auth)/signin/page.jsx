import { auth } from '@/auth';
import { redirect } from '@/navigation';
import SignInForm from '@/app/(features)/authentication/components/SignInForm';

export const metadata = {
  title: 'Sign In',
};

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return <SignInForm />;
}
