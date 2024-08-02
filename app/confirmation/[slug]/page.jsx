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
  const session = await auth();

  if (session) {
    redirect('/');
  }

  const { slug } = params;
  const { email, action } = searchParams;

  // // Fetch data
  const emailIsVerified = await findUserVerifiedEmail(email);
  const userTokenExists = await findTokenByEmail(email);
  const verifiedOnce = await findTokenRequestCount(email);

  // Determine if redirection is needed
  const shouldRedirect = slug === 'send-link' && (!email || !action);

  // const shouldRedirect =
  //   slug === 'send-link' &&
  //   (!email ||
  //     !action ||
  //     (action === 'signin' && !emailIsVerified) ||
  //     (action === 'signup' && emailIsVerified) ||
  //     (action === 'signin' && !userTokenExists) ||
  //     (action === 'signin' && verifiedOnce));

  if (shouldRedirect) {
    redirect('/signin/link');
  }

  // Render component based on slug
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
      {slug === 'send-link' ? (
        <ConfirmSendLink email={email} action={action} />
      ) : (
        <Custom404Page />
      )}
    </MainContainer>
  );
}
