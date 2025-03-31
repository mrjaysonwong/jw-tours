import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import { useCreateTourContext } from '@/contexts/CreateNewTourProvider';
import FormInput from '@/components/inputs/FormInput';

function interpolate(minCost, maxCost, minRate, maxRate, tourCost) {
  return (
    minRate + ((tourCost - minCost) / (maxCost - minCost)) * (maxRate - minRate)
  );
}

function calculateServiceFee(tourCost, perPersonFee = 0, numPeople = 1) {
  // 3.5% perPersonCost
  const totalPerPersonFee = perPersonFee * numPeople;

  let serviceFee;

  if (tourCost <= 50) {
    serviceFee = interpolate(1, 50, 0.5, 1.5, tourCost);
  } else if (tourCost <= 200) {
    serviceFee = interpolate(51, 200, 1.5, 7, tourCost);
  } else if (tourCost <= 1000) {
    serviceFee = interpolate(201, 1000, 7, 37, tourCost);
  } else if (tourCost <= 2000) {
    serviceFee = interpolate(1001, 2000, 37, 70, tourCost);
  } else {
    serviceFee = interpolate(2001, 5000, 70, 174, tourCost);
  }

  if (perPersonFee >= 1) {
    return (serviceFee + (3.5 * totalPerPersonFee) / 100).toFixed(2);
  } else {
    return Math.round(serviceFee * 100) / 100;
  }
}

const CapacityAndPricing = () => {
  const { register, control, errors, setValue, watch } = useCreateTourContext();
  // Watch the form's enablePerPersonFee value
  const enablePerPersonFee = watch('pricing.enablePerPersonFee');

  const [tourCost, setTourCost] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [perPersonFee, setPerPersonFee] = useState(0);

  const updateServiceFee = (newTourCost, newPerPersonFee) => {
    const updatedFee = calculateServiceFee(newTourCost, newPerPersonFee);
    setServiceFee(updatedFee);
    setValue('pricing.serviceFee', updatedFee || undefined, {
      shouldValidate: true,
    });
  };

  const handleChangeTourCost = (event) => {
    const newTourCost = event.target.value;

    setTourCost(newTourCost);
    updateServiceFee(newTourCost, perPersonFee);
  };

  const handleChangePerPersonFee = (event) => {
    const newPerPersonFee = event.target.value;

    setPerPersonFee(newPerPersonFee);
    updateServiceFee(tourCost, newPerPersonFee);
  };

  const handleEnablePerPersonFee = (value) => {
    setValue('pricing.enablePerPersonFee', value);

    if (!value) {
      setValue('pricing.perPersonFee', null);
      updateServiceFee(tourCost, 0);
    }
  };

  return (
    <>
      <Box sx={{ my: 1 }}>
        <Typography>Capacity</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormInput
              register={register}
              inputName="capacity.minSize"
              label="Minimum"
              defaultValue={null}
              errors={errors?.capacity?.minSize}
              autoComplete="off"
            />
          </Grid>

          <Grid item xs={6}>
            <FormInput
              register={register}
              inputName="capacity.maxSize"
              label="Maximum"
              defaultValue={null}
              errors={errors?.capacity?.maxSize}
              autoComplete="off"
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 1 }}>
        <Typography>Pricing</Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormInput
              register={register}
              inputName="pricing.tourCost"
              label="Tour cost"
              defaultValue={null}
              errors={errors?.pricing?.tourCost}
              hasAdornment={true}
              handleChange={handleChangeTourCost}
              autoComplete="off"
            />
          </Grid>

          <Grid item xs={6}>
            <FormInput
              register={register}
              inputName="pricing.serviceFee"
              label="Service fee"
              defaultValue={serviceFee}
              errors={errors?.pricing?.serviceFee}
              hasAdornment={true}
              autoComplete="off"
              readOnly={true}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="pricing.enablePerPersonFee"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(_, newValue) => {
                        handleEnablePerPersonFee(newValue);
                      }}
                    />
                  }
                  label="Enable per person fee"
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <FormInput
              register={register}
              inputName="pricing.perPersonFee"
              label="Per person fee"
              defaultValue={null}
              errors={errors?.pricing?.perPersonFee}
              hasAdornment={true}
              handleChange={handleChangePerPersonFee}
              autoComplete="off"
              isDisabled={!enablePerPersonFee}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CapacityAndPricing;
