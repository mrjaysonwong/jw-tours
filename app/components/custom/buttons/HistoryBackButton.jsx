'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function HistoryBackButton() {
  const router = useRouter();

  return (
    <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()}>
      Go Back
    </Button>
  );
}
