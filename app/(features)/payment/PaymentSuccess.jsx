'use client';
// third-party imports
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const PaymentSuccess = ({ transactionId, email }) => {
  return (
    <Card
      sx={{
        background: 'linear-gradient(220.55deg, #00B960  0%, #39A0FF 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: { xs: 'auto', md: '350px' },
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <ThumbUpIcon sx={{ fontSize: '2rem' }} />
        <Typography variant="h6" gutterBottom>
          Payment Successful
        </Typography>

        <Typography>Thank you for your booking!</Typography>
        <Typography>
          A confirmation email has been sent to <strong>{email}</strong>
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Transaction ID: <strong>{transactionId}</strong>
        </Typography>
      </CardContent>

      <CardActions sx={{ pb: 2 }}>
        <Link href={'/bookings'}>
          <Button variant="contained">Continue</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default PaymentSuccess;
