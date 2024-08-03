'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { StyledCard } from '@/app/components/global-styles/globals';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { errorHandler } from '@/utils/helper/errorHandler';
import { useRouter } from 'next/navigation';
import { AlertMessage } from '@/app/components/custom/messages';
import { useMessageStore } from '@/stores/messageStore';

export default function ConfirmSendLink(props) {
  const { email, action } = props;
  const router = useRouter();

  const { alert, handleAlertMessage, handleClose } = useMessageStore();

  const submitAttemptRef = useRef(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const [captcha, setCaptcha] = useState('' || null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCountdown, setIsCountdown] = useState(false);

  const onChange = () => {
    setCaptcha(false);
    submitAttemptRef.current = 0;
    document
      .querySelectorAll(`iframe[src*=recaptcha]`)
      .forEach((a) => a.remove());
  };

  const handleSubmit = async () => {
    submitAttemptRef.current++;
    setIsSubmitting(true);
    try {
      const url = `/api/send-link?action=${action}`;

      const formData = {
        email: email,
      };

      const { data } = await axios.post(url, formData);

      if (data) {
        handleAlertMessage(data.statusText, 'success');
        setTimeLeft(60);
        setIsSubmitting(false);
        setIsCountdown(true);
      }
    } catch (error) {
      const { errorMessage } = errorHandler(error);

      if (submitAttemptRef.current === 5 && errorMessage) {
        setCaptcha(true);
      }

      setIsSubmitting(false);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  useEffect(() => {
    if (isCountdown && timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isCountdown, timeLeft]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      router.refresh();
    }, 10000);

    return () => clearTimeout(intervalId);
  }, [router]);

  return (
    <>
      <StyledCard
        sx={{ width: 'clamp(300px, 90vw, 380px)', textAlign: 'left' }}
      >
        <Box>
          <Typography variant="h4">
            {action === 'signin' ? 'Email Verification' : 'Account Verification'}
          </Typography>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography>
            We have sent a verification link to{' '}
            <span style={{ color: 'var(--palette-light-blue)' }}>{email}</span>
          </Typography>

          <Box sx={{ my: 1, textAlign: 'center' }}>
            <Image
              src={'/assets/email_sent.png'}
              width={64}
              height={64}
              priority
              alt="email_sent"
            />
          </Box>
          <Typography sx={{ my: 1 }}>
            Please check your email and click the{' '}
            {action === 'signin' ? 'sign-in link' : 'verify link'} to complete the
            verification process.
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ my: 2 }}>Did not receive the email?</Typography>

          {captcha && (
            <Box sx={{ mb: 2 }}>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onChange}
              />
            </Box>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isSubmitting || captcha || (isCountdown && timeLeft > 0)}
            onClick={handleSubmit}
            autoFocus
          >
            {isCountdown && timeLeft > 0 ? (
              `Resend in ${timeLeft}s`
            ) : isSubmitting ? (
              <CircularProgress size="1.5rem" />
            ) : (
              'Resend'
            )}
          </Button>

          <Link href="/signin/link">
            <Button
              fullWidth
              variant="text"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              Go Back
            </Button>
          </Link>
        </Box>
      </StyledCard>

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
