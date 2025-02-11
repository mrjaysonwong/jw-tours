// third-party imports
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material';

const RoleSelector = () => {
  return (
    <FormControl>
      <FormLabel id="radio-buttons-group-label">Role</FormLabel>
      <RadioGroup
        row
        aria-labelledby="radio-buttons-group-label"
        defaultValue="guide"
        name="radio-buttons-group"
      >
        <FormControlLabel value="guide" control={<Radio />} label="Guide" />
        <FormControlLabel value="agent" control={<Radio />} label="Agent" />
      </RadioGroup>
    </FormControl>
  );
};

export default RoleSelector;
