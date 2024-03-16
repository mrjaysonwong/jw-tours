import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { MainContainer } from '@/app/components/layout/styles/globals';

export const metadata = {
  title: 'Verify Email | JW-Tours',
};

export default function Verify() {
  return (
    <MainContainer>
      <Typography>Verify Page</Typography>
    </MainContainer>
  );
}
