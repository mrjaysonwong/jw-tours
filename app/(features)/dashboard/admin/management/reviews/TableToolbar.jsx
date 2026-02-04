import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Grid, Typography } from '@mui/material';

// internal imports
import StatusTabsFilter from '@/components/tabs/StatusTabsFilter';
import { reviewTabLabelsMap } from '@/constants/tabs';
import { getQueryParams } from '@/utils/queryParams';
import TableFilterChip from '@/components/chips/TableFilterChip';
import { useTableToolbarContext } from '@/contexts/TableToolbarProvider';

const TableToolbar = () => {
  const searchParams = useSearchParams();
  const { debouncedText, reviews } = useTableToolbarContext();
  const { searchQuery, tabParam } = getQueryParams(searchParams);

  return (
    <>
      <StatusTabsFilter tabLabelsMap={reviewTabLabelsMap} />

      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', alignItems: 'center', p: 2 }}
      >
        <Grid item xs={12}>
          <Typography>
            <span style={{ fontWeight: 500, fontSize: '14px' }}>
              {reviews.length}
            </span>
            <span style={{ color: 'gray', marginLeft: '5px' }}>
              result{reviews.length > 1 ? 's' : ''} found
            </span>
          </Typography>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            mx: 2,

            '& > :not(last-child)': {
              mr: 1,
            },
          }}
        >
          {debouncedText && searchQuery && (
            <TableFilterChip filterType="Keyword" label={searchQuery} />
          )}

          {tabParam && <TableFilterChip filterType="Status" label={tabParam} />}
        </Box>
      </Grid>
    </>
  );
};

export default React.memo(TableToolbar);
