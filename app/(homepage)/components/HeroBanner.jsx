import { auth } from '@/auth';
import Image from 'next/image';
import { Typography, Box, Button } from '@mui/material';

export default async function HeroBanner() {
  const session = await auth();

  return (
    <Box
      sx={{
        mt: 10,
        position: 'relative',
        height: {
          xs: '300px',
          md: '400px',
        },
      }}
    >
      {/* <Typography>Welcome {session ? session?.user?.name : 'Guest'}</Typography>
      <Typography>{session?.user?.email}</Typography> */}
      <Image
        src="https://res.cloudinary.com/dpyxciwcu/image/upload/v1719678889/samples/landscapes/el-nido_en0gxd.jpg"
        alt="Picture of the author"
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: '10% 25%' }}
        priority
      />

      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          width: '100%',
          textAlign: 'left',
          px: 1,
        }}
      >
        <Box
          sx={{
            width: '80vw',
            margin: 'auto',
            color: 'white',
          }}
        >
          <Typography sx={{ typography: { xs: 'h5', md: 'h3' } }}>
            Embark on Your Journey
          </Typography>
          <Typography sx={{ my: 2, typography: { xs: 'h6', md: 'h5' } }}>
            Unveil Spectacular Tours
          </Typography>
          <Button size="small" variant="contained">
            Find yours
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
