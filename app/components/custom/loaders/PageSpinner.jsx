import CircularProgress from '@mui/material/CircularProgress';

export default function PageSpinner() {
  return (
    <>
      <CircularProgress aria-describedby="loading" aria-busy={true} />
    </>
  );
}
