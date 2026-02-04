'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// internal imports
import {
  defaultPage,
  defaultLimit,
  allowedLimits,
} from '@/constants/pagination';
import { filterParams } from '@/utils/queryParams';

export function usePaginationQueryParams({
  totalCount,
  pageParam,
  limitParam,
  searchQuery,
  sortParam,
  tabParam,
  roleParam,
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Compute safe limit
  const limit = allowedLimits.includes(limitParam) ? limitParam : defaultLimit;

  // Compute safe page
  const maxPage = Math.max(1, Math.ceil(totalCount / limit));
  let page = parseInt(pageParam, 10);
  if (isNaN(page) || page < 1) page = defaultPage;
  if (page > maxPage) page = maxPage;

  // Normalize invalid page in URL
  useEffect(() => {
    if (pageParam !== page) {
      const queryParams = filterParams({
        page,
      });

      router.replace(`${pathname}?${queryParams.toString()}`);
    }
  }, [pageParam, page, pathname, router]);

  // Normalize invalid limit in URL
  useEffect(() => {
    if (!allowedLimits.includes(limitParam)) {
      const queryParams = filterParams({
        page: defaultPage,
        limit: defaultLimit,
      });

      router.replace(`${pathname}?${queryParams.toString()}`);
    }
  }, [limitParam, allowedLimits, defaultLimit, defaultPage, pathname]);

  // Handlers for TablePagination
  const setPage = (newPage) => {
    const queryParams = filterParams({
      q: searchQuery,
      sort: sortParam,
      tab: tabParam,
      role: roleParam,
      page: newPage,
      limit,
    });

    router.replace(`${pathname}?${queryParams.toString()}`);
  };

  const setLimit = (newLimit) => {
    const queryParams = filterParams({
      q: searchQuery,
      sort: sortParam,
      tab: tabParam,
      role: roleParam,
      page: defaultPage,
      limit: newLimit,
    });
    router.replace(`${pathname}?${queryParams.toString()}`);
  };

  return { page, limit, setPage, setLimit };
}
