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
    <Box
      sx={{
        my: 5,
      }}
    >
      <Grid container spacing={4}>
        {Array.from({ length: 12 }).map((_, index) => (
          <PostListSkeleton key={index} />
        ))}
      </Grid>
    </Box>
  );
}

export function LoadingCircularProgress() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
