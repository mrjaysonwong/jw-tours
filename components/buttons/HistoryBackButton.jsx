'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslations } from 'next-intl';

const HistoryBackButton = ({
  fullWidth,
  variant = 'text',
  isSubmitting,
  margin = 0,
  redirectPath,
}) => {
  const router = useRouter();
  const t1 = useTranslations('common');

  const navigateBack = (router) => {
    if (window.history.length === 2) {
      router.replace('/');
    } else {
      if (redirectPath) {
        router.replace(redirectPath);
      } else {
        router.back();
      }
    }
  };

  return (
    <Button
      fullWidth={fullWidth}
      disabled={isSubmitting}
      variant={variant}
      startIcon={<ArrowBackIcon />}
      onClick={() => navigateBack(router)}
      sx={{ m: margin, color: 'gray' }}
    >
      {t1('button_labels.goback')}
    </Button>
  );
};

export default HistoryBackButton;
