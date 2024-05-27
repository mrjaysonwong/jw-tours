'use client';

import Image from 'next/image';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import { Typography } from '@mui/material';
import HistoryBackButton from '../../buttons/HistoryBackButton';

export function Custom404Page(props) {
  return (
    <MainContainer
      sx={{
        mt: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Image
        src={'/assets/file-error.png'}
        width={64}
        height={64}
        priority
        alt="404-error"
      />
      <Typography variant="h4" sx={{ mt: 1 }}>
        There was a problem.
      </Typography>
      <Typography>
        We could not find the {props.resource ? 'resource' : 'page'} you were
        looking for.
      </Typography>
      <br />
      <HistoryBackButton />
    </MainContainer>
  );
}


