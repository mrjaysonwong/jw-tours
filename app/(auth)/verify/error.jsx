'use client';

import CustomError from '@/app/components/custom/error';

export default function Error({ error, reset }) {
  return <CustomError reset={reset} />;
}
