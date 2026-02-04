import { TablePagination } from '@mui/material';

const CustomTablePagination = ({
  allowedLimits,
  totalCount,
  limit,
  page,
  setPage,
  setLimit,
}) => {
  return (
    <TablePagination
      rowsPerPageOptions={allowedLimits}
      component="div"
      count={totalCount}
      rowsPerPage={limit}
      page={page - 1}
      onPageChange={(e, newPage) => setPage(newPage + 1)}
      onRowsPerPageChange={(e) => setLimit(e.target.value)}
      slotProps={{
        select: {
          name: 'select-option-page',
        },
      }}
      sx={{ mr: 2 }}
    />
  );
};

export default CustomTablePagination;
