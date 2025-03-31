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

const SignUpConfirmation = ({ isDialogOpen, setIsDialogOpen, email }) => {
  const handleClose = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <Dialog open={isDialogOpen} scroll="body">
        <DialogTitle>Check your email</DialogTitle>
        <DialogContent
          dividers
          sx={{
            maxWidth: '500px',
            borderBottom: 'none',
            '& .MuiDialogContentText-root:not(:first-child):not(:last-child)': {
              my: 1,
            },
          }}
        >
          <DialogContentText>
            We have emailed you the account verification link to {email}.
          </DialogContentText>
          <DialogContentText>
            You must click the link in that email to finish signing up.
          </DialogContentText>

          <DialogContentText>
            If you do not receive an email soon, check your spam folder or
            request for
            <span style={{ marginLeft: '4px' }}>
              <Link href={PATHNAMES.RESEND_ACCOUNT_VERIFICATION}>
                account verification link.
              </Link>
            </span>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} sx={{ mx: 2 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUpConfirmation;
