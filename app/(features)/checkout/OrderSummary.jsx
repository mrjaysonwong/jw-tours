'use client';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Box,
  Typography,
  Rating,
  Divider,
} from '@mui/material';
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// internal imports
import PromoCode from './PromoCode';
import { formatDayBefore } from '@/utils/formats/formatDates';
import { formatNumber } from '@/utils/formats/common';
import { useCheckoutContext } from '@/contexts/CheckoutProvider';

const OrderSummary = () => {
  const [show, setShow] = useState(false);
  const {
    tour,
    bookingRequest,
    convertedBookingPrice,
    convertedTotalCost,
    totalPerPersonFee,
    currency,
    reviewSummary,
  } = useCheckoutContext();

  const { reviewCount, avgRating } = reviewSummary;

  const { tourCost, serviceFee, perPersonFee } = convertedBookingPrice;

  const formattedTourCost = formatNumber(tourCost);
  const formattedServiceFee = formatNumber(serviceFee);
  const formattedPerPersonFee = formatNumber(perPersonFee);
  const formattedTotalPerPersonFee = formatNumber(totalPerPersonFee);
  const formattedTotalCost = formatNumber(convertedTotalCost);

  return (
    <>
      <Typography color="primary" variant="h5">
        Order Summary
      </Typography>

      <Card variant="outlined" sx={{ my: 1 }}>
        <CardHeader
          avatar={
            <Avatar
              src={tour.images[0].url}
              sx={{
                width: { xs: 84, md: 64 },
                height: { xs: 84, md: 64 },
                borderRadius: '4px',
              }}
            />
          }
          title={<Typography sx={{ fontWeight: 550 }}>{tour.title}</Typography>}
          subheader={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                name="half-rating-read"
                defaultValue={avgRating}
                precision={0.5}
                readOnly
                size="small"
                sx={{ color: '#FCC737' }}
              />
              <Typography sx={{ mx: 0.5, fontWeight: 500 }}>
                {avgRating}
              </Typography>
              <Typography variant="body2">({reviewCount})</Typography>
            </Box>
          }
        />

        <Divider />

        <CardContent
          sx={{ div: { display: 'flex', justifyContent: 'space-between' } }}
        >
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
            Price details
          </Typography>

          <Box>
            <Typography>Tour cost</Typography>
            <Typography>
              {currency.symbol} {formattedTourCost}
            </Typography>
          </Box>

          <Box sx={{ my: 1 }}>
            <Typography>Service fee</Typography>
            <Typography>
              {currency.symbol} {formattedServiceFee}
            </Typography>
          </Box>

          <Box
            component="span"
            sx={{ display: !bookingRequest.perPersonFee && 'none' }}
          >
            <Box>
              <Typography>Inclusion fee</Typography>
              <Typography>
                {currency.symbol} {formattedTotalPerPersonFee}
              </Typography>
            </Box>
            <Typography color="text.secondary" variant="body2">
              {currency.symbol} {formattedPerPersonFee} per person x{' '}
              {bookingRequest.partySize}{' '}
              {bookingRequest.partySize > 1 ? 'people' : 'person'}
            </Typography>
          </Box>
        </CardContent>

        <Divider />

        <CardContent>
          <Box sx={{ display: 'flex' }}>
            <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
            <Box>
              <Typography>Free cancellation</Typography>
              <Typography color="text.secondary" variant="body2">
                Before {bookingRequest.startTime} on{' '}
                {formatDayBefore(bookingRequest.tourDate)}{' '}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <Divider />

        <CardContent>
          {show ? (
            <PromoCode />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RedeemOutlinedIcon sx={{ mr: 1 }} />
              <Typography
                sx={{ cursor: 'pointer' }}
                onClick={() => setShow(true)}
              >
                Enter Promo Code
              </Typography>
            </Box>
          )}
        </CardContent>

        <Card
          sx={{
            bgcolor: 'rgba(40,40,40, 0.1)',
            py: 1,
            px: 2,
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: '0px',
          }}
        >
          <Typography
            color="primary"
            sx={{ fontSize: '1.2rem', fontWeight: 500 }}
          >
            Total
          </Typography>
          <Typography
            color="primary"
            sx={{ fontSize: '1.2rem', fontWeight: 500 }}
          >
            {currency.symbol} {formattedTotalCost} {currency.code}
          </Typography>
        </Card>
      </Card>
    </>
  );
};

export default OrderSummary;
