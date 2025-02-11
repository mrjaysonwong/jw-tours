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

const headCells = [
  { id: 'fullName', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Role' },
  { id: 'status', label: 'Status' },
  { id: 'action', label: 'Action' },
];

const noSortColumns = ['Email', 'Action'];

const EnhancedTableHead = ({
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
    <TableHead sx={{ background: '#a9a9a91a' }}>
      <TableRow sx={{ th: { border: 'none' } }}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
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
};

const TableContent = ({
  users,
  filteredUsers,
  selected,
  order,
  orderBy,
  handleRequestSort,
  page,
  rowsPerPage,
  onSelectAllClick,
  handleClick,
  total,
}) => {
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const sortedUsers = useMemo(() => {
    return stableSort(filteredUsers, getComparator(order, orderBy));
  }, [filteredUsers, order, orderBy]);

  useMemo(() => {
    return sortedUsers.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [sortedUsers, page, rowsPerPage]);

  return (
    <Table sx={{ minWidth: 650 }} aria-label="user list table">
      <EnhancedTableHead
        numSelected={selected.length}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        rowCount={users.length}
        onSelectAllClick={onSelectAllClick}
      />
      <TableBody>
        {sortedUsers.map((row, index) => {
          const isItemSelected = isSelected(row._id);
          const labelId = `enhanced-table-checkbox-${index}`;
          const primaryEmail = row.email.find((e) => e.isPrimary === true);

          const statusColor = statusLabelColorMap[row.status];

          return (
            <TableRow
              hover
              key={row._id}
              role="checkbox"
              tabIndex={-1}
              sx={{
                '.name, .role , .status': {
                  textTransform: 'capitalize',
                },

                '.name': {
                  width: 120,
                },

                '.status': {
                  p: 0.8,
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 550,
                  color: statusColor.color,
                  bgcolor: statusColor.alphaColor,
                },
              }}
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
                    {row.firstName} {row.lastName}
                  </span>
                  {/* <span className="name">{row.fullName}</span> */}
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
                <MoreVertMenu menuType="table-users" userId={row._id} />
              </TableCell>
            </TableRow>
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

export default TableContent;
