import { Grid, Typography } from '@mui/material';

import { StyledItemContainer } from '@/components/styled/StyledContainers';

const GridItem = ({ label, textData }) => {
  return (
    <StyledItemContainer>
      <Grid item xs={12} md={6}>
        <Typography>{label}:</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography sx={{ textTransform: 'capitalize' }}>{textData}</Typography>
      </Grid>
    </StyledItemContainer>
  );
};

export default GridItem;
