import { Grid } from '@mui/material';

// internal imports
import AccountManagementCard from './AccountManagementCard';
import PersonalDetailsCard from './PersonalDetailsCard';

const PersonalDetails = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={12} lg={4}>
          <AccountManagementCard />
        </Grid>

        <Grid item xs={12} sm={8} md={12} lg={8}>
          <PersonalDetailsCard />
        </Grid>
      </Grid>
    </>
  );
};

export default PersonalDetails;
