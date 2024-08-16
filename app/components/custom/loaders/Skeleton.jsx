import { Skeleton, Grid, Box } from '@mui/material';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const isPersonalTab = pathname.includes('personal');

  return (
    <>
      <Grid container sx={{ mt: isPersonalTab ? '6rem' : '4rem' }}>
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
      <Skeleton variant="circular" width={w} height={h} />
    </>
  );
}

export function LoadingSkeletonEmailCard({ h }) {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton variant="rectangular" key={index} sx={{ height: h, my: 2 }} />
      ))}
    </>
  );
}
