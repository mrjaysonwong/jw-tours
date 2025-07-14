import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Box,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// internal imports
import { useTourDetails } from '@/contexts/TourContextProvider';

const CustomStepIcon = (props) => {
  const { active, completed, icon } = props;

  return (
    <Box
      sx={{
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        width: 24,
        height: 24,
        background: 'linear-gradient(220.55deg, #00B960 0%, #00552C 100%)',
      }}
    >
      {icon}
    </Box>
  );
};

const Itinerary = () => {
  const { tour } = useTourDetails();

  return (
    <div>
      <Divider />

      <Accordion elevation={0} square={true} sx={{ bgcolor: 'transparent' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ px: 0, mx: 0 }}
        >
          <Typography variant="h5">Itinerary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stepper orientation="vertical" activeStep={-1}>
            {tour.itinerary.map((step, index) => (
              <Step key={step.label} expanded active>
                <StepLabel StepIconComponent={CustomStepIcon}>
                  <Typography sx={{ fontWeight: 550 }}>{step.label}</Typography>
                </StepLabel>
                <StepContent TransitionProps={{ unmountOnExit: false }}>
                  <Typography>{step.description}</Typography>
                  <Box
                    sx={{
                      display:
                        step.time || step.admissionType ? 'flex' : 'none',
                      alignItems: 'center',
                      color: 'gray',
                    }}
                  >
                    <Typography variant="body2">
                      {step.time.hour || step.time.minutes}
                    </Typography>
                    <span
                      style={{
                        margin: '0 5px',
                        display:
                          !step.time.hour && !step.time.minutes
                            ? 'none'
                            : 'flex',
                      }}
                    >
                      •
                    </span>
                    <Typography variant="body2">
                      {step.admissionType}
                    </Typography>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Itinerary;
