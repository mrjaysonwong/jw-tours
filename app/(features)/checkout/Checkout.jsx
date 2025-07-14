import { AppBar, Toolbar, Container } from '@mui/material';

// internal imports
import { StyledContainer } from '@/components/styled/StyledContainers';
import Logo from '@/components/layout/header/Logo';
import CheckoutStepper from './CheckoutStepper';

const Checkout = ({ checkout }) => {
  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: 'transparent' }}
      >
        <Container>
          <Toolbar sx={{ px: { xs: 0, md: 'auto' } }}>
            <Logo />
          </Toolbar>
        </Container>
      </AppBar>

      <StyledContainer sx={{ mt: 0 }}>
        <CheckoutStepper checkout={checkout} />
      </StyledContainer>
    </>
  );
};

export default Checkout;
