import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import MySettingsTabs from '@/app/(features)/account/components/MySettingsTabs';

export default function MySettingsPage({ params }) {
  const { slug } = params;

  const validSlugs = ['personal', 'preferences', 'security', 'payment'];

  if (!validSlugs.includes(slug)) {
    redirect('/mysettings');
  }

  return <MySettingsTabs slug={slug} />;
}
