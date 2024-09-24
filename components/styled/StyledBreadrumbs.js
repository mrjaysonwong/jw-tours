'use client';

import { Breadcrumbs } from '@mui/material';
import { styled } from '@mui/system';

export const StyledDetailsBreadcrumbs = styled(Breadcrumbs)(
  ({ contactinfo }) => {
    const isContactInfo = contactinfo === 'true';

    return {
      marginBottom: '2rem',

      '.personal, .contact-info': {
        '&:hover': {
          textDecoration: 'underline',
        },
      },

      '.personal': {
        color: !isContactInfo ? 'var(--color-text-main)' : 'inherit',
      },

      '.contact-info': {
        color: isContactInfo ? 'var(--color-text-main)' : 'inherit',
      },
    };
  }
);
