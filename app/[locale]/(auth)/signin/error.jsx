'use client';

import CustomError from '@/components/errors/500';

export default function Error({ error, reset }) {
  return <CustomError error={error} reset={reset} />;
}
