import React, { Suspense } from 'react';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import PostDetails from '../components/PostDetails';
import { LoadingCircularProgress } from '../components/Loading';
import { formatMetadata } from '@/utils/helper/formats/formatMetadata';

export function generateMetadata({ params }) {
  return formatMetadata(params);
}

export default function BlogComponent({ params }) {
  const { slug } = params;

  return (
    <>
      <MainContainer
        sx={{
          mt: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Suspense fallback={<LoadingCircularProgress />}>
          <PostDetails slug={slug} />
        </Suspense>
      </MainContainer>
    </>
  );
}
