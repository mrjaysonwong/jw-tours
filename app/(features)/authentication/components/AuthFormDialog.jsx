'use client';

import React, { useState, useContext } from 'react';
import { Dialog, DialogContent, Box, Tabs, Tab } from '@mui/material';

// local imports
import { DialogContext } from '@/components/layout/header/Navbar';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

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

export default function AuthFormDialog() {
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
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ maxWidth: '400px' }}>
          <Box sx={{ width: '100%' }}>
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
              <SignInForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SignUpForm />
            </TabPanel>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
