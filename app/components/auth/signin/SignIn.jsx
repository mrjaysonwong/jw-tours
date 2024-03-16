'use client';

import Link from 'next/link';
import { Button, Typography, TextField } from '@mui/material';
import { MainContainer } from '@/app/components/layout/styles/globals';
import { FormContainer, SignInWithContainer } from './styled';
import OAuth from './oauth/OAuth';
import Email from './email/Email';

export default function SignIn() {
  return (
    <>
      <MainContainer>
        <FormContainer>
          <SignInWithContainer>
            <OAuth />
            <Email />
          </SignInWithContainer>
        </FormContainer>
      </MainContainer>
    </>
  );
}
