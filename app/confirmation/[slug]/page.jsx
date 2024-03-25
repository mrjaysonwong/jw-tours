import { MainContainer } from '@/app/components/custom/styles/globals';
import Custom404 from '@/app/components/custom/error/404';
import { formatMetadata } from '@/utils/formatMetadata';
import ConfirmSigninLink from '@/app/components/confirmation/ConfirmSigninLink';
import { findTokenUser } from '@/utils/helper/findUser';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }) {
  return formatMetadata(params);
}

export default async function ConfirmationPage({ params, searchParams }) {
  const { slug } = params;

  const user = await findTokenUser(searchParams.email);
  const session = await auth();

  if (session) redirect('/');

  const renderConfirmationComponent = () => {
    switch (slug) {
      case 'send-link':
        if (!user) {
          return <Custom404 resource="resource" />;
        }

        return <ConfirmSigninLink />;
      default:
        return <Custom404 />;
    }
  };

  return (
    <MainContainer sx={{ mx: 4, textAlign: 'center' }}>
      {renderConfirmationComponent(slug)}
    </MainContainer>
  );
}
