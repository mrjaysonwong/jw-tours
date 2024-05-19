'use client';

import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import { Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryBackButton from '../../buttons/HistoryBackButton';

export function Custom404Page() {
  const [cookies, setCookie, removeCookie] = useCookies(['not-found']);

  const router = useRouter();

  const handleBackButtonClick = () => {
    removeCookie('not-found', { path: '/' });

    router.back();
  };

  useEffect(() => {
    setCookie('not-found', 'true', { path: '/', secure: true });

    return () => {
      removeCookie('not-found', { path: '/' });
    };
  }, [setCookie, removeCookie]);

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
      <Typography>We could not find the page you were looking for.</Typography>
      <br />
      <Button onClick={handleBackButtonClick} startIcon={<ArrowBackIcon />}>
        Go Back
      </Button>
    </MainContainer>
  );
}

export function Custom404Resource() {
  return (
    <>
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
          We could not find the resource you were looking for.
        </Typography>
        <br />
        <HistoryBackButton />
      </MainContainer>
    </>
  );
}
