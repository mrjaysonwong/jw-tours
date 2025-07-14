'use client';

// third-party imports
import React, { useState } from 'react';
import { Dialog, DialogContent, Box, Tabs, Tab } from '@mui/material';

// internal imports
import SignInForm from '@/components/forms/SignInForm';
import SignUpForm from '@/components/forms/SignUpForm';
import { a11yProps } from '@/utils/a11yprops';
import { useAuthDialogStore } from '@/stores/dialogStore';

const TabPanel = (props) => {
  const { children, value, index, a11ylabel, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${a11ylabel}-tabpanel-${index}`}
      aria-labelledby={`${a11ylabel}-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const AuthFormDialog = () => {
  const [value, setValue] = useState(0);
  const { isAuthDialogOpen, closeAuthDialog } = useAuthDialogStore();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    closeAuthDialog();
  };

  return (
    <>
      <Dialog
        open={isAuthDialogOpen}
        onClose={handleClose}
        scroll="body"
        closeAfterTransition={true}
      >
        <DialogContent sx={{ width: { xs: 'auto', sm: '410px' } }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="Auth Tabs"
            >
              <Tab label="Sign In" {...a11yProps(0, 'signin')} />
              <Tab label="Sign Up" {...a11yProps(0, 'signup')} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0} a11ylabel="sign-in">
            <SignInForm
              isDashboard={false}
              showRoleSelector={false}
              showCancel={true}
            />
          </TabPanel>

          <TabPanel value={value} index={1} a11ylabel="sign-up">
            <SignUpForm showCancel={true} />
          </TabPanel>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthFormDialog;
