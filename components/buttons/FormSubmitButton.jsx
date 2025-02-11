import { Button, CircularProgress } from '@mui/material';

const FormSubmitButton = ({
  label,
  action,
  isSubmitting,
  fullWidth,
  captcha,
  isSubmitSuccessful,
  notSixDigits,
}) => {
  return (
    <>
      {action === 'auth' ? (
        <Button
          variant="contained"
          type="submit"
          fullWidth={fullWidth}
          disabled={isSubmitting || captcha || isSubmitSuccessful}
        >
          {isSubmitting ? (
            <CircularProgress
              aria-describedby="loading"
              aria-busy={true}
              size="1.5rem"
            />
          ) : (
            label
          )}
        </Button>
      ) : (
        <>
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting || captcha || notSixDigits}
          >
            {isSubmitting ? <CircularProgress size="1.5rem" /> : label}
          </Button>
        </>
      )}
    </>
  );
};

export default FormSubmitButton;
