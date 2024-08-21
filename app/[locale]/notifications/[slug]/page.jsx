import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import AuthenticationFailed from '@/app/[locale]/notifications/components/AuthenticationFailed';
import { Custom404Page } from '@/app/components/custom/error/404';
import { createMetadata } from '@/utils/helper/common';
import { useTranslations } from 'next-intl';

export function generateMetadata({ params: { locale } }) {
  return createMetadata(
    locale,
    'notifications_page',
    'meta_title.notifications'
  );
}

export default function NotificationsPage({ params }) {
  const { slug } = params;

  const t1 = useTranslations('common');

  const renderNotificationComponent = () => {
    switch (slug) {
      case 'authentication-failed':
        return <AuthenticationFailed t1={t1} />;
      default:
        return <Custom404Page />;
    }
  };

  return (
    <MainContainer
      sx={{
        textAlign: 'center',
        alignItems: 'center',
      }}
    >
      {renderNotificationComponent(slug)}
    </MainContainer>
  );
}
