'use client';

// third-party imports
import React, { useState, useContext } from 'react';
import { Dialog, DialogContent, Box, Tabs, Tab } from '@mui/material';

// internal imports
import { DialogContext } from '@/components/layout/header/Navbar';
import SignInForm from '@/components/forms/SignInForm';
import SignUpForm from '@/components/forms/SignUpForm';
import CustomTabPanel from '@/components/tabs/CustomTabPanel';
import { a11yProps } from '@/utils/a11yprops';

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
              value={value}
              onChange={handleChange}
              aria-label="Auth Tabs"
            >
              <Tab label="Sign In" {...a11yProps(0, 'signin')} />
              <Tab label="Sign Up" {...a11yProps(0, 'signup')} />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <SignInForm isDashboard={false} showRoleSelector={false} />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <SignUpForm showCancel={true} />
          </CustomTabPanel>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthFormDialog;
