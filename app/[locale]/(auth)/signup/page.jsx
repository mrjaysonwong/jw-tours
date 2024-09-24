import { auth } from '@/auth';
import { redirect } from '@/navigation';
import { createMetadata } from '@/helpers/metaHelpers';
import SignUpForm from '@/app/(features)/authentication/components/SignUpForm';

export async function generateMetadata({ params: { locale } }) {
  return createMetadata(locale, 'signup_page', 'meta_title.signup');
}

export default async function SignUpPage() {
  const session = await auth();

  if (session) {
    redirect('/');
  }
  return <SignUpForm />;
}
