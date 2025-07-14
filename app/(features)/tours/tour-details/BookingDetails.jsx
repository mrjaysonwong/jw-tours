import { Typography, Box } from '@mui/material';

const BookingDetails = ({ icon, iconLabel, label }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', py: 0.3 }}>
        {icon}
        <Typography sx={{ ml: 1 }}>{iconLabel}:</Typography>
      </Box>
      <Typography>{label}</Typography>
    </Box>
  );
};

export default BookingDetails;
