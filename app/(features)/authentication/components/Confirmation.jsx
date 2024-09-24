import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StyledAuthCard } from '@/components/styled/StyledCards';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Divider,
} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import { useTranslations } from 'next-intl';

export default function Confirmation(props) {
  const { message, email, action } = props;

  const isSignUp = action === 'signup';
  const isSendReset = action === 'send-reset-link';
  const isSendVerification = action === 'send-verification-link';

  const router = useRouter();

  const submitAttemptRef = useRef(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [captcha, setCaptcha] = useState('' || null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCountdown, setIsCountdown] = useState(false);

  const { handleAlertMessage } = useMessageStore();

  const t = useTranslations('confirmation_page');
  const t1 = useTranslations('common');

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
      const { errorMessage } = errorHandler(error, t1);

      if (submitAttemptRef.current === 5 && errorMessage) {
        setCaptcha(true);
      }

      setIsSubmitting(false);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  useEffect(() => {
    if (isSignUp && isCountdown && timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isCountdown, timeLeft]);

  useEffect(() => {
    if (isSignUp) {
      const intervalId = setInterval(() => {
        router.refresh();
      }, 6000);

      return () => clearTimeout(intervalId);
    }
  }, [router]);

  return (
    <>
      <StyledAuthCard>
        <Typography variant="h5">{t('headers.check_your_email')}</Typography>

        <Divider sx={{ my: 2 }} />

        {isSendReset || isSendVerification ? (
          <Typography
            sx={{ my: 2, span: { color: '#0288d1', cursor: 'pointer' } }}
          >
            We have emailed you{' '}
            {isSendReset
              ? 'instructions for creating a new password.'
              : 'the account verification link.'}{' '}
            If you have not received an email from us, you can{' '}
            <span onClick={() => location.reload()}>request a new one</span>.
          </Typography>
        ) : (
          <Typography sx={{ my: 2 }}>{message}</Typography>
        )}

        {isSignUp && (
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
              fullWidth
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
      </StyledAuthCard>
    </>
  );
}
