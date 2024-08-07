'use client';

import { Typography, Box, List, ListItem } from '@mui/material';

export default function TermsOfUse() {
  return (
    <Box sx={{ width: 'clamp(min(100vw, 600px), 90vw, max(50vw, 600px ))' }}>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ mt: 20, mb: 10}}
      >
        User Agreement
      </Typography>
      <List
        sx={{
          '.item': {
            listStyleType: 'disc',

            '.bullet': { display: 'list-item', marginLeft: '2rem' },
          },
        }}
      >
        <ListItem>
          <Typography>
            This User Agreement (the &apos;Agreement&apos;) is a legal agreement
            between you (&apos;User&apos; or &apos;you&apos;) and JW Tours
            (&apos;Company,&apos; &apos;we,&apos; &apos;us,&apos; or
            &apos;our&apos;) governing your use of the JW Tours website (the
            &apos;Site&apos;) and any services offered therein.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            By accessing or using the Site, you agree to be bound by this
            Agreement. If you do not agree with any part of this Agreement, you
            must not access or use the Site.
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="h6">1. Use of the Site</Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <strong>1.1 License</strong>: We grant you a limited, non-exclusive,
            non-transferable, and revocable license to access and use the Site
            for its intended purpose.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <strong>1.2 Restrictions</strong>: You agree not to:
          </Typography>
        </ListItem>
        <ListItem className="item">
          <Typography className="bullet">
            Use the Site for any illegal or unauthorized purpose.
          </Typography>
        </ListItem>
        <ListItem className="item">
          <Typography className="bullet">
            Modify, adapt, or hack the Site or modify another website so as to
            falsely imply that it is associated with JW Tours.
          </Typography>
        </ListItem>
        <ListItem className="item">
          <Typography className="bullet">
            Attempt to gain unauthorized access to our systems or engage in any
            activity that disrupts, diminishes the quality of, or interferes
            with the performance of the Site.
          </Typography>
        </ListItem>
        <ListItem className="item">
          <Typography className="bullet">
            Use the Site in any manner that could damage, disable, overburden,
            or impair our servers or networks.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">2. User Content</Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <strong>2.1 Responsibility</strong>: You are solely responsible for
            any content you post, upload, transmit, or otherwise make available
            on the Site (&apos;User Content&apos;).
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <strong>2.2 Rights</strong>: By submitting User Content, you grant
            us a worldwide, royalty-free, sublicensable, and transferable
            license to use, reproduce, distribute, prepare derivative works of,
            display, and perform such User Content in connection with the Site.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">3. Intellectual Property</Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <strong>3.1 Ownership</strong>: All content on the Site, including
            but not limited to text, graphics, logos, button icons, images,
            audio clips, digital downloads, and data compilations, is the
            property of JW Tours or its content suppliers and is protected by
            copyright laws.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <strong>3.2 Trademarks</strong>: JW Tours trademarks and trade dress
            may not be used in connection with any product or service that is
            not JW Tours, in any manner that is likely to cause confusion among
            customers, or in any manner that disparages or discredits JW Tours.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">4. Limitation of Liability</Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <strong>4.1 Disclaimer</strong>: The Site is provided on an &apos;as
            is&apos; and &apos;as available&apos; basis. We make no
            representations or warranties of any kind, express or implied,
            regarding the availability, accuracy, reliability, or content of the
            Site.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <strong>4.2 Limitation</strong>: In no event shall JW Tours be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, including but not limited to loss of profits,
            data, or use, arising out of or in connection with your use of the
            Site.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">5. Governing Law</Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <strong>5.1 Jurisdiction</strong>: This Agreement shall be governed
            by and construed in accordance with the laws of [Jurisdiction],
            without regard to its conflict of law provisions.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">6. Changes to this Agreement</Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <strong>6.1 Modification</strong>: We reserve the right to modify
            this Agreement at any time. Any changes will be effective
            immediately upon posting on the Site. Your continued use of the Site
            after any such changes constitutes your acceptance of the revised
            Agreement.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">7. Contact Information</Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <strong>7.1 Questions</strong>: If you have any questions or
            concerns about this Agreement, please contact us at{' '}
            <a href="mailto:contactme.jwong@gmail.com">
              contactme.jwong@gmail.com
            </a>
            .
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            By accessing or using the Site, you acknowledge that you have read,
            understood, and agree to be bound by this Agreement.
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
}
