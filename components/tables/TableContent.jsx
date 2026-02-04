import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// internal imports
import { useReviewListDataContext } from '@/contexts/ReviewListProvider';
import { formatISO } from '@/utils/formats/formatDates';
import ProfileAvatar from '@/components/images/ProfileAvatar';
import MoreVertMenu from '@/components/menus/MoreVertMenu';
import { statusLabelColorMap } from '@/constants/statusColorMaps';
import { StyledTableRow } from '@/components/styled/StyledTableRows';

const headCells = [
  { id: 'id', label: 'Review ID' },
  { id: 'lastName', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'tour', label: 'Tour' },
  { id: 'comment', label: 'Comment' },
  { id: 'rating', label: 'Rating' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Date Created' },
  { id: 'actions', label: 'Actions' },
];

const noSortHeader = ['Review ID', 'Email', 'Tour', 'Comment', 'Actions'];

const NoDataRow = () => {
  return (
    <TableRow sx={{ height: '40vh' }}>
      <TableCell colSpan={12} align="center">
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
  );
};

const CommentDialog = React.memo(({ open, comment, reviewer, onClose }) => (
  <Dialog open={open} onClose={onClose} fullWidth closeAfterTransition={false}>
    <DialogTitle>Full Comment</DialogTitle>
    <DialogContent>
      <Typography>&quot;{comment}&quot;</Typography>
    </DialogContent>
    <DialogContent sx={{ textAlign: 'right', overflowY: 'visible' }}>
      <Typography>- {reviewer}</Typography>
    </DialogContent>
  </Dialog>
));

const ReviewRow = React.memo(({ review, handleShow }) => {
  const name = `${review.user.firstName} ${review.user.lastName}`;
  const primaryEmail = review.user.email.find((e) => e.isPrimary === true);

  const statusColor = statusLabelColorMap[review.status];

  return (
    <StyledTableRow
      hover
      color={statusColor.color}
      alphacolor={statusColor.alphaColor}
    >
      <TableCell>{review._id}</TableCell>

      <TableCell component="th" scope="row" align="left">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ProfileAvatar user={review.user} h={32} w={32} m={2} ariaHidden />

          <span className="name">
            {review.user.lastName}, {review.user.firstName}
          </span>
        </Box>
      </TableCell>

      <TableCell align="left">{primaryEmail.email}</TableCell>

      <TableCell align="left" sx={{ minWidth: 150 }}>
        {review.tour.title}
      </TableCell>

      <TableCell align="left">
        <Typography
          sx={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {review.comment}
        </Typography>
        <Button
          color="secondary"
          size="small"
          onClick={() => handleShow(review.comment, name)}
        >
          Show
        </Button>
      </TableCell>

      <TableCell align="left" aria-label={`${review.rating} out of 5`}>
        {review.rating} / 5
      </TableCell>

      <TableCell align="left">
        <span className="status">{review.status}</span>
      </TableCell>

      <TableCell align="left">{formatISO(review.createdAt)}</TableCell>

      <TableCell align="left">
        <MoreVertMenu menuType="reviews-table" id={review._id} row={review} />
      </TableCell>
    </StyledTableRow>
  );
});

const ReviewTable = React.memo(({ handleShow }) => {
  const { reviews, onRequestSort, orderBy, order } =
    useReviewListDataContext();

  return (
    <>
      <Table stickyHeader sx={{ minWidth: 550 }} aria-label="review list table">
        <TableHead>
          <TableRow sx={(theme) => ({ th: { border: 'none' } })}>
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
          {reviews.map((review) => (
            <ReviewRow
              key={review._id}
              review={review}
              handleShow={handleShow}
            />
          ))}

          {reviews.length === 0 && <NoDataRow />}
        </TableBody>
      </Table>
    </>
  );
});

const TableContent = () => {
  const [dialog, setDialog] = useState({
    open: false,
    comment: '',
    reviewer: '',
  });

  const handleShow = useCallback((comment, reviewer) => {
    setDialog({ open: true, comment, reviewer });
  }, []);

  const handleClose = useCallback(() => {
    setDialog((d) => ({ ...d, open: false }));
  }, []);

  return (
    <>
      <ReviewTable handleShow={handleShow} />

      <CommentDialog
        open={dialog.open}
        comment={dialog.comment}
        reviewer={dialog.reviewer}
        onClose={handleClose}
      />
    </>
  );
};

export default React.memo(TableContent);
CommentDialog.displayName = 'CommentDialog';
ReviewRow.displayName = 'ReviewRow';
ReviewTable.displayName = 'ReviewTable';
