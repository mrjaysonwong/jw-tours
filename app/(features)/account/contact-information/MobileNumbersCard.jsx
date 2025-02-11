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
import PhoneIcon from '@mui/icons-material/Phone';

// internal imports
import { useUserDetailsContext } from '@/contexts/UserProvider';
import { SkeletonCard } from '@/components/loaders/Skeletons';
import ContactListItem from '@/components/items/ContactListItem';
import AddContactDialog from '@/components/dialogs/AddContactDialog';
import VerifyOTPDialog from '@/components/dialogs/VerifyOTPDialog';

const MobileNumbersCard = () => {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [isOTPOpen, setIsOTPOpen] = useState(false);

  const [phoneDetails, setPhoneDetails] = useState({
    phone: {
      dialCode: '',
      phoneNumber: '',
    },
  });

  const params = useParams();

  const { isLoading, user } = useUserDetailsContext();

  if (isLoading) {
    return <SkeletonCard />;
  }

  const sortedPhoneList = user?.phone
    ?.slice()
    .sort((a, b) => b.isPrimary - a.isPrimary);

  const handleAddClick = () => {
    setIsAddContactOpen(true);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6">Mobile Numbers</Typography>

          {!params.id && (
            <Typography>
              View and manage all of the mobile numbers associated with your
              account.
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: 'right', mb: 2 }}>
            <Button
              size="small"
              variant="contained"
              startIcon={<PhoneIcon />}
              onClick={handleAddClick}
            >
              Add Mobile
            </Button>
          </Box>

          {user?.phone?.length ? (
            <ContactListItem items={sortedPhoneList} type="phone" />
          ) : (
            <Typography>No verified mobile number</Typography>
          )}
        </CardContent>
      </Card>

      {isAddContactOpen && (
        <AddContactDialog
          isAddContactOpen={isAddContactOpen}
          setIsAddContactOpen={setIsAddContactOpen}
          setIsOTPOpen={setIsOTPOpen}
          setPhoneDetails={setPhoneDetails}
          type="mobile"
        />
      )}

      {isOTPOpen && (
        <VerifyOTPDialog
          isOTPOpen={isOTPOpen}
          setIsOTPOpen={setIsOTPOpen}
          phoneDetails={phoneDetails}
          type="mobile"
        />
      )}
    </>
  );
};

export default MobileNumbersCard;
