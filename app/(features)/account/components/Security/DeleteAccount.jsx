import { Typography, Button, Card, Grid, ButtonGroup } from '@mui/material';

import { StyledGridCard } from '@/components/styled/StyledCards';

export default function DeleteAccount() {
  return (
    <>
      <StyledGridCard
        sx={{
          p: 2,
          mt: 2,
          '&:hover': {
            color: 'inherit',
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3}>
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
              Delete Account
            </Typography>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Typography>
              Permanently delete your JW-Tours.com account
            </Typography>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Button size="small" variant="outlined">
              Delete My Account
            </Button>
          </Grid>
        </Grid>
      </StyledGridCard>
    </>
  );
}
