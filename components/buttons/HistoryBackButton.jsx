'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslations } from 'next-intl';

export default function HistoryBackButton({ margin = 0 }) {
  const router = useRouter();

  const t1 = useTranslations('common');

  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => router.back()}
      sx={{ m: margin }}
    >
      {t1('button_labels.goback')}
    </Button>
  );
}
