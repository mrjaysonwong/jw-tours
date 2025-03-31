import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import { StyledContainer } from '@/components/styled/StyledContainers';
import Notifications from '@/app/(features)/notifications/Notifications';

export default async function NotificationsPage() {
  const session = await auth();

  if (!session) redirect('/');

  return (
    <StyledContainer
      sx={{ minHeight: '100%', width: { xs: 'auto', sm: '600px' } }}
    >
      <Notifications />
    </StyledContainer>
  );
}
