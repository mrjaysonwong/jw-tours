import React, { useState, useRef } from 'react';
import {
    StyledContainer as MainContainer,
    StyledCard,
  } from '@/app/components/global-styles/globals';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function Confirmation({email}) {
 

    return (
        <>
            <Typography variant="h5">Check your email</Typography>
            <Typography>We have sent a signin link to</Typography>
            <Typography>{email}</Typography>
        </>
    )
};
