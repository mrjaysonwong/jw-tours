'use client';

import Error from '../error';

export default function ErrorPage({ searchParams }) {
  const hasQueryError = !!searchParams.error;

  return <Error hasQueryError={hasQueryError} />;
}
