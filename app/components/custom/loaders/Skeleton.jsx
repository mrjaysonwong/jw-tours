import { Skeleton, Grid } from '@mui/material';
import { usePathname } from '@/navigation';
import { useSearchParams } from 'next/navigation';

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
      <Grid container>
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

export function LoadingSkeletonButton({ h, w }) {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const isPersonal = pathname.includes('personal') && !query;



  return (
    <>
      {Array.from({ length: 1 }).map((_, index) => (
        <Skeleton
          variant="rectangular"
          key={index}
          sx={{ height: h, width: w, ml: 'auto', mt: isPersonal ? 7 : 2 }}
        />
      ))}
    </>
  );
}

export function LoadingSkeletonCard({ h }) {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton variant="rectangular" key={index} sx={{ height: h, mt: 2 }} />
      ))}
    </>
  );
}
