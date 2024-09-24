'use client';

import Image from 'next/image';
import { StyledContainer } from '@/components/styled/StyledContainers';
import { Typography } from '@mui/material';
import HistoryBackButton from '../buttons/HistoryBackButton';
import { useTranslations } from 'next-intl';

export function Custom404Page(props) {
  const t = useTranslations('not_found_page');

  const propsType = props.resource
    ? t('paragraphs.resource')
    : t('paragraphs.page');

  return (
    <StyledContainer sx={{ alignItems: 'center', textAlign: 'center' }}>
      <Image
        src={'/assets/file-error.png'}
        width={64}
        height={64}
        priority
        alt="404-error"
      />
      <Typography variant="h4" sx={{ mt: 1 }}>
        {t('headers.there_was_problem')}
      </Typography>
      <Typography sx={{ my: 1 }}>
        {t('paragraphs.props_type', { propsType })}
      </Typography>
      <br />
      <HistoryBackButton />
    </StyledContainer>
  );
}
