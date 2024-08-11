import { auth } from '@/auth';
import EmailLink from '@/app/[locale]/(auth)/signin/components/email/EmailLink';
import { redirect } from '@/navigation';
import { createMetadata } from '@/utils/helper/common';

export async function generateMetadata({ params: { locale } }) {
  return createMetadata(locale, 'signin_page', 'meta_title.signin');
}
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
