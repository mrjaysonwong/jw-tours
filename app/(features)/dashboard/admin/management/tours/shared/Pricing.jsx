import React, { useEffect } from 'react';
import { Grid, Checkbox, FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import { useTourFormContext } from './CardForm';
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

const Pricing = () => {
  const { register, control, errors, setValue, watch, tour } =
    useTourFormContext();

  // Watch all needed values
  const [tourCost, serviceFee, enablePerPersonFee, perPersonFee] = watch([
    'pricing.tourCost',
    'pricing.serviceFee',
    'pricing.enablePerPersonFee',
    'pricing.perPersonFee',
  ]);

  const updateServiceFee = (newTourCost, newPerPersonFee) => {
    const updatedFee = calculateServiceFee(newTourCost, newPerPersonFee);
    setValue('pricing.serviceFee', updatedFee, { shouldValidate: true });
  };

  const handleChangeTourCost = (event) => {
    const newTourCost = event.target.value;

    setValue('pricing.tourCost', newTourCost);
    updateServiceFee(newTourCost, perPersonFee);
  };

  const handleChangePerPersonFee = (event) => {
    const newPerPersonFee = event.target.value;

    setValue('pricing.perPersonFee', newPerPersonFee);
    updateServiceFee(tourCost, newPerPersonFee);
  };

  const handleEnablePerPersonFee = (value) => {
    setValue('pricing.enablePerPersonFee', value);

    if (!value) {
      setValue('pricing.perPersonFee', null);
      updateServiceFee(tourCost, 0);
    }
  };

  useEffect(() => {
    if (tour?.pricing?.perPersonFee) {
      setValue('pricing.perPersonFee', tour.pricing.perPersonFee);
    }
  }, [tour, setValue]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormInput
          register={register}
          inputName="pricing.tourCost"
          label="Tour cost"
          defaultValue={tour?.pricing?.tourCost || tourCost}
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
          defaultValue={tour?.pricing?.serviceFee || serviceFee}
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
          defaultValue={tour?.pricing?.enablePerPersonFee || false}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  onChange={(_, newValue) => {
                    handleEnablePerPersonFee(newValue);
                  }}
                  inputProps={{
                    id: 'switch-enable-perPersonFee',
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
          errors={errors?.pricing?.perPersonFee}
          hasAdornment={true}
          handleChange={handleChangePerPersonFee}
          autoComplete="off"
          isDisabled={!enablePerPersonFee}
        />
      </Grid>
    </Grid>
  );
};

export default Pricing;
