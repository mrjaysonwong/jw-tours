import * as yup from 'yup';

export const transportationOptions = ['private', 'public', 'walking'];

export const filtersSchema = yup.object().shape({
  transportation: yup
    .array()
    .of(yup.string().oneOf(transportationOptions))
    .nullable()
    .notRequired(),
  duration: yup.array().of(yup.string()).nullable().notRequired(),
});
