'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import {
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// internal imports
import { useUserSessionContext } from '@/contexts/UserProvider';
import { useTourDetails } from '@/contexts/TourContextProvider';
import PartySizeOption from './PartySizeOption';
import SelectTourDate from './SelectTourDate';
import PricingDetailsDialog from '@/app/(features)/tours/tour-details/PricingDetailsDialog';
import StartTime from './StartTime';
import { bookingRequestSchema } from '@/validation/yup/tour/bookingRequestSchema';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import { API_URLS } from '@/constants/apiRoutes';
import { useAuthDialogStore } from '@/stores/dialogStore';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { useTourPricing, useBasePricing } from '@/hooks/useTourPricing';
import BookingDetails from './BookingDetails';

const TourBookingCard = () => {
  const { tour } = useTourDetails();
  const { openAuthDialog } = useAuthDialogStore();
  const router = useRouter();
  const params = useParams();
  const [geoLocation, destination, tourId] = params.slug;
  const session = useUserSessionContext();
  const { handleAlertMessage } = useMessageStore();

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(bookingRequestSchema) });

  const [partySize, setPartySize] = useState(tour.capacity.minSize);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOverlappingDate, setIsOverlappingDate] = useState(false);

  const { baseTotalPerPersonFee, baseTotalServiceFee, baseTotalCost } =
    useBasePricing(tour, partySize);

  const { totalPerPersonFee, totalServiceFee, totalCost } = useTourPricing(
    tour,
    partySize
  );

  const onSubmit = async (formData) => {
    try {
      if (isOverlappingDate) {
        return;
      }

      if (!session) {
        handleAlertMessage('You must signin first.', 'info');
        openAuthDialog();
        return;
      }

      const url = `${API_URLS.CHECKOUTS}`;

      const payload = {
        userId: session.user.id,
        tourId,
        guideId: tour.guide._id,
        tourCost: tour.pricing.tourCost,
        partySize,
        perPersonFee: tour?.pricing?.perPersonFee,
        totalPerPersonFee: baseTotalPerPersonFee,
        serviceFee: baseTotalServiceFee,
        totalCost: baseTotalCost,
        ...formData,
      };

      const { data } = await axios.post(url, payload);

      router.push(`/checkout/${data.checkoutId}/activity`);
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <Card sx={{ width: '100%' }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h5">
                {tour.currency.symbol} {Math.round(totalCost).toLocaleString()}{' '}
                {tour.currency.code}
              </Typography>
              <IconButton onClick={() => setIsDialogOpen(true)} sx={{ p: 0.5 }}>
                <InfoOutlinedIcon />
              </IconButton>
            </Box>
          }
          subheader={
            <>
              <Typography variant="body2" fontStyle="italic">
                Includes all fees
              </Typography>
              <Typography
                variant="body2"
                color="#2487d8"
                sx={{ textDecoration: 'underline' }}
              >
                Book with a 20% deposit
              </Typography>
            </>
          }
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent sx={{ pb: 0 }}>
            <Box>
              <BookingDetails
                icon={<GroupOutlinedIcon />}
                iconLabel="Size"
                label={`up to ${tour.capacity.maxSize} people`}
              />
              <BookingDetails
                icon={<AccessTimeOutlinedIcon />}
                iconLabel="Duration"
                label={`${tour.duration.value} ${tour.duration.unit}`}
              />
            </Box>

            <PartySizeOption
              partySize={partySize}
              setPartySize={setPartySize}
            />

            <SelectTourDate
              errors={errors}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              setIsOverlappingDate={setIsOverlappingDate}
            />

            <StartTime control={control} errors={errors} />
          </CardContent>
          <CardActions sx={{ p: 2 }}>
            <FormSubmitButton
              action="auth"
              fullWidth={true}
              label="Book Now"
              isSubmitting={isSubmitting}
              borderRadius="30px"
            />
          </CardActions>
        </form>
      </Card>

      {isDialogOpen && (
        <PricingDetailsDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          tour={tour}
          partySize={partySize}
          totalPerPersonFee={totalPerPersonFee}
          totalServiceFee={totalServiceFee}
          totalCost={totalCost}
        />
      )}
    </>
  );
};

export default TourBookingCard;
