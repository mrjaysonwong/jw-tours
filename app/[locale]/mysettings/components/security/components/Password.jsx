import React, { useState, useContext } from 'react';
import { useMessageStore } from '@/stores/messageStore';
import {
  Typography,
  Button,
  Card,
  Grid,
  ButtonGroup,
  CircularProgress,
} from '@mui/material';
import ChangePasswordDialog from './ChangePasswordDialog';
import { PersonalSettingsContext } from '../../tabs/MySettingsTabs';
import axios from 'axios';
import { errorHandler } from '@/utils/helper/errorHandler';

export default function Password() {
  const { user } = useContext(PersonalSettingsContext);

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

      const { data } = await axios.post(url);

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

          <Grid item xs={12} lg={4}>
            <Typography>
              Change or Reset your password regularly to keep your account
              secure
            </Typography>
          </Grid>

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
                <Typography>
                  Create a password to access your account from any device at
                  any time.
                </Typography>
                <Button fullWidth sx={{ my: 1 }}>
                  Add
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
