import {
  Typography,
  TextField,
  Box,
  Button,
  Card,
  Snackbar,
} from '@mui/material';

export default function PasswordReset({ token, tokenExists }) {
  return (
    <>
      {!tokenExists && (
        <Snackbar
          open={true}
          message="Sorry, this password reset link has expired. Please request a new
        password again."
        />
      )}

      <Card
        sx={{
          p: 3,
          flexDirection: 'column',
          width: 'clamp(300px, 50%, 300px)',
        }}
      >
        <Typography variant="h6">Create a new password</Typography>
        <Typography>
          Use a minimum of 8 characters, including uppercase, lowercase letters,
          numbers and special character.
        </Typography>

        <TextField fullWidth label="Password" margin="normal" />

        <TextField fullWidth label="Confirm Password" margin="normal" />

        <Button
          disabled={!tokenExists}
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          Set new password
        </Button>
      </Card>
    </>
  );
}
