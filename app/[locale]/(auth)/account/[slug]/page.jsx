import { redirect } from '@/navigation';
import { notFound } from 'next/navigation';
import connectMongo from '@/lib/connection';
import Token from '@/model/tokenModel/tokenModel';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import PasswordReset from '../components/PasswordReset';
import ForgotPassword from '../components/ForgotPassword';
import ResendVerificationLink from '../components/ResendVerificationLink';

export default async function AccountPage({ params, searchParams }) {
  const { slug } = params;
  const token = searchParams.token;

  if (!token && slug === 'reset-password') {
    redirect(notFound());
  }

  await connectMongo();

  const tokenExists = await Token.findOne({ 'email.token': token });

  const reqCount = await Token.findOne({
    'email.token': token,
    $or: [
      { 'email.requestCount': { $eq: 1 } },
      { 'email.requestCount': { $gt: 1 } },
    ],
  });

  const renderAccountComponent = () => {
    switch (slug) {
      case 'reset-password':
        return (
          <PasswordReset
            token={token}
            tokenExists={!!tokenExists}
            requestDone={!!reqCount}
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
    <MainContainer sx={{ alignItems: 'center' }}>
      {renderAccountComponent(slug)}
    </MainContainer>
  );
}
