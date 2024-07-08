import { Skeleton, Grid } from '@mui/material';

function SkeletonGrid() {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Skeleton width="40%" height={30} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton width="60%" height={30} sx={{ mb: { xs: 2, lg: 3 } }} />
      </Grid>

      <Grid item xs={12} md={6}>
        <Skeleton width="60%" height={30} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton width="80%" height={30} sx={{ mb: { xs: 2, lg: 3 } }} />
      </Grid>
    </>
  );
}

export function LoadingSkeletonGrid() {
  return (
    <>
      <Grid container sx={{ mt: '4.5rem' }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonGrid key={index} />
        ))}
      </Grid>
    </>
  );
}

export function LoadingSkeletonAvatar({ w, h }) {
  return (
    <>
      <Skeleton variant="circular" width={w} height={h}  />
    </>
  );
}
