export default function SignInPage(params) {
  return <div>Foo</div>
};


// import { auth } from '@/auth';
// import { redirect } from 'next/navigation';
// import { Link } from '@/navigation';
// import Image from 'next/image';
// import { StyledContainer, StyledAuthCard } from '@/components/styled/StyledContainers';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Container,
//   Grid,
// } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import XIcon from '@mui/icons-material/X';
// import YouTubeIcon from '@mui/icons-material/YouTube';
// import InstagramIcon from '@mui/icons-material/Instagram';

// // refactor styles

// export default async function SignInPage() {
//   const session = await auth();
//   const role = session?.user?.role;

//   if (session && role === 'admin') {
//     redirect('/admin/dashboard');
//   }

//   return (
//     <Box sx={{bgcolor: 'lightblue'}}>
//       <StyledContainer>
//         <StyledAuthCard>
//           <Typography variant="h5" sx={{ my: 1 }}>
//             Admin Sign In
//           </Typography>

//           <form>
//             <TextField fullWidth margin="dense" size="small" label="Email" />
//             <TextField fullWidth margin="dense" size="small" label="Password" />

//             <Button fullWidth variant="contained" sx={{ mt: 2 }}>
//               Sign In
//             </Button>
//           </form>
//         </StyledAuthCard>
//       </StyledContainer>

//       <footer>
//         <Container
//           sx={{
//             position: 'relative',

//             '.logo': {
//               mb: 5,
//             },

//             '.banner': {
//               pointerEvents: 'none',
//             },

//             '.socmed-container': {
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: { xs: 'center', lg: 'left' },
//             },

//             a: {
//               color: 'black',
//               mx: 0.5,
//             },

//             p: {
//               color: 'black',
//             },
//           }}
//         >
//           <Grid container>
//             <Grid item xs={12}>
//               <Box
//                 sx={{
//                   position: { xs: 'relative', lg: 'absolute' },
//                   left: { lg: '26%' },
//                   top: { lg: '50%' },
//                   transform: { lg: 'translate(-50%, -50%)' },
//                   textAlign: { xs: 'center', lg: 'left' },
//                 }}
//               >
//                 <Image
//                   src={'/assets/logo_dark.svg'}
//                   width={62}
//                   height={57}
//                   quality={90}
//                   alt="App logo"
//                   className="logo"
//                 />

//                 <div className="socmed-container">
//                   <Link href="/">
//                     <FacebookIcon sx={{ fontSize: '1.5rem' }} />
//                   </Link>
//                   <Link href="/">
//                     <XIcon />
//                   </Link>
//                   <Link href="/">
//                     <InstagramIcon />
//                   </Link>
//                   <Link href="/">
//                     <YouTubeIcon sx={{ fontSize: '2rem' }} />
//                   </Link>
//                 </div>

//                 <div>
//                   <Typography
//                     sx={{ maxWidth: { lg: '40vw' }, my: 2, fontSize: '12px' }}
//                   >
//                     JW Tours offers expertly curated travel experiences for
//                     every type of traveler. Our team is dedicated to providing
//                     exceptional service and unforgettable adventures. For more
//                     details, please review our terms of use, cookie policy, and
//                     privacy policy.
//                   </Typography>
//                 </div>

//                 <Box sx={{ mt: 2 }}>
//                   <Typography sx={{ fontSize: '12px' }}>
//                     Copyright 2024-2025 by Jayson Wong. All Rights Reserved. JW
//                     Tours is Powered by{' '}
//                     <span style={{ textDecoration: 'underline' }}>
//                       <Link href="https://nextjs.org/" target="_blank">
//                         Next.js
//                       </Link>
//                     </span>
//                   </Typography>
//                 </Box>
//               </Box>
//             </Grid>

//             <Grid item xs={12}>
//               <Image
//                 src="https://res.cloudinary.com/dpyxciwcu/image/upload/v1725467222/jwtours/background/footer/footer_banner_vdlotu.svg"
//                 sizes="100vw"
//                 style={{
//                   width: '100%',
//                   height: 'auto',
//                 }}
//                 width={500}
//                 height={300}
//                 quality={90}
//                 priority
//                 alt="Footer Banner"
//                 className="banner"
//               />
//             </Grid>
//           </Grid>
//         </Container>
//       </footer>
//     </Box>
//   );
// }
