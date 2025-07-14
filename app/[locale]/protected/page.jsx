import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Typography } from '@mui/material';

import { StyledContainer } from '@/components/styled/StyledContainers';

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) redirect('/signin');

  return (
    <StyledContainer>
      <Typography variant="h5">Protected Page</Typography>
    </StyledContainer>
  );
}
