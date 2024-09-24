import { Typography, List, ListItem } from '@mui/material';
import { StyledContainer } from '@/components/styled/StyledContainers';

export const metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <StyledContainer
      sx={{
        width: 'clamp(min(95vw, 600px), 50%, max(70vw, 600px ))',
      }}
    >
      <Typography variant="h3" sx={{ my: 6, textAlign: 'center' }}>
        Privacy Policy
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
            This Privacy Policy (&apos;Policy&apos;) describes how JW Tours
            (&apos;Company,&apos; &apos;we,&apos; &apos;us,&apos; or
            &apos;our&apos;) collects, uses, shares, and protects the personal
            information of users (&apos;User&apos; or &apos;you&apos;) of the JW
            Tours website (the &apos;Site&apos;) and any services offered
            therein.
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="h6">1. Information We Collect</Typography>
        </ListItem>

        <ListItem>
          <Typography>
            <strong>1.1 Personal Information</strong>: We may collect personal
            information such as:
          </Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">Name</Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">Email address</Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">Postal address</Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">Phone number</Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">Payment information</Typography>
        </ListItem>

        <ListItem>
          <Typography>
            <strong>1.2 Usage Data</strong>: We may also collect non-personal
            information about your interactions with the Site, including:
          </Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">IP address</Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">Pages visited</Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">Date and time of visits</Typography>
        </ListItem>

        <ListItem>
          <Typography variant="h6">2. Use of Information</Typography>
        </ListItem>

        <ListItem>
          <Typography>
            <strong>2.1 Purpose</strong>: We may use the information we collect
            for purposes including:
          </Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">
            Providing and improving our services
          </Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">Communicating with you</Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">Processing transactions</Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">
            Personalizing your experience
          </Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">Analyzing usage trends</Typography>
        </ListItem>

        <ListItem>
          <Typography variant="h6">3. Sharing of Information</Typography>
        </ListItem>

        <ListItem>
          <Typography>
            <strong>3.1 Third Parties</strong>: We may share your information
            with third parties for purposes including:
          </Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">
            Service providers assisting with our operations
          </Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">
            Compliance with legal obligations
          </Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">
            Protection against fraud or security risks
          </Typography>
        </ListItem>

        <ListItem className="item">
          <Typography className="bullet">
            Business transfers or acquisitions
          </Typography>
        </ListItem>

        <ListItem>
          <Typography>
            <strong>3.2 Marketing</strong>: We may also share your information
            for marketing purposes with your consent or as permitted by law.
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="h6">4. Data Security</Typography>
        </ListItem>

        <ListItem>
          <Typography>
            <strong>4.1 Measures</strong>: We implement reasonable security
            measures to protect your personal information from unauthorized
            access, alteration, disclosure, or destruction.
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="h6">5. Your Choices</Typography>
        </ListItem>

        <ListItem>
          <Typography>
            <strong>5.1 Opt-Out</strong>: You may opt out of receiving marketing
            communications from us by following the instructions provided in
            such communications.
          </Typography>
        </ListItem>

        <ListItem>
          <Typography>
            <strong>5.2 Access</strong>: You may request access to, correction
            of, or deletion of your personal information by contacting us using
            the information provided below.
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="h6">6. Third-Party Links</Typography>
        </ListItem>

        <ListItem>
          <Typography>
            <strong>6.1 External Sites</strong>: Our Site may contain links to
            third-party websites. We are not responsible for the privacy
            practices or content of such websites.
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="h6">7. Changes to this Policy</Typography>
        </ListItem>

        <ListItem>
          <Typography>
            <strong>7.1 Modification</strong>: We reserve the right to modify
            this Policy at any time. Any changes will be effective immediately
            upon posting on the Site. Your continued use of the Site after any
            such changes constitutes your acceptance of the revised Policy.
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="h6">8. Contact Information</Typography>
        </ListItem>

        <ListItem>
          <Typography>
            <strong>8.1 Questions</strong>: If you have any questions or
            concerns about this Policy, please contact us at{' '}
            <a href="mailto:contactme.jwong@gmail.com">
              contactme.jwong@gmail.com
            </a>
            .
          </Typography>
        </ListItem>
      </List>
    </StyledContainer>
  );
}
