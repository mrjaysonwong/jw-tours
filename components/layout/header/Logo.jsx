'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Box } from '@mui/material';

import { useDrawerStore } from '@/stores/drawerStore';

const Logo = () => {
  const { toggleDrawer } = useDrawerStore();

  return (
    <Box onClick={() => toggleDrawer('right', false)} sx={{ py: 1.5, mr: 1.5 }}>
      <Link href="/">
        <Box sx={{ position: 'relative', width: '48px', height: '48px' }}>
          <Image
            src={'/assets/brand_logo.svg'}
            alt="logo"
            fill
            style={{
              objectFit: 'fill',
            }}
            priority
          />
        </Box>
      </Link>
    </Box>
  );
};

export default Logo;
