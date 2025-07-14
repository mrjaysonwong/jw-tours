import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

const CancellationReasonForm = ({ value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel
        id="reason-of-cancellation"
        sx={{ fontSize: '1.2rem', fontWeight: 550 }}
      >
        Tell us your reason for cancelling
      </FormLabel>
      <RadioGroup
        aria-labelledby="reason-of-cancellation"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="Change of plans"
          control={<Radio />}
          label="Change of plans"
        />
        <FormControlLabel
          value="Found a better price"
          control={<Radio />}
          label="Found a better price"
        />
        <FormControlLabel
          value="Booking by mistake"
          control={<Radio />}
          label="Booking by mistake"
        />
        <FormControlLabel
          value="Tour provider issue"
          control={<Radio />}
          label="Tour provider issue"
        />
        <FormControlLabel
          value="Weather concerns"
          control={<Radio />}
          label="Weather concerns"
        />
        <FormControlLabel
          value="Health issues"
          control={<Radio />}
          label="Health issues"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default CancellationReasonForm;
