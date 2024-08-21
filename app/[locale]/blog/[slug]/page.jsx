import React, { Suspense } from 'react';
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
      <Suspense fallback={<LoadingCircularProgress />}>
        <PostDetails slug={slug} />
      </Suspense>
    </>
  );
}
