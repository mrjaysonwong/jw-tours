export const baseTableParams = ['q', 'page', 'limit', 'tab', 'sort'];

export const userTableParams = [...baseTableParams, 'role'];
export const reviewTableParams = [...baseTableParams];

export const baseTourListParams = [
  'minDuration',
  'maxDuration',
  'transportation',
  'sort',
  'page',
];

export const tourListParams = [...baseTourListParams, 'q'];

export const apiTourListParams = [
  ...tourListParams,
  'geoLocation',
  'destination',
  'guideId',
  'limit',
  'top_destination',
];

export const bookingsParams = [
  'tourFrom',
  'tourTo',
  'bookingFrom',
  'bookingTo',
  'status',
  'sort',
];

export const apiUserBookingsParams = [
  'transactionId',
  'tourFrom',
  'tourTo',
  'bookingFrom',
  'bookingTo',
  'status',
  'sort',
];
