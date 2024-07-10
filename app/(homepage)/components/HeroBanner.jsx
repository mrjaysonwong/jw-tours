import Image from 'next/image';
import Link from 'next/link';
import { Typography, Box, Grid } from '@mui/material';
import PinDropIcon from '@mui/icons-material/PinDrop';

export default async function HeroBanner() {
  return (
    <Link href="/destinations/boracay">
      <Box
        sx={{
          mt: 10,
          position: 'relative',
          color: 'white',
          cursor: 'pointer',
          height: {
            xs: '300px',
            md: '400px',
          },
        }}
      >
        <Image
          src="/assets/hero-banner/boracay-bg.png"
          alt="Picture of the author"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: '10% 40%' }}
          priority
        />

        <Box
          sx={{
            position: 'absolute',
            top: '14%',
            width: '100%',
          }}
        >
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3 }}>
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
                  src="/assets/hero-banner/boracay-2.png"
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
                  src="/assets/hero-banner/boracay-3.png"
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
    </Link>
  );
}
