import * as yup from 'yup';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// internal imports
import { nationalities } from '@/data/countries/nationalities';

dayjs.extend(utc);

export const validGenders = ['', 'male', 'female', 'other'];
export const validStatus = ['', 'active', 'pending', 'suspended', 'inactive'];
export const validRoles = ['', 'user', 'guide', 'partner', 'agent'];

const minYear = '1900'; // Minimum year
const maxDate = dayjs(); // Maximum date is today

const nationalitySet = new Set(nationalities.map((item) => item.label));

// function getDateOfBirth() {
//   return yup
//     .string()
//     .trim()
//     .test(
//       'is-valid-date',
//       'Date of Birth must be in the format YYYY-MM-DD',
//       (value) => {
//         if (!value) return true; // Allow empty values

//         // Strict format YYYY-MM-DD
//         const regex =
//           /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$|^[A-Za-z]{3},/;

//         // Check if the value matches the regex
//         if (!regex.test(value)) return false;

//         // Check if the date is valid as an ISO 8601 or RFC 2822 string
//         const parsedDate = dayjs.utc(value);
//         return parsedDate.isValid();
//       }
//     )
//     .test('is-valid-year', 'Date cannot be this early', (value) => {
//       const getYear = dayjs(value).year();

//       return getYear >= minYear;
//     })
//     .test('is-not-future-date', 'Date cannot be in the future', (value) => {
//       const parsedDate = dayjs(value);

//       return parsedDate.isBefore(maxDate) || parsedDate.isSame(maxDate);
//     });
// }

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
  address: yup
    .object()
    .shape({
      street: yup.string().max(100, 'Street must not exceed 100 characters.'),
      homeTown: yup
        .string()
        .max(128, 'Home town must not exceed 128 characters.'),
      postalCode: yup
        .string()
        .max(10, 'Postal code must not exceed 10 characters.'),
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

