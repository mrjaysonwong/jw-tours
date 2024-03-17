import { auth } from '@/auth';
import Home from './components/home/Home';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { MainContainer } from '@/app/components/layout/styles/globals';

export default async function HomePage() {
  const user = await auth();

  console.log(user);

  return (
    <>
      <Home user={user} />
    </>
  );
}
