import { Button, CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export default function FormSubmitButton(props) {
  const {
    label,
    handleSubmit,
    isSubmitting,
    isSubmitSuccessful,
    hasError,
    errors,
    mode,
  } = props;

  return (
    <>
      {mode === 'signin' ? (
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          onClick={handleSubmit}
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
            disabled={isSubmitting}
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
