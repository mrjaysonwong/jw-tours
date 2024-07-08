import { Button, CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export default function FormSubmitButton(props) {
  const {
    label,
    mode,
    handleSubmit,
    isSubmitting,
    isSubmitSuccessful,
    hasError,
    fullWidth,
    captcha,
  } = props;

  return (
    <>
      {mode === 'auth' ? (
        <Button
          fullWidth={fullWidth}
          type="submit"
          disabled={isSubmitting || captcha}
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            pointerEvents: !hasError && isSubmitSuccessful && 'none',
          }}
          color={
            hasError
              ? 'error'
              : isSubmitSuccessful && !hasError
              ? 'success'
              : undefined
          }
        >
          {isSubmitting ? (
            <CircularProgress size={25} />
          ) : isSubmitSuccessful && !hasError ? (
            <CheckIcon />
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
            color={hasError ? 'error' : undefined}
          >
            {isSubmitting ? <CircularProgress size={25} /> : label}
          </Button>
        </>
      )}
    </>
  );
}
