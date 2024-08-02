import React, { Suspense } from 'react';
import { Typography, Box } from '@mui/material';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import Posts from './components/Posts';
import { LoadingPostList } from './components/Loading';
import SearchBar from './components/SearchBar';

export const metadata = {
  title: 'Blog',
};

export default function BlogPage({ searchParams }) {
  return (
    <MainContainer>
      <Box
        sx={{
          mt: '7rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">Blog</Typography>

        <SearchBar />
      </Box>

      <Suspense fallback={<LoadingPostList />}>
        <Posts searchParams={searchParams} />
      </Suspense>
    </MainContainer>
  );
}
