import { Button, CircularProgress } from '@mui/material';

const FormSubmitButton = ({
  form,
  label,
  action,
  isSubmitting,
  fullWidth,
  captcha,
  isSubmitSuccessful,
  notEnteredAllDigits,
  borderRadius = 'auto',
}) => {
  return (
    <>
      {action === 'auth' ? (
        <Button
          variant="contained"
          type="submit"
          fullWidth={fullWidth}
          disabled={isSubmitting || captcha || isSubmitSuccessful}
          sx={{ borderRadius: borderRadius }}
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
            form={form}
            variant="contained"
            type="submit"
            fullWidth={fullWidth}
            disabled={
              isSubmitting ||
              captcha ||
              notEnteredAllDigits ||
              isSubmitSuccessful
            }
            sx={{ ml: 'auto' }}
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
        </>
      )}
    </>
  );
};

export default FormSubmitButton;
