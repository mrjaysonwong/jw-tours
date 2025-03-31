import React, { useMemo } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Checkbox,
  Box,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// internal imports
import ProfileAvatar from '@/components/images/ProfileAvatar';
import MoreVertMenu from '@/components/menus/MoreVertMenu';
import { stableSort, getComparator } from '@/utils/sort';
import { statusLabelColorMap } from '@/utils/colorMap';
import { StyledUserListTableRow } from '@/components/styled/StyledTableRows';
import { formatISO } from '@/utils/formats/formatDates';

const headCells = [
  { id: 'lastName', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Role' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Date Created' },
  { id: 'actions', label: 'Actions' },
];

const noSortColumns = ['Email', 'Actions'];

const EnhancedTableHead = React.memo(
  ({
    numSelected,
    order,
    orderBy,
    onRequestSort,
    rowCount,
    onSelectAllClick,
  }) => {
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow sx={{ th: { border: 'none' } }}>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all users',
                name: 'select-all',
              }}
            />
          </TableCell>

          {headCells.map((headCell) => {
            const shouldHide = noSortColumns.includes(headCell.label);

            return (
              <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={{ whiteSpace: 'nowrap' }}
              >
                {!shouldHide ? (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                ) : (
                  headCell.label
                )}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
);

EnhancedTableHead.displayName = 'EnhancedTableHead';

const TableContent = ({
  users,
  filteredUsers,
  selected,
  value,
  order,
  orderBy,
  handleRequestSort,
  onSelectAllClick,
  handleClick,
  total,
}) => {
  const isSelected = useMemo(() => {
    return (id) => selected.has(id);
  }, [selected]);

  const sortedUsers = useMemo(() => {
    return stableSort(filteredUsers, getComparator(order, orderBy));
  }, [filteredUsers, order, orderBy]);

  return (
    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="user list table">
      <EnhancedTableHead
        numSelected={selected.size}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        rowCount={value === 0 ? users.length : filteredUsers.length}
        onSelectAllClick={onSelectAllClick}
      />
      <TableBody>
        {sortedUsers.map((row, index) => {
          const isItemSelected = isSelected(row._id);
          const labelId = `enhanced-table-checkbox-${index}`;
          const primaryEmail = row.email.find((e) => e.isPrimary === true);
          const statusColor = statusLabelColorMap[row.status];

          return (
            <StyledUserListTableRow
              hover
              key={row._id}
              role="checkbox"
              tabIndex={-1}
              color={statusColor.color}
              alphacolor={statusColor.alphaColor}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  selected={isItemSelected}
                  onClick={(event) => handleClick(event, row._id)}
                  inputProps={{
                    'aria-labelledby': labelId,
                    id: `checkbox-${row._id}`,
                  }}
                />
              </TableCell>

              <TableCell id={labelId} scope="row">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ProfileAvatar user={row} h={32} w={32} m={2} />

                  <span className="name">
                    {row.lastName}, {row.firstName}
                  </span>
                </Box>
              </TableCell>

              <TableCell id={labelId} scope="row">
                {primaryEmail.email}
              </TableCell>

              <TableCell id={labelId} scope="row">
                <span className="role">{row.role}</span>
              </TableCell>

              <TableCell id={labelId} scope="row">
                <span className="status">{row.status}</span>
              </TableCell>

              <TableCell id={labelId} scope="row">
                <span>{formatISO(row.createdAt)}</span>
              </TableCell>

              <TableCell id={labelId} scope="row">
                <MoreVertMenu menuType="users-table" id={row._id} />
              </TableCell>
            </StyledUserListTableRow>
          );
        })}

        {(filteredUsers.length === 0 || total === 0) && (
          <TableRow sx={{ height: '40vh' }}>
            <TableCell colSpan={6} align="center">
              <Image
                src="https://res.cloudinary.com/dpyxciwcu/image/upload/v1736652221/jwtours/status/alert-folder_18157948_p41rkd.png"
                alt="No data icon"
                width={109}
                height={109}
                priority
              />
              <Typography sx={{ color: 'grey' }}>No data</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default React.memo(TableContent);
