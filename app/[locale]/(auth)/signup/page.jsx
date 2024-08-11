import SignUp from '@/app/[locale]/(auth)/signup/components/SignUp';
import { auth } from '@/auth';
import { redirect } from '@/navigation';
import { createMetadata } from '@/utils/helper/common';

export async function generateMetadata({ params: { locale } }) {
  return createMetadata(locale, 'signup_page', 'meta_title.signup');
}

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
