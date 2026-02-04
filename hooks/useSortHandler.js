import { useCallback, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function useSortHandler(defaultField = 'createdAt', defaultOrder = 'asc') {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

  const [orderBy, setOrderBy] = useState(defaultField);
  const [order, setOrder] = useState(defaultOrder);

  const handleRequestSort = useCallback(
    (field) => {
      const isAsc = orderBy === field && order === 'asc';
      const newOrder = isAsc ? 'desc' : 'asc';
      setOrderBy(field);
      setOrder(newOrder);

      const params = new URLSearchParams(searchParams);
      params.set('sort', `${field}_${newOrder}`);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [orderBy, order, searchParams, pathname, router]
  );

  return { orderBy, order, handleRequestSort };
}
