import Verify from '@/app/(auth)/verify/components/Verify';
import connectMongo from '@/lib/connection';

export const metadata = {
  title: 'Verify Request',
};

export default async function VerifyPage({ searchParams }) {
  const { token, email, mode, callbackUrl } = searchParams;

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
        mode={mode}
        callbackUrl={callbackUrl}
      />
    </>
  );
}
