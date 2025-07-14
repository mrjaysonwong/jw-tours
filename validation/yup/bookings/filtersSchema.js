import * as yup from 'yup';

const createDateRangeSchema = (fromKey, toKey) => ({
  [fromKey]: yup
    .date()
    .nullable()
    .typeError(`'From' must be a valid date or empty`)
    .when(toKey, {
      is: (to) => to != null,
      then: (schema) =>
        schema.required(`'From' date is required if 'To' date is set`),
      otherwise: (schema) => schema.nullable(),
    }),

  [toKey]: yup
    .date()
    .nullable()
    .typeError(`'To' must be a valid date or empty`)
    .min(
      yup.ref(fromKey),
      `'To' date must be later than or equal to 'From' date`
    ),
});

export const filtersSchema = yup.object().shape({
  ...createDateRangeSchema('tourFrom', 'tourTo'),
  ...createDateRangeSchema('bookingFrom', 'bookingTo'),
  status: yup
    .array()
    .of(yup.string().oneOf(['confirmed', 'cancelled', 'completed']))
    .nullable()
    .notRequired(),
});
