// third-party imports
import { Button, Typography, Divider } from '@mui/material';

// internal imports
import { StyledAuthCard } from '@/components/styled/StyledCards';
import { ACTIONS } from '@/constants/common';

const messageMap = {
  [ACTIONS.SIGNIN]: 'the sign-in link',
  [ACTIONS.SEND_ACCOUNT_VERIFICATION]: 'the verification link',
  [ACTIONS.SEND_PASSWORD_RESET]: 'the password reset link',
};

const getMessage = (action) => {
  const textMessage = messageMap[action];

  return (
    <Typography>
      We have emailed you {textMessage}.
      <span style={{ display: 'block', margin: '1rem 0' }}>
        If you do not receive an email soon, check that the email address you
        entered is correct, check your spam folder or reach out to support if
        the issue persists.
      </span>
    </Typography>
  );
};

const handleRequestOne = (setIsConfirmation) => {
  setIsConfirmation(false);
};

const EmailAuthConfirmationMessage = ({ action, setIsConfirmation }) => {
  return (
    <>
      <StyledAuthCard>
        <Typography variant="h5">Check your email</Typography>

        <Divider sx={{ my: 2 }} />

        {getMessage(action)}

        <Button
          fullWidth
          variant="outlined"
          onClick={() => handleRequestOne(setIsConfirmation)}
        >
          Request a new one
        </Button>
      </StyledAuthCard>
    </>
  );
};

export default EmailAuthConfirmationMessage;
