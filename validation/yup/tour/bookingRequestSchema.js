import * as yup from 'yup';

export const bookingRequestSchema = yup.object().shape({
  tourDate: yup.date().required('Tour date is required'),
  startTime: yup.string().required('Start time is required')
});
