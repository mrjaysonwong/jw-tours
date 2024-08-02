import { Button, CircularProgress } from '@mui/material';

export default function FormSubmitButton(props) {
  const {
    label,
    action,
    handleSubmit,
    isSubmitting,
    isSubmitSuccessful,
    fullWidth,
    captcha,
  } = props;

  return (
    <>
      {action === 'auth' ? (
        <Button
          fullWidth={fullWidth}
          type="submit"
          disabled={isSubmitting || captcha}
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 2,
          }}
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
            type="submit"
            disabled={isSubmitting || captcha}
            variant="contained"
            onClick={handleSubmit}
          >
            {isSubmitting ? <CircularProgress size="1.5rem" /> : label}
          </Button>
        </>
      )}
    </>
  );
}
