import Image from 'next/image';
import Link from 'next/link';
import { MainContainer } from '@/app/components/global-styles/globals'
import { Typography, Button } from '@mui/material';

export default function Custom404(props) {
  return (
    <MainContainer sx={{ m: 2, textAlign: 'center' }}>
      <Image
        src={'/assets/file-error.png'}
        width={64}
        height={64}
        priority
        alt="404-error"
      />
      <Typography variant="h4" sx={{ mt: 1 }}>
        There was a problem.
      </Typography>
      <Typography>
        We could not find the {props.resource ? 'resource' : 'page'} you were
        looking for.
      </Typography>
      <br />
      {props.resource ? (
        <Typography>
          Go back to
          <Link href="/signin" replace>
            <Button variant="text" sx={{ ml: 1 }}>
              Sign In Page
            </Button>
          </Link>
        </Typography>
      ) : (
        <Typography>
          Go back to
          <a href="/">
            <Button variant="text" sx={{ ml: 1 }}>
              Home page
            </Button>
          </a>
        </Typography>
      )}
    </MainContainer>
  );
}
