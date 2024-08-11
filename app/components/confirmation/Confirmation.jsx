import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StyledCard } from '@/app/components/global-styles/globals';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/utils/helper/errorHandler';
import { useTranslations } from 'next-intl';

export default function Confirmation({ message, email, action }) {
  const isSignup = action === 'signup';

  const router = useRouter();

  const submitAttemptRef = useRef(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [captcha, setCaptcha] = useState('' || null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCountdown, setIsCountdown] = useState(false);

  const { handleAlertMessage } = useMessageStore();

  const t = useTranslations('confirmation_page');

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
    if (isSignup) {
      if (isCountdown && timeLeft > 0) {
        const intervalId = setInterval(() => {
          setTimeLeft((prevCount) => prevCount - 1);
        }, 1000);

        return () => clearInterval(intervalId);
      }
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
        sx={{
          width: 'clamp(300px, 90vw, 350px)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5">{t('headers.check_your_email')}</Typography>
        <Typography>{message}</Typography>

        {isSignup && (
          <>
            <Typography sx={{ my: 2 }}>
              {t('paragraphs.did_not_receive_email')}
            </Typography>

            {captcha && (
              <Box sx={{ mb: 2 }}>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={onChange}
                />
              </Box>
            )}

            <Button
              type="submit"
              variant="text"
              disabled={
                isSubmitting || captcha || (isCountdown && timeLeft > 0)
              }
              onClick={handleSubmit}
              autoFocus
            >
              {isCountdown && timeLeft > 0 ? (
                <span>{t('button_labels.resend_timeleft', { timeLeft })}</span>
              ) : isSubmitting ? (
                <CircularProgress size="1.5rem" />
              ) : (
                <span>{t('button_labels.resend')}</span>
              )}
            </Button>
          </>
        )}
      </StyledCard>
    </>
  );
}
