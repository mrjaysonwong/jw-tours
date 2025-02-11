import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AccountSettings from '@/app/(features)/mysettings/AccountSettings';

export default async function AccountSettingsPage() {
  const session = await auth();

  if (!session) redirect('/');

  return <AccountSettings />;
}
