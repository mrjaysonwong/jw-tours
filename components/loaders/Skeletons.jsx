import { Skeleton, Grid, IconButton, Box } from '@mui/material';
import { usePathname } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import { StyledContainer } from '@/components/styled/StyledContainers';

const SkeletonTextItem = () => {
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
};

export const SkeletonDetailsGrid = () => {
  return (
    <>
      <Grid container sx={{ mt: 2 }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonTextItem key={index} />
        ))}
      </Grid>
    </>
  );
};

export const SkeletonCircular = ({ w, h, l }) => {
  return (
    <>
      {Array.from({ length: l }).map((_, index) => (
        <IconButton key={index} sx={{ ml: 'auto' }}>
          <Skeleton variant="circular" width={w} height={h} />
        </IconButton>
      ))}
    </>
  );
};

export const SkeletonButton = ({ h = 32, w = 70, l = 1 }) => {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const isPersonal = pathname.includes('personal') && !query;

  return (
    <>
      {Array.from({ length: l }).map((_, index) => (
        <Skeleton
          variant="rectangular"
          key={index}
          sx={{ height: h, width: w, ml: 'auto', mt: isPersonal ? 6 : 2 }}
        />
      ))}
    </>
  );
};

export const SkeletonCard = ({ h = '55dvh', l = 1, mt = 0 }) => {
  return (
    <>
      {Array.from({ length: l }).map((_, index) => (
        <Skeleton
          variant="rectangular"
          key={index}
          sx={{ height: h, mt: mt }}
        />
      ))}
    </>
  );
};

const SkeletonPostItem = () => {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Skeleton variant="rectangular" width="100%" height={140} />
      <Box sx={{ m: 2, height: '130px' }}>
        <Skeleton width="40%" height={40} sx={{ mb: 1 }} />
        <Skeleton width="90%" />
        <Skeleton width="70%" />
        <Skeleton width="50%" />
      </Box>
    </Grid>
  );
};

export const SkeletonPostList = () => {
  return (
    <StyledContainer>
      <Grid container spacing={3} sx={{ mt: 7 }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonPostItem key={index} />
        ))}
      </Grid>
    </StyledContainer>
  );
};

export const SkeletonReviewList = ({ l = 3 }) => {
  return (
    <>
      {Array.from({ length: l }).map((_, index) => (
        <Box key={index} sx={{ my: 2 }}>
          <Skeleton width="120px" height={30} />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ p: 2 }} />

            <Box sx={{ flexDirection: 'column', width: '100%', ml: 1 }}>
              <Skeleton width="100px" height={30} />
              <Skeleton width="120px" height={30} />
            </Box>
          </Box>

          <Box>
            <Skeleton width="95%" height={30} />
            <Skeleton width="80%" height={30} />
          </Box>
        </Box>
      ))}
    </>
  );
};
