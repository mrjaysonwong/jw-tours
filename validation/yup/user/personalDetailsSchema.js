import * as yup from 'yup';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// internal imports
import { nationalities } from '@/data/countries/nationalities';
import { languages } from '@/data/countries/languages';

dayjs.extend(utc);

export const validGenders = ['', 'male', 'female', 'other'];
export const validStatus = ['', 'active', 'pending', 'suspended', 'inactive'];
export const validRoles = ['', 'user', 'guide', 'agent'];

const minYear = '1900'; // Minimum year

const nationalitySet = new Set(nationalities.map((item) => item.label));

function getDateOfBirth() {
  return yup
    .date()
    .nullable()
    .min(new Date(minYear, 0, 1), `Year cannot be earlier than ${minYear}`)
    .max(new Date(), 'Date cannot be in the future')
    .typeError('Date must be a valid date in the format YYYY-MM-DD')
    .notRequired();
}

export const personalDetailsSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required('First name is required')
    .max(50, `Name can't be longer than 50 characters`)
    .matches(/^[A-Za-z0-9 ]*$/, 'Please enter a valid name.'),
  lastName: yup
    .string()
    .trim()
    .required('Last name is required')
    .max(50, `Name can't be longer than 50 characters`)
    .matches(/^[A-Za-z0-9 ]*$/, 'Please enter a valid name.'),
  gender: yup
    .string()
    .trim()
    .oneOf(validGenders, 'Invalid gender type.')
    .notRequired(),
  dateOfBirth: getDateOfBirth(),
  nationality: yup
    .string()
    .trim()
    .test(
      'is-valid-nationality',
      'Invalid nationality',
      (value) => !value || nationalitySet.has(value)
    )
    .notRequired(),
  languages: yup
    .array()
    .of(yup.string().oneOf(languages, 'Invalid language'))
    .notRequired(),
  address: yup
    .object()
    .shape({
      name: yup.string(),
      neighbourhood: yup.string(),
      city: yup.string(),
      state: yup.string(),
      postcode: yup.string(),
      country: yup.string(),
    })
    .notRequired(),
  role: yup
    .string()
    .trim()
    .required('Role is required')
    .oneOf(validRoles, 'Invalid role')
    .notRequired(),
});

export const statusSchema = yup.object({
  status: yup
    .string()
    .trim()
    .required('Status is required')
    .oneOf(validStatus, 'Invalid status'),
});

export const userIdSchema = yup.object({
  userIds: yup
    .array()
    .of(
      yup
        .string()
        .matches(
          /^[a-fA-F0-9]{24}$/,
          'Invalid MongoDB ObjectId, must be 24 hex characters.'
        ) // Ensures exactly 24 hex chars
    )
    .min(1, 'At least one user ID is required') // Prevents empty array
    .required('User IDs are required'),
});
