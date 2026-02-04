import { Schema, model, models } from 'mongoose';

// internal imports
import { philippinesGeoLocations } from '@/data/philippinesData';

export const admissionTypes = [
  'Admission Ticket Included',
  'Admission Ticket Free',
];

export const generateHourlyTime = () => {
  return Array.from(
    { length: 23 },
    (_, i) => `${i + 1} hour${i > 0 ? 's' : ''}`
  );
};

export const generateMinutesTime = (interval = 5, max = 55) => {
  return Array.from({ length: max / interval }, (_, i) => {
    const minutes = (i + 1) * interval;
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  });
};

const generateDurations = () => {
  const hours = Array.from(
    { length: 23 },
    (_, i) => `${i + 1} hour${i > 0 ? 's' : ''}`
  );
  const days = Array.from(
    { length: 6 },
    (_, i) => `${i + 1} day${i > 0 ? 's' : ''}`
  );
  return [...hours, ...days, '1 week'];
};

export const durations = generateDurations();

export const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  const period = hour < 12 ? 'am' : 'pm';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:${minute} ${period}`;
});

export const availability = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const categories = [
  'City highlights',
  'Island hopping',
  'Beach',
  'Landmarks',
  'Nature and wildlife',
  'Art and culture',
  'Adventure',
  'Hiking',
  'Food and drink',
  'History',
  'Museums',
  'Genealogy',
];

const geoLocations = philippinesGeoLocations.map((location) =>
  location.name.toLowerCase()
);

const tourSchema = new Schema(
  {
    tourId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    overview: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
        _id: false,
      },
    ],
    destination: {
      name: {
        type: String,
        lowercase: true,
        required: true,
        maxlength: 80,
      },
      city: { type: String, lowercase: true, maxLength: 80 },
      country: {
        type: String,
        lowercase: true,
        required: true,
      },
      lat: { type: String, required: true },
      lon: { type: String, required: true },
    },
    geoLocation: {
      type: String,
      lowercase: true,
      required: true,
      enum: geoLocations,
    },
    category: {
      type: [String],
      required: true,
      enum: categories,
    },
    itinerary: {
      type: [
        {
          label: { type: String, required: true, maxlength: 150 },
          time: {
            hour: { type: String },
            minutes: { type: String },
          },
          admissionType: { type: String, maxLength: 50 },
          description: { type: String, required: true, maxlength: 1000 },
          _id: false,
        },
      ],
      required: true,
    },
    meetingLocation: {
      name: String,
      road: String,
      suburb: String,
      city: String,
      state: String,
      postcode: String,
      country: String,
      lat: { type: String, required: true },
      lon: { type: String, required: true },
    },
    capacity: {
      minSize: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
      },
      maxSize: {
        type: Number,
        required: true,
        max: 10,
      },
    },
    pricing: {
      tourCost: {
        type: Number,
        required: true,
        min: 1,
        max: 10000,
      },
      serviceFee: {
        type: Number,
        required: true,
      },
      enablePerPersonFee: {
        type: Boolean,
        default: false,
      },
      perPersonFee: {
        type: Number,
        default: null,
        required: function () {
          return this.enablePerPersonFee;
        },
      },
    },
    guide: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tourAvailability: {
      type: [String],
      required: true,
      enum: availability,
    },
    startTime: {
      type: [String],
      required: true,
      enum: timeSlots,
    },
    duration: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
    transportation: {
      type: {
        type: String,
        lowercase: true,
        required: true,
      },
    },
    inclusions: {
      type: [
        {
          label: { type: String, required: true, maxlength: 150 },
          items: { type: [String] },
          _id: false,
        },
      ],
      required: true,
    },
    importantInfo: {
      type: [
        {
          label: { type: String, required: true, maxlength: 150 },
          category: { type: [String] },
          _id: false,
        },
      ],
      required: true,
    },
    freeCancellation: {
      isFreeCancellation: {
        type: Boolean,
        default: false,
      },
      cutOffHours: {
        type: Number,
        default: 24,
        min: 0,
      },
    },
  },
  { timestamps: true }
);

tourSchema.index({
  'duration.value': 1,
  'duration.unit': 1,
  'transportation.type': 1,
  'destination.name': 1,
  geoLocation: 1,
  title: 1,
});

const Tour = models?.Tour || model('Tour', tourSchema);

export default Tour;
