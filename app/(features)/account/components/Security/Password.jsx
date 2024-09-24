import React, { useState, useContext } from 'react';
import {
  Typography,
  Button,
  Card,
  Grid,
  ButtonGroup,
  CircularProgress,
  Box,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import axios from 'axios';

// local imports
import { useMessageStore } from '@/stores/messageStore';
import { UserDataContext } from '@/contexts/UserProvider';
import { errorHandler } from '@/helpers/errorHelpers';
import { SkeletonCard } from '@/components/loaders/Skeletons';
import ChangePasswordDialog from './ChangePasswordDialog';
import CustomError from '@/components/errors/500';
import { StyledGridCard } from '@/components/styled/StyledCards';

export default function Password() {
  const { user, email, isLoading, isError, error } =
    useContext(UserDataContext);

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleAlertMessage } = useMessageStore();

  const handleChangePasswordClick = () => {
    setOpen(true);
  };

  const handleResetPasswordClick = async () => {
    try {
      setIsSubmitting(true);

      const action = 'forgot-password';
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

  if (isError) {
    return <CustomError error={error} />;
  }

  if (isLoading) {
    return <SkeletonCard h={106} l={1} />;
  }

  return (
    <>
      <StyledGridCard
        sx={{
          p: 2,
          '&:hover': {
            color: 'inherit',
          },
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
                <ButtonGroup
                  variant="outlined"
                  aria-label="button group"
                  size="small"
                >
                  <Button
                    disabled={isSubmitting}
                    onClick={handleChangePasswordClick}
                  >
                    Change Password
                  </Button>

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
              </>
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

      <ChangePasswordDialog open={open} setOpen={setOpen} />
    </>
  );
}
