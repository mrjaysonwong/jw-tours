import Image from 'next/image';
import Link from 'next/link';
import { Box } from '@mui/material';

export default function Logo() {
  return (
    <Box sx={{ a: { display: 'flex' } }}>
      <Link href="/">
        <Image
          src={'/assets/logo.png'}
          width={55}
          height={30}
          priority
          alt="app logo"
        />
      </Link>
    </Box>
  );
}
