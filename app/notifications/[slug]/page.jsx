import { MainContainer } from '@/app/components/custom/styles/globals';
import AuthenticationFailed from '@/app/components/notifications/AuthenticationFailed';
import Custom404 from '@/app/components/custom/404';

export async function generateMetadata({ params }) {
  const formattedTitle = params.slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: formattedTitle,
  };
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
    <MainContainer sx={{ m: 2, textAlign: 'center' }}>
      {renderNotificationComponent(slug)}
    </MainContainer>
  );
}
