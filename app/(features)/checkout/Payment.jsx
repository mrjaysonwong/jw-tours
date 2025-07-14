import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';

// internal imports
import { useCheckoutContext } from '@/contexts/CheckoutProvider';
import PaymentCard from './PaymentCard';

const Payment = () => {
  const [value, setValue] = useState('card');
  const router = useRouter();

  const checkout = useCheckoutContext();

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
  };

  useEffect(() => {
    if (!checkout.meetingAndPickup || !checkout.contact) {
      router.replace(`/checkout/${checkout._id}/activity`);
    }
  }, [checkout, router]);

  return (
    <>
      <Typography variant="h5" color="primary">
        Select a payment method
      </Typography>

      <FormControl
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
              value="google-pay"
              control={<Radio />}
              label={
                <Typography sx={{ fontWeight: 500 }}>Google pay</Typography>
              }
            />
            {value === 'google-pay' && <Typography>Google Pay</Typography>}
          </Box>

          <Box className="container">
            <FormControlLabel
              value="card"
              control={<Radio />}
              label={
                <Typography sx={{ fontWeight: 500 }}>
                  Debit/Credit Card
                </Typography>
              }
            />
            {value === 'card' && <PaymentCard />}
          </Box>
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Payment;
