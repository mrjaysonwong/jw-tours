import React, { useState, useCallback } from 'react';
import { CsvBuilder } from 'filefy';
import { Grid, Button, Typography, Chip, Box } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

// internal imports
import { RoleFilter, TabsFilter } from '.';
import { statusMap } from './UserList';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';

const FilterChip = React.memo(
  ({ filterType, label, setSearchTerm, setValue, setRole }) => {
    const handleDelete = useCallback(() => {
      switch (filterType) {
        case 'Role':
          setRole('');
          break;
        case 'Status':
          setValue(0);
          break;
        default:
          setSearchTerm('');
      }
    }, [filterType, setRole, setValue, setSearchTerm]);

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
  }
);

FilterChip.displayName = 'FilterChip';

const TableToolbar = ({
  role,
  handleChangeRole,
  handleClearFilters,
  filteredUsers,
  value,
  handleChangeTab,
  users,
  debouncedText,
  setSearchTerm,
  setValue,
  setRole,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleExport = () => {
    // Define columns
    const columns = ['ID', 'FirstName', 'LastName', 'Email', 'Role', 'Status'];

    const orderedUsers = filteredUsers.sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    );

    // Prepare the CSV data from users
    const csvData = orderedUsers.map((user) => [
      user._id,
      user.firstName,
      user.lastName,
      user.email[0].email,
      user.role,
      user.status,
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
      <TabsFilter
        value={value}
        handleChangeTab={handleChangeTab}
        filteredUsers={filteredUsers}
        users={users}
      />

      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', alignItems: 'center', p: 2 }}
      >
        <Grid item xs={12} sm={3}>
          <RoleFilter role={role} handleChangeRole={handleChangeRole} />
        </Grid>

        <Grid item xs={6} sm={6}>
          <Button
            size="small"
            startIcon={<FilterAltOffIcon />}
            color="inherit"
            onClick={handleClearFilters}
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

        {(debouncedText || role || value > 0) && (
          <>
            <Grid item xs={12}>
              <Typography>
                <span style={{ fontWeight: 500, fontSize: '14px' }}>
                  {filteredUsers.length}
                </span>
                <span style={{ color: 'gray', marginLeft: '5px' }}>
                  results found
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
              {debouncedText && (
                <FilterChip
                  filterType="Keyword"
                  label={debouncedText}
                  setSearchTerm={setSearchTerm}
                />
              )}

              {role && (
                <FilterChip filterType="Role" label={role} setRole={setRole} />
              )}

              {value > 0 && (
                <FilterChip
                  filterType="Status"
                  label={statusMap[value]}
                  setValue={setValue}
                />
              )}
            </Box>
          </>
        )}
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
