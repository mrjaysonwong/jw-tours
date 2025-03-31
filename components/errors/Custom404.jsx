'use client';

// third-party imports
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Typography, Box } from '@mui/material';

// internal imports
import { StyledMainContainer } from '@/components/styled/StyledContainers';
import HistoryBackButton from '../buttons/HistoryBackButton';

const Custom404 = ({ resource = 'page' }) => {
  const t = useTranslations('not_found_page');

  return (
    <StyledMainContainer>
      <Image
        src={'/assets/file-error.png'}
        width={64}
        height={64}
        priority
        alt="404-error"
      />
      <Box textAlign="center">
        <Typography variant="h4" sx={{ my: 1 }}>
          {t('headers.there_was_problem')}
        </Typography>
        <Typography sx={{ my: 1 }}>
          We could not find the {resource} you were looking for.
        </Typography>
      </Box>

      <HistoryBackButton />
    </StyledMainContainer>
  );
};

export default Custom404;
