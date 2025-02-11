import React, { Suspense } from 'react';
import PostDetails from '@/app/(features)/blog/PostDetails';
import { formatMetadata } from '@/utils/formats/formatMetadata';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';

export function generateMetadata({ params }) {
  return formatMetadata(params);
}

export default function BlogPostSlugDetails({ params }) {
  const { slug } = params;

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <PostDetails slug={slug} />
      </Suspense>
    </>
  );
}
