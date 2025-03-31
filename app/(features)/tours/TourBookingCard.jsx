'use client';
import { useState, useMemo } from 'react';
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
  Button,
} from '@mui/material';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// internal imports
import { useUserSessionContext } from '@/contexts/UserProvider';
import { useTourDetails } from '@/contexts/TourDetailsProvider';
import PartySizeOption from './PartySizeOption';
import SelectTourDate from './SelectTourDate';
import PricingDetailsDialog from '@/app/(features)/tours/PricingDetailsDialog';
import StartTime from './StartTime';
import { bookingRequestSchema } from '@/validation/yup/tour/bookingRequestSchema';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import { API_URLS } from '@/config/apiRoutes';

const iconMapping = {
  walking: <DirectionsWalkOutlinedIcon />,
  public: <CommuteOutlinedIcon />,
  private: <AirportShuttleOutlinedIcon />,
};

const useTourPricing = (tour, partySize) => {
  const baseServiceFee = tour.pricing.serviceFee;

  const totalPerPersonFee = useMemo(
    () => tour.pricing.perPersonFee * partySize,
    [tour, partySize]
  );

  const serviceFee = useMemo(() => {
    return partySize === tour.capacity.minSize
      ? baseServiceFee
      : baseServiceFee + (3.5 * totalPerPersonFee) / 100;
  }, [tour, partySize, totalPerPersonFee, baseServiceFee]);

  const totalCost = useMemo(
    () => tour.pricing.tourCost + totalPerPersonFee + serviceFee,
    [tour, totalPerPersonFee, serviceFee]
  );

  return { totalPerPersonFee, serviceFee, totalCost };
};

const BookingDetails = ({ icon, iconLabel, label }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', py: 0.3 }}>
        {icon}
        <Typography sx={{ ml: 1 }}>{iconLabel}:</Typography>
      </Box>
      <Typography
        sx={{ textTransform: iconLabel === 'Transportation' && 'capitalize' }}
      >
        {label}
      </Typography>
    </Box>
  );
};

// proceed to next ui select date
// select time
// base ui for checkout, need authentication

const TourBookingCard = () => {
  const { tour } = useTourDetails();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [partySize, setPartySize] = useState(tour.capacity.minSize);
  const [isOverlappingDate, setIsOverlappingDate] = useState(false);

  const router = useRouter();
  const params = useParams();
  const [region, destination, id] = params.slug;

  const session = useUserSessionContext();

  const { totalPerPersonFee, serviceFee, totalCost } = useTourPricing(
    tour,
    partySize
  );

  const { handleAlertMessage } = useMessageStore();

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(bookingRequestSchema) });

  const onSubmit = async (formData) => {
    try {
      if (isOverlappingDate) {
        return;
      }

      const url = `${API_URLS.BOOKINGS}`;
      const requestData = {
        tourId: id,
        userId: session.user.id,
        ...formData,
      };

      const { data } = await axios.post(url, requestData);

      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h5">
                $ {Math.round(totalCost).toLocaleString()} USD
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
                icon={<GroupAddOutlinedIcon />}
                iconLabel="Size"
                label={`up to ${tour.capacity.maxSize} people`}
              />
              <BookingDetails
                icon={<ScheduleOutlinedIcon />}
                iconLabel="Duration"
                label={tour.duration}
              />
              <BookingDetails
                icon={iconMapping[tour.transportation.type]}
                iconLabel="Transportation"
                label={tour.transportation.type}
              />
            </Box>

            <PartySizeOption
              partySize={partySize}
              setPartySize={setPartySize}
            />

            <SelectTourDate
              control={control}
              errors={errors}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              setIsOverlappingDate={setIsOverlappingDate}
            />

            <StartTime control={control} errors={errors} />
          </CardContent>
          <CardActions sx={{ p: 2 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              // onClick={() =>
              //   router.push(
              //     '/bookingrequest/tours/67d6615688bd20e5d4ae3198?partySize=1'
              //   )
              // }
              sx={{ borderRadius: '30px' }}
            >
              Request Booking
            </Button>
          </CardActions>
        </form>

        {/* <Box sx={{ p: 3 }}>
          <Box sx={{ bgcolor: '#2d956317', p: 2 }}>
            <Box sx={{ display: 'flex' }}>
              <CheckCircleIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                Free cancellation up to 24 hours before the experience starts
                (local time)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', mt: 1 }}>
              <CheckCircleIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                Reserve Now and Pay Later - Secure your spot while staying
                flexible
              </Typography>
            </Box>
          </Box>
        </Box> */}
      </Card>

      {isDialogOpen && (
        <PricingDetailsDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          tour={tour}
          partySize={partySize}
          totalPerPersonFee={totalPerPersonFee}
          serviceFee={serviceFee}
          totalCost={totalCost}
        />
      )}
    </>
  );
};

export default TourBookingCard;
