import { Box, Typography } from '@mui/material';

import { StyledContainer } from '@/components/styled/StyledContainers';

export default function BoracayPage() {
  return (
    <StyledContainer>
      <Typography variant="h5">Boracay Page</Typography>

      <Box>
        <Typography>
          This Terms of Service (the &apos;Agreement&apos;) is a legal agreement
          between you (&apos;User&apos; or &apos;you&apos;) and JW Tours
          (&apos;Company,&apos; &apos;we,&apos; &apos;us,&apos; or
          &apos;our&apos;) governing your use of the JW Tours website (the
          &apos;Site&apos;) and any services offered therein.
        </Typography>
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography>
          By accessing or using the Site, you agree to be bound by this
          Agreement. If you do not agree with any part of this Agreement, you
          must not access or use the Site.
        </Typography>
      </Box>

      {Array.from({ length: 100 }).map((_, index) => (
        <Typography key={index} variant="h5">
          Boracay Page
        </Typography>
      ))}
    </StyledContainer>
  );
}
