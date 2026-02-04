import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Avatar,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// internal imports
import { currencies } from '@/data/countries/currencies';

const CurrencySwitcherDialog = ({ isDialogOpen, setIsDialogOpen }) => {
  const router = useRouter();

  const [cookie, setCookie] = useCookies();

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleClickCurrency = (e) => {
    const currencyCode = e.currentTarget.dataset.currencyCode;

    setCookie('currency', currencyCode, { path: '/' });
    router.refresh();

    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} closeAfterTransition={false} scroll="body">
      <DialogTitle>Select a Currency</DialogTitle>

      <IconButton
        onClick={handleClose}
        sx={{ position: 'absolute', right: 10, top: 10 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        dividers
        sx={{
          borderBottom: 'none',
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: { xs: 'auto', md: '300px' },
        }}
      >
        {currencies.map((currency, index) => (
          <Box
            component="span"
            key={index}
            data-currency-code={currency.currencyCode}
            onClick={(e) => handleClickCurrency(e)}
            sx={{ cursor: { xs: 'auto', lg: 'pointer' } }}
          >
            <Avatar
              src={currency.flagIcon}
              alt={currency.currencyCode}
              slotProps={{
                img: { loading: 'eager' },
              }}
              sx={{ width: 54, height: 54, m: 'auto' }}
            />

            <Typography sx={{ my: 1 }}>
              {currency.symbol} {currency.currencyCode}
            </Typography>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
};

const Currency = ({ currency }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickCurrency = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Typography
        component="button"
        onClick={handleClickCurrency}
        sx={{
          textDecoration: 'underline',
          mx: 1,
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          p: 0,
          color: 'inherit',
          font: 'inherit',
        }}
      >
        {currency.symbol} {currency.code}
      </Typography>

      <CurrencySwitcherDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default Currency;
