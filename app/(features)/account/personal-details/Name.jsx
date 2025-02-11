import { Grid } from '@mui/material';

// internal imports
import { useEditUserDetailsContext } from '@/app/(features)/account/contexts/EditUserDetailsProvider';
import FormInput from '@/components/inputs/FormInput';

const Name = () => {
  const { user, register, errors } = useEditUserDetailsContext();

  return (
    <>
      <Grid item xs={12} md={6}>
        <FormInput
          register={register}
          inputName="firstName"
          label="First Name"
          defaultValue={user?.firstName}
          errors={errors.firstName}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          register={register}
          inputName="lastName"
          label="Last Name"
          defaultValue={user?.lastName}
          errors={errors.lastName}
        />
      </Grid>
    </>
  );
};

export default Name;
