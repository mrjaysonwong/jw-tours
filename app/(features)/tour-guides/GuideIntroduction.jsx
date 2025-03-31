import { Typography, Box } from '@mui/material';

// internal imports
import { useGuideData } from '@/contexts/GuideProfileProvider';

const GuideIntroduction = () => {
  const { name, guideAddress, guide } = useGuideData();

  return (
    <>
      <Typography variant="h6">
        I am <span style={{ textTransform: 'capitalize' }}>{name}., </span>
        your private tour guide in{' '}
        <span style={{ textTransform: 'capitalize' }}>{guideAddress}</span>
      </Typography>

      <Typography>Guide #{guide.guideCustomId}</Typography>

      <Box sx={{ my: 1 }}>
        <Typography>
          Mabuhay! My Name is Fedil and I would like to invite you visit my
          beautiful country of the Philippines. Think of me as your private tour
          guide and driver during your time in my city of Manila and the unique
          & picturesque country of the Philippines.
        </Typography>
        <Typography>
          I am experienced, fully insured, qualified and hold a professional
          licence, to assist you in your transport and tour needs. Whether it is
          a pickup or drop off at the airport or full day tours and transport
          for the duration of your stay. I have many experiences available from
          short 4 hour tours to full day and even a multi-day tour.
        </Typography>
      </Box>
    </>
  );
};

export default GuideIntroduction;
