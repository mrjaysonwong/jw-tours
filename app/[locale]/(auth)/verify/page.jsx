import connectMongo from '@/libs/connectMongo';
import VerifyToken from '@/app/(features)/authentication/VerifyToken';

export const metadata = {
  title: 'Verify Request',
};

export default async function VerifyAuthTokenPage({ searchParams }) {
  const { token, email, action, callbackUrl } = searchParams;

  try {
    await connectMongo();
  } catch (error) {
    throw error;
  }

  return (
    <VerifyToken
      token={token}
      email={email}
      action={action}
      callbackUrl={callbackUrl}
    />
  );
}
