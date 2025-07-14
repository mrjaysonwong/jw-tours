import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

// internal imports
import { getAddressParts } from '@/utils/common';
import Pickup from './Pickup';
import { API_URLS } from '@/constants/apiRoutes';
import { usePickupLocationStore } from '@/stores/checkoutStore';
import { errorHandler } from '@/helpers/errorHelpers';
import { useMessageStore } from '@/stores/messageStore';
import { useCheckoutContext } from '@/contexts/CheckoutProvider';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';

const MeetingPickup = () => {
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [optionValue, setOptionValue] = useState('');

  const router = useRouter();

  const { selectedLocation } = usePickupLocationStore();
  const { handleAlertMessage } = useMessageStore();

  const checkout = useCheckoutContext();
  const { tour } = checkout;

  const { meetingLocation, geoLocation } = tour;

  const isPickupNoValue = value === 'pickup' && !selectedLocation;

  const modifiedLocation = {
    ...meetingLocation,
    geoLocation,
  };

  const meetingPoint = getAddressParts(modifiedLocation, [
    'name',
    'road',
    'suburb',
    'city',
    'geoLocation',
    'country',
  ])
    .filter(Boolean)
    .join(', ');

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    setHelperText(' ');
    setError(false);

    if (selectedValue === 'meeting-point') {
      setOptionValue(`I'll prefer Guide meeting point`);
    } else {
      setOptionValue(`I'll decide later`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value) {
      setHelperText('Please choose Meeting and Pickup option');
      setError(true);
      return;
    }

    if (isPickupNoValue) {
      setHelperText('Please provide pickup location');
      setError(true);
      return;
    }

    try {
      setIsSubmitting(true);

      const url = `${API_URLS.CHECKOUTS}/${checkout._id}`;

      const payload = {
        option: optionValue,
      };

      await axios.patch(url, payload);

      setIsSubmitting(false);
      router.push(`/checkout/${checkout._id}/contact`);
    } catch (error) {
      const { errorMessage, status } = errorHandler(error);

      handleAlertMessage(errorMessage, 'error');
      setIsSubmitting(false);

      if (status === 404) router.refresh();
    }
  };

  useEffect(() => {
    if (value === 'pickup' && selectedLocation) {
      const updatedPickup = getAddressParts(selectedLocation, [
        'name',
        'road',
        'suburb',
        'city',
        'geoLocation',
        'country',
      ])
        .filter(Boolean)
        .join(', ');

      setOptionValue(updatedPickup);
    }
  }, [selectedLocation, value]);

  return (
    <>
      <Typography sx={{ fontWeight: 550 }}>Meeting and Pickup</Typography>

      <form onSubmit={handleSubmit}>
        <FormControl
          error={error}
          sx={{
            my: 1,
            width: { xs: '100%', md: '80%' },
            '& .container': {
              border: '1px solid',
              borderColor: '#696969',
              borderRadius: '6px',
              p: 2,
              my: 0.5,
            },
          }}
        >
          <RadioGroup value={value} onChange={handleRadioChange}>
            <Box className="container">
              <FormControlLabel
                value="pickup"
                control={<Radio />}
                label={
                  <Typography sx={{ fontWeight: 500 }}>
                    I&apos;d like to be picked up
                  </Typography>
                }
              />
              {value === 'pickup' && (
                <Box sx={{ px: 4 }}>
                  <Pickup setError={setError} />
                </Box>
              )}
            </Box>

            <Box className="container">
              <FormControlLabel
                value="meeting-point"
                control={<Radio />}
                label={
                  <Typography sx={{ fontWeight: 500 }}>
                    I&apos;ll make my own way to the meeting point
                  </Typography>
                }
              />

              {value === 'meeting-point' && (
                <Box sx={{ px: 4 }}>
                  <Box
                    sx={{
                      p: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '6px',
                      display: 'flex',
                    }}
                  >
                    <PlaceOutlinedIcon sx={{ mr: 1 }} />
                    <Typography sx={{ textTransform: 'capitalize' }}>
                      {meetingPoint}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            <Box className="container">
              <FormControlLabel
                value="decide-later"
                control={<Radio />}
                label={
                  <Typography sx={{ fontWeight: 500 }}>
                    I&apos;ll decide later
                  </Typography>
                }
              />
              {value === 'decide-later' && (
                <Box sx={{ px: 4 }}>
                  <Box
                    sx={{
                      p: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '6px',
                      display: 'flex',
                    }}
                  >
                    <InfoIcon color="info" sx={{ mr: 1 }} />
                    <Typography>
                      Please contact your Guide before the tour to confirm the
                      pickup location.
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </RadioGroup>

          {error && (
            <FormHelperText sx={{ fontSize: '1.1rem' }}>
              {helperText}
            </FormHelperText>
          )}

          <Box sx={{ my: 2 }}>
            <FormSubmitButton
              fullWidth={true}
              label="Next: Contact"
              isSubmitting={isSubmitting}
            />
          </Box>
        </FormControl>
      </form>
    </>
  );
};

export default MeetingPickup;
