import { Grid } from '@mui/material';

// internal imports
import ContactCard from './ContactCard';

const ContactInformation = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={6}>
        <ContactCard
          title="Email Addresses"
          type="email"
          buttonLabel="Add Email"
        />
      </Grid>

      <Grid item xs={12} md={12} lg={6}>
        <ContactCard
          title="Mobile Numbers"
          type="mobile"
          buttonLabel="Add Mobile"
        />
      </Grid>
    </Grid>
  );
};

export default ContactInformation;
