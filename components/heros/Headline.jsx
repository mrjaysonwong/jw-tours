import { Typography, Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// local imports
import { StyledHeadlineContainer } from '../styled/StyledContainers';

export default function Headline({ subHeader }) {
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
}
