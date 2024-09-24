import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import { StyledContainer } from '@/components/styled/StyledContainers';

export default async function AdminDashboardPage() {
  const session = await auth();
  const role = session?.user?.role;

  if (!session || role !== 'admin') {
    redirect('/admin/signin');
  }

  return <StyledContainer>Admin Dashboard Page</StyledContainer>;
}
