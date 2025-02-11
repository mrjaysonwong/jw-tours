import { useParams } from 'next/navigation';
import { Typography, Box, Grid, Tabs, Tab } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// internal imports
import { useUserSessionContext } from '@/contexts/UserProvider';
import CustomTabPanel from '@/components/tabs/CustomTabPanel';
import { a11yProps } from '@/utils/a11yprops';
import AccountManagementCard from '@/app/(features)/account/personal-details/AccountManagementCard';
import PersonalDetailsCard from '@/app/(features)/account/personal-details/PersonalDetailsCard';
import EmailAddressesCard from '@/app/(features)/account/contact-information/EmailAddressesCard';
import MobileNumbersCard from '@/app/(features)/account/contact-information/MobileNumbersCard';
import { SecurityCard } from '@/app/(features)/account/security/Security';

const CustomTab = ({ value, setValue }) => {
  const session = useUserSessionContext();
  const isAdmin = session?.user?.role === 'admin';

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          aria-label="profile settings tabs"
          sx={{
            minHeight: 50,

            '& .MuiTab-root': {
              minHeight: 50,
              textTransform: 'none',
            },
          }}
        >
          <Tab
            icon={<PermIdentityIcon />}
            iconPosition="start"
            label="Personal Details"
            {...a11yProps(0, 'personal-details')}
          />
          <Tab
            icon={<BadgeOutlinedIcon />}
            iconPosition="start"
            label="Contact Information"
            {...a11yProps(1, 'contact-information')}
          />

          {isAdmin && (
            <Tab
              icon={<LockOutlinedIcon />}
              iconPosition="start"
              label="Security"
              {...a11yProps(1, 'security')}
            />
          )}
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0} a11ylabel="personal-details">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={12} lg={4}>
            <AccountManagementCard />
          </Grid>

          <Grid item xs={12} sm={8} md={12} lg={8}>
            <PersonalDetailsCard />
          </Grid>
        </Grid>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1} a11ylabel="contact-information">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={6}>
            <EmailAddressesCard />
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <MobileNumbersCard />
          </Grid>
        </Grid>
      </CustomTabPanel>

      {isAdmin && (
        <CustomTabPanel value={value} index={2} a11ylabel="security">
          <SecurityCard />
        </CustomTabPanel>
      )}
    </Box>
  );
};

export default CustomTab;
