import { Grid } from '@mui/material';

// internal imports
import { useTourFormContext } from './CardForm';
import FormInput from '@/components/inputs/FormInput';

const Capacity = () => {
  const { register, errors, tour } = useTourFormContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormInput
          register={register}
          inputName="capacity.minSize"
          label="Minimum size"
          defaultValue={tour?.capacity?.minSize || null}
          errors={errors?.capacity?.minSize}
          autoComplete="off"
        />
      </Grid>

      <Grid item xs={6}>
        <FormInput
          register={register}
          inputName="capacity.maxSize"
          label="Maximum size"
          defaultValue={tour?.capacity?.maxSize || null}
          errors={errors?.capacity?.maxSize}
          autoComplete="off"
        />
      </Grid>
    </Grid>
  );
};

export default Capacity;
