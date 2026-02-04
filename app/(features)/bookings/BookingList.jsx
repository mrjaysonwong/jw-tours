'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Button,
} from '@mui/material';

// internal imports
import { formatISOlong } from '@/utils/formats/formatDates';
import CancelBookingDialog from './CancelBookingDialog';
import LeaveReviewDialog from './LeaveReviewDialog';
import { bookingStatusColorMap } from '@/constants/statusColorMaps';
import { getCancellationStatus } from '@/utils/common';

const INITIAL_VISIBLE = 6;
const LOAD_MORE_COUNT = 3;

const BookingList = ({ bookings }) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const bookingIdRef = useRef(null);
  const paymentIntentIdRef = useRef(null);
  const transactionIdRef = useRef(null);
  const isCancellableRef = useRef(null);

  const reviewRef = useRef(null);

  const router = useRouter();

  const visibleBookings = bookings.slice(0, visibleCount);

  const hasMore = visibleCount < bookings.length;

  const handleClickCancelBooking = (
    bookingId,
    paymentIntentId,
    isCancellable,
    transactionId
  ) => {
    setIsCancelDialogOpen(true);
    bookingIdRef.current = bookingId;
    paymentIntentIdRef.current = paymentIntentId;
    transactionIdRef.current = transactionId;
    isCancellableRef.current = isCancellable;
  };

  const handleClickLeaveReview = (bookingId, tour, booker) => {
    setIsReviewDialogOpen(true);

    reviewRef.current = {
      booking: bookingId,
      tour: tour._id,
      tourImage: tour.images[0].url,
      user: booker,
    };
  };

  return (
    <>
      <Grid container spacing={2} sx={{ my: 2 }}>
        {visibleBookings.map((booking, index) => {
          const {
            _id,
            tour,
            bookingRequest,
            bookingDate,
            bookingId,
            booker,
            status,
            paymentIntentId,
            transactionId,
          } = booking;

          const { isUpcomingTour, isCancellable } = getCancellationStatus(
            bookingRequest.tourDate,
            tour.freeCancellation.cutOffHours
          );

          const bookingStatus =
            status === 'cancelled'
              ? 'cancelled'
              : isUpcomingTour
              ? 'upcoming'
              : 'completed';

          const isReviewNotRejected = booking.tourReview?.status !== 'rejected';

          return (
            <Grid key={index} item xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  image={tour.images[0].url}
                  height={150}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ fontWeight: 550 }}>
                      {tour.title}
                    </Typography>

                    <Chip
                      size="small"
                      label={
                        <Typography
                          variant="caption"
                          color={bookingStatusColorMap[bookingStatus]}
                          sx={{ fontWeight: 500, textTransform: 'capitalize' }}
                        >
                          {bookingStatus}
                        </Typography>
                      }
                      sx={{ ml: 1 }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {tour.destination.name}, {tour.destination.country}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Box>
                      <Typography variant="body2">Tour Date</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatISOlong(bookingRequest.tourDate)}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2">Reference ID</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {bookingId}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">Booking Date</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatISOlong(bookingDate)}
                    </Typography>
                  </Box>
                </CardContent>

                <Divider />

                <CardActions sx={{ m: 1, justifyContent: 'right' }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => router.push(`/bookings/${_id}`)}
                  >
                    View details
                  </Button>

                  {!['cancelled', 'completed'].includes(bookingStatus) &&
                    isCancellable && (
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleClickCancelBooking(
                            bookingId,
                            paymentIntentId,
                            isCancellable,
                            transactionId
                          )
                        }
                      >
                        Cancel Booking
                      </Button>
                    )}

                  {bookingStatus === 'completed' &&
                    booking.tourReview.status !== 'approved' && (
                      <Button
                        color="secondary"
                        size="small"
                        variant="contained"
                        disabled={isReviewNotRejected}
                        onClick={() =>
                          handleClickLeaveReview(_id, tour, booker)
                        }
                      >
                        {booking.tourReview.status === 'pending'
                          ? 'Review pending'
                          : 'Leave a review'}
                      </Button>
                    )}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 7 }}>
          <Button
            variant="contained"
            onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
          >
            Load More
          </Button>
        </Box>
      )}

      {isCancelDialogOpen && (
        <CancelBookingDialog
          isDialogOpen={isCancelDialogOpen}
          setIsDialogOpen={setIsCancelDialogOpen}
          bookingId={bookingIdRef.current}
          paymentIntentId={paymentIntentIdRef.current}
          transactionId={transactionIdRef.current}
          isCancellable={isCancellableRef.current}
        />
      )}

      {isReviewDialogOpen && (
        <LeaveReviewDialog
          isDialogOpen={isReviewDialogOpen}
          setIsDialogOpen={setIsReviewDialogOpen}
          reviewData={reviewRef.current}
        />
      )}
    </>
  );
};

export default BookingList;
