// third-party imports
import { AppBar, Toolbar, Box, Container, Typography } from '@mui/material';

// internal imports
import { StyledMainContainer } from '../styled/StyledContainers';
import Logo from './header/Logo';

const PageLayout = ({ children, marginY }) => {
  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: 'transparent' }}
      >
        <Container>
          <Toolbar
            sx={{
              px: { xs: 0, md: 'auto' },
            }}
          >
            <Logo />
          </Toolbar>
        </Container>
      </AppBar>

      <StyledMainContainer sx={{ overflowY: 'auto' }}>
        <Box
          sx={{
            width: 'clamp(300px, 80vw, 390px)',
            flex: 1,
            my: marginY,
          }}
        >
          {children}
        </Box>

        <Container>
          <Toolbar
            sx={{
              py: 2,
              mr: 'auto',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',

              '& > :not(:last-child)::after': {
                content: '""',
                px: 1,
              },

              '& > *': {
                color: 'gray',
              },
            }}
          >
            <Typography variant="body2">© JW Tours</Typography>
            <Typography variant="body2">About</Typography>
          </Toolbar>
        </Container>
      </StyledMainContainer>
    </>
  );
};

export default PageLayout;
