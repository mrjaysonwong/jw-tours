import React, { Suspense } from 'react';
import Posts from '@/app/(features)/blog/Posts';
import { SkeletonPostList } from '@/components/loaders/Skeletons';
import { locales } from '@/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


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
