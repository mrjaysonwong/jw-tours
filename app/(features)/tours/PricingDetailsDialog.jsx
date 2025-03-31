import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Box,
  Grid,
  Typography,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PricingDetailsDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  tour,
  partySize,
  totalPerPersonFee,
  serviceFee,
  totalCost,
}) => {
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} scroll="body">
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <DialogTitle variant="h5" fontWeight={500}>
          Pricing Details
        </DialogTitle>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 10, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent
        dividers
        sx={{ borderBottom: 'none', width: { xs: 'auto', md: '500px' } }}
      >
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Typography variant="h6">Tour cost</Typography>
          </Grid>

          <Grid item xs={5} textAlign="right">
            <Typography variant="h6">
              $ {tour.pricing.tourCost.toLocaleString()}
            </Typography>
          </Grid>

          <Grid
            item
            xs={7}
            sm={9}
            sx={{ display: !tour.pricing.enablePerPersonFee && 'none' }}
          >
            <Typography variant="h6">
              ${tour.pricing.perPersonFee} per person x {partySize}{' '}
              {partySize > 1 ? 'people' : 'person'}
            </Typography>
            <DialogContentText sx={{ fontSize: '0.9rem' }}>
              Certain tours include tickets or other items whose cost is
              dependent on the number of participants. This information can be
              found on the tour description page. In these cases, the per-person
              price is calculated specifically for those included items.
            </DialogContentText>
          </Grid>

          <Grid
            item
            xs={5}
            sm={3}
            textAlign="right"
            sx={{
              display: !tour.pricing.enablePerPersonFee ? 'none' : 'block',
            }}
          >
            <Typography variant="h6">$ {totalPerPersonFee}</Typography>
          </Grid>

          <Grid item xs={7} sm={9}>
            <Typography variant="h6">Service fee</Typography>
            <DialogContentText sx={{ fontSize: '0.9rem' }}>
              This helps us provide you a seamless booking experience, coupled
              with 24/7 customer support throughout your trip.
            </DialogContentText>
          </Grid>

          <Grid item xs={5} sm={3} textAlign="right">
            <Typography variant="h6">
              $ {Math.round(serviceFee * 100) / 100}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" color="primary">
              Total
            </Typography>
          </Grid>

          <Grid item xs={6} textAlign="right">
            <Typography variant="h6" color="primary">
              $ {totalCost.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PricingDetailsDialog;
