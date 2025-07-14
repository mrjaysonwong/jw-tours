// third-party imports
import { Typography, Box, Tooltip } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// internal imports
import MoreVertMenu from '@/components/menus/MoreVertMenu';

const ContactListItem = ({ items, type }) => {
  return items?.map((item, index) => {
    const isPrimary = item.isPrimary;

    const displayItem =
      type === 'email' ? item.email : `+${item.dialCode} ${item.phoneNumber}`;

    const otherProps =
      type === 'email'
        ? { email: item.email }
        : { dialCode: item.dialCode, phoneNumber: item.phoneNumber };

    return (
      <Box
        key={index}
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ py: 2, ml: 1, overflowX: 'auto' }}>
          {displayItem}
        </Typography>

        {!isPrimary && (
          <MoreVertMenu menuType="my-contact-info" {...otherProps} />
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
              <Box sx={{ position: 'absolute', left: -10, top: 0 }}>
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
