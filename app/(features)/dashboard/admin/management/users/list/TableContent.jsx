import React, { useCallback, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
  Box,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// internal imports
import { useUserListContext } from '@/contexts/UserProvider';
import { formatISO } from '@/utils/formats/formatDates';
import ProfileAvatar from '@/components/images/ProfileAvatar';
import MoreVertMenu from '@/components/menus/MoreVertMenu';
import { statusLabelColorMap } from '@/constants/statusColorMaps';
import { StyledTableRow } from '@/components/styled/StyledTableRows';
import NoDataRow from '@/components/tables/NoDataRow';

const headCells = [
  { id: 'lastName', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Role' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Date Created' },
  { id: 'actions', label: 'Actions' },
];

const noSortHeader = ['Email', 'Role', 'Status', 'Actions'];

const UserRow = React.memo(({ user, isSelected, onRowSelect }) => {
  const isItemSelected = isSelected(user._id);

  const labelId = `checkbox-${user._id}`;
  const primaryEmail = user.email.find((e) => e.isPrimary === true);

  const statusColor = statusLabelColorMap[user.status];

  return (
    <StyledTableRow
      hover
      color={statusColor.color}
      alphacolor={statusColor.alphaColor}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          selected={isItemSelected}
          onClick={(event) => onRowSelect(event, user._id)}
          inputProps={{
            'aria-labelledby': labelId,
            name: labelId,
          }}
        />
      </TableCell>

      <TableCell id={labelId} component="th" scope="row" align="left">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ProfileAvatar user={user} h={32} w={32} m={2} ariaHidden />

          <span className="name">
            {user.lastName}, {user.firstName}
          </span>
        </Box>
      </TableCell>

      <TableCell align="left">{primaryEmail.email}</TableCell>

      <TableCell align="left">
        <span className="role">{user.role}</span>
      </TableCell>

      <TableCell align="left">
        <span className="status">{user.status}</span>
      </TableCell>

      <TableCell align="left">{formatISO(user.createdAt)}</TableCell>

      <TableCell align="left">
        <MoreVertMenu menuType="users-table" id={user._id} row={user} />
      </TableCell>
    </StyledTableRow>
  );
});

const UserTable = React.memo(() => {
  const {
    users,
    onRequestSort,
    orderBy,
    order,
    selected,
    onRowSelect,
    onSelectAll,
  } = useUserListContext();

  const isSelected = useCallback((id) => selected.has(id), [selected]);

  const allIds = useMemo(() => users.map((u) => u._id), [users]);

  const numSelected = selected.size;
  const rowCount = users.length;

  return (
    <>
      <Table stickyHeader sx={{ minWidth: 550 }} aria-label="user list table">
        <TableHead>
          <TableRow sx={(theme) => ({ th: { border: 'none' } })}>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={(e) => onSelectAll(e, allIds)}
                inputProps={{
                  'aria-label': 'select all users',
                  name: 'select-all',
                }}
              />
            </TableCell>

            {headCells.map((headCell) => {
              const shouldHide = noSortHeader.includes(headCell.label);

              return (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                  component="th"
                  scope="col"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  {!shouldHide ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => onRequestSort(headCell.id)}
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

        <TableBody>
          {users.map((user, index) => (
            <UserRow
              key={user._id}
              user={user}
              isSelected={isSelected}
              onRowSelect={onRowSelect}
            />
          ))}

          {users.length === 0 && <NoDataRow />}
        </TableBody>
      </Table>
    </>
  );
});

const TableContent = () => {
  return <UserTable />;
};

export default React.memo(TableContent);

UserRow.displayName = 'UserRow';
UserTable.displayName = 'UserTable';
