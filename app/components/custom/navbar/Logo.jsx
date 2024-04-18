import Image from 'next/image';
import Link from 'next/link';
import { Box } from '@mui/material';
import { useNavDrawerStore } from '@/stores/drawerStore';

export default function Logo() {
  const { toggleNavDrawer } = useNavDrawerStore();

  return (
    <Box
      sx={{ a: { display: 'flex' } }}
      onClick={() => toggleNavDrawer('right', false)}
    >
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
