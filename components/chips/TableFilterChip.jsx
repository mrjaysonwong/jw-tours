import React, { useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Typography, Chip, Box } from '@mui/material';

// internal imports
import { useTableToolbarContext } from '@/contexts/TableToolbarProvider';

const TableFilterChip = ({ filterType, label }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { setSearchTerm } = useTableToolbarContext();

  const handleDelete = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    switch (filterType) {
      case 'Role':
        params.delete('role');
        break;
      case 'Status':
        params.delete('tab');
        break;
      default:
        params.delete('q');
        params.delete('page');
        params.delete('limit');
        setSearchTerm('');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [filterType, pathname, setSearchTerm, searchParams, router]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 1,
        py: 0.5,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '14px',
        mt: 1,
        textTransform: filterType !== 'Keyword' && 'capitalize',
      }}
    >
      <Typography variant="body2" sx={{ mr: 1, fontWeight: 500 }}>
        {filterType}:
      </Typography>
      <Chip size="small" label={label} onDelete={handleDelete} />
    </Box>
  );
};

export default React.memo(TableFilterChip);
