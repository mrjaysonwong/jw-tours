import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import { Box, Grid, Skeleton, CircularProgress } from '@mui/material';

function PostListSkeleton() {
  return (
    <>
      <Grid item xs={12} md={4} lg={4}>
        <Skeleton variant="rectangular" width="100%" height={140} />
        <Box sx={{ m: 2 }}>
          <Skeleton width="40%" height={40} sx={{ mb: 1 }} />
          <Skeleton width="90%" />
          <Skeleton width="70%" />
        </Box>
      </Grid>
    </>
  );
}

export function LoadingPostList() {
  return (
    <MainContainer>
      <Grid container spacing={5} sx={{ mt: 5 }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <PostListSkeleton key={index} />
        ))}
      </Grid>
    </MainContainer>
  );
}

export function LoadingCircularProgress() {
  return (
    <MainContainer sx={{ alignItems: 'center' }}>
      <CircularProgress />
    </MainContainer>
  );
}
