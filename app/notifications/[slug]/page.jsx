import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import AuthenticationFailed from '@/app/notifications/components/AuthenticationFailed';
import { Custom404Page } from '@/app/components/custom/error/404';
import { formatMetadata } from '@/utils/helper/formats/formatMetadata';

export async function generateMetadata({ params }) {
  return formatMetadata(params);
}

export default function NotificationsPage({ params }) {
  const { slug } = params;

  const renderNotificationComponent = () => {
    switch (slug) {
      case 'authentication-failed':
        return <AuthenticationFailed />;
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
        textAlign: 'center',
      }}
    >
      {renderNotificationComponent(slug)}
    </MainContainer>
  );
}
