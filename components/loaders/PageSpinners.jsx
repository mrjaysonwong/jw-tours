import CircularProgress from '@mui/material/CircularProgress';

export const LoadingSpinner = () => {
  return (
    <>
      <CircularProgress aria-describedby="loading" aria-busy={true} />
    </>
  );
};
