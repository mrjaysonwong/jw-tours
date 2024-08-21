import { redirect } from '@/navigation';
import { notFound } from 'next/navigation';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import PasswordReset from '../components/PasswordReset';
import connectMongo from '@/lib/connection';
import Token from '@/model/tokenModel/tokenModel';

export default async function AccountPage({ params, searchParams }) {
  const { slug } = params;
  const token = searchParams.token;

  if (!token) {
    redirect(notFound());
  }

  await connectMongo();

  const tokenExists = await Token.findOne({ 'email.token': token });

  const renderAccountComponent = () => {
    switch (slug) {
      case 'reset-password':
        return <PasswordReset token={token} tokenExists={tokenExists} />;

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
