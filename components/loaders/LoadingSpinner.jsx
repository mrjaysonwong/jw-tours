import { Box } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = ({ h = '100dvh', children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: h,
      }}
    >
      <CircularProgress aria-describedby="loading" aria-busy={true} />
      {children}
    </Box>
  );
};

export default LoadingSpinner;
