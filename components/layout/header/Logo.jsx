import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';
import { useNavDrawerStore } from '@/stores/drawerStore';

export default function Logo() {
  const pathname = usePathname();
  const { toggleNavDrawer } = useNavDrawerStore();

  const isVerifyPage = pathname.startsWith('/verify');

  return (
    <Box
      className="logo-container"
      onClick={() => toggleNavDrawer('right', false)}
      sx={{
        my: 1.5,
        mr: 3,
        pointerEvents: isVerifyPage ? 'none' : 'auto',
      }}
    >
      <Link href="/">
        <Box sx={{ position: 'relative', width: '64px', height: '64px' }}>
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
}
