import VerifyToken from '@/app/(features)/authentication/components/VerifyToken';
import connectMongo from '@/services/db/connectMongo';
import CustomError from '@/components/errors/500';

export const metadata = {
  title: 'Verify Request',
};

export default async function VerifyAuthTokenPage({ searchParams }) {
  const { token, email, action, callbackUrl } = searchParams;

  try {
    await connectMongo();
  } catch (error) {
    return <CustomError />;
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
