import React, { useState, useContext } from 'react';
import { useMessageStore } from '@/stores/messageStore';
import {
  Typography,
  Button,
  Card,
  Grid,
  ButtonGroup,
  CircularProgress,
  Box,
} from '@mui/material';
import ChangePasswordDialog from './ChangePasswordDialog';
import { PersonalSettingsContext } from '../../tabs/MySettingsTabs';
import axios from 'axios';
import { errorHandler } from '@/utils/helper/errorHandler';
import SecurityIcon from '@mui/icons-material/Security';

export default function Password() {
  const { user, email } = useContext(PersonalSettingsContext);

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleAlertMessage } = useMessageStore();

  const handleClickChangePassword = () => {
    setOpen(true);
  };

  const handleClickResetPassword = async () => {
    try {
      setIsSubmitting(true);

      const action = 'reset-password';
      const url = `/api/account/security?action=${action}`;

      const { data } = await axios.post(url, { email });

      handleAlertMessage(data.statusText, 'success');
      setIsSubmitting(false);
    } catch (error) {
      const { errorMessage } = errorHandler(error);

      setIsSubmitting(false);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <Card
        sx={{
          p: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3}>
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
              Password
            </Typography>
          </Grid>

          {user?.password && (
            <Grid item xs={12} lg={4}>
              <Typography>
                Change or Reset your password regularly to keep your account
                secure
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} lg={5}>
            {user?.password ? (
              <>
                <ButtonGroup variant="outlined" aria-label="button group">
                  <Button
                    disabled={isSubmitting}
                    onClick={handleClickChangePassword}
                  >
                    Change Password
                  </Button>

                  <Button
                    disabled={isSubmitting}
                    onClick={handleClickResetPassword}
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
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex' }}>
                  <SecurityIcon
                    sx={{ mr: 2, mt: 0.5, color: 'var(--palette-light-green)' }}
                  />
                  <Typography>
                    Create a password to access your account from any device at
                    any time.
                  </Typography>
                </Box>
                <Button
                  fullWidth
                  disabled={isSubmitting}
                  onClick={handleClickResetPassword}
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
      </Card>

      {open && <ChangePasswordDialog open={open} setOpen={setOpen} />}
    </>
  );
}
