import { useRouter } from 'next/navigation';
import { Typography, Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// internal imports
import { StyledHeadlineContainer } from '../styled/StyledContainers';

const Headline = ({ subHeader }) => {
  const router = useRouter();

  return (
    <StyledHeadlineContainer>
      <Typography variant="h2">Memories Crafted Just for You</Typography>
      <Typography variant="body1" sx={{ my: 2 }}>
        {subHeader}
      </Typography>
      <Button
        disableRipple
        variant="contained"
        onClick={() => router.push('/tours')}
        endIcon={<KeyboardArrowRightIcon />}
      >
        Learn more
      </Button>
    </StyledHeadlineContainer>
  );
};

export default Headline;
