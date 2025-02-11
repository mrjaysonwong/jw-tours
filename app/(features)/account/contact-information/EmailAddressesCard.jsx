import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Box,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

// internal imports
import { useUserDetailsContext } from '@/contexts/UserProvider';
import { SkeletonCard } from '@/components/loaders/Skeletons';
import ContactListItem from '@/components/items/ContactListItem';
import AddContactDialog from '@/components/dialogs/AddContactDialog';
import VerifyOTPDialog from '@/components/dialogs/VerifyOTPDialog';

const EmailAddressesCard = () => {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const [email, setEmail] = useState('');

  const params = useParams();

  const { isLoading, user } = useUserDetailsContext();

  if (isLoading) {
    return <SkeletonCard />;
  }

  const sortedEmailList = user?.email
    .slice()
    .sort((a, b) => b.isPrimary - a.isPrimary);

  const handleAddClick = () => {
    setIsAddContactOpen(true);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6">Email Addresses</Typography>

          {!params.id && (
            <Typography>
              You can use the following email addresses to sign in to your
              account.
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: 'right', mb: 2 }}>
            <Button
              size="small"
              variant="contained"
              startIcon={<EmailIcon />}
              onClick={handleAddClick}
            >
              Add Email
            </Button>
          </Box>
          <ContactListItem items={sortedEmailList} type="email" />
        </CardContent>
      </Card>

      {isAddContactOpen && (
        <AddContactDialog
          isAddContactOpen={isAddContactOpen}
          setIsAddContactOpen={setIsAddContactOpen}
          setIsOTPOpen={setIsOTPOpen}
          setEmail={setEmail}
          type="email"
        />
      )}

      {isOTPOpen && (
        <VerifyOTPDialog
          isOTPOpen={isOTPOpen}
          setIsOTPOpen={setIsOTPOpen}
          email={email}
          type="email"
        />
      )}
    </>
  );
};

export default EmailAddressesCard;
