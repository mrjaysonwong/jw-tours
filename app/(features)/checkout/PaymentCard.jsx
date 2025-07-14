import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Grid, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

// internal imports
import FormInput from '@/components/inputs/FormInput';
import FormInputController from '@/components/inputs/FormInputController';
import { paymentCardSchema } from '@/validation/yup/checkout/paymentCardSchema';
import { formatCardNumber, formatCardExpiry } from '@/utils/formats/common';
import { visaIcon, masterCardIcon } from '@/constants/iconMaps/icons';
import { API_URLS } from '@/constants/apiRoutes';
import { useCheckoutContext } from '@/contexts/CheckoutProvider';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import { usePaymentProcessing } from '@/hooks/usePayment';
import { sleep } from '@/utils/common';

const PaymentCard = () => {
  const [transactionId, setTransactionId] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const {
    _id,
    bookingRequest,
    contact,
    tour,
    booker,
    meetingAndPickup,
    convertedTotalCost,
    currency,
  } = useCheckoutContext();

  const router = useRouter();
  const { handleAlertMessage } = useMessageStore();

  const { data, isLoading } = usePaymentProcessing(transactionId);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(paymentCardSchema),
  });

  const isProcessing = isSubmitting || isLoading;

  const onSubmit = async (formData) => {
    try {
      const { expiry, nameOnCard, ...restFormData } = formData;
      const cardNumber = formData.cardNumber.replace(/\s/g, '');
      const expiryDate = expiry.split('/');
      const [MM, YY] = expiryDate;

      const url = `${API_URLS.CHECKOUTS}/${_id}/payment-intent`;

      const payload = {
        amount: bookingRequest.totalCost,
        paymentMethod: {
          ...restFormData,
          type: 'card',
          cardNumber,
          exp_month: +MM,
          exp_year: +YY,
        },
        billing: {
          name: nameOnCard,
          email: contact.email,
          phone: `${contact.phone.dialCode}-${contact.phone.phoneNumber}`,
        },
        booking: {
          tour: tour._id,
          booker,
          bookingRequest,
          contact,
          meetingAndPickup,
        },
        paymentSnapshot: {
          currencySymbol: currency.symbol,
          currencyCode: currency.code,
          convertedAmount: convertedTotalCost,
        },
      };

      const { transactionId } = (await axios.post(url, payload)).data;

      setTransactionId(transactionId);
    } catch (error) {
      const { errorMessage, status } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');

      if (status === 404) router.refresh();

      throw error.message;
    }
  };

  useEffect(() => {
    const checkAndRedirect = async () => {
      if (data?.paymentStatus === 'paid') {
        setIsPaid(true);
        await sleep(1500);
        router.replace(`/payment/success?transactionId=${transactionId}`);
      }
    };

    checkAndRedirect();
  }, [data?.paymentStatus, transactionId, router]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={{ px: 4, py: 1 }}>
        <Grid item xs={12}>
          <Typography>Card number</Typography>

          <FormInputController
            control={control}
            inputName="cardNumber"
            placeholder="4343 4343 4343 4345"
            errors={errors.cardNumber}
            maxLength={19}
            onChange={(e) => formatCardNumber(e.target.value)}
            hasAdornment={true}
          />

          <Box sx={{ display: 'flex', gap: 1, m: 1 }}>
            <img
              src={visaIcon}
              alt="Visa"
              loading="eager"
              style={{ width: 30, height: 'auto' }}
            />
            <img
              src={masterCardIcon}
              alt="Mastercard"
              loading="eager"
              style={{ width: 30, height: 'auto' }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography>Expiry (MM/YY)</Typography>

          <FormInputController
            control={control}
            inputName="expiry"
            placeholder="MM/YY"
            errors={errors.expiry}
            maxLength={5}
            onChange={(e) => formatCardExpiry(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography>Security code</Typography>

          <FormInput
            register={register}
            inputName="securityCode"
            errors={errors.securityCode}
            placeholder="3 digits"
            maxLength={3}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography>Name on card</Typography>
          <FormInput
            register={register}
            inputName="nameOnCard"
            errors={errors.nameOnCard}
            autoComplete="off"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            color={isPaid ? 'success' : 'secondary'}
            disabled={isProcessing}
            startIcon={
              isProcessing ? (
                <CircularProgress size="1.5rem" color="secondary" />
              ) : isPaid ? (
                <CheckCircleOutlineOutlinedIcon />
              ) : null
            }
            sx={{ pointerEvents: isPaid ? 'none' : 'auto' }}
          >
            {isProcessing ? 'Processing...' : isPaid ? null : 'Pay'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PaymentCard;
