'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Typography, Box, Button } from '@mui/material';
import Image from 'next/image';
import { StyledCard } from '@/app/components/global-styles/globals';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { errorHandler } from '@/utils/helper/errorHandler';
import { useRouter } from 'next/navigation';
import { AlertMessage } from '@/app/components/custom/messages';
import { useMessageStore } from '@/stores/messageStore';

export default function ConfirmSendLink(props) {
  const { email, mode } = props;
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

  const handleResendLink = async () => {
    submitAttemptRef.current++;

    try {
      setIsSubmitting(true);

      const type = 'resend';
      const url = `/api/send-link?mode=${mode}&type=${type}`;

      const formData = {
        email: email,
      };

      const { data } = await axios.patch(url, formData);

      if (data) {
        handleAlertMessage(data.message, 'success');
        setTimeLeft(60);
        setIsSubmitting(false);
        setIsCountdown(true);
      }
    } catch (error) {
      const { errorMessage, status } = errorHandler(error);

      if (submitAttemptRef.current === 5 && errorMessage) {
        setCaptcha(true);
      }

      if (status === 429) {
        setIsSubmitting(false);
        handleAlertMessage(errorMessage, 'error');
      } else {
        setIsSubmitting(false);
     
        handleAlertMessage('An error occured. Try again.', 'error');
      }
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
      <StyledCard sx={{ width: 'clamp(300px, 90vw, 380px)', textAlign: 'left' }}>
        <Box>
          <Typography variant="h4">
            {mode === 'signin' ? 'Email Verification' : 'Account Verification'}
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
            {mode === 'signin' ? 'sign-in link' : 'verify link'} to complete the
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
            variant="contained"
            onClick={handleResendLink}
            disabled={isSubmitting || captcha || (isCountdown && timeLeft > 0)}
          >
            {isCountdown && timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend'}
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
