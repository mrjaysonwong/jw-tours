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
import PhoneIcon from '@mui/icons-material/Phone';

// internal imports
import { useUserDetailsContext } from '@/contexts/UserProvider';
import ContactListItem from '@/app/(features)/account/contact-information/ContactListItem';
import AddContactDialog from '@/components/dialogs/AddContactDialog';

const getSubTitle = (type) =>
  type == 'email'
    ? 'You can use the following email addresses to sign in to your account.'
    : 'View and manage all of the mobile numbers associated with your account';

const getType = (type) => (type === 'email' ? 'email' : 'mobile');

const getIcon = (type) => (type === 'email' ? <EmailIcon /> : <PhoneIcon />);

// use domain http://127.0.0.1:3000 test add number
const ContactCard = ({ title, type, buttonLabel }) => {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);

  const params = useParams();
  const { user } = useUserDetailsContext();

  const sortedEmailList = user.email
    ?.slice()
    .sort((a, b) => b.isPrimary - a.isPrimary);

  const sortedPhoneList = user.phone
    ?.slice()
    .sort((a, b) => b.isPrimary - a.isPrimary);

  const handleAddClick = () => {
    setIsAddContactOpen(true);
  };

  const items = type === 'email' ? sortedEmailList : sortedPhoneList;

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6">{title}</Typography>

          {!params.id && <Typography>{getSubTitle(type)}</Typography>}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: 'right', mb: 2 }}>
            <Button
              size="small"
              variant="contained"
              startIcon={getIcon(type)}
              onClick={handleAddClick}
            >
              {buttonLabel}
            </Button>
          </Box>

          {type === 'email' ? (
            <ContactListItem items={items} type={getType(type)} />
          ) : !user.phone ? (
            <Typography sx={{ py: 2 }}>No verified mobile number</Typography>
          ) : (
            <ContactListItem items={items} type={getType(type)} />
          )}
        </CardContent>
      </Card>

      {isAddContactOpen && (
        <AddContactDialog
          title={type === 'email' ? 'Add Email Address' : 'Add Mobile Number'}
          isAddContactOpen={isAddContactOpen}
          setIsAddContactOpen={setIsAddContactOpen}
          type={getType(type)}
        />
      )}
    </>
  );
};

export default ContactCard;
