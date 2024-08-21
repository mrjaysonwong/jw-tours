import React, { Suspense } from 'react';
import Posts from './components/Posts';
import { LoadingPostList } from './components/Loading';

export const metadata = {
  title: 'Blog',
};

export default function BlogPage({ searchParams }) {
  return (
    <>
      <Suspense fallback={<LoadingPostList />}>
        <Posts searchParams={searchParams} />
      </Suspense>
    </>
  );
}
