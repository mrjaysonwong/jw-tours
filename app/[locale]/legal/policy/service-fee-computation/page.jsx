import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

// internal imports
import { StyledContainer } from '@/components/styled/StyledContainers';
import { locales } from '@/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Service fee',
};

export default function ServiceFeeComputationPage() {
  return (
    <StyledContainer
      sx={{
        width: { xs: 'auto', md: '700px' },
      }}
    >
      <Box>
        <Typography variant="h5" gutterBottom>
          Service Fee Computation
        </Typography>

        <Typography variant="body1" gutterBottom>
          The service fee is calculated based on the tour cost and the number of
          participants. The calculation involves two components:
        </Typography>

        <Typography variant="h6" gutterBottom>
          Base Service Fee
        </Typography>
        <Typography variant="body2" paragraph>
          A base service fee is determined using a tiered structure based on the
          tour price. The fee starts at 0.5% for lower-cost tours and increases
          with the tour cost, capping at a maximum for higher-priced tours.
        </Typography>

        <Typography variant="body2" gutterBottom>
          Formula:
        </Typography>
        <Box
          sx={{
            p: 2,
            bgcolor: 'rgb(128,128,128, 0.5)',
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: '0.875rem',
          }}
        >
          Base Fee = minRate + ((tourCost - minCost) / (maxCost - minCost)) *
          (maxRate - minRate)
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Tier Structure:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="$1 - $50: 0.5% - 1.5%" />
          </ListItem>
          <ListItem>
            <ListItemText primary="$51 - $200: 1.5% - 7%" />
          </ListItem>
          <ListItem>
            <ListItemText primary="$201 - $1,000: 7% - 37%" />
          </ListItem>
          <ListItem>
            <ListItemText primary="$1,001 - $2,000: 37% - 70%" />
          </ListItem>
          <ListItem>
            <ListItemText primary="$2,001 - $5,000: 70% - 174%" />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Per-Person Fee
        </Typography>
        <Typography variant="body2" paragraph>
          If there is an extra per-person cost, a 3.5% fee is applied to the
          total per-person cost. This ensures that the service fee scales
          appropriately with both the tour price and the number of participants.
        </Typography>

        <Typography variant="body2" gutterBottom>
          Formula:
        </Typography>
        <Box
          sx={{
            p: 2,
            bgcolor: 'rgb(128,128,128, 0.5)',
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: '0.875rem',
          }}
        >
          Total Service Fee = Base Fee + (3.5% * Total Per-Person Cost)
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          This tiered structure ensures that the service fee is fair and scales
          appropriately with the tour price and the number of participants.
        </Typography>
      </Box>
    </StyledContainer>
  );
}
