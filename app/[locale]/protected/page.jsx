import { Typography } from '@mui/material';
import { StyledContainer } from '@/components/styled/StyledContainers';


export default function ProtectedPage() {
  return (
    <StyledContainer>
      <Typography variant="h4" sx={{ mt: 12 }}>
        Protected Page
      </Typography>
    </StyledContainer>
  );
}
