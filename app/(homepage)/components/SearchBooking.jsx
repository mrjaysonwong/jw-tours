import { Box, TextField, Grid, Button } from '@mui/material';

// fix UI

export default function SearchBooking() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '70vw',
        margin: 'auto',
        border: '5px solid orange',
        borderRadius: '8px',
        mt: { xs: 5, md: 0 },

        '& .MuiInputBase-input': {
          border: '2px solid orange',

          '&:hover': {
            border: '2px solid green',
          },
        },
        '& fieldset': { border: 'none' },
      }}
    >
      <Grid container>
        <Grid item xs={12} md={3}>
          <TextField fullWidth placeholder="Where are you going?" />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField fullWidth placeholder="Check-in Data - Check-out Date" />
        </Grid>

        <Grid item xs={12} md={5}>
          <TextField fullWidth placeholder="2 adults | 0 children | 1 room" />
        </Grid>
        <Grid item xs={12} md={1} sx={{ bgcolor: 'orange', p: 0.5 }}>
          <Button fullWidth variant="contained" sx={{ height: '100%' }}>
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
