import { Typography } from '@mui/material';
import { StyledContainer as MainContainer } from '../components/global-styles/globals';

export default async function ProtectedPage() {
  return (
    <MainContainer>
      <Typography variant="h4" sx={{ mt: 12 }}>
        Protected Page
      </Typography>
    </MainContainer>
  );
}
