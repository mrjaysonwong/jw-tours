'use client';

import { Breadcrumbs } from '@mui/material';
import { styled } from '@mui/system';

export const StyledNavBreadcrumbs = styled(Breadcrumbs)(
  ({ contact, security }) => {
    const details = !contact && !security;

    return {
      color: 'inherit',
      marginBottom: '1.5rem',

      '.personal, .contact-info, .security': {
        '&:hover': {
          textDecoration: 'underline',
        },
      },

      '.personal': {
        color: details ? 'var(--color-text-main)' : 'inherit',
      },

      '.contact-info': {
        color: contact ? 'var(--color-text-main)' : 'inherit',
      },

      '.security': {
        color: security ? 'var(--color-text-main)' : 'inherit',
      },
    };
  }
);
