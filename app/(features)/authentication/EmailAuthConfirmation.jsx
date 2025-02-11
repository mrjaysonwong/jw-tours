// third-party imports
import { Button, Typography, Divider } from '@mui/material';

// internal imports
import { StyledAuthCard } from '@/components/styled/StyledCards';
import { ACTION_TYPES } from '@/constants/api';

const MESSAGES = {
  [ACTION_TYPES.SIGNIN]: 'the sign-in link',
  [ACTION_TYPES.SEND_ACCOUNT_VERIFICATION]: 'the verification link',
  [ACTION_TYPES.SEND_PASSWORD_RESET]: 'the password reset link',
};

const generateMessage = (actionType) => {
  const messageText = MESSAGES[actionType];

  return (
    <Typography>
      We have emailed you {messageText}.
      <span style={{ display: 'block', margin: '1rem 0' }}>
        If you do not receive an email soon, check that the email address you
        entered is correct, check your spam folder or reach out to support if
        the issue persists.
      </span>
    </Typography>
  );
};

const handleRequestOne = (setIsConfirmation, handleClose) => {
  setIsConfirmation(false);
  handleClose();
};

const AuthConfirmation = ({ actionType, setIsConfirmation, handleClose }) => {
  return (
    <>
      <StyledAuthCard>
        <Typography variant="h5">Check your email</Typography>

        <Divider sx={{ my: 2 }} />

        {generateMessage(actionType)}

        <Button
          fullWidth
          variant="outlined"
          onClick={() => handleRequestOne(setIsConfirmation, handleClose)}
        >
          Request a new one
        </Button>
      </StyledAuthCard>
    </>
  );
};

export default AuthConfirmation;
