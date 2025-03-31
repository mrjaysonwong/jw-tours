import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// internal imports
import { useTourDetails } from '@/contexts/TourDetailsProvider';

const ImportantInfo = () => {
  const { tour } = useTourDetails();

  return (
    <div>
      <Divider />
      <Accordion
        elevation={0}
        square={true}
        defaultExpanded
        sx={{ bgcolor: 'transparent' }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ px: 0, mx: 0 }}
        >
          <Typography variant="h5">Important Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component="ul">
            {tour.importantInfo.map((info, index) => (
              <Box component="li" key={index}>
                <Typography>{info.label}</Typography>
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ImportantInfo;
