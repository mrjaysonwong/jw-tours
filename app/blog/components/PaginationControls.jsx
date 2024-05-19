'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Pagination } from '@mui/material';

export default function PaginationControls({ totalCount }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageNum = +searchParams.get('page');

  const handleChange = async (event, value) => {
    router.push(`/blog?page=${value}`);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
        page={!pageNum ? 1 : pageNum}
        count={totalCount}
        onChange={handleChange}
      />
    </Box>
  );
}
