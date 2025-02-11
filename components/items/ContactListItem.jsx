// third-party imports
import { Typography, Box, Tooltip } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// internal imports
import MoreVertMenu from '@/components/menus/MoreVertMenu';

const ContactListItem = ({ items, type, userId }) => {

  
  return items.map((item, index) => {
    const isPrimary = item.isPrimary;

    const displayItem =
      type === 'email' ? item.email : `+${item.dialCode} ${item.phoneNumber}`;

    const menuProps =
      type === 'email'
        ? { email: item.email }
        : { dialCode: item.dialCode, phoneNumber: item.phoneNumber };

    return (
      <Box key={index} sx={{ position: 'relative', display: 'flex' }}>
        <Typography sx={{ py: 2, mr: 7, ml: 1, overflowX: 'auto' }}>
          {displayItem}
        </Typography>

        {!isPrimary && (
          <MoreVertMenu menuType="cards" {...menuProps} userId={userId} />
        )}

        {isPrimary && (
          <>
            <Tooltip
              title={`Primary ${
                type === 'email' ? 'Email Address' : 'Mobile Number'
              }`}
              arrow
              placement="right-end"
            >
              <Box sx={{ position: 'absolute', left: -10 }}>
                <WorkspacePremiumIcon />
              </Box>
            </Tooltip>
          </>
        )}
      </Box>
    );
  });
};

export default ContactListItem;
