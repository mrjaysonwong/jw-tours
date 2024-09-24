import React, { Suspense } from 'react';
import Posts from '@/app/(features)/blog/components/Posts';
import { SkeletonPostList } from '@/components/loaders/Skeletons';

export const metadata = {
  title: 'Blog',
};

export default function BlogPage({ searchParams }) {
  return (
    <>
      <Suspense fallback={<SkeletonPostList />}>
        <Posts searchParams={searchParams} />
      </Suspense>
    </>
  );
}
