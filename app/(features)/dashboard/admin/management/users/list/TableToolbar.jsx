import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CsvBuilder } from 'filefy';
import { Box, Grid, Button, Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

// internal imports
import StatusTabsFilter from '@/components/tabs/StatusTabsFilter';
import TableFilterChip from '@/components/chips/TableFilterChip';
import { useTableToolbarContext } from '@/contexts/TableToolbarProvider';
import { getQueryParams } from '@/utils/queryParams';
import RoleFilter from './RoleFilter';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import { formatISO } from '@/utils/formats/formatDates';
import { userTabLabelsMap } from '@/constants/tabs';

const TableToolbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const searchParams = useSearchParams();
  const { debouncedText, users, onClearFilters } = useTableToolbarContext();
  const { searchQuery, tabParam, roleParam } = getQueryParams(searchParams);

  const handleExport = () => {
    // Define columns
    const columns = [
      'ID',
      'FirstName',
      'LastName',
      'Email',
      'Role',
      'Status',
      'Date Created',
    ];

    const orderedUsers = users.sort((a, b) =>
      a.lastName.localeCompare(b.lastName)
    );

    // Prepare the CSV data from users
    const csvData = orderedUsers.map((user) => [
      user._id,
      user.firstName,
      user.lastName,
      user.email[0].email,
      user.role,
      user.status,
      formatISO(user.createdAt),
    ]);

    // Create the CSV
    new CsvBuilder('users.csv')
      .setColumns(columns)
      .addRows(csvData)
      .exportFile();

    setIsDialogOpen(false);
  };

  return (
    <>
      <StatusTabsFilter tabLabelsMap={userTabLabelsMap} />

      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', alignItems: 'center', p: 2 }}
      >
        <Grid item xs={12} sm={3}>
          <RoleFilter />
        </Grid>

        <Grid item xs={6} sm={6}>
          <Button
            size="small"
            startIcon={<FilterAltOffIcon />}
            color="inherit"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Button
            fullWidth
            startIcon={<FileDownloadIcon />}
            variant="contained"
            onClick={() => setIsDialogOpen(true)}
          >
            Export
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography>
            <span style={{ fontWeight: 500, fontSize: '14px' }}>
              {users.length}
            </span>
            <span style={{ color: 'gray', marginLeft: '5px' }}>
              result{users.length > 1 ? 's' : ''} found
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

          {roleParam && <TableFilterChip filterType="Role" label={roleParam} />}

          {tabParam && <TableFilterChip filterType="Status" label={tabParam} />}
        </Box>
      </Grid>

      {isDialogOpen && (
        <ConfirmationDialog
          title="Export User List"
          buttonLabel="Download"
          type="export"
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          handleSubmit={handleExport}
        />
      )}
    </>
  );
};

export default React.memo(TableToolbar);
