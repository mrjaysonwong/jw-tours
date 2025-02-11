// third-party imports
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

// internal imports
import { PATHNAMES } from '@/constants/pathname';

const SignUpConfirmation = ({ open, setOpen, email }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} scroll="body">
        <DialogTitle>Check your email</DialogTitle>
        <DialogContent dividers>
          <DialogContentText sx={{ maxWidth: '480px' }}>
            We have emailed you the account verification link to {email}. You
            must click the link in that email to finish signing up.
            <span style={{ display: 'block', margin: '1rem 0' }}>
              If you do not receive an email soon, check your spam folder or
              request for
              <span style={{ marginLeft: '4px' }}>
                <Link href={PATHNAMES.RESEND_ACCOUNT_VERIFICATION}>
                  account verification link.
                </Link>
              </span>
            </span>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUpConfirmation;
