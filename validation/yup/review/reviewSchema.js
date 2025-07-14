import * as yup from 'yup';

export const reviewSchema = yup.object().shape({
  rating: yup
    .number()
    .required('Rating is required')
    .min(1, 'Rating must be 1 star to 5 stars')
    .max(5),
  comment: yup
    .string()
    .trim()
    .min(30, 'Please write at least 30 characters.')
    .max(1000, 'Your review is too long.')
    .required('Comment is required'),
});
