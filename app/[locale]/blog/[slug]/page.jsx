import React, { Suspense } from 'react';
import PostDetails from '@/app/(features)/blog/components/PostDetails';
import { StyledContainer } from '@/components/styled/StyledContainers';
import { LoadingSpinner } from '@/components/loaders/PageSpinners';
import { formatMetadata } from '@/utils/formats/formatMetadata';

export function generateMetadata({ params }) {
  return formatMetadata(params);
}

export default function BlogPostDetails({ params }) {
  const { slug } = params;

  return (
    <>
      <Suspense
        fallback={
          <StyledContainer sx={{ alignItems: 'center' }}>
            <LoadingSpinner />
          </StyledContainer>
        }
      >
        <PostDetails slug={slug} />
      </Suspense>
    </>
  );
}
