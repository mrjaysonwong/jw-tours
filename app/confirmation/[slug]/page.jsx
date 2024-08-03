import { auth } from '@/auth';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import { Custom404Page } from '@/app/components/custom/error/404';
import { formatMetadata } from '@/utils/helper/formats/formatMetadata';
import ConfirmSendLink from '../components/ConfirmSendLink';
import { redirect } from 'next/navigation';
import { findUserVerifiedEmail } from '@/utils/helper/query/User';
import {
  findTokenByEmail,
  findTokenRequestCount,
} from '@/utils/helper/query/Token';

export function generateMetadata({ params }) {
  return formatMetadata(params);
}

export default async function ConfirmationPage({ params, searchParams }) {
  const { slug } = params;
  const { email, action } = searchParams;

  const user = await findTokenByEmail(searchParams.email);
  // const session = await auth();

  // if (session) redirect('/');

  const renderConfirmationComponent = () => {
    switch (slug) {
      case 'send-link':
        if (!user) {
          return <Custom404Page />;
        }

        return <ConfirmSendLink email={email} action={action} />;
      default:
        return <Custom404Page />;
    }
  };

  return (
    <MainContainer
      sx={{
        mt: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {renderConfirmationComponent(slug)}
    </MainContainer>
  );
}
