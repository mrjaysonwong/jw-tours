import { Grid, Card, Box } from '@mui/material';

import { StyledContainer } from '@/components/styled/StyledContainers';

const Checkout = () => {
  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100vh' }}></Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100vh' }}></Card>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Checkout;
