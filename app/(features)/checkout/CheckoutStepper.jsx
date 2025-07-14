'use client';
import { useParams } from 'next/navigation';
import { Grid, Box, Stepper, Step, StepLabel } from '@mui/material';

// internal imports
import OrderSummary from './OrderSummary';
import Activity from './Activity';
import Contact from './Contact';
import Payment from './Payment';
import { CheckoutProvider } from '@/contexts/CheckoutProvider';

const steps = ['Activity', 'Contact', 'Payment'];

const stepType = {
  activity: 0,
  contact: 1,
  payment: 2,
};

const CheckoutStepper = ({ checkout }) => {
  const params = useParams();

  const [id, step] = params.slug;
  const activeStep = stepType[step];

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={2} sx={{ my: 2 }}>
        <CheckoutProvider value={checkout}>
          <Grid item xs={12} md={7} lg={8}>
            {activeStep === 0 && <Activity />}

            {activeStep === 1 && <Contact />}

            {activeStep === 2 && <Payment />}
          </Grid>

          <Grid item xs={12} md={5} lg={4}>
            <OrderSummary />
          </Grid>
        </CheckoutProvider>
      </Grid>
    </Box>
  );
};

export default CheckoutStepper;
