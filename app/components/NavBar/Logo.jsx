import Image from 'next/image';
import Link from 'next/link';
import { Box, useTheme } from '@mui/material';
import { useNavDrawerStore } from '@/stores/drawerStore';

export default function Logo() {
  const { toggleNavDrawer } = useNavDrawerStore();

  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';

  return (
    <Box
      className="logo-container"
      onClick={() => toggleNavDrawer('right', false)}
      sx={{ my: 1 }}
    >
      <Link href="/">
        <Image
          src={
            isLightMode
              ? '/assets/jwtours-logo-dark.png'
              : '/assets/jwtours-logo-light.png'
          }
          width={124}
          height={65}
          priority
          quality={100}
          alt="App logo"
        />
      </Link>
    </Box>
  );
}
