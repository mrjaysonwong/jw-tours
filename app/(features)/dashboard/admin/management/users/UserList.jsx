import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';
import {
  TableContainer,
  TablePagination,
  Typography,
  Paper,
  Box,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// internal imports
import { useUserListData } from '@/hooks/useUserListData';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import CustomError from '@/components/errors/CustomError';
import {
  TableContent,
  EnhancedTableToolbar,
  TableToolbar,
  SearchUser,
} from '.';

export const statusMap = {
  0: null,
  1: 'active',
  2: 'pending',
  3: 'suspended',
  4: 'inactive',
};

const UserList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('lastName');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState(new Set());

  const [role, setRole] = useState('');
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedText] = useDebounce(searchTerm, 1500);

  const { users, total, isLoading, isError, error } = useUserListData(
    debouncedText,
    page,
    rowsPerPage
  );

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter((user) => {
      const matchesRole = !role || user.role === role;
      const matchesStatus =
        statusMap[value] === null || user.status === statusMap[value];

      return matchesRole && matchesStatus;
    });
  }, [users, role, value]);

  const handleSelectAllClick = useCallback(
    (event) => {
      setSelected(
        event.target.checked ? new Set(users.map((e) => e._id)) : new Set()
      );
    },
    [users]
  );

  const handleClick = useCallback((event, id) => {
    setSelected((prevSelected) => {
      const newSelected = new Set(prevSelected);

      if (newSelected.has(id)) {
        newSelected.delete(id); // Deselect
      } else {
        newSelected.add(id); // Select
      }

      return newSelected;
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setRole('');
    setSearchTerm('');
    setPage(0);
    setValue(0);
  }, []);

  const handleRequestSort = useCallback(
    (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleChangeRole = useCallback((event) => {
    setRole(event.target.value);
  }, []);

  const handleChangeTab = useCallback((event, newValue) => {
    setValue(newValue);
    setPage(0);
  }, []);

  return (
    <>
      <Typography variant="h5">User List</Typography>

      <Box
        sx={{
          display: { xs: 'block', md: 'flex' },
          alignItems: 'center',
          my: 2,
        }}
      >
        <Box sx={{ width: { xs: 'auto', md: 300 } }}>
          <SearchUser
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setPage={setPage}
            setRole={setRole}
            setValue={setValue}
          />
        </Box>

        <Box sx={{ ml: 'auto', my: 2, textAlign: 'right' }}>
          <Link href="/admin/dashboard/users/add">
            <Button startIcon={<AddIcon />} variant="contained">
              Add New User
            </Button>
          </Link>
        </Box>
      </Box>

      {isLoading ? (
        <Paper sx={{ minHeight: '100dvh' }}>
          <LoadingSpinner h="100vh" />
        </Paper>
      ) : (
        <>
          {isError ? (
            <Paper sx={{ minHeight: '100dvh' }}>
              <CustomError error={error} h="100vh" />
            </Paper>
          ) : (
            <>
              <Paper sx={{ py: 2 }}>
                <TableToolbar
                  role={role}
                  handleChangeRole={handleChangeRole}
                  handleClearFilters={handleClearFilters}
                  filteredUsers={filteredUsers}
                  value={value}
                  handleChangeTab={handleChangeTab}
                  users={users}
                  debouncedText={debouncedText}
                  setSearchTerm={setSearchTerm}
                  setValue={setValue}
                  setRole={setRole}
                />

                {selected.size > 0 && (
                  <EnhancedTableToolbar numSelected={selected.size} />
                )}

                <TableContainer>
                  <TableContent
                    users={users}
                    filteredUsers={filteredUsers}
                    selected={selected}
                    order={order}
                    orderBy={orderBy}
                    handleRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    handleClick={handleClick}
                    total={total}
                  />
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, 250, 500]}
                  component="div"
                  count={role || value ? filteredUsers.length : total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  slotProps={{
                    select: {
                      name: 'select-option-page',
                    },
                  }}
                  sx={{ mr: 2 }}
                />
              </Paper>
            </>
          )}
        </>
      )}
    </>
  );
};

export default UserList;
