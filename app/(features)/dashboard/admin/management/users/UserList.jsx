import { useState, useMemo } from 'react';
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
  const [orderBy, setOrderBy] = useState('fullName');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

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

    return users
      .map((user) => ({
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
      }))
      .filter((user) => {
        const matchesRole = !role || user.role === role;
        const matchesStatus =
          statusMap[value] === null || user.status === statusMap[value];

        return matchesRole && matchesStatus;
      });
  }, [users, role, value]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = users.map((e) => e._id);
      setSelected(newSelected);

      return;
    }

    // Deselect all items
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleClearFilters = () => {
    setRole('');
    setSearchTerm('');
    setPage(0);
    setValue(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    setPage(0);
  };

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

                {selected.length > 0 && (
                  <EnhancedTableToolbar numSelected={selected.length} />
                )}

                <TableContainer>
                  <TableContent
                    users={users}
                    filteredUsers={filteredUsers}
                    selected={selected}
                    order={order}
                    orderBy={orderBy}
                    handleRequestSort={handleRequestSort}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onSelectAllClick={handleSelectAllClick}
                    handleClick={handleClick}
                    total={total}
                  />
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
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
