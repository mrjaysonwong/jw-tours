import { Button, CircularProgress } from '@mui/material';

export default function FormSubmitButton(props) {
  const {
    label,
    handleSubmit,
    isSubmitting,
    isSubmitSuccessful,
    hasError,
    errors,
  } = props;

  return (
    <>
      <Button
        type="submit"
        disabled={isSubmitting}
        variant="contained"
        onClick={handleSubmit}
        color={hasError || !!errors.email ? 'error' : undefined}
      >
        {isSubmitting ? <CircularProgress size={25} /> : label}
      </Button>
    </>
  );
}
