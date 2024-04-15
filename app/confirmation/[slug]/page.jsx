import { MainContainer } from '@/app/components/global-styles/globals';
import Custom404 from '@/app/components/custom/error/404';
import { formatMetadata } from '@/utils/formatMetadata';
import ConfirmSendLink from '../components/ConfirmSendLink';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { findTokenUser, findUser } from '@/utils/helper/findUser';

export async function generateMetadata({ params }) {
  return formatMetadata(params);
}

export default async function ConfirmationPage({ params, searchParams }) {
  const session = await auth();

  if (session) redirect('/');

  const { slug } = params;
  const { email, mode } = searchParams;

  const user = await findUser(searchParams.email);
  const isVerified = user?.isVerified === true;

  const userTokenExists = await findTokenUser(searchParams.email);
  const renderConfirmationComponent = () => {
    switch (slug) {
      case 'send-link':
        if (!userTokenExists || (mode === 'signup' && isVerified)) {
          redirect('/signin/link');
        }

        return <ConfirmSendLink email={email} mode={mode} />;
      default:
        return <Custom404 />;
    }
  };

  return (
    <MainContainer sx={{ mx: 2, textAlign: 'center' }}>
      {renderConfirmationComponent(slug)}
    </MainContainer>
  );
}
