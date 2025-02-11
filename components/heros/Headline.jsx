import { Typography, Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// internal imports
import { StyledHeadlineContainer } from '../styled/StyledContainers';

const Headline = ({ subHeader }) => {
  return (
    <StyledHeadlineContainer>
      <Typography variant="h2">Memories Crafted Just for You</Typography>
      <Typography variant="body1" sx={{ my: 2 }}>
        {subHeader}
      </Typography>
      <Button
        disableRipple
        variant="contained"
        endIcon={<KeyboardArrowRightIcon />}
      >
        Learn more
      </Button>
    </StyledHeadlineContainer>
  );
};

export default Headline;
