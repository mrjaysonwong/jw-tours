import Verify from '@/app/[locale]/(auth)/verify/components/Verify';
import connectMongo from '@/lib/connection';
import CustomError from '@/app/components/custom/error';

export const metadata = {
  title: 'Verify Request',
};


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
