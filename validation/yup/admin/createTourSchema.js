import * as yup from 'yup';

// internal imports
import { philippinesGeoLocations } from '@/data/philippinesData';
import {
  categories,
  availability,
  timeSlots,
  durations,
} from '@/models/tourModel';

const transformToNumber = () => (value, originalValue) =>
  originalValue && !isNaN(originalValue) ? Number(originalValue) : null;

export const geoLocations = philippinesGeoLocations
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((location) => location.name);

export const createTourSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(300, 'Must not exceed 300 characters'),
  overview: yup
    .string()
    .test('is-not-empty', 'Tour overview is required', (value) => {
      const cleanedValue = value
        .replace(/<p><br><\/p>|<p>\s*<\/p>/g, '')
        .trim();
      return cleanedValue.length > 0;
    })
    .max(1000, 'Content must be less than 1,000 characters')
    .required('Tour overview is required'),
  images: yup
    .array()
    .of(
      yup
        .string()
        .matches(
          /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/,
          'Invalid image format. Only JPEG and PNG base64 images are allowed.'
        )
    )
    .min(5, 'Must have at least 5 images!')
    .max(8, 'Maximum of 8 images!')
    .required('Images are required'),
  destination: yup.object().shape({
    name: yup
      .string()
      .required('Destination is required')
      .max(80, 'Must not exceed 50 characters'),
    city: yup.string().notRequired(),
    geoLocation: yup
      .string()
      .required('Geographic location is required')
      .oneOf(geoLocations, 'Invalid Geographic location'),
    country: yup.string().required('Country is required'),
    category: yup
      .array()
      .of(
        yup
          .string()
          .required('Category cannot be empty')
          .oneOf(categories, 'Invalid category')
      )
      .required('Category is required'),
  }),
  itinerary: yup
    .array()
    .of(
      yup.object().shape({
        label: yup
          .string()
          .required('Label is required')
          .max(150, 'Maximum of 150 characters'),
        time: yup.object().shape({
          hour: yup.string().notRequired().max(20, 'Maximum of 20 characters'),
          minutes: yup
            .string()
            .notRequired()
            .max(20, 'Maximum of 20 characters'),
        }),
        admissionType: yup
          .string()
          .max(50, 'Maximum of 50 characters')
          .notRequired(),
        description: yup
          .string()
          .required('Description is required')
          .max(1000, 'Maximum of 1,000 characters'),
      })
    )
    .min(1, 'At least one itinerary is required'),
  meetingLocation: yup
    .object()
    .shape({
      name: yup.string().required('Location name is required'),
      neighbourhood: yup.string(),
      city: yup.string(),
      state: yup.string(),
      postcode: yup.string(),
      country: yup.string(),
      lat: yup.string().required('Latitude is required'),
      lon: yup.string().required('Longhitud is required'),
    })
    .required('Meeting location is required'),
  capacity: yup.object().shape({
    minSize: yup
      .number()
      .integer('Must be a whole number')
      .transform(transformToNumber())
      .required('Mininum size is required')
      .min(1, 'Must have at least 1 person')
      .max(10, 'Must not exceed 10 people'),
    maxSize: yup
      .number()
      .integer('Must be a whole number')
      .transform(transformToNumber())
      .required('Maximum size is required')
      .min(
        yup.ref('minSize'),
        'Maximum size must be greater than or equal to minimum size'
      )
      .max(10, 'Must not exceed 10 people'),
  }),
  pricing: yup.object().shape({
    tourCost: yup
      .number()
      .transform(transformToNumber())
      .required('Tour cost is required')
      .min(1, 'Minimum of 1')
      .max(10000, 'Maximum amount of 10,000'),
    serviceFee: yup
      .number()
      .transform(transformToNumber())
      .required('Service fee is required'),
    enablePerPersonFee: yup.boolean().default(false).notRequired(),
    perPersonFee: yup.number().when('enablePerPersonFee', {
      is: true,
      then: () =>
        yup
          .number()
          .transform(transformToNumber())
          .required('Per person fee is required'),
      otherwise: () => yup.number().notRequired(),
    }),
  }),
  guide: yup.string().required('Tour guide is required'),
  tourAvailability: yup
    .array()
    .of(
      yup
        .string()
        .max(15, 'Maximum of 15 characters')
        .required('Availability cannot be empty')
        .oneOf(availability, 'Invalid availability')
    )
    .required('Availability is required'),
  startTime: yup
    .array()
    .of(
      yup
        .string()
        .max(15, 'Maximum of 15 characters')
        .required('Time cannot be empty')
        .oneOf(timeSlots, 'Invalid time slot')
    )
    .required('Start time slot is required'),
  duration: yup
    .string()
    .max(15, 'Maximum of 15 characters')
    .required('Duration is required')
    .oneOf(durations, 'Invalid duration'),
  transportation: yup.object().shape({
    type: yup
      .string()
      .max(25, 'Maximum of 25 characters')
      .required('Transportation is required')
      .oneOf(['', 'walking', 'public', 'private'], 'Invalid transportation'),
  }),
  inclusions: yup
    .array()
    .of(
      yup.object().shape({
        label: yup
          .string()
          .required('Label is required')
          .max(50, 'Maximum of 50 characters'),
        items: yup
          .array()
          .of(yup.string().max(100, 'Maximum of 100 characters'))
          .min(1, 'At least one item is required')
          .required('Item is required'),
      })
    )
    .min(1, 'At least one inclusion type is required'),
  importantInfo: yup
    .array()
    .of(
      yup.object().shape({
        label: yup
          .string()
          .max(100, 'Maximum of 100 characters')
          .required('Info label cannot be empty'),
        category: yup.string().required('Category is required'),
      })
    )
    .min(1, 'At least one info is required')
    .required('Important information is required'),
});
