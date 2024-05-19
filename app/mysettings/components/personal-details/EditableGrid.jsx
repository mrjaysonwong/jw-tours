import { Typography, Grid, Button, Box } from '@mui/material';
import { LoadingSkeletonGrid } from '@/app/components/custom/loaders/Skeleton';

export default function EditableGrid({ user, isLoading }) {
  if (isLoading) {
    return <LoadingSkeletonGrid />;
  }

  return (
    <>
      <Box
        sx={{
          textAlign: 'right',
        }}
      >
        <Button size="small" variant="contained">
          Edit
        </Button>
      </Box>

      <Grid
        container
        sx={{
          '.item-container': {
            width: '100%',
            borderBottom: 1,
            borderColor: 'divider',
            py: 2,
            px: { md: 0, lg: 2 },
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: { xs: 'left', lg: 'center' },

            button: {
              textTransform: 'none',
              ml: 'auto',
            },
          },
        }}
      >
        <Box className="item-container">
          <Grid item xs={12} md={6}>
            <Typography>Name</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              {user.firstName} {user.lastName}
            </Typography>
          </Grid>
        </Box>

        <Box className="item-container">
          <Grid item xs={12} md={6}>
            <Typography>Email address</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>contactme.jwong@gmail.com</Typography>
          </Grid>
        </Box>

        <Box className="item-container">
          <Grid item xs={12} md={6}>
            <Typography>Phone Number</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>+1 888 926 2289</Typography>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}
