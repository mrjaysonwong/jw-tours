'use client';

// third-party imports
import React, { useState, useContext } from 'react';
import { Dialog, DialogContent, Box, Tabs, Tab } from '@mui/material';

// internal imports
import { DialogContext } from '@/components/layout/header/Navbar';
import { SignInForm } from '@/app/(features)/authentication/SignInForm';
import SignUpForm from '@/app/(features)/authentication/SignUpForm';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
};

const AuthFormDialog = () => {
  const [value, setValue] = useState(0);

  const { open, setOpen } = useContext(DialogContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        closeAfterTransition={true}
      >
        <DialogContent sx={{ width: { xs: 'auto', sm: '410px' } }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              variant="fullWidth"
              indicatorColor="primary"
              value={value}
              onChange={handleChange}
              aria-label="Auth Tabs"
            >
              <Tab label="Sign In" />
              <Tab label="Sign Up" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <SignInForm showOAuth={true} showRoleSelector={false} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SignUpForm showCancel={true} />
          </TabPanel>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthFormDialog;
