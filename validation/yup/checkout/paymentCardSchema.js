import * as yup from 'yup';
import dayjs from 'dayjs';

export const paymentCardSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required('Card number is required')
    .matches(
      /^(\d{4}[\s]?)?\d{4}[\s]?\d{4}[\s]?\d{4}$/,
      'Enter a valid card number'
    ),

  expiry: yup
    .string()
    .required('Expiry date is required')
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Expiry must be in MM/YY format')
    .test('is-expiry-valid', 'Card has expired', (value) => {
      if (!value) return false;

      const [month, year] = value.split('/');

      if (!month || !year) return false;

      const currentYearFull = dayjs().year(); // e.g., 2025
      const century = Math.floor(currentYearFull / 100); // 20

      const expiryDate = dayjs(`${century}${year}-${month}`, 'YYYY-MM');

      // Get current date for comparison
      const currentDate = dayjs();

      // Compare the expiry date with the current date
      return expiryDate.isAfter(currentDate, 'month');
    }),

  securityCode: yup
    .string()
    .required('Security code is required')
    .min(3, 'Must be 3 digits')
    .matches(/^\d{3}$/, 'Enter a valid security code'),

  nameOnCard: yup
    .string()
    .trim()
    .required('Name on card is required')
    .max(50, `Name can't be longer than 50 characters`)
    .matches(/^[a-zA-Z\s]+$/, 'Please enter a valid name'),
});
