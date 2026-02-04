import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDebounce } from 'use-debounce';

// internal imports
import { filterParams } from '@/utils/queryParams';

export function useSyncSearchQuery({
  searchTerm,
  sortParam,
  pageParam,
  searchParams,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [debouncedQuery] = useDebounce(searchTerm, 1000);

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams);
    const keepParams = filterParams({
      q: debouncedQuery,
      sort: sortParam,
      page: pageParam,
    });

    if (debouncedQuery) {
      if (parseInt(pageParam, 10) === 1) {
        keepParams.delete('page');
      }

      keepParams.set('q', debouncedQuery);
      router.replace(`${pathname}?${keepParams.toString()}`);
    } else {
      queryParams.delete('q');
      queryParams.delete('page');
      router.replace(`${pathname}?${queryParams.toString()}`);
    }
  }, [debouncedQuery, pathname]);
}
