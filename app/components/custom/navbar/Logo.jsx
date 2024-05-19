import Image from 'next/image';
import Link from 'next/link';
import { Box, Tooltip } from '@mui/material';
import { useNavDrawerStore } from '@/stores/drawerStore';

export default function Logo() {
  const { toggleNavDrawer } = useNavDrawerStore();

  return (
    <Tooltip title="Home page" arrow>
    <Box
      sx={{ a: { display: 'flex' }, my: 1 }}
      onClick={() => toggleNavDrawer('right', false)}
    >
      <Link href="/">
        <Image
          src={'/assets/logo.png'}
          width={48}
          height={48}
          priority
          alt="app logo"
        />
      </Link>
    </Box>
    </Tooltip>
  );
}
