import { notFound } from 'next/navigation';
import { redirect } from '@/navigation';
import connectMongo from '@/services/db/connectMongo';
import Token from '@/models/tokenModel/tokenModel';
import { StyledAuthContainer } from '@/components/styled/StyledContainers';
import PasswordReset from '@/app/(features)/authentication/components/PasswordReset';
import ForgotPassword from '@/app/(features)/authentication/components/ForgotPassword';
import ResendVerificationLink from '@/app/(features)/authentication/components/ResendVerificationLink';

export default async function AccountActionPage({ params, searchParams }) {
  const { slug } = params;
  const token = searchParams.token;

  if (!token && slug === 'reset-password') {
    redirect(notFound());
  }

  await connectMongo();

  const tokenExists = await Token.findOne({ 'email.token': token }).select(
    'email.$'
  );

  const requestDone = tokenExists?.email[0].requestCount >= 1;

  const renderAccountComponent = () => {
    switch (slug) {
      case 'reset-password':
        return (
          <PasswordReset
            token={token}
            tokenExists={!!tokenExists}
            requestDone={requestDone}
          />
        );

      case 'forgot-password':
        return <ForgotPassword />;

      case 'resend-verification':
        return <ResendVerificationLink />;

      default:
        redirect(notFound());
    }
  };

  return (
    <StyledAuthContainer sx={{ alignItems: 'center' }}>
      {renderAccountComponent(slug)}
    </StyledAuthContainer>
  );
}
