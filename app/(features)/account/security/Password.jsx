// third-party imports
import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Typography,
  Button,
  Grid,
  ButtonGroup,
  CircularProgress,
  Box,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import axios from 'axios';

// internal imports
import { useMessageStore } from '@/stores/messageStore';
import ChangePasswordDialog from './ChangePasswordDialog';
import { StyledGridCard } from '@/components/styled/StyledCards';
import { errorHandler } from '@/helpers/errorHelpers';
import { API_URLS } from '@/constants/apiRoutes';

const Password = ({ userId, user, email }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const { handleAlertMessage } = useMessageStore();

  const handleResetPasswordClick = async () => {
    try {
      setIsSubmitting(true);

      const url = `${API_URLS.USERS}/${userId}/password`;
      const payload = { email };

      const { data } = await axios.post(url, payload);

      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePasswordClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <StyledGridCard sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3}>
            <Typography variant="h6">Password</Typography>
          </Grid>

          {user?.hasPassword && (
            <Grid item xs={12} lg={4}>
              <Typography>
                Change or Reset password regularly to keep account secure.
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} lg={5}>
            {user?.hasPassword ? (
              <ButtonGroup
                variant="outlined"
                size="small"
                aria-label="button group"
              >
                {!params.id && (
                  <Button
                    disabled={isSubmitting}
                    onClick={handleChangePasswordClick}
                  >
                    Change Password
                  </Button>
                )}

                <Button
                  disabled={isSubmitting}
                  onClick={handleResetPasswordClick}
                >
                  {isSubmitting ? (
                    <CircularProgress
                      aria-describedby="loading"
                      aria-busy={true}
                      size="1.5rem"
                    />
                  ) : (
                    'Reset password'
                  )}
                </Button>
              </ButtonGroup>
            ) : (
              <>
                <Box sx={{ display: 'flex' }}>
                  <SecurityIcon
                    sx={{ mr: 2, mt: 0.5, color: 'var(--color-blue-light' }}
                  />
                  <Typography>
                    Create a password to access your account from any device at
                    any time.
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  fullWidth
                  disabled={isSubmitting}
                  onClick={handleResetPasswordClick}
                  sx={{ my: 1 }}
                >
                  {isSubmitting ? (
                    <CircularProgress
                      aria-describedby="loading"
                      aria-busy={true}
                      size="1.5rem"
                    />
                  ) : (
                    'Add'
                  )}
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </StyledGridCard>

      {isDialogOpen && (
        <ChangePasswordDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          userId={userId}
        />
      )}
    </>
  );
};

export default Password;
