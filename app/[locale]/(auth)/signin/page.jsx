import { auth } from '@/auth';
import { redirect } from '@/navigation';
import SignIn from './components/SignIn';


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
