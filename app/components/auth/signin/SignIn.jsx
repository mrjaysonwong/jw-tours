'use client';

import { MainContainer, FormContainer } from '@/app/components/custom/styles/globals';
import {  SignInWithContainer } from './styled';
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
