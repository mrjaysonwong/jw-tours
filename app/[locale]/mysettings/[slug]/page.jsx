import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import MySettingsTabs from '@/app/(features)/mysettings/MySettingsTabs';

export default async function MySettingsSlugPage({ params }) {
  const session = await auth();

  if (!session) redirect('/signin');

  const { slug } = params;

  const validSlugs = ['profile', 'preferences', 'payment', 'security'];

  if (!validSlugs.includes(slug)) redirect('/mysettings');

  return <MySettingsTabs />;
}
