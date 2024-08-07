import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import MySettingsTabs from '../components/tabs/MySettingsTabs';

export default async function MySettingsSlugPage({ params }) {
  const session = await auth();

  if (!session) redirect('/signin');

  const { slug } = params;

  const renderTabsComponent = () => {
    switch (slug) {
      case 'personal':
        return <MySettingsTabs slug={slug} />;
      case 'preferences':
        return <MySettingsTabs slug={slug} />;
      case 'security':
        return <MySettingsTabs slug={slug} />;

      default:
        redirect('/mysettings');
    }
  };

  return (
    <>
      <MainContainer>{renderTabsComponent(slug)}</MainContainer>
    </>
  );
}
