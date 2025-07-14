import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Grid,
  Divider,
  Button,
} from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

// internal imports
import { StyledContainer } from '@/components/styled/StyledContainers';
import { formatISOlong } from '@/utils/formats/formatDates';
import { formatLastName, formatNumber } from '@/utils/formats/common';
import { bookingStatusColorMap } from '@/constants/statusColorMaps';
import HistoryBackButton from '@/components/buttons/HistoryBackButton';

const BookingDetails = ({ booking }) => {
  const {
    tour,
    bookingDate,
    bookingRequest,
    transactionId,
    bookingId,
    status,
    paymentSnapshot,
    reasonForCancellation,
  } = booking;

  const paymentMethod =
    paymentSnapshot.paymentMethod === 'card'
      ? 'Debit/Credit'
      : paymentSnapshot.paymentMethod;

  const cancelledReason =
    status === 'cancelled' ? `Reason: *${reasonForCancellation}` : null;

  return (
    <StyledContainer>
      <Box textAlign="left" sx={{ mb: 2 }}>
        <HistoryBackButton />
      </Box>

      <Typography variant="h5">Booking Details</Typography>

      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title={
                <Typography sx={{ fontWeight: 550 }}>{tour.title}</Typography>
              }
              subheader={
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.7,
                      pt: 1,
                    }}
                  >
                    <CalendarMonthOutlinedIcon />
                    <Typography>Tour Date:</Typography>
                    {formatISOlong(bookingRequest.tourDate)}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      pt: 1,
                    }}
                  >
                    <CalendarMonthOutlinedIcon />
                    <Typography>Booking Date:</Typography>
                    {formatISOlong(bookingDate)}
                  </Box>
                </Box>
              }
            />

            <Divider />

            <CardContent>
              <Box
                sx={{
                  '& p:not(:first-child)': {
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    py: 1,
                  },

                  '& span': {
                    color: 'gray',
                    ml: 0.5,
                  },
                }}
              >
                <Typography sx={{ pb: 1 }}>
                  Booking ID: <span>{bookingId}</span>
                </Typography>
                <Typography>
                  Transaction ID: <span>{transactionId}</span>
                </Typography>

                <Typography sx={{ textTransform: 'capitalize' }}>
                  Status:{' '}
                  <span style={{ color: bookingStatusColorMap[status] }}>
                    {status}{' '}
                    <span
                      style={{
                        fontSize: '0.8rem',
                        textTransform: 'none',
                        display: 'block',
                      }}
                    >
                      {cancelledReason}
                    </span>
                  </span>
                </Typography>
              </Box>
            </CardContent>

            <Divider />

            <CardContent>
              <Box
                sx={{
                  '& span': {
                    color: 'gray',
                    ml: 0.5,
                  },
                }}
              >
                <Typography sx={{ fontWeight: 550 }}>
                  Payment Summary
                </Typography>
                <Typography sx={{ textTransform: 'capitalize' }}>
                  Payment Method: <span>{paymentMethod}</span>
                </Typography>
                <Typography>
                  Amount:{' '}
                  <span>
                    {paymentSnapshot.currencySymbol}{' '}
                    {formatNumber(paymentSnapshot.convertedAmount)}{' '}
                    {paymentSnapshot.currencyCode}
                  </span>
                </Typography>
              </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: 'center', py: 2 }}>
              <Button variant="outlined">Download Booking Details</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title={
                <Typography sx={{ fontWeight: 550 }}>Tour Guide</Typography>
              }
              subheader={
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}
                >
                  <EmojiEmotionsOutlinedIcon />
                  {tour.guide.firstName} {formatLastName(tour.guide.lastName)}.
                </Box>
              }
            />

            <Divider />

            <CardContent>
              <Typography sx={{ fontWeight: 550 }}>
                Contact Information
              </Typography>

              <Box
                sx={{
                  '& p:not(:first-child)': {
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    py: 1,
                  },

                  '& span': {
                    ml: 0.5,
                  },
                }}
              >
                <Typography
                  sx={{ py: 1, display: 'flex', alignItems: 'center' }}
                >
                  <EmailOutlinedIcon /> <span>support@jw-tours.com</span>
                </Typography>
                <Typography
                  sx={{ py: 1, display: 'flex', alignItems: 'center' }}
                >
                  <CallOutlinedIcon /> <span>+1 (800) 555-0123</span>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default BookingDetails;
