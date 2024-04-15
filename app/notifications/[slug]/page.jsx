import { MainContainer } from '@/app/components/global-styles/globals';
import AuthenticationFailed from '@/app/notifications/components/AuthenticationFailed';
import Custom404 from '@/app/components/custom/error/404';
import { formatMetadata } from '@/utils/formatMetadata';

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
        return <Custom404 />;
    }
  };

  return (
    <MainContainer sx={{ mx: 2, textAlign: 'center' }}>
      {renderNotificationComponent(slug)}
    </MainContainer>
  );
}
