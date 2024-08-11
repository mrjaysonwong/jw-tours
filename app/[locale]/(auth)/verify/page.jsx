import Verify from '@/app/[locale]/(auth)/verify/components/Verify';
import connectMongo from '@/lib/connection';
import { createMetadata } from '@/utils/helper/common';

export function generateMetadata({ params: { locale } }) {
  return createMetadata(locale, 'verify_page', 'meta_title.verify_request');
}

export default async function VerifyPage({ searchParams }) {
  const { token, email, action, callbackUrl } = searchParams;

  try {
    await connectMongo();
  } catch (error) {
    throw error;
  }

  return (
    <>
      <Verify
        token={token}
        email={email}
        action={action}
        callbackUrl={callbackUrl}
      />
    </>
  );
}
