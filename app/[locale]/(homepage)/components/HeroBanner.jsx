import Image from 'next/image';
import Link from 'next/link';
import { Typography, Box, Grid } from '@mui/material';
import PinDropIcon from '@mui/icons-material/PinDrop';

export default function HeroBanner() {
  return (
    // <Link href="/destinations/boracay">
    <Box
      sx={{
        mt: 10,
        position: 'relative',
        color: 'white',
        cursor: 'pointer',
        width: '100%',
        height: {
          xs: '300px',
          md: '400px',
        },
      }}
    >
      <Image
        src="https://res.cloudinary.com/dpyxciwcu/image/upload/v1720611572/jwtours/background/boracay_nbpnzd.jpg"
        alt="Picture of the author"
        fill
        style={{ objectFit: 'cover', objectPosition: '10% 40%' }}
        priority
      />

      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0,0,0,0.2)',
        }}
      >
        <Grid
          container
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} md={6}>
            <Box sx={{ px: 3 }}>
              <Typography
                sx={{
                  fontFamily: 'Gothic A1 !important',
                  px: { xs: 'auto', md: 10 },
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                risus nisl, pretium quis tempus at, auctor sit amet velit.
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: 'Moirai One !important',
                  textAlign: 'right',
                  fontSize: { xs: '5rem', md: '10rem' },
                }}
              >
                Relax
              </Typography>

              <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  alignItems: 'center',
                  justifyContent: 'right',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: `Bodoni Moda SC
                    !important`,
                    fontWeight: 700,
                    textTransform: 'capitalize',
                  }}
                >
                  Boracay
                </Typography>
                <PinDropIcon sx={{ fontSize: '3rem', color: 'tomato' }} />
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={6}
            md={6}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            <Box
              sx={{
                position: 'relative',
                textAlign: 'center',
              }}
            >
              <Image
                src="https://res.cloudinary.com/dpyxciwcu/image/upload/v1720611904/jwtours/background/hero-image/boracay-2_fhr1oz.png"
                alt="hero image"
                width={200}
                height={200}
                sizes="100vw"
                style={{
                  objectFit: 'contain',
                  objectPosition: '50%',
                  width: 200,
                  height: 200,
                }}
                priority
              />

              <Image
                src="https://res.cloudinary.com/dpyxciwcu/image/upload/v1720611900/jwtours/background/hero-image/boracay-3_qexqqr.png"
                alt="hero image"
                width={200}
                height={200}
                sizes="100vw"
                style={{
                  objectFit: 'contain',
                  objectPosition: '100%',
                  width: 200,
                  height: 200,
                }}
                priority
              />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: 5,
                  textAlign: 'right',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: `Bodoni Moda SC
                    !important`,
                    fontWeight: 700,
                    textTransform: 'capitalize',
                  }}
                >
                  Boracay
                </Typography>
                <PinDropIcon sx={{ fontSize: '3rem', color: 'tomato' }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
    // </Link>
  );
}
