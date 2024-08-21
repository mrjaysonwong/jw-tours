import Verify from '@/app/[locale]/(auth)/verify/components/Verify';
import connectMongo from '@/lib/connection';
import { createMetadata } from '@/utils/helper/common';
import CustomError from '@/app/components/custom/error';

export function generateMetadata({ params: { locale } }) {
  return createMetadata(locale, 'verify_page', 'meta_title.verify_request');
}

export default async function VerifyPage({ searchParams }) {
  const { token, email, action, callbackUrl } = searchParams;

  try {
    await connectMongo();
  } catch (error) {
    return <CustomError />;
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
