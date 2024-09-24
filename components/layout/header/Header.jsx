'use client';

import { UserDataProvider } from '@/contexts/UserProvider';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header>
      <UserDataProvider>
        <Navbar />
      </UserDataProvider>
    </header>
  );
}
